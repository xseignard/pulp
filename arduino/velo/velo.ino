#include "Pulp.h"
#include "elapsedMillis.h"

const int NUMBER_OF_SENSORS = 3;
const int SENSORS[NUMBER_OF_SENSORS] = {2,3,4};
const int MIN_SPEED = 0;
const int MAX_SPEED = 30;
int lastStates[NUMBER_OF_SENSORS] = {0, 0, 0};

int current;
int currentState;
int counter = 0;
int prevPrev = 0;
int prev = 0;
int vitesse;
elapsedMillis timeElapsed;


void setup() {
	pulpInit(9600);
	for (int i = 0; i < NUMBER_OF_SENSORS; i++) {
		pinMode(SENSORS[i], INPUT);
	}
}

void loop() {
	for (int i = 0; i < NUMBER_OF_SENSORS; i++) {
		current = SENSORS[i];
		currentState = digitalRead(current);
		if (currentState != lastStates[i] && currentState == HIGH) {
			counter++;
			if (counter % 4 == 0) {
				counter = 0;
				// diam roue : 120 cm
				// 1 tour de pedalier = 3 tours de roue
				// 1 tour de pedalier = 360 cm parcourus
				// vitesse (km/h)= 360*3600*1000/tps de tour de pedialier(ms)*100000
				// vitesse (km/h)= 36*360/tps de tour de pedialier(ms)
				// bornée entre 0 et 30km/h ici
				vitesse = constrain(int(360*36/timeElapsed), MIN_SPEED, MAX_SPEED);
				vitesse = map(vitesse, MIN_SPEED, MAX_SPEED, 0, 100);
				vitesse = vitesse * 6;
				if (isForward(current)) {
					down(vitesse);
				}
				else if (isBackward(current)) {
					up(vitesse);
				}
				timeElapsed = 0;
			}
			prevPrev = prev;
			prev = current;
		}
		lastStates[i] = currentState;
	}
	delay(20);
}

boolean isForward(int current) {
	long sequence = prevPrev*100 + prev*10 + current;
	if (sequence == 234 || sequence == 342 || sequence == 423) {
		return true;
	}
	else {
		return false;
	}
}

boolean isBackward(int current) {
	long sequence = prevPrev*100 + prev*10 + current;
	if (sequence == 243 || sequence == 324 || sequence == 432) {
		return true;
	}
	else {
		return false;
	}
}
