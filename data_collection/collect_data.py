
import serial
import csv
import time
import os

# ESP32 configuration
PORT = "COM4"
BAUD_RATE = 115200

# Save CSV in the same folder as this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
filename = os.path.join(BASE_DIR, "pipeline_sensor_data.csv")

esp32 = None

try:
    print(f"Connecting to ESP32 on {PORT}...")

    esp32 = serial.Serial(PORT, BAUD_RATE, timeout=2)

    # ESP32 may restart when serial port opens
    time.sleep(2)

    print("Connected successfully!")
    print("Collecting sensor readings...")
    print("Press CTRL+C to stop collection.\n")

    with open(filename, "w", newline="", encoding="utf-8") as file:

        writer = csv.writer(file)
        header_received = False

        while True:

            line = esp32.readline().decode(
                "utf-8", errors="replace"
            ).strip()

            if not line:
                continue

            values = line.split(",")

            # Receive CSV header
            if values[0] == "timestamp_ms" and len(values) == 8:
                writer.writerow(values)
                file.flush()
                header_received = True
                print("CSV header received")
                continue

            # Receive sensor readings
            if header_received and len(values) == 8:

                try:
                    int(values[0])
                    int(values[1])
                    float(values[2])

                    writer.writerow(values)
                    file.flush()

                    print("Saved:", line)

                except ValueError:
                    continue

except KeyboardInterrupt:
    print("\nData collection stopped.")

except serial.SerialException as error:
    print("\nSerial connection error:", error)

finally:
    if esp32 is not None and esp32.is_open:
        esp32.close()

    print("\nCSV file location:")
    print(filename)
