import time
import sys
import RPi.GPIO as GPIO
from hx711 import HX711

def cleanAndExit():
    print("Cleaning up...")
    GPIO.cleanup()
    print("Bye!")
    sys.exit()

hx = HX711(5, 6)  # Define the data and clock pins

hx.set_reading_format("MSB", "MSB")  # Set the reading format
referenceUnit = 114  # Adjust this value based on your calibration
hx.set_reference_unit(referenceUnit)

hx.reset()
hx.tare()  # Tare the scale to set it to zero
print("Tare done! Add weight now...")

while True:
    try:
        # Get the raw weight value
        raw_value = hx.get_weight(5)

        # Convert to grams (raw value is assumed to be in grams directly)
        grams = raw_value

        # Convert to kilograms
        kilograms = grams / 1000.0

        # Print the results
        print(f"Weight: {grams:.2f} g ({kilograms:.3f} kg)")

        hx.power_down()
        hx.power_up()
        time.sleep(0.1)

    except (KeyboardInterrupt, SystemExit):
        cleanAndExit()
