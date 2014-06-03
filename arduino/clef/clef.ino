#include "Pulp.h"

// pins configuration
const int one = 2;

// current and previous values
int oneCurrent;
int lastOne;

// init the serial communication and the pins
void setup() {
	pulpInit(9600);
	pinMode(one, INPUT);
}

void loop() {
	oneCurrent = digitalRead(one);
	// the condition means that the value changed from LOW to HIGH
	if (oneCurrent != lastOne && oneCurrent == HIGH) {
		right();
	}

	lastOne = oneCurrent;
	delay(200);
}
