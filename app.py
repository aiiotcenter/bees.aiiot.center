from flask import Flask, jsonify
import RPi.GPIO as GPIO
import adafruit_dht
import board
import time
import requests
import threading
import logging
from hx711 import HX711

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)

# Initialize DHT11 (Temperature and Humidity sensor) on GPIO2
try:
    logging.info("Initializing DHT11 sensor on GPIO2")
    dht_device = adafruit_dht.DHT11(board.D2)
except Exception as e:
    logging.error(f"Error initializing DHT11: {e}")

# Pin configuration
SOUND = 3
TRIG = 17
ECHO = 27
LIGHT = 4

# GPIO setup
logging.info("Setting up GPIO pins")
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(SOUND, GPIO.IN)
GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)
GPIO.setup(LIGHT, GPIO.IN)

# Initialize HX711 for weight measurement
try:
    logging.info("Initializing HX711 on GPIO 9 and 10")
    hx = HX711(dout_pin=9, pd_sck_pin=10)
except Exception as e:
    logging.error(f"Error initializing HX711: {e}")

# Calibration factor for the load cell (adjust based on calibration)
calibration_factor = 102.372
zero_offset = 0

# Retry decorator for sensor reading functions
def retry(times, delay=0.2):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                result = func(*args, **kwargs)
                if result is not None:
                    return result
                logging.warning(f"Retrying {func.__name__} (Attempt {attempt + 1}/{times})")
                time.sleep(delay)
            logging.error(f"{func.__name__} failed after {times} attempts.")
            return None
        return wrapper
    return decorator

# Function to tare (zero) the scale manually
def tare_scale():
    global zero_offset
    try:
        logging.info("Taring the scale... Please ensure the scale is empty.")
        time.sleep(2)  # Allow time for stabilization
        hx.reset()  # Reset HX711
        raw_readings = [hx.read() for _ in range(10) if hx.read() is not None]
        if raw_readings:
            zero_offset = sum(raw_readings) / len(raw_readings)
            logging.info(f"Scale tared successfully. Zero offset: {zero_offset}")
        else:
            raise ValueError("Failed to get valid readings during taring.")
    except Exception as e:
        logging.error(f"Error during tare: {e}")

# Function to get weight measurement from HX711
@retry(times=5)
def get_weight():
    try:
        raw_value = hx.read()
        if raw_value is None:
            raise ValueError("Failed to get data from HX711")
        weight = (raw_value - zero_offset) / calibration_factor
        return round(weight / 1000, 3)  # Convert to kg and round
    except Exception as e:
        logging.error(f"Error getting weight: {e}")
        return None

# Function to get distance from the ultrasonic sensor
@retry(times=5)
def get_distance():
    try:
        GPIO.output(TRIG, False)
        time.sleep(0.000002)
        GPIO.output(TRIG, True)
        time.sleep(0.00001)
        GPIO.output(TRIG, False)

        start_time = time.time()
        while GPIO.input(ECHO) == 0:
            if time.time() - start_time > 1:
                raise TimeoutError("Ultrasonic sensor timeout while waiting for pulse start.")
        pulse_start = time.time()

        while GPIO.input(ECHO) == 1:
            if time.time() - pulse_start > 1:
                raise TimeoutError("Ultrasonic sensor timeout while waiting for pulse end.")
        pulse_end = time.time()

        pulse_duration = pulse_end - pulse_start
        distance = (pulse_duration * 34300) / 2  # cm
        return round(distance, 1)
    except Exception as e:
        logging.error(f"Error getting distance: {e}")
        return None

# Function to read temperature and humidity from DHT11
@retry(times=5)
def temperature_humidity():
    try:
        temperature = dht_device.temperature
        humidity = dht_device.humidity
        return {"temperature": temperature, "humidity": humidity, "success": True}
    except RuntimeError as error:
        logging.error(f"Error reading DHT11: {error}")
        return {"error": str(error), "success": False}

# Function to check if bees are alive using the sound sensor
def is_bee_alive():
    try:
        return GPIO.input(SOUND) == 0
    except Exception as e:
        logging.error(f"Error checking bee sound sensor: {e}")
        return None

# Function to check if hive is open using the light sensor
def is_hive_open():
    try:
        return GPIO.input(LIGHT) == GPIO.HIGH
    except Exception as e:
        logging.error(f"Error checking hive light sensor: {e}")
        return None

# Function to send data to remote API endpoint
def send_data():
    while True:
        data = {
            "temperature_humidity": temperature_humidity(),
            "distance": get_distance(),
            "bees_alive": is_bee_alive(),
            "hive_open": is_hive_open(),
            "weight": get_weight()
        }

        try:
            logging.info("Sending data to remote API endpoint")
            response = requests.post('http://bees.aiiot.center/', json=data)
            if response.status_code == 200:
                logging.info(f'Data sent successfully: {response.json()}')
            else:
                logging.warning(f'Failed to send data: {response.status_code} - {response.text}')
        except Exception as e:
            logging.error(f"Error sending data: {e}")
        
        time.sleep(5)  # Wait 5 seconds before sending the next set of data

# Flask route to fetch sensor data as JSON
@app.route('/data', methods=['GET'])
def get_data():
    data = {
        "temperature_humidity": temperature_humidity(),
        "distance": get_distance(),
        "bees_alive": is_bee_alive(),
        "hive_open": is_hive_open(),
        "weight": get_weight()
    }
    logging.info(f"Providing sensor data via API: {data}")
    return jsonify(data)

# Main function to run the Flask server and tare the scale
if __name__ == '__main__':
    try:
        tare_scale()  # Tare the scale on startup
        data_thread = threading.Thread(target=send_data)
        data_thread.daemon = True  # Set thread as daemon to close with main program
        data_thread.start()
        
        logging.info("Starting Flask server")
        app.run(host='0.0.0.0', port=5000)
    finally:
        logging.info("Cleaning up GPIO pins")
        GPIO.cleanup()
