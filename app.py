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
    hx.reset()
    hx.tare()  # Tare the scale to zero

    # Retry to get a valid zero offset
    retries = 10
    zero_offset = None
    for _ in range(retries):
        raw_value = hx.get_raw_data_mean()
        if raw_value is not None and raw_value != 8388607:
            zero_offset = raw_value
            break
        logging.warning("Invalid data detected during initialization. Retrying...")
        time.sleep(0.1)

    if zero_offset is None:
        raise ValueError("Failed to initialize HX711: Invalid readings from the sensor.")

    calibration_factor = 102.372  # Adjust based on your calibration
    hx.set_scale_ratio(calibration_factor)
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
                valid_data = False
                retries = 10
                for _ in range(retries):
                    start_time = time.time()
                    raw_data = hx.get_raw_data_mean()
                    elapsed_time = time.time() - start_time
                    if raw_data is not None and raw_data != 8388607:
                        valid_data = True
                        break
                    logging.warning(f"Invalid data received. Retrying... (Elapsed: {elapsed_time:.6f}s)")
                    time.sleep(0.1)

                if valid_data:
                    weight = (raw_data - zero_offset) / calibration_factor
                    current_weight = round(weight, 2)
                    logging.info(f"Updated weight: {current_weight} kg")
                else:
                    logging.warning("Failed to get a valid reading after retries.")
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
