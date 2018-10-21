#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

int sensor=2;
int ventilador=12;
int temp,signalvolt;
DHT dht (sensor, DHT11);

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
pinMode(ventilador, OUTPUT);
dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:

temp=dht.readTemperature();

//temp=analogRead(sensor);

//temp=(5*signalvolt*100)/1024;

Serial.print(temp);

if(temp>23)
{
  digitalWrite(ventilador, 1);
  }

else
{
  digitalWrite(ventilador, 0);
  }
delay(500);


}
