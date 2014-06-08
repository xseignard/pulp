(function() {

	var stats, serialPort, ui;
	var debug = false;
	var buffer = '';

	function update() {
		stats.update();
		window.requestAnimationFrame(function() {
			update();
		});
	}

	window.onload = function() {
		var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
		$('body').dblclick(function() {
			chrome.app.window.current().close();
		});
		ui = new Pulp.Ui('otto');
		var handleData = function(data) {
			buffer += data;
			if (buffer.indexOf('#') > -1) {
				buffer = buffer.substr(0, buffer.length-1);
				console.log(buffer);
				ui.update(buffer);
				buffer = '';
			}
		};
		if (chromeVersion>32) {
			serialPort = new Pulp.Serial(handleData);
		}
		else {
			serialPort = new Pulp.SerialOld(handleData);
		}
		if (debug) {
			stats = new Stats();
			stats.domElement.style.position = 'fixed';
			stats.domElement.style.zIndex = '300';
			stats.domElement.style.top = '10px';
			stats.domElement.style.left = '10px';
			document.body.appendChild(stats.domElement);
			update();
		}
	};

})();


