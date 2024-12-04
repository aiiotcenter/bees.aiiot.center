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
GPIO.setmode(GPIO.BCM)
HX711_DOUT = 9
HX711_SCK = 10

# Initialize HX711
try:
    logging.info(f"Initializing HX711 on GPIO DOUT={HX711_DOUT}, SCK={HX711_SCK}")
    hx = HX711(HX711_DOUT, HX711_SCK)
    hx.set_reading_format("MSB", "MSB")
    hx.tare()
    zero_offset = hx.read_long()  # Capture zero offset
    calibration_factor = 102.372
  # Adjust based on your calibration
    logging.info("HX711 initialized and tared successfully.")
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
                raw_value = hx.read_long()
                logging.debug(f"Raw HX711 reading: {raw_value}")
                if raw_value is not None:
                    weight = (raw_value - zero_offset) / calibration_factor
                    current_weight = round(weight, 2)
                    logging.info(f"Updated weight: {current_weight} kg")
                else:
                    logging.warning("HX711 returned None")
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