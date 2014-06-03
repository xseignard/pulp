#include "Pulp.h"

// pins configuration
const int next = 2;
const int prev = 3;

// current and previous values
int nextCurrent = 0;
int prevCurrent = 0;
int nextOld = 0;
int prevOld = 0;

// init the serial communication and the pins
void setup() {
	pulpInit(9600);
	pinMode(next, INPUT);
	pinMode(prev, INPUT);
}

void loop() {
	nextCurrent = digitalRead(next);
	prevCurrent = digitalRead(prev);

	// the condition means that the value changed from LOW to HIGH
	if (nextCurrent == HIGH && nextOld == LOW) {
		right();
	}
	else if (prevCurrent == LOW && prevOld == HIGH) {
		left();
	}

	// assign current values to old ones
	nextOld = nextCurrent;
	prevOld = prevCurrent;
	delay(200);
}
