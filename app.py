from flask import Flask, jsonify
import RPi.GPIO as GPIO
import logging
from hx711 import HX711
import threading
import time
from collections import deque

# Logging configuration
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

# Flask app
app = Flask(__name__)

# GPIO Pins
GPIO.setwarnings(False)  # Suppress GPIO warnings
GPIO.setmode(GPIO.BCM)
HX711_DOUT = 9
HX711_SCK = 10

# Initialize HX711
try:
    logging.info(f"Initializing HX711 on GPIO DOUT={HX711_DOUT}, SCK={HX711_SCK}")
    hx = HX711(dout_pin=HX711_DOUT, pd_sck_pin=HX711_SCK)
    hx.reset()

    # Offset and calibration
    zero_offset = None
    valid_readings = []
    retries = 5

    for _ in range(retries):
        raw_data = hx.get_raw_data()
        if raw_data is not None and raw_data != 8388607:
            valid_readings.append(raw_data)
            time.sleep(0.1)

    if valid_readings:
        zero_offset = sum(valid_readings) / len(valid_readings)
        logging.info(f"Zero offset calculated: {zero_offset}")
    else:
        raise ValueError("No valid offset readings.")

    calibration_factor = 102.372
    hx.set_scale_ratio(calibration_factor)
    logging.info(f"HX711 initialized with calibration factor: {calibration_factor}")
except Exception as e:
    logging.error(f"Error initializing HX711: {e}")
    hx = None

# Weight readings
current_weight = None
buffer = deque(maxlen=10)

def monitor_weight():
    global current_weight
    while True:
        try:
            if hx:
                raw_data = hx.get_raw_data()
                if raw_data is not None and raw_data != 8388607:
                    weight = (raw_data - zero_offset) / calibration_factor
                    buffer.append(weight)
                    current_weight = round(sum(buffer) / len(buffer), 2)
                    logging.info(f"Current weight (smoothed): {current_weight} kg")
            time.sleep(0.5)
        except Exception as e:
            logging.error(f"Error reading weight: {e}")
            current_weight = None

# Flask route
@app.route("/data", methods=["GET"])
def data():
    if current_weight is not None:
        return jsonify({"weight": current_weight})
    else:
        return jsonify({"error": "Sensor data unavailable"}), 503

# Main
if __name__ == "__main__":
    try:
        logging.info("Starting application")
        weight_thread = threading.Thread(target=monitor_weight, daemon=True)
        weight_thread.start()
        app.run(host="0.0.0.0", port=5000)
    finally:
        logging.info("Cleaning up GPIO")
        GPIO.cleanup()
