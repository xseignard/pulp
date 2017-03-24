#include "Pulp.h"

// pins configuration
const int one = A0;
const int two = A1;
const int three = A2;
const int four = A3;

// value threshold
const int threshold = 50;

// current values
int oneVal = 0;
int twoVal = 0;
int threeVal = 0;
int fourVal = 0;

// init the serial communication and the pins
void setup() {
	pulpInit(9600);
	pinMode(one, INPUT);
	pinMode(two, INPUT);
	pinMode(three, INPUT);
	pinMode(four, INPUT);
}

void loop() {
	oneVal = analogRead(one);
	twoVal = analogRead(two);
	threeVal = analogRead(three);
	fourVal = analogRead(four);
	if (
		oneVal > threshold ||
		twoVal > threshold ||
		threeVal > threshold ||
		fourVal > threshold
	) {
		right();
    delay(600);
	}
}
