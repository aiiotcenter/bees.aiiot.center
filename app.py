from flask import Flask, jsonify
import RPi.GPIO as GPIO
import time
import logging
from hx711 import HX711  # Ensure you are using the compatible HX711 library

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)

# Pin configuration
SOUND = 3
TRIG = 17
ECHO = 27
LIGHT = 4

# HX711 Pins
HX711_DOUT = 9
HX711_SCK = 10

# Calibration factor for HX711
CALIBRATION_FACTOR = 102.372  # Adjust this based on calibration

# GPIO setup
logging.info("Setting up GPIO pins")
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(SOUND, GPIO.IN)
GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)
GPIO.setup(LIGHT, GPIO.IN)

# Initialize HX711
try:
    logging.info(f"Initializing HX711 on GPIO DOUT={HX711_DOUT}, SCK={HX711_SCK}")
    hx = HX711(dout_pin=HX711_DOUT, pd_sck_pin=HX711_SCK)
    hx.reset()
    hx.tare()  # Tare the scale to initialize the zero offset
    logging.info("HX711 initialized and tared successfully.")
except Exception as e:
    logging.error(f"Error initializing HX711: {e}")
    hx = None

# Function to get weight measurement from HX711
def get_weight():
    try:
        if hx is None:
            raise RuntimeError("HX711 not initialized")
        raw_value = hx.get_raw_data_mean()  # Get the raw average data
        logging.debug(f"Raw HX711 reading: {raw_value}")
        if raw_value is None:
            raise ValueError("Failed to get data from HX711")
        weight = raw_value / CALIBRATION_FACTOR  # Calculate the weight
        logging.debug(f"Calculated weight: {weight:.3f} kg")
        return round(weight, 3)  # Return the weight in kilograms
    except Exception as e:
        logging.error(f"Error getting weight: {e}")
        return None

# Function to check if bees are alive using the sound sensor
def is_bee_alive():
    try:
        state = GPIO.input(SOUND) == 0
        logging.debug(f"Bee sound sensor state: {state}")
        return state
    except Exception as e:
        logging.error(f"Error checking bee sound sensor: {e}")
        return None

# Function to check if hive is open using the light sensor
def is_hive_open():
    try:
        state = GPIO.input(LIGHT) == GPIO.HIGH
        logging.debug(f"Hive light sensor state: {state}")
        return state
    except Exception as e:
        logging.error(f"Error checking hive light sensor: {e}")
        return None

# Flask route to fetch live sensor data as JSON
@app.route('/data', methods=['GET'])
def get_data():
    data = {
        "weight": get_weight(),
        "bees_alive": is_bee_alive(),
        "hive_open": is_hive_open(),
    }
    logging.info(f"Providing live sensor data via API: {data}")
    return jsonify(data)

# Main function to run the Flask server
if __name__ == '__main__':
    try:
        logging.info("Starting application")
        # Test the sensors on startup
        logging.info("Testing HX711...")
        initial_weight = get_weight()
        logging.info(f"Initial weight reading: {initial_weight}")
        logging.info("Testing sound sensor...")
        initial_sound = is_bee_alive()
        logging.info(f"Initial sound sensor state: {initial_sound}")
        logging.info("Testing light sensor...")
        initial_light = is_hive_open()
        logging.info(f"Initial light sensor state: {initial_light}")

        # Start Flask server
        logging.info("Starting Flask server")
        app.run(host='0.0.0.0', port=5000)
    finally:
        logging.info("Cleaning up GPIO pins")
        GPIO.cleanup()
