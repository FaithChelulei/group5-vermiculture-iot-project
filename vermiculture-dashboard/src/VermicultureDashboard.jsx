import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from "recharts";

// =================== SVG ICONS ===================
const IconLayoutDashboard = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
);
const IconBeds = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2-1"/><path d="M4 18l2-13h12l2 13"/><path d="M9 10h6"/></svg>
);
const IconCalendar = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const IconAnalytics = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);
const IconSettings = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const IconHelp = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const IconSearch = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const IconBell = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);
const IconMail = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const IconExternalLink = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);
const IconCheck = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconPlus = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const IconVideo = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
);
const IconClock = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const IconPause = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
);
const IconStop = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>
);
const IconDownload = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const IconSmartphone = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
);

// =================== FIREBASE UTILS ===================
const FIREBASE_PROJECT_ID = "internetofthings-26312";
const FIREBASE_API_KEY    = "AIzaSyBSWR_5mZqJVREUxSesooHKZ7g2FBQXQKs";
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`;

function firestoreValueToJS(val) {
  if (val.doubleValue !== undefined) return val.doubleValue;
  if (val.integerValue !== undefined) return Number(val.integerValue);
  if (val.stringValue !== undefined) return val.stringValue;
  if (val.booleanValue !== undefined) return val.booleanValue;
  if (val.timestampValue !== undefined) return new Date(val.timestampValue);
  if (val.mapValue) {
    const obj = {};
    Object.entries(val.mapValue.fields || {}).forEach(([k, v]) => { obj[k] = firestoreValueToJS(v); });
    return obj;
  }
  return null;
}
function firestoreDocToJS(doc) {
  const obj = { id: doc.name.split("/").pop() };
  Object.entries(doc.fields || {}).forEach(([k, v]) => { obj[k] = firestoreValueToJS(v); });
  return obj;
}
async function fetchReadings(limitN = 20) {
  const url = `${FIRESTORE_URL}/readings?orderBy=timestamp desc&pageSize=${limitN}&key=${FIREBASE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Firestore fetch failed");
  const data = await res.json();
  return (data.documents || []).map(firestoreDocToJS).reverse();
}

// =================== STATUS HELPERS (use settings) ===================
function tempStatus(t, settings) {
  if (t >= settings.tempMin && t <= settings.tempMax) return "optimal";
  if (t > settings.tempMax && t <= settings.tempMax + 5) return "warn";
  if (t < settings.tempMin && t >= settings.tempMin - 5) return "warn";
  return "bad";
}
function humStatus(h, settings) {
  if (h >= settings.humMin && h <= settings.humMax) return "optimal";
  if (h > settings.humMax && h <= settings.humMax + 10) return "warn";
  if (h < settings.humMin && h >= settings.humMin - 10) return "warn";
  return "bad";
}
function moistStatus(m, settings) {
  if (m >= settings.moistMin && m <= settings.moistMax) return "optimal";
  if (m > settings.moistMax && m <= settings.moistMax + 10) return "warn";
  if (m < settings.moistMin && m >= settings.moistMin - 10) return "warn";
  return "bad";
}
function phStatus(ph, settings) {
  if (ph >= settings.phMin && ph <= settings.phMax) return "optimal";
  if ((ph >= settings.phMin - 1 && ph < settings.phMin) || (ph > settings.phMax && ph <= settings.phMax + 1)) return "warn";
  return "bad";
}

const STATUS_META = {
  optimal: { label: "Optimal",  bg: "#EAF3DE", color: "#3B6D11", dot: "#639922" },
  warn:    { label: "Monitor",  bg: "#FAEEDA", color: "#854F0B", dot: "#BA7517" },
  bad:     { label: "Critical", bg: "#FCEBEB", color: "#A32D2D", dot: "#E24B4A" },
};

// =================== COLORS ===================
const COLORS = {
  primary: "#1B4332",
  primaryLight: "#2D6A4F",
  accent: "#40916C",
  accentLight: "#52B788",
  bg: "#F8F9F6",
  card: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#6B6B6B",
  border: "rgba(0,0,0,0.08)",
  sidebarBg: "#FFFFFF",
  sidebarActive: "#1B4332",
  chartGreen: "#40916C",
  chartDarkGreen: "#1B4332",
  chartLightGreen: "#74C69D",
  chartPale: "#D8F3DC",
  red: "#E24B4A",
  blue: "#378ADD",
  purple: "#8A2BE2",
};

// =================== SINGLE BED DATA ===================
const THE_BED = { name: "Bed 1", pct: 78, due: "Dec 15, 2024", temp: 22, hum: 68, moist: 72, ph: 7.0 };

const REMINDERS = [
  { title: "Feed the bed", time: "Today, 10:00 AM", type: "feeding" },
  { title: "Check Moisture Levels", time: "Today, 2:00 PM", type: "check" },
  { title: "pH Sensor Calibration", time: "Tomorrow, 9:00 AM", type: "calibration" },
];

const CALENDAR_EVENTS = [
  { day: 5, title: "Feed the bed", type: "feeding" },
  { day: 12, title: "Check bed readiness", type: "check" },
  { day: 15, title: "Check pH levels", type: "check" },
  { day: 20, title: "Review progress", type: "meeting" },
  { day: 26, title: "Sensor maintenance", type: "maintenance" },
];

// =================== SUB-COMPONENTS ===================

function Sidebar({ active, onNavigate }) {
  const menuItems = [
    { icon: <IconLayoutDashboard />, label: "Dashboard", id: "dashboard" },
    { icon: <IconBeds />, label: "Beds", id: "beds" },
    { icon: <IconCalendar />, label: "Calendar", id: "calendar" },
    { icon: <IconAnalytics />, label: "Analytics", id: "analytics" },
  ];
  const generalItems = [
    { icon: <IconSettings />, label: "Settings", id: "settings" },
    { icon: <IconHelp />, label: "Help", id: "help" },
  ];

  const itemStyle = (isActive) => ({
    display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
    borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 500,
    color: isActive ? "#fff" : COLORS.textSecondary,
    background: isActive ? COLORS.sidebarActive : "transparent",
    transition: "all 0.2s",
  });

  return (
    <div style={{
      width: 240, minWidth: 240, background: COLORS.sidebarBg,
      borderRight: `1px solid ${COLORS.border}`, minHeight: "100vh",
      display: "flex", flexDirection: "column", padding: "24px 16px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, paddingLeft: 4 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%", background: COLORS.primary,
          display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18,
        }}>🪱</div>
        <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Muturi's Black Gold</span>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, paddingLeft: 4 }}>Menu</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {menuItems.map(item => (
          <div key={item.id} style={itemStyle(active === item.id)} onClick={() => onNavigate(item.id)}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, fontSize: 11, fontWeight: 600, color: "#9a9a9a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12, paddingLeft: 4 }}>General</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {generalItems.map(item => (
          <div key={item.id} style={itemStyle(active === item.id)} onClick={() => onNavigate(item.id)}>
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto", background: "#1B4332", borderRadius: 14, padding: 16, color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <IconSmartphone size={18} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Connect TTGO</span>
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 12, lineHeight: 1.4 }}>Link your ESP32 device to push live sensor data.</p>
        <button style={{
          width: "100%", padding: "8px 0", borderRadius: 8, border: "none",
          background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
        }}><IconDownload size={14} /> Connect</button>
      </div>
    </div>
  );
}

function TopBar({ notifications, onMarkAllRead, unreadCount }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifColors = {
    optimal: "#40916C",
    alert: "#E24B4A",
    threshold: "#D4A373",
    harvest: "#8A2BE2",
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 24px", background: COLORS.card, borderRadius: 16,
      marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
        <IconSearch size={18} />
        <input type="text" placeholder="Search readings, beds, or tasks..." style={{
          border: "none", outline: "none", fontSize: 14, color: COLORS.text,
          width: 300, background: "transparent",
        }} />
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}`, padding: "4px 10px", borderRadius: 8 }}>
          <span style={{ fontSize: 10 }}>⌘</span> F
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <IconMail size={20} />
        </div>
        <div style={{ position: "relative", cursor: "pointer" }} ref={dropdownRef}>
          <div onClick={() => setShowDropdown(!showDropdown)}>
            <IconBell size={20} />
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: "#E24B4A", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{unreadCount}</span>
            )}
          </div>
          {showDropdown && (
            <div style={{
              position: "absolute", top: 36, right: -20, width: 360, background: COLORS.card,
              borderRadius: 16, border: `1px solid ${COLORS.border}`, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", zIndex: 100, padding: "16px", maxHeight: 420, overflow: "auto",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>Notifications</div>
                {unreadCount > 0 && (
                  <button onClick={onMarkAllRead} style={{ fontSize: 12, color: COLORS.primary, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>Mark all read</button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px 0", color: COLORS.textSecondary, fontSize: 13 }}>No notifications yet</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {notifications.map((n, i) => (
                    <div key={n.id} style={{
                      padding: "10px 12px", borderRadius: 10, background: n.read ? "transparent" : "#F8F9F6",
                      border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "flex-start", gap: 10,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: notifColors[n.type] || COLORS.primary, marginTop: 4, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{n.message}</div>
                        <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 2 }}>{n.timestamp.toLocaleTimeString()}</div>
                      </div>
                      {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primary, flexShrink: 0 }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, borderLeft: `1px solid ${COLORS.border}`, paddingLeft: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#D4A373", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>M</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>Muturi W</div>
            <div style={{ fontSize: 11, color: COLORS.textSecondary }}>muturi@blackgold.io</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SensorCard({ label, value, unit, status, icon, color }) {
  const meta = STATUS_META[status] || STATUS_META.warn;
  return (
    <div style={{
      background: COLORS.card, borderRadius: 16, padding: "20px",
      border: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", gap: 8,
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.textSecondary }}>{label}</span>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", background: color + "15",
          display: "flex", alignItems: "center", justifyContent: "center", color: color, fontSize: 16,
        }}>{icon}</div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, color: COLORS.text }}>{value}<span style={{ fontSize: 14, color: COLORS.textSecondary, marginLeft: 3 }}>{unit}</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: meta.color, background: meta.bg, padding: "2px 8px", borderRadius: 6 }}>{meta.label}</span>
      </div>
    </div>
  );
}

function AnalyticsChart({ data }) {
  return (
    <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 16 }}>Sensor Analytics</div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="25%">
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: COLORS.textSecondary }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: COLORS.textSecondary }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ fontSize: 12, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8 }} />
          <Bar dataKey="temp" name="Temp (°C)" fill={COLORS.primary} radius={[10, 10, 10, 10]} barSize={24} />
          <Bar dataKey="humidity" name="Humidity (%)" fill={COLORS.accentLight} radius={[10, 10, 10, 10]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 8, fontSize: 12, color: COLORS.textSecondary }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 4, background: COLORS.primary }} />Temperature
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 4, background: COLORS.accentLight }} />Humidity
        </div>
      </div>
    </div>
  );
}

function RemindersCard() {
  return (
    <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 16 }}>Reminders</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {REMINDERS.map((r, i) => (
          <div key={i}>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{r.title}</div>
            <div style={{ fontSize: 12, color: COLORS.textSecondary, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ display: "inline-flex", verticalAlign: "middle" }}><IconClock size={12} /></span> {r.time}
            </div>
          </div>
        ))}
      </div>
      <button style={{
        width: "100%", marginTop: 16, padding: "10px 0", borderRadius: 10, border: "none",
        background: COLORS.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}><IconVideo size={16} /> Start Feeding</button>
    </div>
  );
}

function BedListCard() {
  const bed = THE_BED;
  const status = bed.pct >= 80 ? "optimal" : bed.pct >= 50 ? "warn" : "bad";
  const meta = STATUS_META[status];
  return (
    <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>Bed Status</div>
        <span style={{ fontSize: 11, fontWeight: 600, color: meta.color, background: meta.bg, padding: "2px 8px", borderRadius: 6 }}>{meta.label}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
          <span style={{ fontSize: 16 }}>🟢</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{bed.name}</div>
            <div style={{ fontSize: 11, color: COLORS.textSecondary }}>Due: {bed.due}</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>{bed.pct}%</span>
        </div>
        <div style={{ background: COLORS.bg, borderRadius: 6, height: 8, overflow: "hidden" }}>
          <div style={{ width: `${bed.pct}%`, background: meta.dot, height: 8, borderRadius: 6, transition: "width 0.6s ease" }} />
        </div>
      </div>
    </div>
  );
}

function ProgressGauge() {
  const avg = THE_BED.pct;
  const data = [
    { name: "Ready", value: avg, color: COLORS.primary },
    { name: "Remaining", value: 100 - avg, color: "#E8E8E3" },
  ];
  return (
    <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 12 }}>Harvest Readiness</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={data} cx="50%" cy="70%" startAngle={180} endAngle={0} innerRadius={50} outerRadius={80} dataKey="value" stroke="none" cornerRadius={6}>
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ textAlign: "center", marginTop: -40 }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text }}>{avg}%</div>
        <div style={{ fontSize: 12, color: COLORS.textSecondary }}>Bed Readiness</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16, fontSize: 11, color: COLORS.textSecondary }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primary }} />Ready
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.chartDarkGreen }} />Maturing
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8E8E3" }} />Early
        </div>
      </div>
    </div>
  );
}

function SystemStatusCard({ lastUpdated }) {
  const uptime = lastUpdated ? Math.floor((Date.now() - lastUpdated.getTime()) / 1000) : 0;
  const hours = Math.floor(uptime / 3600).toString().padStart(2, "0");
  const mins = Math.floor((uptime % 3600) / 60).toString().padStart(2, "0");
  const secs = (uptime % 60).toString().padStart(2, "0");

  return (
    <div style={{ background: "#1B4332", borderRadius: 16, padding: "20px", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
      <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>System Uptime</div>
        <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>{hours}:{mins}:{secs}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Since last data refresh</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><IconPause size={18} /></button>
          <button style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><IconStop size={18} /></button>
        </div>
      </div>
    </div>
  );
}

function LineChartCard({ title, data, dataKey, color, domain, name }) {
  return (
    <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
      <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>{title}</div>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: COLORS.textSecondary }} />
          <YAxis domain={domain} tick={{ fontSize: 11, fill: COLORS.textSecondary }} />
          <Tooltip contentStyle={{ fontSize: 12, background: COLORS.card, border: `1px solid ${COLORS.border}` }} />
          <Area type="monotone" dataKey={dataKey} name={name} stroke={color} fill={`url(#grad-${dataKey})`} strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// =================== PAGE COMPONENTS ===================

function PageHeader({ title, subtitle, actions }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 4 }}>{title}</h1>
        <p style={{ fontSize: 13, color: COLORS.textSecondary, margin: 0 }}>{subtitle}</p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>{actions}</div>
    </div>
  );
}

function DashboardPage({ readings, lastUpdated, chartData, weekData, latest, settings }) {
  const tStat = tempStatus(latest?.temperature, settings);
  const hStat = humStatus(latest?.humidity, settings);
  const mStat = moistStatus(latest?.moisture_percent, settings);
  const pStat = phStatus(latest?.ph_value, settings);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor, analyze, and optimize your vermiculture bed with ease."
        actions={<>
          <button style={{ padding: "10px 20px", borderRadius: 24, border: "none", background: COLORS.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><IconPlus size={14} /> Add Reading</button>
          <button style={{ padding: "10px 20px", borderRadius: 24, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.text, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Export Data</button>
        </>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <SensorCard label="Temperature" value={latest?.temperature ?? "—"} unit="°C" status={tStat} icon="🌡" color={COLORS.red} />
        <SensorCard label="Humidity" value={latest?.humidity ?? "—"} unit="%" status={hStat} icon="💧" color={COLORS.blue} />
        <SensorCard label="Soil Moisture" value={latest?.moisture_percent != null ? Math.round(latest.moisture_percent) : "—"} unit="%" status={mStat} icon="🌱" color={COLORS.chartGreen} />
        <SensorCard label="pH Level" value={latest?.ph_value != null ? Number(latest.ph_value).toFixed(2) : "—"} unit="" status={pStat} icon="🧪" color={COLORS.purple} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        <AnalyticsChart data={weekData} />
        <RemindersCard />
        <BedListCard />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 16 }}>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 12 }}>Recent Readings</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {readings.slice(-5).reverse().map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${COLORS.border}` : "none" }}>
                <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{r.timestamp ? new Date(r.timestamp).toLocaleTimeString() : "—"}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: COLORS.text }}>
                  <span>{r.temperature}°C</span>
                  <span>{r.humidity}%</span>
                  <span>{Math.round(r.moisture_percent)}%</span>
                  <span>{r.ph_value?.toFixed?.(2) ?? "—"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProgressGauge />
        <SystemStatusCard lastUpdated={lastUpdated} />
      </div>
      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 12 }}>Live Sensor Trends</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <LineChartCard title="Temperature" data={chartData} dataKey="temp" color={COLORS.red} domain={[0, 40]} name="Temp (°C)" />
          <LineChartCard title="Soil Moisture" data={chartData} dataKey="moisture" color={COLORS.chartGreen} domain={[0, 100]} name="Moisture (%)" />
          <LineChartCard title="pH Trend" data={chartData} dataKey="ph" color={COLORS.purple} domain={[0, 14]} name="pH" />
        </div>
      </div>
      <div style={{ marginTop: 24, padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", fontSize: 12, color: COLORS.textSecondary }}>
        <div>🪱 Muturi's Black Gold · ICS 4111 Group 4E</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#639922", display: "inline-block", animation: "pulse 2s infinite" }} />
          Updated {lastUpdated?.toLocaleTimeString()}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </>
  );
}

function BedsPage({ latest, settings }) {
  const tStat = tempStatus(latest?.temperature, settings);
  const hStat = humStatus(latest?.humidity, settings);
  const mStat = moistStatus(latest?.moisture_percent, settings);
  const pStat = phStatus(latest?.ph_value, settings);
  const bed = THE_BED;
  const readiness = bed.pct >= 80 ? "optimal" : bed.pct >= 50 ? "warn" : "bad";
  const rMeta = STATUS_META[readiness];

  return (
    <>
      <PageHeader
        title="Vermiculture Bed"
        subtitle="Monitor the single vermiculture bed sensor readings."
        actions={<>
          <button style={{ padding: "10px 20px", borderRadius: 24, border: "none", background: COLORS.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><IconPlus size={14} /> Add Reading</button>
        </>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <SensorCard label="Temperature" value={latest?.temperature ?? "—"} unit="°C" status={tStat} icon="🌡" color={COLORS.red} />
        <SensorCard label="Humidity" value={latest?.humidity ?? "—"} unit="%" status={hStat} icon="💧" color={COLORS.blue} />
        <SensorCard label="Soil Moisture" value={latest?.moisture_percent != null ? Math.round(latest.moisture_percent) : "—"} unit="%" status={mStat} icon="🌱" color={COLORS.chartGreen} />
        <SensorCard label="pH Level" value={latest?.ph_value != null ? Number(latest.ph_value).toFixed(2) : "—"} unit="" status={pStat} icon="🧪" color={COLORS.purple} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "24px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginBottom: 16 }}>{bed.name}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: COLORS.textSecondary, marginBottom: 6 }}>
                <span>Harvest Readiness</span>
                <span style={{ fontWeight: 600, color: COLORS.text }}>{bed.pct}%</span>
              </div>
              <div style={{ background: COLORS.bg, borderRadius: 6, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${bed.pct}%`, background: rMeta.dot, height: 8, borderRadius: 6, transition: "width 0.6s ease" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              <div style={{ background: COLORS.bg, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>ESTIMATED HARVEST</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>{bed.due}</div>
              </div>
              <div style={{ background: COLORS.bg, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 4 }}>STATUS</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: rMeta.color }}>{rMeta.label}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "24px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginBottom: 16 }}>Bed Health</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Temperature", val: `${latest?.temperature ?? "—"}°C`, status: tStat },
              { label: "Humidity", val: `${latest?.humidity ?? "—"}%`, status: hStat },
              { label: "Soil Moisture", val: `${latest?.moisture_percent != null ? Math.round(latest.moisture_percent) : "—"}%`, status: mStat },
              { label: "pH Level", val: latest?.ph_value != null ? Number(latest.ph_value).toFixed(2) : "—", status: pStat },
            ].map((item, i) => {
              const meta = STATUS_META[item.status] || STATUS_META.warn;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none" }}>
                  <div style={{ fontSize: 14, color: COLORS.text }}>{item.label}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{item.val}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: meta.color, background: meta.bg, padding: "2px 8px", borderRadius: 6 }}>{meta.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function CalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const eventTypeColors = { feeding: "#40916C", harvest: "#D4A373", check: "#378ADD", meeting: "#8A2BE2", maintenance: "#E24B4A" };

  return (
    <>
      <PageHeader
        title="Calendar"
        subtitle={`${monthNames[month]} ${year} — Schedule and manage your vermiculture tasks.`}
        actions={<>
          <button style={{ padding: "10px 20px", borderRadius: 24, border: "none", background: COLORS.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><IconPlus size={14} /> Add Event</button>
          <a href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noreferrer" style={{ padding: "10px 20px", borderRadius: 24, border: `1px solid ${COLORS.border}`, background: "transparent", color: COLORS.text, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}><IconExternalLink size={14} /> Google Calendar</a>
        </>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: 24 }}>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "24px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>{monthNames[month]} {year}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "transparent", cursor: "pointer" }}>‹</button>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: "transparent", cursor: "pointer" }}>›</button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 8 }}>
            {days.map(d => <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: COLORS.textSecondary, padding: "8px 0" }}>{d}</div>)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
            {calendarDays.map((d, i) => {
              const event = CALENDAR_EVENTS.find(e => e.day === d);
              const isToday = d === today.getDate();
              return (
                <div key={i} style={{
                  aspectRatio: "1", borderRadius: 10, padding: 8,
                  background: isToday ? COLORS.primary : "transparent",
                  color: isToday ? "#fff" : COLORS.text,
                  border: isToday ? "none" : `1px solid ${COLORS.border}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  position: "relative", fontSize: 14, fontWeight: 500, cursor: "pointer",
                }}>
                  {d}
                  {event && (
                    <div style={{ position: "absolute", bottom: 6, width: 6, height: 6, borderRadius: "50%", background: eventTypeColors[event.type] || COLORS.primary }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 16 }}>Upcoming Events</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CALENDAR_EVENTS.map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < CALENDAR_EVENTS.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: eventTypeColors[e.type] || COLORS.primary, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{e.title}</div>
                    <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{monthNames[month]} {e.day}, {year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 16 }}>Legend</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(eventTypeColors).map(([type, color]) => (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                  <span style={{ fontSize: 12, color: COLORS.textSecondary, textTransform: "capitalize" }}>{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AnalyticsPage({ readings, chartData }) {
  const weekData = [
    { day: "S", temp: 21, humidity: 62, moisture: 55, ph: 6.8 },
    { day: "M", temp: 22, humidity: 65, moisture: 60, ph: 7.0 },
    { day: "T", temp: 24, humidity: 70, moisture: 68, ph: 7.2 },
    { day: "W", temp: 23, humidity: 68, moisture: 65, ph: 6.9 },
    { day: "T", temp: 25, humidity: 72, moisture: 72, ph: 7.1 },
    { day: "F", temp: 22, humidity: 64, moisture: 58, ph: 6.7 },
    { day: "S", temp: 21, humidity: 60, moisture: 52, ph: 6.8 },
  ];

  const statusDistribution = [
    { name: "Optimal", value: readings.filter(r => r.temperature >= 15 && r.temperature <= 25 && r.humidity >= 60 && r.humidity <= 80).length, color: "#40916C" },
    { name: "Monitor", value: readings.filter(r => (r.temperature > 25 && r.temperature <= 30) || (r.humidity >= 50 && r.humidity < 60)).length, color: "#D4A373" },
    { name: "Critical", value: readings.filter(r => r.temperature > 30 || r.temperature < 15 || r.humidity < 50).length, color: "#E24B4A" },
  ];

  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Deep dive into sensor data and bed performance trends."
        actions={<>
          <button style={{ padding: "10px 20px", borderRadius: 24, border: "none", background: COLORS.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}><IconDownload size={14} /> Export Report</button>
        </>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 }}>AVG TEMPERATURE</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text }}>{readings.length ? (readings.reduce((a, r) => a + r.temperature, 0) / readings.length).toFixed(1) : "—"}°C</div>
        </div>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 }}>AVG HUMIDITY</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text }}>{readings.length ? (readings.reduce((a, r) => a + r.humidity, 0) / readings.length).toFixed(1) : "—"}%</div>
        </div>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginBottom: 12 }}>AVG MOISTURE</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text }}>{readings.length ? (readings.reduce((a, r) => a + r.moisture_percent, 0) / readings.length).toFixed(1) : "—"}%</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 16 }}>Weekly Sensor Overview</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: COLORS.textSecondary }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: COLORS.textSecondary }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="temp" name="Temp (°C)" fill={COLORS.red} radius={[8, 8, 0, 0]} barSize={20} />
              <Bar dataKey="humidity" name="Humidity (%)" fill={COLORS.blue} radius={[8, 8, 0, 0]} barSize={20} />
              <Bar dataKey="moisture" name="Moisture (%)" fill={COLORS.chartGreen} radius={[8, 8, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 16 }}>Status Distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none" cornerRadius={6}>
                {statusDistribution.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8, fontSize: 11, color: COLORS.textSecondary }}>
            {statusDistribution.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />{s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        <LineChartCard title="Temperature Trend" data={chartData} dataKey="temp" color={COLORS.red} domain={[0, 40]} name="Temp (°C)" />
        <LineChartCard title="Humidity Trend" data={chartData} dataKey="humidity" color={COLORS.blue} domain={[0, 100]} name="Humidity (%)" />
        <LineChartCard title="Soil Moisture Trend" data={chartData} dataKey="moisture" color={COLORS.chartGreen} domain={[0, 100]} name="Moisture (%)" />
        <LineChartCard title="pH Trend" data={chartData} dataKey="ph" color={COLORS.purple} domain={[0, 14]} name="pH" />
      </div>
    </>
  );
}

function SettingsPage({ settings, onSettingsChange }) {
  const [local, setLocal] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSettingsChange(local);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const row = (label, desc, children) => (
    <div style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 12, color: COLORS.textSecondary }}>{desc}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{children}</div>
    </div>
  );

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Configure your Muturi's Black Gold dashboard preferences."
        actions={<>
          <button onClick={handleSave} style={{ padding: "10px 20px", borderRadius: 24, border: "none", background: COLORS.primary, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            {saved ? <><IconCheck size={14} /> Saved</> : <><IconDownload size={14} /> Save Changes</>}
          </button>
        </>}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>
        {row("Temperature Alert Threshold", "Optimal range for vermiculture.", <>
          <input type="number" value={local.tempMin} onChange={e => setLocal({ ...local, tempMin: Number(e.target.value) })} style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, textAlign: "center" }} />
          <span style={{ color: COLORS.textSecondary }}>–</span>
          <input type="number" value={local.tempMax} onChange={e => setLocal({ ...local, tempMax: Number(e.target.value) })} style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, textAlign: "center" }} />
          <span style={{ fontSize: 13, color: COLORS.textSecondary }}>°C</span>
        </>)}
        {row("Humidity Alert Threshold", "Optimal range for worm beds.", <>
          <input type="number" value={local.humMin} onChange={e => setLocal({ ...local, humMin: Number(e.target.value) })} style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, textAlign: "center" }} />
          <span style={{ color: COLORS.textSecondary }}>–</span>
          <input type="number" value={local.humMax} onChange={e => setLocal({ ...local, humMax: Number(e.target.value) })} style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, textAlign: "center" }} />
          <span style={{ fontSize: 13, color: COLORS.textSecondary }}>%</span>
        </>)}
        {row("Moisture Alert Threshold", "Optimal range for soil moisture.", <>
          <input type="number" value={local.moistMin} onChange={e => setLocal({ ...local, moistMin: Number(e.target.value) })} style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, textAlign: "center" }} />
          <span style={{ color: COLORS.textSecondary }}>–</span>
          <input type="number" value={local.moistMax} onChange={e => setLocal({ ...local, moistMax: Number(e.target.value) })} style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, textAlign: "center" }} />
          <span style={{ fontSize: 13, color: COLORS.textSecondary }}>%</span>
        </>)}
        {row("pH Alert Threshold", "Optimal range for worm health.", <>
          <input type="number" step="0.1" value={local.phMin} onChange={e => setLocal({ ...local, phMin: Number(e.target.value) })} style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, textAlign: "center" }} />
          <span style={{ color: COLORS.textSecondary }}>–</span>
          <input type="number" step="0.1" value={local.phMax} onChange={e => setLocal({ ...local, phMax: Number(e.target.value) })} style={{ width: 50, padding: "6px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, textAlign: "center" }} />
          <span style={{ fontSize: 13, color: COLORS.textSecondary }}>pH</span>
        </>)}
        {row("Dashboard Refresh Rate", "How often sensor data is polled.", <>
          <select value={local.refreshRate} onChange={e => setLocal({ ...local, refreshRate: Number(e.target.value) })} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14 }}>
            <option value={5000}>5 seconds</option>
            <option value={10000}>10 seconds</option>
            <option value={30000}>30 seconds</option>
            <option value={60000}>1 minute</option>
          </select>
        </>)}
        {row("Notifications", "Receive alerts when readings go out of range.", <>
          <button onClick={() => setLocal({ ...local, notifications: !local.notifications })} style={{
            width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", position: "relative", background: local.notifications ? COLORS.primary : "#ccc", transition: "background 0.2s",
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: local.notifications ? 22 : 2, transition: "left 0.2s",
            }} />
          </button>
        </>)}
      </div>
    </>
  );
}

function HelpPage() {
  return (
    <>
      <PageHeader title="Help & Support" subtitle="Frequently asked questions and support resources." actions={null} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 700 }}>
        {[
          { q: "How do I connect my TTGO device?", a: "Make sure your ESP32 is flashed with the main_firebase.py script. It will automatically connect to WiFi and push readings to Firebase every 30 seconds." },
          { q: "What is the optimal temperature range?", a: "Vermiculture beds thrive at 15–25°C. Temperatures above 30°C or below 15°C can stress the worms." },
          { q: "How often should I check moisture levels?", a: "We recommend checking moisture daily. The ideal range is 60–80%. Below 50% requires immediate watering." },
          { q: "What pH level is best for worms?", a: "A neutral pH of 6.5–7.5 is ideal. Worms can tolerate slightly acidic conditions but avoid pH below 5.5." },
          { q: "How do I know when the bed is ready for harvest?", a: "The bed showing 80% or higher readiness is optimal for harvesting. This is calculated based on age, moisture, and temperature consistency." },
          { q: "My dashboard shows no data. What should I do?", a: "Check that your TTGO has WiFi connectivity and that the Firebase project ID and API key are correctly configured in the device script." },
        ].map((faq, i) => (
          <div key={i} style={{ background: COLORS.card, borderRadius: 16, padding: "20px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text, marginBottom: 8 }}>{faq.q}</div>
            <div style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.5 }}>{faq.a}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// =================== NOTIFICATION GENERATOR ===================
function generateNotifications(latest, prev, settings, existing) {
  if (!latest || !settings.notifications) return existing;
  const newNotifs = [];
  const now = new Date();
  const idBase = now.getTime();

  const check = (val, min, max, name, unit) => {
    const prevVal = prev ? prev[name.toLowerCase().replace(" ", "_") === "soil_moisture" ? "moisture_percent" : name.toLowerCase()] : null;
    if (val > max && (!prevVal || prevVal <= max)) {
      newNotifs.push({ id: `${name}-high-${idBase}`, type: "alert", message: `${name} high: ${val}${unit} (max ${max}${unit})`, timestamp: now, read: false });
    } else if (val < min && (!prevVal || prevVal >= min)) {
      newNotifs.push({ id: `${name}-low-${idBase}`, type: "alert", message: `${name} low: ${val}${unit} (min ${min}${unit})`, timestamp: now, read: false });
    } else if (val >= min && val <= max && prevVal && (prevVal > max || prevVal < min)) {
      newNotifs.push({ id: `${name}-optimal-${idBase}`, type: "optimal", message: `${name} back to optimal: ${val}${unit}`, timestamp: now, read: false });
    }
  };

  check(latest.temperature, settings.tempMin, settings.tempMax, "Temperature", "°C");
  check(latest.humidity, settings.humMin, settings.humMax, "Humidity", "%");
  check(latest.moisture_percent, settings.moistMin, settings.moistMax, "Soil Moisture", "%");
  check(latest.ph_value, settings.phMin, settings.phMax, "pH", "");

  if (THE_BED.pct >= 80) {
    const alreadyHarvest = existing.some(n => n.type === "harvest");
    if (!alreadyHarvest) {
      newNotifs.push({ id: `harvest-${idBase}`, type: "harvest", message: "Bed is ready for harvest! Readiness: " + THE_BED.pct + "%", timestamp: now, read: false });
    }
  }

  return [...newNotifs, ...existing].slice(0, 50);
}

// =================== MAIN DASHBOARD ===================
export default function VermicultureDashboard() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    tempMin: 15, tempMax: 25,
    humMin: 60, humMax: 80,
    moistMin: 60, moistMax: 80,
    phMin: 6.5, phMax: 7.5,
    refreshRate: 10000,
    notifications: true,
  });
  const pollRef = useRef(null);
  const prevReadingRef = useRef(null);

  const loadData = async () => {
    try {
      const data = await fetchReadings(20);
      if (data.length === 0) throw new Error("No data");
      const prev = prevReadingRef.current;
      const latest = data[data.length - 1];
      prevReadingRef.current = latest;
      setReadings(data);
      setError(null);
      setNotifications(prevNotifs => generateNotifications(latest, prev, settings, prevNotifs));
    } catch (e) {
      console.warn("Firebase error:", e.message);
      setError(e.message);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  useEffect(() => {
    loadData();
    return () => clearInterval(pollRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(loadData, settings.refreshRate);
    return () => clearInterval(pollRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.refreshRate]);

  const chartData = readings.map((r, i) => ({
    name: `R${i + 1}`,
    temp: r.temperature,
    humidity: r.humidity,
    moisture: Math.round(r.moisture_percent),
    ph: r.ph_value ? Number(r.ph_value.toFixed(2)) : null,
  }));

  const weekData = [
    { day: "S", temp: 21, humidity: 62 },
    { day: "M", temp: 22, humidity: 65 },
    { day: "T", temp: 24, humidity: 70 },
    { day: "W", temp: 23, humidity: 68 },
    { day: "T", temp: 25, humidity: 72 },
    { day: "F", temp: 22, humidity: 64 },
    { day: "S", temp: 21, humidity: 60 },
  ];

  const latest = readings[readings.length - 1];
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  if (loading) return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: COLORS.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🪱</div>
        <div style={{ fontSize: 14, color: COLORS.textSecondary }}>Loading sensor data…</div>
      </div>
    </div>
  );

  if (error || readings.length === 0) return (
    <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: COLORS.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📡</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>No data yet</div>
        <div style={{ fontSize: 13, color: COLORS.textSecondary }}>Waiting for your TTGO to push readings to Firebase…</div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage readings={readings} lastUpdated={lastUpdated} chartData={chartData} weekData={weekData} latest={latest} settings={settings} />;
      case "beds":
        return <BedsPage latest={latest} settings={settings} />;
      case "calendar":
        return <CalendarPage />;
      case "analytics":
        return <AnalyticsPage readings={readings} chartData={chartData} />;
      case "settings":
        return <SettingsPage settings={settings} onSettingsChange={setSettings} />;
      case "help":
        return <HelpPage />;
      default:
        return <DashboardPage readings={readings} lastUpdated={lastUpdated} chartData={chartData} weekData={weekData} latest={latest} settings={settings} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg, fontFamily: "system-ui, -apple-system, sans-serif", color: COLORS.text }}>
      <Sidebar active={currentPage} onNavigate={setCurrentPage} />
      <div style={{ flex: 1, padding: "24px 28px", overflow: "auto" }}>
        <TopBar notifications={notifications} onMarkAllRead={handleMarkAllRead} unreadCount={unreadCount} />
        {renderPage()}
      </div>
    </div>
  );
}
