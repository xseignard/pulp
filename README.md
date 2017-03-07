# Installation

Install node.js
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
nvm install v6.10.0
```

Clone repo:

```
git clone https://github.com/xseignard/pulp
cd pulp
npm i
```

# Run

```
npm start
```

# Running

- Toggle fullscreen: `Ctrl+f`
- Quit: double click
- Change story: click on the top left corner

# Prevent screen sleep

`sudo apt-get install xscreensaver`

Then deactivate screen sleep and any screensaver.

# Hide cursor after 3 second of inactivity

`sudo apt-get install unclutter`

# Running at startup

Add the following to `/home/pi/.config/lxsession/LXDE-pi/autostart`

```
@/home/pi/pulp/node_modules/.bin/electron /home/pi/pulp/src/main.js
```

# `udev` rules

On the Raspberry Pi, copy the following `udev` rules in order to have unique for arduino (e.g. `/dev/arduino`).

```
cd misc
sudo cp 99-pulp.rules /etc/udev/rules.d/
sudo udevadm control --reload-rules
sudo udevadm trigger
```
