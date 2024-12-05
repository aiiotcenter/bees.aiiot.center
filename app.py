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
    hx = HX711(dout_pin=HX711_DOUT, pd_sck_pin=HX711_SCK)

    # Reset and tare the scale
    hx.reset()
    hx.tare()

    # Get zero offset and initialize calibration
    zero_offset = hx.get_raw_data_mean()
    if zero_offset is None or zero_offset == 8388607:
        raise ValueError("Failed to initialize HX711: Invalid readings during zero offset calculation.")

    calibration_factor = 102.372  # Adjust based on calibration
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
                raw_data = hx.get_raw_data_mean()
                if raw_data is not None and raw_data != 8388607:
                    weight = (raw_data - zero_offset) / calibration_factor
                    current_weight = round(weight, 2)
                    logging.info(f"Updated weight: {current_weight} kg")
                else:
                    logging.warning("Invalid data received from HX711.")
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
