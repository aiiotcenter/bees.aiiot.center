import requests
import random
import time
import RPi.GPIO as GPIO
import Adafruit_DHT
from raspberry.hx711 import HX711

# API Endpoint
API_URL = "https://bees.aiiot.center/api.php"

# GPIO Pin Configuration
TRIG = 14
ECHO = 15
DHT_PIN = 18
DHT_SENSOR = Adafruit_DHT.DHT22
SOUND_SENSOR_PIN = 23
LDR_PIN = 24  # GPIO pin for the LDR circuit

# Setup GPIO
def setup_gpio():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)
    GPIO.setup(SOUND_SENSOR_PIN, GPIO.IN)
    GPIO.setup(LDR_PIN, GPIO.IN)

# Cleanup GPIO
def cleanup_gpio():
    GPIO.cleanup()

# Ultrasonic Distance Sensor
def get_distance():
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    start_time = time.time()
    while GPIO.input(ECHO) == 0:
        start_time = time.time()

    while GPIO.input(ECHO) == 1:
        end_time = time.time()

    elapsed_time = end_time - start_time
    distance = (elapsed_time * 34300) / 2  # Distance in cm
    return distance

# Temperature and Humidity Sensor
def get_temp_humidity():
    # Generate random data as placeholder
    temperature = round(random.uniform(20, 30), 1)
    humidity = round(random.uniform(50, 70), 1)
    return temperature, humidity

# Sound Sensor
def monitor_sound():
    return GPIO.input(SOUND_SENSOR_PIN) == GPIO.HIGH

# Light Sensor (LDR)
def monitor_light():
    return GPIO.input(LDR_PIN) == GPIO.HIGH

# HX711 Weight Sensor
def initialize_hx711():
    hx = HX711(5, 6)
    hx.set_reading_format("MSB", "MSB")
    hx.set_reference_unit(114)  # Adjust based on your setup
    hx.reset()
    hx.tare()
    return hx

def get_weight(hx):
    return hx.get_weight(5)

# Send Data to API
def send_data_to_api(data):
    try:
        response = requests.post(API_URL, data=data)
        print("Server Response:", response.json())
    except Exception as e:
        print(f"Error sending data to API: {e}")

# Main Function
def main():
    setup_gpio()
    hx = initialize_hx711()

    try:
        while True:
            # Get sensor data
            temperature, humidity = get_temp_humidity()
            weight = round(get_weight(hx), 2)
            distance = round(get_distance(), 2)
            sound_detected = monitor_sound()
            light_detected = monitor_light()

            # Prepare data payload
            data = {
                "temperature": temperature,
                "humidity": humidity,
                "weight": weight,
                "distance": distance,
                "sound_status": int(sound_detected),
                "light_status": int(light_detected),
            }

            # Send data to the server
            send_data_to_api(data)

            # Wait before the next reading
            time.sleep(10)

    except KeyboardInterrupt:
        print("Program terminated by user.")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        cleanup_gpio()

# Run the script
if __name__ == "__main__":
    main()
