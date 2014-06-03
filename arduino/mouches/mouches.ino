#include "Pulp.h"
#include "elapsedMillis.h"

// pins configuration
// first fly (piezo to pin A0 and associated led to pin 2) is the previous
const int NUMBER_OF_FLIES = 5;
const int LEDS[NUMBER_OF_FLIES] = {2,3,4,5,6};
const int PIEZOS[NUMBER_OF_FLIES] = {A0,A1,A2,A3,A4};

// time elapsed
elapsedMillis timeElapsed;
// delay in milliseconds between the change of the fly
int interval = 1500;
// current random index
int randomIndex = 0;
// previous random index
int changed = false;
// current random led
int randomLed;
// previous random led
int prevRandomLed;
// threshold
int threshold = 50;

// init the serial communication and the pins
void setup() {
	pulpInit(9600);
	for (int i = 0; i < NUMBER_OF_FLIES; i++) {
		pinMode(LEDS[i], OUTPUT);
		pinMode(PIEZOS[i], INPUT);
	}
	// previous led is always on
	digitalWrite(LEDS[0], HIGH);
}

void loop() {
	// forward piezos
	if (changed && analogRead(PIEZOS[randomIndex]) > threshold) {
		changed = false;
		right();
	}
	// back piezo
	else if (changed && analogRead(PIEZOS[0]) > threshold) {
		changed = false;
		left();
	}

	if (timeElapsed > interval) {
		randomIndex = random(NUMBER_OF_FLIES - 1) + 1;
		randomLed = LEDS[randomIndex];
		digitalWrite(prevRandomLed, LOW);
		digitalWrite(randomLed, HIGH);
		changed = true;
		prevRandomLed = randomLed;
		timeElapsed = 0;
	}
}
