
#include <Wire.h>
#include <Adafruit_BMP280.h>
#include <DHT.h>

// Pin configuration
#define MQ2_PIN 34
#define DHT_PIN 4
#define DHT_TYPE DHT11

#define RED_LED 26
#define GREEN_LED 27

// Temporary demonstration threshold
#define GAS_THRESHOLD 1200

// Sensor objects
DHT dht(DHT_PIN, DHT_TYPE);
Adafruit_BMP280 bmp;

bool bmpAvailable = false;
bool gasAlert = false;
bool redLedState = false;

unsigned long lastSampleTime = 0;
unsigned long lastBlinkTime = 0;

void setup() {

  Serial.begin(115200);

  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);

  digitalWrite(RED_LED, LOW);
  digitalWrite(GREEN_LED, HIGH);

  analogReadResolution(12);
  analogSetPinAttenuation(MQ2_PIN, ADC_11db);

  dht.begin();

  Wire.begin(21, 22);

  if (bmp.begin(0x76)) {
    bmpAvailable = true;
  }
  else if (bmp.begin(0x77)) {
    bmpAvailable = true;
  }

  // CSV header - print only once
  Serial.println(
    "timestamp_ms,gas_adc,gas_voltage,temperature_c,humidity_pct,bmp_temperature_c,pressure_hpa,status"
  );
}

void loop() {

  unsigned long currentTime = millis();

  // Read sensors every 2 seconds
  if (currentTime - lastSampleTime >= 2000) {

    lastSampleTime = currentTime;

    // MQ-2
    int gasADC = analogRead(MQ2_PIN);

    float gasVoltage = (gasADC / 4095.0) * 3.3;

    // DHT11
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    // BMP280
    float bmpTemperature = NAN;
    float pressure = NAN;

    if (bmpAvailable) {
      bmpTemperature = bmp.readTemperature();
      pressure = bmp.readPressure() / 100.0;
    }

    // Temporary demonstration status
    gasAlert = (gasADC > GAS_THRESHOLD);

    // LED control
    if (!gasAlert) {
      digitalWrite(GREEN_LED, HIGH);
      digitalWrite(RED_LED, LOW);
      redLedState = false;
    }
    else {
      digitalWrite(GREEN_LED, LOW);
    }

    // Print one CSV row
    Serial.print(currentTime);
    Serial.print(",");

    Serial.print(gasADC);
    Serial.print(",");

    Serial.print(gasVoltage, 3);
    Serial.print(",");

    if (!isnan(temperature))
      Serial.print(temperature, 2);
    Serial.print(",");

    if (!isnan(humidity))
      Serial.print(humidity, 2);
    Serial.print(",");

    if (!isnan(bmpTemperature))
      Serial.print(bmpTemperature, 2);
    Serial.print(",");

    if (!isnan(pressure))
      Serial.print(pressure, 2);
    Serial.print(",");

    Serial.println(gasAlert ? "ALERT" : "NORMAL");
  }

  // Blink red LED during alert
  if (gasAlert) {

    if (currentTime - lastBlinkTime >= 300) {

      lastBlinkTime = currentTime;

      redLedState = !redLedState;

      digitalWrite(RED_LED, redLedState);
    }
  }
}
