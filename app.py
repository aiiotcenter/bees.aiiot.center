from flask import Flask, jsonify
import RPi.GPIO as GPIO
import logging
from hx711 import HX711

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
    hx.tare()  # Tare the scale to set zero offset
    calibration_factor = 1000  # Set a default calibration factor (adjust this for your setup)
    logging.info("HX711 initialized and tared successfully.")
except Exception as e:
    logging.error(f"Error initializing HX711: {e}")
    hx = None

# Get weight
def get_weight():
    try:
        if hx is None:
            raise ValueError("HX711 not initialized")
        raw_value = hx.read_long()
        logging.debug(f"Raw HX711 reading: {raw_value}")
        if raw_value is None:
            raise ValueError("HX711 returned None")
        weight = raw_value / calibration_factor  # Adjust this calculation for your scale calibration
        logging.debug(f"Calculated weight: {weight} kg")
        return round(weight, 2)
    except Exception as e:
        logging.error(f"Error getting weight: {e}")
        return None

# Flask route
@app.route("/data", methods=["GET"])
def data():
    weight = get_weight()
    sensor_data = {
        "weight": weight,
    }
    logging.info(f"Providing sensor data: {sensor_data}")
    return jsonify(sensor_data)

# Main entry point
if __name__ == "__main__":
    try:
        logging.info("Starting application")
        # Test HX711 on startup
        logging.info("Testing HX711...")
        weight = get_weight()
        logging.info(f"Initial weight reading: {weight}")

        # Start Flask server
        app.run(host="0.0.0.0", port=5000)
    finally:
        logging.info("Cleaning up GPIO")
        GPIO.cleanup()
