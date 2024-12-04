from flask import Flask, jsonify
import RPi.GPIO as GPIO
import logging
from hx711 import HX711
import threading
import time

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
    hx = HX711(HX711_DOUT, HX711_SCK)

    # Tare the scale (if supported by the library)
    if hasattr(hx, 'tare'):
        hx.tare()
        logging.info("Scale tared successfully.")
    else:
        logging.warning("HX711 library does not support 'tare'. Skipping.")

    # Capture zero offset
    zero_offset = hx.get_raw_data_mean()
    if zero_offset is None:
        raise ValueError("Failed to get zero offset from HX711.")
    calibration_factor = 102.372  # Adjust based on your calibration
    logging.info(f"HX711 initialized. Zero offset: {zero_offset}, Calibration factor: {calibration_factor}")
except Exception as e:
    logging.error(f"Error initializing HX711: {e}")
    hx = None

# Variable to hold the latest weight reading
current_weight = None

# Function to continuously update weight
def monitor_weight():
    global current_weight
    while True:
        try:
            if hx:
                raw_value = hx.get_raw_data_mean()
                logging.debug(f"Raw HX711 reading: {raw_value}")
                if raw_value is not None:
                    weight = (raw_value - zero_offset) / calibration_factor
                    current_weight = round(weight, 2)
                    logging.info(f"Updated weight: {current_weight} kg")
                else:
                    logging.warning("HX711 returned None for weight reading.")
            time.sleep(1)  # Adjust the interval for reading weight
        except Exception as e:
            logging.error(f"Error reading weight: {e}")

# Flask route
@app.route("/data", methods=["GET"])
def data():
    return jsonify({"weight": current_weight})

# Main entry point
if __name__ == "__main__":
    try:
        logging.info("Starting application")
        # Start the weight monitoring thread
        monitor_thread = threading.Thread(target=monitor_weight, daemon=True)
        monitor_thread.start()

        # Start Flask server
        app.run(host="0.0.0.0", port=5000)
    finally:
        logging.info("Cleaning up GPIO")
        GPIO.cleanup()
