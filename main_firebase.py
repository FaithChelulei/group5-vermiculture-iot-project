import network
import urequests
import ujson
import time
import dht
from machine import ADC, Pin

WIFI_SSID     = "GROUP5"
WIFI_PASSWORD = "60706070"

FIREBASE_PROJECT_ID = "internetofthings-26312"
FIREBASE_API_KEY    = "AIzaSyBSWR_5mZqJVREUxSesooHKZ7g2FBQXQKs"
FIRESTORE_URL = (
    f"https://firestore.googleapis.com/v1/projects/"
    f"{FIREBASE_PROJECT_ID}/databases/(default)/documents/"
    f"readings?key={FIREBASE_API_KEY}"
)

DHT_PIN      = 4
MOISTURE_PIN = 15
DRY          = 620   
WET          = 280   
INTERVAL     = 30    

dht_sensor      = dht.DHT11(Pin(DHT_PIN))
moisture_sensor = ADC(Pin(MOISTURE_PIN))
moisture_sensor.atten(ADC.ATTN_11DB)
moisture_sensor.width(ADC.WIDTH_10BIT)

def connect_wifi():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print("Connecting to WiFi...")
        wlan.connect(WIFI_SSID, WIFI_PASSWORD)
        timeout = 20
        while not wlan.isconnected() and timeout > 0:
            time.sleep(1)
            timeout -= 1
    if wlan.isconnected():
        print("WiFi connected:", wlan.ifconfig()[0])
        return True
    print("WiFi connection failed")
    return False

def read_moisture_raw(samples=10):
    readings = [moisture_sensor.read() for _ in range(samples)]
    return sum(readings) // len(readings)

def raw_to_percent(raw):
    pct = (DRY - raw) * 100 / (DRY - WET)
    return round(max(0.0, min(100.0, pct)), 2)

def read_dht():
    for _ in range(3):
        try:
            dht_sensor.measure()
            return dht_sensor.temperature(), dht_sensor.humidity()
        except Exception as e:
            print("DHT error:", e)
            time.sleep(0.5)
    return None, None

def push_to_firestore(temp, humidity, moisture_raw, moisture_pct):
    """
    Posts a new document to the 'readings' Firestore collection.
    Firestore REST API uses a specific JSON structure for field types.
    """
    payload = {
        "fields": {
            "temperature":       {"doubleValue": temp},
            "humidity":          {"doubleValue": humidity},
            "moisture_raw":      {"integerValue": str(moisture_raw)},
            "moisture_percent":  {"doubleValue": moisture_pct},
            "timestamp":         {"timestampValue": get_iso_timestamp()},
            "device_id":         {"stringValue": "ttgo-group4e"},
        }
    }
    try:
        res = urequests.post(
            FIRESTORE_URL,
            headers={"Content-Type": "application/json"},
            data=ujson.dumps(payload),
            timeout=10
        )
        if res.status_code == 200:
            print("✓ Pushed to Firestore")
        else:
            print("✗ Firestore error:", res.status_code, res.text[:80])
        res.close()
    except Exception as e:
        print("✗ Push failed:", e)

def get_iso_timestamp():
    """Returns a simple ISO 8601 timestamp string from the device epoch."""
    t = time.localtime()
    return "{:04d}-{:02d}-{:02d}T{:02d}:{:02d}:{:02d}Z".format(
        t[0], t[1], t[2], t[3], t[4], t[5]
    )

def main():
    if not connect_wifi():
        print("No WiFi — running offline only")

    print("=== Sensor loop started ===")
    while True:
        temp, hum = read_dht()
        moisture_raw = read_moisture_raw()
        moisture_pct = raw_to_percent(moisture_raw)

        print(f"TEMP: {temp}°C | HUM: {hum}% | MOISTURE: {moisture_pct}% (raw: {moisture_raw})")

        if temp is not None:
            push_to_firestore(temp, hum, moisture_raw, moisture_pct)
        else:
            print("Skipping push — DHT read failed")

        time.sleep(INTERVAL)

main()
