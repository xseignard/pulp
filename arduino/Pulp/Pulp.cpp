/*
  Pulp.h - Library for Pulp communication.
  Created by Xavier Seignard, 2014.
  MIT
*/
#include "Arduino.h"
#include "Pulp.h"

void pulpInit(int bps) {
	Serial.begin(bps);
}

void up() {
	up(50);
}

void down() {
	down(50);
}

void left() {
	left(50);
}

void right() {
	right(50);
}

void up(int amount) {
	Serial.print("u");
	Serial.print(amount);
	Serial.print("#");
}

void down(int amount) {
	Serial.print("d");
	Serial.print(amount);
	Serial.print("#");
}

void left(int amount) {
	Serial.print("l");
	Serial.print(amount);
	Serial.print("#");
}

void right(int amount) {
	Serial.print("r");
	Serial.print(amount);
	Serial.print("#");
}
