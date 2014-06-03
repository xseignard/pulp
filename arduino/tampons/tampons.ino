#include "Pulp.h"

// pins configuration
const int one = A0;
const int two = A1;

// value threshold
const int threshold = 20;

// current values
int oneVal = 0;
int twoVal = 0;

// init the serial communication and the pins
void setup() {
	pulpInit(9600);
	pinMode(one, INPUT);
	pinMode(two, INPUT);
}

void loop() {
	oneVal = analogRead(one);
	twoVal = analogRead(two);
	if (oneVal > threshold || twoVal > threshold) {
		right();
	}
	delay(400);
}
