import RPi.GPIO as GPIO
import time
from hx711 import HX711

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

# Initialize HX711 with GPIO pins
hx = HX711(9, 10)

calibration_factor = 1  # Default calibration factor
zero_offset = 0  # Default zero offset

def tare_scale():
    global zero_offset
    try:
        print("Taring the scale... Please make sure it's empty and stable.")
        hx.reset()
        time.sleep(2)  # Allow some time for stabilization

        raw_readings = []
        for _ in range(50):
            reading = hx.get_raw_data_mean()
            if reading is not None:
                raw_readings.append(reading)
            time.sleep(0.1)  # Delay between readings to reduce noise

        if not raw_readings:
            raise ValueError("Failed to get valid readings during taring.")

        zero_offset = sum(raw_readings) / len(raw_readings)
        hx.set_offset(zero_offset)
        print(f"Taring complete. Zero offset: {zero_offset}")
    except Exception as e:
        print(f"Error during tare: {e}")

def calibrate_scale(known_weight_grams):
    global calibration_factor
    try:
        print("Calibrating the scale...")
        raw_value = hx.get_raw_data_mean()
        if raw_value is None:
            raise ValueError("Failed to get valid data from HX711")

        calibration_factor = raw_value / known_weight_grams
        hx.set_scale_ratio(calibration_factor)
        print(f"Calibration complete. Calibration factor: {calibration_factor}")
    except Exception as e:
        print(f"Error during calibration: {e}")

def get_weight():
    try:
        raw_value = hx.get_raw_data_mean()
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
    calibrate_scale(1000)  # Calibrate with a known weight in grams
    while True:
        get_weight()
        time.sleep(2)
