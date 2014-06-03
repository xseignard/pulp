#include "Pulp.h"

int piezo = A0;
int thresold = 35;

void setup() {
	Serial.begin(9600);
	pinMode(piezo, INPUT);
}

void loop() {
	int val = analogRead(piezo);
	if (val > thresold) {
		right(160);
		delay(1500);
	}
}
