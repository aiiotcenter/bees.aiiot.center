import time
import sys
import RPi.GPIO as GPIO
import Adafruit_DHT
from hx711 import HX711

# GPIO Pin Configuration
TRIG = 14
ECHO = 15
DHT_PIN = 18
DHT_SENSOR = Adafruit_DHT.DHT22
SOUND_SENSOR_PIN = 23
LDR_PIN = 24  # GPIO pin for the LDR circuit

# Setup GPIO
def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)
    GPIO.setup(SOUND_SENSOR_PIN, GPIO.IN)
    GPIO.setup(LDR_PIN, GPIO.IN)

def cleanAndExit():
    print("Cleaning up...")
    GPIO.cleanup()
    print("Bye!")
    sys.exit()

# Ultrasonic Distance Sensor
def get_distance():
    try:
        GPIO.output(TRIG, True)
        time.sleep(0.00001)
        GPIO.output(TRIG, False)

        start_time = time.time()
        while GPIO.input(ECHO) == 0:
            start_time = time.time()
            if time.time() - start_time > 0.05:  # Timeout 50ms
                print("Timeout: No echo signal detected.")
                return None

        while GPIO.input(ECHO) == 1:
            end_time = time.time()
            if time.time() - start_time > 0.05:  # Timeout 50ms
                print("Timeout: Echo signal stuck high.")
                return None

        elapsed_time = end_time - start_time
        distance = (elapsed_time * 34300) / 2  # Calculate distance in cm
        return distance
    except Exception as e:
        print(f"Error in get_distance: {e}")
        return None

# Temperature and Humidity Sensor
def get_temp_humidity():
    try:
        humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
        if humidity is None or temperature is None:
            print("DHT sensor failed to read.")
            return None, None
        return temperature, humidity
    except Exception as e:
        print(f"Error in get_temp_humidity: {e}")
        return None, None

# Sound Sensor
def monitor_sound():
    try:
        sound_detected = GPIO.input(SOUND_SENSOR_PIN)
        if sound_detected == GPIO.HIGH:
            return True  # Sound detected
        else:
            return False  # No sound detected
    except Exception as e:
        print(f"Error in monitor_sound: {e}")
        return False

# Light Sensor (LDR)
def monitor_light():
    try:
        light_detected = GPIO.input(LDR_PIN)
        if light_detected == GPIO.HIGH:
            return True  # Light detected
        else:
            return False  # No light detected
    except Exception as e:
        print(f"Error in monitor_light: {e}")
        return False

# HX711 Weight Sensor Initialization
hx = HX711(5, 6)
hx.set_reading_format("MSB", "MSB")
referenceUnit = 114
hx.set_reference_unit(referenceUnit)

try:
    hx.reset()
    hx.tare()
    print("Tare done! Add weight now...")
except Exception as e:
    print(f"Error initializing HX711: {e}")
    cleanAndExit()

setup()

# Main Loop
iteration_count = 0
while True:
    try:
        iteration_count += 1

        # Weight Reading
        print("Reading weight...")
        try:
            raw_value = hx.get_weight(5)
            grams = raw_value
            kilograms = grams / 1000.0
            print(f"Weight: {kilograms:.3f} kg")
        except Exception as e:
            print(f"Error in HX711 weight reading: {e}")

        # Distance Reading
        print("Reading distance...")
        distance = get_distance()
        if distance is not None:
            print(f"Distance: {distance:.2f} cm")
            if distance < 7:
                print("Alert: Someone is near!")

        # Temperature and Humidity Reading
        print("Reading temperature and humidity...")
        temperature, humidity = get_temp_humidity()
        if temperature is not None and humidity is not None:
            print(f"Temperature: {temperature:.1f} °C, Humidity: {humidity:.1f} %")

        # Sound Sensor Monitoring
        print("Monitoring sound sensor...")
        sound_detected = monitor_sound()
        if sound_detected:
            print("Bees are alive!")
        else:
            print("Something is going wrong!")

        # Light Sensor Monitoring
        print("Monitoring light sensor...")
        light_detected = monitor_light()
        if light_detected:
            print("Hive is open!")
        else:
            print("Hive is closed!")

        # Periodic GPIO Cleanup
        if iteration_count % 100 == 0:  # Every 100 iterations
            print("Performing periodic GPIO cleanup and reinitialization...")
            GPIO.cleanup()
            setup()

        # Delay between readings
        time.sleep(1)

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()
    except Exception as e:
        print(f"Unexpected error in main loop: {e}")
        cleanAndExit()
