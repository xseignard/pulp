const EventEmitter = require('events').EventEmitter;
const SerialPort = require('serialport');

class Hardware extends EventEmitter {
	/**
	 * Open the serial communication with the arduino
	 * @param conf {Object} - configuration, containing the arduino conf
	 */
	constructor(conf) {
		super();
		const path = conf && conf.path ? conf.path : '/dev/arduino';
		this.port = new SerialPort(path, { baudRate: 9600, parser: SerialPort.parsers.readline('#') });
		this.port.on('open', () => this.emit('ready'));
		this.port.on('error', (err) => this.emit('error', err));
		this.port.on('data', (data) => this.emit('data', data));
	}

}
module.exports = Hardware;
