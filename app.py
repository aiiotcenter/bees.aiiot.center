import board
import digitalio
import adafruit_hx711

# Setup
dout = board.D9
sck = board.D10
hx = adafruit_hx711.HX711(dout, sck)

# Tare the scale
hx.set_scale(1)
hx.tare()

# Read Weight
def get_weight():
    try:
        weight = hx.weight  # Read the weight
        print(f"Weight: {weight:.2f} grams")
        return weight
    except Exception as e:
        print(f"Error getting weight: {e}")
        return None

if __name__ == "__main__":
    while True:
        get_weight()
        time.sleep(2)
