#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define SENSOR 2
#define RELEY_1 12
#define RELEY_2 11
DHT dht (SENSOR, DHT11);
void setup() 
{
Serial.begin(9600);
pinMode(RELEY_1, OUTPUT);
pinMode(RELEY_2, OUTPUT);
}

int signalVoltage, celsiusTemp;

void loop() {

celsiusTemp= analogRead(SENSOR);
celsiusTemp=(5*signalVoltage*100)/1024;

Serial.print(celsiusTemp);

if(celsiusTemp>26)
{
  digitalWrite(RELEY_1, 1);
  }
  else
  {
      digitalWrite(RELEY_1, 0);
    }
}
