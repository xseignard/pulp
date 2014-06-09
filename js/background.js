chrome.app.runtime.onLaunched.addListener(function(){
	var opts = {
		bounds: {
			top: 0,
			left: 0,
			width: 1600,
			height: 900
		}
	};
	chrome.app.window.create('main.html', opts, function(createdWindow) {
		createdWindow.fullscreen();
	});
});
