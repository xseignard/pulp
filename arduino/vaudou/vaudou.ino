#include "Pulp.h"

// pins configuration
const int next = 2;
const int prev = 3;
const int relay = 4;
const int relayOut = 5;

// current and previous values
int nextOld = 0;
int prevOld = 0;
int relayOld = 0;
int nextCurrent = 0;
int prevCurrent = 0;
int relayCurrent = 0;

// init the serial communication and the pins
void setup() {
	pulpInit(9600);
	pinMode(next, INPUT);
	pinMode(prev, INPUT);
	pinMode(relay, INPUT);
	pinMode(relayOut, OUTPUT);
}

void loop() {
	// read current values
	nextCurrent = digitalRead(next);
	prevCurrent = digitalRead(prev);
	relayCurrent = digitalRead(relay);

	// the condition means that the value changed from LOW to HIGH
	if (nextCurrent != nextOld && nextCurrent == HIGH) {
		right(160);
	}
	else if (prevCurrent != prevOld && prevCurrent == HIGH) {
		left(160);
	}
	else if (relayCurrent != relayOld && relayCurrent == HIGH) {
		digitalWrite(relayOut, !digitalRead(relayOut));
	}
	// assign current values to old ones
	nextOld = nextCurrent;
	prevOld = prevCurrent;
	relayOld = relayCurrent;
	delay(400);
}
