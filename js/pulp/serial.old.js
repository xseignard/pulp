(function($) {

	/**
	 * Initialize serial port picker and serial connection
	 * Inspired by: http://renaun.com/blog/2013/05/using-the-chrome-serial-api-with-arduino/
	 */
	var SerialOld = function(process) {
		// fake connection id until we actually connect to a serial port
		this.connectionId = -1;
		// process function that will handle the read data
		this.process = process;
		// list and open the port
		var self = this;
		chrome.serial.getPorts(function(ports) {
			 self.openPort(ports);
		});
	};

	/**
	 * Handle the opening of the port
	 * @param {Object} openInfo - Object containing the new connection ID
	 */
	SerialOld.prototype.onOpen = function(openInfo) {
		this.connectionId = openInfo.connectionId;
		console.log('connectionId: ' + this.connectionId);
		if (this.connectionId === -1) {
			this.setStatus(false);
			return;
		}
		this.setStatus(true);
		var self = this;
		chrome.serial.read(this.connectionId, 1, function(readInfo) {
			self.read.call(self, readInfo);
		});
	};

	/**
	 * Convenience function to update the serial connection status on the UI
	 * @param {boolean} ok - true if status is ok, false else
	 */
	SerialOld.prototype.setStatus = function(status) {
		var content;
		if (status) {
			// #47a447
			content = '<div class="pulp-ok"><span class="glyphicon glyphicon-ok-sign"></span>Connecté au dispositif</div>';
		}
		else {
			// #ed9c28
			content = '<div class="pulp-ko"><span class="glyphicon glyphicon-exclamation-sign"></span>Aucun dispositif détecté!</div>';
		}
		$('#serialStatus').html(content);
	};

	/**
	 * Open the selected port
	 */
	SerialOld.prototype.openPort = function(ports) {
		var selectedPort;
		ports.forEach(function(port) {
			// don't handle internal linux ttys
			if (port.indexOf('ttyS') === -1) {
				selectedPort = port;
			}
		});
		if (selectedPort) {
			var self = this;
			chrome.serial.open(selectedPort, function(openInfo) {
				self.onOpen.call(self, openInfo);
			});
		}
		else {
			this.setStatus(false);
		}
	};

	/**
	 * Close the opened port
	 */
	SerialOld.prototype.closePort = function() {
		chrome.serial.close(this.connectionId);
	};

	/**
	 * Read data through the opened serial port
	 */
	SerialOld.prototype.read = function(readInfo) {
		var uint8View = new Uint8Array(readInfo.data);
		if (uint8View[0]) this.process(String.fromCharCode(uint8View[0]));
		var self = this;
		chrome.serial.read(this.connectionId, 1, function(readInfo) {
			self.read.call(self, readInfo);
		});
	};

	/**
	 * Send a message through the opened serial port
	 * @param {Number} msg - a single char
	 */
	SerialOld.prototype.send = function(msg) {
		var buffer = new ArrayBuffer(1);
		var uint8View = new Uint8Array(buffer);
		uint8View[0] = msg;
		chrome.serial.write(this.connectionId, buffer, function() {});
	};

	if (!window.Pulp) window.Pulp = {};
	window.Pulp.SerialOld = SerialOld;
})($);
