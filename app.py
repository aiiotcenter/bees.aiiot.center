import time
import board
import digitalio
from adafruit_hx711.basic import HX711  # Correct usage for Adafruit HX711

# GPIO Pins for HX711
print("Initializing HX711...")
dout_pin = digitalio.DigitalInOut(board.D9)  # GPIO 9
sck_pin = digitalio.DigitalInOut(board.D10)  # GPIO 10

try:
    # Initialize HX711
    hx = HX711(dout=dout_pin, pd_sck=sck_pin)
    hx.tare()  # Tare the scale (zero point)
    print("HX711 initialized and tared successfully.")
except Exception as e:
    print(f"Error initializing HX711: {e}")
    exit(1)

def get_weight():
    try:
        weight = hx.weight()  # Get the weight reading
        print(f"Weight: {weight:.2f} grams")
        return weight
    except Exception as e:
        print(f"Error reading weight: {e}")
        return None

if __name__ == "__main__":
    print("Starting weight measurement...")
    while True:
        get_weight()
        time.sleep(1)  # Read weight every second
