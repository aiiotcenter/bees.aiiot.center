import RPi.GPIO as GPIO
import time
from hx711 import HX711

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# Initialize HX711 with DOUT=9 and SCK=10
hx = HX711(9, 10)

calibration_factor = 1
zero_offset = 0

def tare_scale():
    global zero_offset
    try:
        print("Taring the scale... Please make sure it's empty and stable.")
        hx.reset()
        time.sleep(2)  # Allow time for stabilization

        raw_readings = []
        for _ in range(50):
            reading = hx.read()
            if reading is not None:
                raw_readings.append(reading)
            time.sleep(0.1)  # Delay between readings to reduce noise

        if not raw_readings:
            raise ValueError("Failed to get valid readings during taring.")

        zero_offset = sum(raw_readings) / len(raw_readings)
        print(f"Taring complete. Zero offset: {zero_offset}")
    except Exception as e:
        print(f"Error during tare: {e}")

def calibrate_scale(known_weight_grams):
    global calibration_factor
    try:
        print("Calibrating the scale...")
        raw_value = hx.read()
        if raw_value is None:
            raise ValueError("Failed to get valid data from HX711")

        calibration_factor = raw_value / known_weight_grams
        print(f"Calibration complete. Calibration factor: {calibration_factor}")
    except Exception as e:
        print(f"Error during calibration: {e}")

def get_weight():
    try:
        raw_value = hx.read()
        if raw_value is None:
            raise ValueError("Failed to get valid data from HX711")

        weight = (raw_value - zero_offset) / calibration_factor
        print(f"Weight: {weight:.2f} grams")
        return weight
    except Exception as e:
        print(f"Error getting weight: {e}")
        return None

if __name__ == '__main__':
    tare_scale()
    calibrate_scale(1000)  # Use a known weight in grams for calibration
    while True:
        get_weight()
        time.sleep(2)
