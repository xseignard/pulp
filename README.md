# Installation

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

# Hide cursor after 3 second of inactivity

`sudo apt-get install unclutter`

# `udev` rules

On the Raspberry Pi, copy the following `udev` rules in order to have unique for arduino (e.g. `/dev/arduino`).

```
cd misc
sudo cp 99-pulp.rules /etc/udev/rules.d/
sudo udevadm control --reload-rules
sudo udevadm trigger
```
