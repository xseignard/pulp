(function($) {
	var container = document.getElementById('container');
	var $container = $('#container');
	var moving = false;
	var ui;


	var Ui = function(chosenStory) {
		var _self = this;
		// search for the story to display
		$.getJSON('data/stories.json', function(data) {
			$.each(data, function(index, story) {
				if (story.id === chosenStory) {
					_self.story = story;
					// init the story
					_self.initContent();
				}
			});
		});
	};

	Ui.prototype.update = function(msg) {
		var cmd = msg.substr(0, 1);
		var amount = parseInt(msg.substr(1, msg.length));
		switch (cmd) {
			case 'u':
			case 'l':
				// up arrow
				// left arrow
				console.log('prev');
				if (!moving) {
					if (ui && ui.story.id === 'penates') {
						$('.simply-scroll-back').trigger('mouseenter');
						moving = true;
						setTimeout(function() {
							$('.simply-scroll-back').trigger('mouseleave');
							moving = false;
						}, amount*100);
					}
					else {
						$container.cycle('prev');
					}
				}
				break;
			case 'd':
			case 'r':
				// down arrow
				// right arrow
				console.log('next');
				if (!moving) {
					if (ui && ui.story.id === 'penates') {
						$('.simply-scroll-forward').trigger('mouseenter');
						moving = true;
						setTimeout(function() {
							$('.simply-scroll-forward').trigger('mouseleave');
							moving = false;
						}, amount*100);
					}
					else {
						$container.cycle('next');
					}
				}
				break;
		}
	};

	Ui.prototype.initContent = function() {
		//chrome.app.window.current().fullscreen();
		var count = this.story.count;
		var gif = this.story.gif || [];
		var storyFolder = 'assets/stories/' + this.story.id;
		for (var i = 1; i <= count; i++) {
			var img = document.createElement('img');
			var ext = '.jpg';
			if (gif.indexOf(i) > -1) {
				ext = '.gif';
			}
			img.src = storyFolder + '/' + i + ext;
			container.appendChild(img);
		}
		// init with cycle plugin for any story except penates
		if (this.story.id !== 'penates') {
			// set css class for the container
			$container.addClass('cycle');
			$container.cycle({
				fx: this.story.fx
			});
			// can't move if already moving
			$container.on('cycle-before', function(event, opts) {
				moving = true;
			});
			$container.on('cycle-after', function(event, opts) {
				moving = false;
			});
		}
		// init with simplyScroll for penates
		else {
			setTimeout(function() {
				$container.simplyScroll({
					customClass: 'vert',
					orientation: 'vertical',
					auto: false,
					manualMode: 'loop',
					frameRate: 30,
					speed: 6
				});
			}, 1000);
			ui = this;
		}
	};

	//
	document.onkeydown = function(event) {
		event = event || window.event;
		switch (event.keyCode) {
			case 37:
			case 38:
				// up arrow
				// left arrow
				console.log('prev');
				if (!moving) {
					if (ui && ui.story.id === 'penates') {
						$('.simply-scroll-back').trigger('mouseenter');
						moving = true;
						setTimeout(function() {
							$('.simply-scroll-back').trigger('mouseleave');
							moving = false;
						}, 500);
					}
					else {
						$container.cycle('prev');
					}
				}
				break;
			case 40:
			case 39:
				// down arrow
				// right arrow
				console.log('next');
				if (!moving) {
					if (ui && ui.story.id === 'penates') {
						$('.simply-scroll-forward').trigger('mouseenter');
						moving = true;
						setTimeout(function() {
							$('.simply-scroll-forward').trigger('mouseleave');
							moving = false;
						}, 500);
					}
					else {
						$container.cycle('next');
					}
				}
				break;
			case 121:
				// F10 - reload app
				chrome.runtime.reload();
				break;
			case 122:
				// F11 - fullscreen
				var currentWindow = chrome.app.window.current();
				if (!currentWindow.isFullscreen()) {
					currentWindow.fullscreen();
				}
				break;
		}
	};

	if (!window.Pulp) window.Pulp = {};
	window.Pulp.Ui = Ui;
})($);
