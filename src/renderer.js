const $ = require('jquery');
const Stats = require('stats.js');
const stories = require('./data/stories.json');
const ui = require('./js/ui');
const Hardware = require('./js/hardware');

const hardware = new Hardware({ path: '/dev/ttyACM0' });

hardware.on('ready', () => {
	console.log('connected!');
	if (!localStorage.getItem('story')) {
		ui.selectStory(stories, () => {
			ui.initStory();
		});
	}
	else {
		ui.initStory();
	}
});

hardware.on('data', (data) => {
	console.log(data);
	const isPenates = JSON.parse(localStorage.getItem('story')).id === 'penates';
	const next = data.startsWith('d') || data.startsWith('r');
	if (isPenates) {
		const amount = parseInt(data.substr(1, data.length), 10);
		if (next) ui.scrollNext(amount);
		else ui.scrollPrev(amount);
	}
	else if (next) $('.slideShow').slick('slickNext');
	else $('.slideShow').slick('slickPrev');
});


// keydown for testing purpose
document.onkeydown = (e) => {
	if (JSON.parse(localStorage.getItem('story')).id === 'penates') {
		switch (e.keyCode) {
			case 39:
				ui.scrollNext(100);
				break;
			case 37:
				ui.scrollPrev(100);
				break;
			default:
				break;
		}
	}
};

// stats.js
const stats = new Stats();
stats.showPanel(0);
stats.dom.style.left = '';
stats.dom.style.right = 0;
document.body.appendChild(stats.dom);
const animate = () => {
	stats.begin();
	stats.end();
	requestAnimationFrame(animate);
};
requestAnimationFrame(animate);

// handle special clicks
$('body').click((e) => {
	if (e.clientX < 100 && e.clientY < 100) {
		ui.selectStory(stories, () => {
			ui.initStory();
		});
	}
});

$('body').dblclick(() => {
	window.close();
});
