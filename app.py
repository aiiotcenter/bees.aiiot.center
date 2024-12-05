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

    # Collect valid raw readings and calculate offset
    zero_offset = None
    retries = 10
    valid_readings = []

    for _ in range(retries):
        raw_value = hx.get_raw_data()
        if raw_value is not None and raw_value != 8388607:  # Ensure the data is valid
            valid_readings.append(raw_value)
        else:
            logging.warning("Invalid data during zero offset calculation. Retrying...")
            time.sleep(0.1)

    if valid_readings:
        zero_offset = sum(valid_readings) / len(valid_readings)
        logging.info(f"Zero offset calculated: {zero_offset}")
    else:
        raise ValueError("Failed to calculate zero offset: No valid readings.")

    calibration_factor = 102.372  # Adjust based on your calibration
    hx.set_scale_ratio(calibration_factor)
    logging.info(f"HX711 initialized. Calibration factor: {calibration_factor}")
except Exception as e:
    logging.error(f"Error initializing HX711: {e}")
    hx = None

# Variable to hold the latest weight reading
current_weight = None

# Moving average buffer
readings_buffer = deque(maxlen=10)  # Holds the last 10 readings

# Function to validate raw data
def validate_reading(raw_data):
    """Validate the raw data from the HX711."""
    if raw_data is None or raw_data == 8388607 or abs(raw_data) > 1e6:
        return None
    return raw_data

# Function to calculate moving average
def calculate_moving_average(new_value, buffer):
    """Update the moving average with a new value."""
    buffer.append(new_value)
    return sum(buffer) / len(buffer)

# Function to continuously update weight
def monitor_weight():
    global current_weight
    while True:
        try:
            if hx:
                retries = 10
                raw_data = None
                for _ in range(retries):
                    raw_data = hx.get_raw_data()
                    raw_data = validate_reading(raw_data)
                    if raw_data is not None:
                        break
                    logging.warning("Invalid data received. Retrying...")
                    time.sleep(0.2)

                if raw_data is not None:
                    weight = (raw_data - zero_offset) / calibration_factor
                    current_weight = round(calculate_moving_average(weight, readings_buffer), 2)
                    logging.info(f"Updated smoothed weight: {current_weight} kg")
                else:
                    logging.error("Failed to get valid reading after retries. Setting weight to None.")
                    current_weight = None
            time.sleep(1)  # Adjust the interval for reading weight
        except Exception as e:
            logging.error(f"Error reading weight: {e}")
            current_weight = None

# Flask route to return weight data
@app.route("/data", methods=["GET"])
def data():
    if current_weight is not None:
        return jsonify({"weight": current_weight})
    else:
        return jsonify({"error": "Sensor data unavailable"}), 503

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
