import time
import board
import digitalio
from adafruit_hx711 import HX711  # Correct import

# Setup for HX711
print("Initializing HX711...")
dout = board.D9  # GPIO 9
sck = board.D10  # GPIO 10

try:
    hx = HX711(dout, sck)
    hx.set_scale(1)  # Set an initial scale factor
    hx.tare()  # Tare the scale (set zero)
    print("HX711 initialized and tared successfully.")
except Exception as e:
    print(f"Error initializing HX711: {e}")
    exit(1)

def get_weight():
    try:
        weight = hx.weight  # Read the weight directly
        print(f"Weight: {weight:.2f} grams")
        return weight
    except Exception as e:
        print(f"Error reading weight: {e}")
        return None

if __name__ == "__main__":
    print("Starting weight measurement...")
    while True:
        weight = get_weight()
        time.sleep(1)  # Update every second
