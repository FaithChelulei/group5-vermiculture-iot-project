import network
import urequests
import ujson
from machine import Pin, ADC
import dht
import time

WIFI_SSID = "GROUP5"
WIFI_PASSWORD = "70607060"

FIREBASE_PROJECT_ID = "internetofthings-26312"
FIREBASE_API_KEY = "AIzaSyBSWR_5mZqJVREUxSesooHKZ7g2FBQXQKs"

FIRESTORE_URL = (
    "https://firestore.googleapis.com/v1/projects/"
    + FIREBASE_PROJECT_ID
    + "/databases/(default)/documents/readings?key="
    + FIREBASE_API_KEY
)

dht_sensor = dht.DHT22(Pin(4))

moisture_sensor = ADC(Pin(32))
moisture_sensor.atten(ADC.ATTN_11DB)
moisture_sensor.width(ADC.WIDTH_10BIT)

ph_sensor = ADC(Pin(33))
ph_sensor.atten(ADC.ATTN_11DB)
ph_sensor.width(ADC.WIDTH_10BIT)

green_led = Pin(14, Pin.OUT)
red_led = Pin(13, Pin.OUT)
blue_led = Pin(25, Pin.OUT)

red_led.value(0)
green_led.value(0)
blue_led.value(0)

AIR_VAL = 820
WATER_VAL = 400

PH_7_RAW = 512
VOLTS_PER_PH = 0.18
INTERVAL = 30

def connect_wifi():
    wlan = network.WLAN(network.STA_IF)

    try:
        wlan.disconnect()
    except:
        pass

    wlan.active(False)
    time.sleep(1)

    wlan.active(True)
    time.sleep(2)

    if not wlan.isconnected():
        print("Connecting to WiFi...")

        wlan.connect(WIFI_SSID, WIFI_PASSWORD)

        timeout = 20

        while not wlan.isconnected() and timeout > 0:
            print(".", end="")
            time.sleep(1)
            timeout -= 1

        print()

    if wlan.isconnected():
        print("WiFi connected:", wlan.ifconfig()[0])
        return True

    print("WiFi connection failed")
    return False

def get_iso_timestamp():
    t = time.localtime()

    return "{:04d}-{:02d}-{:02d}T{:02d}:{:02d}:{:02d}Z".format(
        t[0], t[1], t[2],
        t[3], t[4], t[5]
    )

def push_to_firestore(temp, hum, moisture_raw,
                      moisture_percent, ph_raw,
                      ph_value, status):

    payload = {
        "fields": {
            "temperature": {
                "doubleValue": float(temp)
            },
            "humidity": {
                "doubleValue": float(hum)
            },
            "moisture_raw": {
                "integerValue": str(moisture_raw)
            },
            "moisture_percent": {
                "doubleValue": float(moisture_percent)
            },
            "ph_raw": {
                "integerValue": str(ph_raw)
            },
            "ph_value": {
                "doubleValue": float(ph_value)
            },
            "led_status": {
                "stringValue": status
            },
            "alert": {
                "booleanValue": status == "alert"
            },
            "timestamp": {
                "timestampValue": get_iso_timestamp()
            },
            "device_id": {
                "stringValue": "ttgo-group4e"
            }
        }
    }

    try:
        print("Sending data to Firestore...")

        response = urequests.post(
            FIRESTORE_URL,
            headers={"Content-Type": "application/json"},
            data=ujson.dumps(payload)
        )

        print("Response Code:", response.status_code)

        if response.status_code in [200, 201]:
            print("✓ Firestore push successful")
        else:
            print("Firestore Error:")
            print(response.status_code)
            print(response.text)

        response.close()

    except Exception as e:
        print("Push failed:", e)

        try:
            wlan = network.WLAN(network.STA_IF)
            wlan.disconnect()
        except:
            pass

print("System Initialized. Starting complete vermiculture data collection...")
print("--------------------------------------------------")

wifi_ok = connect_wifi()
last_push = 0

while True:

    try:
        dht_sensor.measure()

        temp = dht_sensor.temperature()
        hum = dht_sensor.humidity()

        moisture_raw = moisture_sensor.read()
        ph_raw = ph_sensor.read()

        numerator = AIR_VAL - moisture_raw
        denominator = AIR_VAL - WATER_VAL

        if denominator == 0:
            denominator = 1

        moisture_percent = (numerator / denominator) * 100

        if moisture_percent < 0:
            moisture_percent = 0

        if moisture_percent > 100:
            moisture_percent = 100

        ph_voltage = (ph_raw / 1023.0) * 3.3
        neutral_voltage = (PH_7_RAW / 1023.0) * 3.3

        ph_value = 7.0 + (
            (neutral_voltage - ph_voltage)
            / VOLTS_PER_PH
        )

        if ph_value < 0:
            ph_value = 0

        if ph_value > 14:
            ph_value = 14

        print("TEMP:", temp, "C")
        print("HUMIDITY:", hum, "%")
        print("MOISTURE:", round(moisture_percent, 2),
              "% (Raw:", moisture_raw, ")")
        print("pH VALUE:", round(ph_value, 2),
              "(Raw:", ph_raw, ")")

        if (temp > 30 or temp < 10 or
            moisture_percent < 50 or
            moisture_percent > 85 or
            ph_value < 5.5 or
            ph_value > 8.5):

            status = "alert"

            red_led.value(1)
            green_led.value(0)
            blue_led.value(0)

            print("STATUS: ALERT! Severe conditions.")

        elif ((15 <= temp <= 25) and
              (60 <= moisture_percent <= 80) and
              (6.5 <= ph_value <= 7.5)):

            status = "optimal"

            red_led.value(0)
            green_led.value(1)
            blue_led.value(0)

            print("STATUS: Optimal operations. LED -> SOLID GREEN")

        else:
            status = "warning"

            red_led.value(1)
            green_led.value(0)
            blue_led.value(1)

            print("STATUS: Warning. Conditions drifting. LED -> PURPLE")

        print("-------------------------")

        now = time.time()

        if (now - last_push) >= INTERVAL:

            wlan = network.WLAN(network.STA_IF)

            if not wlan.isconnected():
                print("WiFi lost. Reconnecting...")
                wifi_ok = connect_wifi()

            if wifi_ok:
                push_to_firestore(
                    temp,
                    hum,
                    moisture_raw,
                    moisture_percent,
                    ph_raw,
                    ph_value,
                    status
                )

            last_push = now

        time.sleep(2)

    except Exception as e:
        print("Error encountered:", e)

        red_led.value(0)
        green_led.value(0)
        blue_led.value(0)

        time.sleep(2)
