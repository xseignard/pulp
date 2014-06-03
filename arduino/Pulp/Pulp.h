/*
  Pulp.h - Library for Pulp communication.
  Created by Xavier Seignard, 2014.
  MIT
*/
#ifndef Pulp_h
#define Pulp_h

#include "Arduino.h"

void pulpInit(int bps);
void up();
void down();
void left();
void right();
void up(int amount);
void down(int amount);
void left(int amount);
void right(int amount);

#endif
