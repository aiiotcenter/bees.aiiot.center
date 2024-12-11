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

def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)
    GPIO.setup(SOUND_SENSOR_PIN, GPIO.IN)

def cleanAndExit():
    print("Cleaning up...")
    GPIO.cleanup()
    print("Bye!")
    sys.exit()

def get_distance():
    # Trigger the ultrasonic sensor
    GPIO.output(TRIG, True)
    time.sleep(0.00001)
    GPIO.output(TRIG, False)

    # Measure the time of the echo
    while GPIO.input(ECHO) == 0:
        start_time = time.time()
    while GPIO.input(ECHO) == 1:
        end_time = time.time()

    # Calculate distance in cm
    elapsed_time = end_time - start_time
    distance = (elapsed_time * 34300) / 2  # Speed of sound is 343 m/s
    return distance

def get_temp_humidity():
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    if humidity is not None and temperature is not None:
        return temperature, humidity
    else:
        return None, None

def monitor_sound():
    return GPIO.input(SOUND_SENSOR_PIN) == GPIO.HIGH

# Initialize HX711
hx = HX711(5, 6)
hx.set_reading_format("MSB", "MSB")
referenceUnit = 114
hx.set_reference_unit(referenceUnit)
hx.reset()
hx.tare()
print("Tare done! Add weight now...")

setup()

while True:
    try:
        # Get weight readings
        raw_value = hx.get_weight(5)
        grams = raw_value
        kilograms = grams / 1000.0
        print(f"Weight: {grams:.2f} g ({kilograms:.3f} kg)")

        # Get distance readings
        distance = get_distance()
        print(f"Distance: {distance:.2f} cm")
        if distance < 7:
            print("Alert: Someone is near!")

        # Get temperature and humidity readings
        temperature, humidity = get_temp_humidity()
        if temperature is not None and humidity is not None:
            print(f"Temperature: {temperature:.1f} °C, Humidity: {humidity:.1f} %")
        else:
            print("Failed to read temperature and humidity!")

        # Monitor sound sensor
        if monitor_sound():
            print("Bees are alive!")
        else:
            print("Something is going wrong!")

        hx.power_down()
        hx.power_up()
        time.sleep(1)

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()
