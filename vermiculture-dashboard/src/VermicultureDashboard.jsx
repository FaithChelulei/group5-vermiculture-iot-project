import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, Legend
} from "recharts";

const FIREBASE_PROJECT_ID = "internetofthings-26312";
const FIREBASE_API_KEY    = "AIzaSyBSWR_5mZqJVREUxSesooHKZ7g2FBQXQKs";
const FIREBASE_AUTH_DOMAIN = "internetofthings-26312.firebaseapp.com";

const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;


function firestoreValueToJS(val) {
  if (val.doubleValue !== undefined) return val.doubleValue;
  if (val.integerValue !== undefined) return Number(val.integerValue);
  if (val.stringValue !== undefined) return val.stringValue;
  if (val.booleanValue !== undefined) return val.booleanValue;
  if (val.timestampValue !== undefined) return new Date(val.timestampValue);
  if (val.mapValue) {
    const obj = {};
    Object.entries(val.mapValue.fields || {}).forEach(([k, v]) => {
      obj[k] = firestoreValueToJS(v);
    });
    return obj;
  }
  return null;
}

function firestoreDocToJS(doc) {
  const obj = { id: doc.name.split("/").pop() };
  Object.entries(doc.fields || {}).forEach(([k, v]) => {
    obj[k] = firestoreValueToJS(v);
  });
  return obj;
}

async function fetchReadings(limitN = 20) {
  const url = `${FIRESTORE_URL}/readings?orderBy=timestamp desc&pageSize=${limitN}&key=${FIREBASE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Firestore fetch failed");
  const data = await res.json();
  return (data.documents || []).map(firestoreDocToJS).reverse();
}

function tempStatus(t) {
  if (t >= 15 && t <= 25) return "optimal";
  if (t > 25 && t <= 30) return "warn";
  return "bad";
}
function humStatus(h) {
  if (h >= 60 && h <= 80) return "optimal";
  if (h >= 50 && h < 60)  return "warn";
  return "bad";
}
function moistStatus(m) {
  if (m >= 60 && m <= 80) return "optimal";  
  if (m >= 50 && m < 60)  return "warn";     
  return "bad";
}
function phStatus(ph) {
if (ph >= 6.5 && ph <= 7.5) return "optimal";
if ((ph >= 5.5 && ph < 6.5) || (ph > 7.5 && ph <= 8.5)) return "warn";
return "bad";

}
const STATUS_META = {
  optimal: { label: "Optimal",  bg: "#EAF3DE", color: "#3B6D11", dot: "#639922" },
  warn:    { label: "Monitor",  bg: "#FAEEDA", color: "#854F0B", dot: "#BA7517" },
  bad:     { label: "Critical", bg: "#FCEBEB", color: "#A32D2D", dot: "#E24B4A" },
};

function Badge({ status }) {
  const m = STATUS_META[status] || STATUS_META.warn;
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "2px 8px",
      borderRadius: 6, background: m.bg, color: m.color,
    }}>{m.label}</span>
  );
}

function MetricCard({ icon, label, value, unit, status }) {
  const dot = (STATUS_META[status] || STATUS_META.warn).dot;
  return (
    <div style={{
      background: "var(--card-bg)", border: "0.5px solid var(--border)",
      borderRadius: 10, padding: "1rem",
    }}>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot, display: "inline-block" }} />
        {icon} {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1 }}>
        {value ?? "—"}<span style={{ fontSize: 14, color: "var(--text-secondary)", marginLeft: 3 }}>{unit}</span>
      </div>
      <div style={{ marginTop: 6 }}><Badge status={status} /></div>
    </div>
  );
}

function BedRow({ name, pct }) {
  const cls = pct >= 80 ? "optimal" : pct >= 50 ? "warn" : "bad";
  const barColor = STATUS_META[cls].dot;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid var(--border)", fontSize: 13 }}>
      <div style={{ width: 52, fontWeight: 500 }}>{name}</div>
      <div style={{ flex: 1, background: "var(--surface)", borderRadius: 4, height: 8, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, background: barColor, height: 8, borderRadius: 4, transition: "width 0.6s ease" }} />
      </div>
      <div style={{ width: 36, textAlign: "right", color: "var(--text-secondary)" }}>{pct}%</div>
      <Badge status={cls} />
    </div>
  );
}

function generateMockReadings(n = 20) {
  const now = Date.now();
  return Array.from({ length: n }, (_, i) => ({
    id: `mock-${i}`,
    timestamp: new Date(now - (n - 1 - i) * 2 * 60 * 1000),
    temperature: 22 + Math.round(Math.random() * 5),
    humidity:    52 + Math.round(Math.random() * 10),
    moisture_percent: 55 + Math.round(Math.random() * 20),
    moisture_raw: 300 + Math.floor(Math.random() * 200),
    ph_value: 6 + Math.random() * 2,
    
  }));
}

const MOCK_BEDS = [
  { name: "Bed 1", pct: 88 }, { name: "Bed 2", pct: 72 },
  { name: "Bed 3", pct: 51 }, { name: "Bed 4", pct: 95 },
  { name: "Bed 5", pct: 34 }, { name: "Bed 6", pct: 65 },
];

export default function VermicultureDashboard() {
  const [readings, setReadings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [useMock, setUseMock]     = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const pollRef = useRef(null);

  const loadData = async () => {
    try {
      const data = await fetchReadings(20);
      if (data.length === 0) throw new Error("No data");
      setReadings(data);
      setError(null);
      setUseMock(false);
    } catch (e) {
      
      console.warn("Firebase error:", e.message);
      setError(e.message);
      setUseMock(false);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  useEffect(() => {
    loadData();
    pollRef.current = setInterval(loadData, 10000); // poll every 10s
    return () => clearInterval(pollRef.current);
  }, []);

  const latest = readings[readings.length - 1];
 const chartData = readings.map((r, i) => ({

  name: `R${i + 1}`,

  temp: r.temperature,

  humidity: r.humidity,

  moisture: Math.round(r.moisture_percent),

  ph: r.ph_value,

  }));

  const cssVars = `
    :root {
      --card-bg: #ffffff;
      --surface: #f4f4f2;
      --border: rgba(0,0,0,0.12);
      --text-primary: #1a1a1a;
      --text-secondary: #6b6b68;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --card-bg: #1e1e1c;
        --surface: #2a2a28;
        --border: rgba(255,255,255,0.1);
        --text-primary: #f0ede8;
        --text-secondary: #9a9893;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background: var(--surface); color: var(--text-primary); }
  `;

if (loading) return (
    <>
      <style>{cssVars}</style>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", color: "var(--text-secondary)", fontSize: 14 }}>
        Loading sensor data…
      </div>
    </>
  );

  if (error || readings.length === 0) return (
    <>
      <style>{cssVars}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", color: "var(--text-secondary)", fontSize: 14, gap: 8 }}>
        <span style={{ fontSize: 32 }}>📡</span>
        <p style={{ fontWeight: 500, color: "var(--text-primary)" }}>No data yet</p>
        <p>Waiting for your TTGO to push readings to Firebase…</p>
      </div>
    </>
  );
  return (
    <>
      <style>{cssVars}</style>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 500 }}>🪱 Muturi's Black Gold</h1>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 3 }}>
              Vermiculture bed monitor · ICS 4111 Group 4E
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            {useMock && (
              <div style={{ fontSize: 11, background: "#FAEEDA", color: "#854F0B", padding: "2px 8px", borderRadius: 6, marginBottom: 4 }}>
                Demo mode — connect Firebase to see live data
              </div>
            )}
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#639922", display: "inline-block", marginRight: 5, animation: "pulse 2s infinite" }} />
              Updated {lastUpdated?.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>

<MetricCard icon="🌡" label="Temperature" value={latest?.temperature} unit="°C" status={tempStatus(latest?.temperature)} />

<MetricCard icon="💧" label="Humidity" value={latest?.humidity} unit="%" status={humStatus(latest?.humidity)} />

<MetricCard icon="🌱" label="Soil moisture" value={Math.round(latest?.moisture_percent)} unit="%" status={moistStatus(latest?.moisture_percent)} />

<MetricCard icon="🧪" label="pH Level" value={latest?.ph_value?.toFixed(2)} unit="" status={phStatus(latest?.ph_value)} />

<MetricCard

icon="🔴"

label="LED Status"

value={latest?.led_status?.toUpperCase() || "UNKNOWN"}

unit=""

status={

latest?.led_status === "optimal" ? "optimal" :

latest?.led_status === "warning" ? "warn" : "bad"

}

/>

</div>

        {/* Charts */}
       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>

{/* Temperature & Humidity */}

<div style={{ background: "var(--card-bg)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>

<p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>

Temperature & humidity

</p>

<ResponsiveContainer width="100%" height={160}>

<LineChart data={chartData}>

<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

<XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />

<YAxis tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />

<Tooltip contentStyle={{ fontSize: 12, background: "var(--card-bg)", border: "0.5px solid var(--border)" }} />

<Legend wrapperStyle={{ fontSize: 12 }} />

<Line type="monotone" dataKey="temp" name="Temp (°C)" stroke="#E24B4A" dot={false} strokeWidth={1.5} />

<Line type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#378ADD" dot={false} strokeWidth={1.5} />

</LineChart>

</ResponsiveContainer>

</div>

{/* Moisture Trend */}

<div style={{ background: "var(--card-bg)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>

<p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>

Soil moisture trend

</p>

<ResponsiveContainer width="100%" height={160}>

<AreaChart data={chartData}>

<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

<XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />

<YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />

<Tooltip contentStyle={{ fontSize: 12, background: "var(--card-bg)", border: "0.5px solid var(--border)" }} />

<Area type="monotone" dataKey="moisture" name="Moisture (%)" stroke="#639922" fill="rgba(99,153,34,0.15)" strokeWidth={1.5} />

</AreaChart>

</ResponsiveContainer>

</div>

{/* pH Trend */}

<div style={{ background: "var(--card-bg)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>

<p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>

pH Trend

</p>

<ResponsiveContainer width="100%" height={160}>

<LineChart data={chartData}>

<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

<XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />

<YAxis domain={[0, 14]} tick={{ fontSize: 11, fill: "var(--text-secondary)" }} />

<Tooltip contentStyle={{ fontSize: 12, background: "var(--card-bg)", border: "0.5px solid var(--border)" }} />

<Line type="monotone" dataKey="ph" name="pH" stroke="#8A2BE2" strokeWidth={2} dot={false} />

</LineChart>

</ResponsiveContainer>

</div>

</div>

        {/* Bed readiness */}
        <div style={{ background: "var(--card-bg)", border: "0.5px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem" }}>
          <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 500 }}>Bed harvest readiness</p>
          {MOCK_BEDS.map(b => <BedRow key={b.name} name={b.name} pct={b.pct} />)}
          <p style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 10 }}>
            🟢 ≥80% ready · 🟡 50–79% maturing · 🔴 &lt;50% early stage
          </p>
        </div>

        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      </div>
    </>
  );
}
