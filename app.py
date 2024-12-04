from flask import Flask, jsonify
import RPi.GPIO as GPIO
import adafruit_dht
import board
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
DHT_PIN = board.D2

# Initialize DHT11
try:
    logging.info("Initializing DHT11 sensor on GPIO2")
    dht_device = adafruit_dht.DHT11(DHT_PIN)
except Exception as e:
    logging.error(f"Error initializing DHT11: {e}")
    dht_device = None

# Initialize HX711
try:
    logging.info(f"Initializing HX711 on GPIO DOUT={HX711_DOUT}, SCK={HX711_SCK}")
    hx = HX711(HX711_DOUT, HX711_SCK)
    hx.reset()
    hx.tare()
    logging.info("HX711 initialized and tared successfully.")
except Exception as e:
    logging.error(f"Error initializing HX711: {e}")
    hx = None

# Get weight
def get_weight():
    try:
        if hx is None:
            raise ValueError("HX711 not initialized")
        raw_value = hx.read_average()
        logging.debug(f"Raw HX711 reading: {raw_value}")
        weight = raw_value / 1000  # Adjust scale as needed
        return round(weight, 2)
    except Exception as e:
        logging.error(f"Error getting weight: {e}")
        return None

# Get temperature and humidity
def get_temperature_humidity():
    try:
        if dht_device is None:
            raise RuntimeError("DHT11 not initialized")
        temperature = dht_device.temperature
        humidity = dht_device.humidity
        logging.debug(f"Temperature: {temperature}, Humidity: {humidity}")
        return {"temperature": temperature, "humidity": humidity}
    except RuntimeError as e:
        logging.error(f"Error reading DHT11: {e}")
        return {"error": str(e)}

# Flask route
@app.route("/data", methods=["GET"])
def data():
    sensor_data = {
        "temperature_humidity": get_temperature_humidity(),
        "weight": get_weight(),
    }
    logging.info(f"Providing sensor data: {sensor_data}")
    return jsonify(sensor_data)

# Main entry point
if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port=5000)
    finally:
        logging.info("Cleaning up GPIO")
        GPIO.cleanup()
