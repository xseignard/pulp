const $ = require('jquery');
require('slick-carousel');
require('smoothscroll-polyfill').polyfill();

const initSlideShow = (story) => {
	if (story.id !== 'penates') {
		const slideShow = document.createElement('div');
		slideShow.classList.add('slideShow');
		for (let i = 1; i <= story.count; i++) {
			const slide = document.createElement('div');
			slide.classList.add('slide');
			const img = document.createElement('img');
			const ext = (story.gif && story.gif.indexOf(i) > -1) ? 'gif' : 'jpg';
			img.src = `assets/stories/${story.id}/${i}.${ext}`;
			slide.appendChild(img);
			slideShow.appendChild(slide);
		}
		document.querySelector('#container').appendChild(slideShow);
		const vertical = story.fx === 'scrollVert';
		const fade = story.fx === 'fade';
		const speed = story.fx === 'none' ? 0 : 500;
		$('.slideShow').slick({
			arrows: false,
			vertical,
			fade,
			speed,
		});
	}
	else {
		const slideShow = document.createElement('div');
		slideShow.classList.add('penates');
		for (let i = 1; i <= story.count; i++) {
			const img = document.createElement('img');
			img.src = `assets/stories/${story.id}/${i}.jpg`;
			slideShow.appendChild(img);
		}
		document.querySelector('#container').appendChild(slideShow);
	}
};

const selectStory = (stories, cb) => {
	const overlay = document.querySelector('#overlay');
	overlay.style.display = 'block';
	const select = document.querySelector('#stories');
	const submit = document.querySelector('#submit');
	submit.onclick = () => {
		localStorage.setItem('story', JSON.stringify(stories[select.selectedIndex]));
		cb();
	};
};

const resetSlideShow = () => {
	const slideShow = document.querySelector('.slideShow');
	if (slideShow) slideShow.remove();
	const penates = document.querySelector('.penates');
	if (penates) penates.remove();
};

const hideSelect = () => {
	const overlay = document.querySelector('#overlay');
	overlay.style.display = 'none';
};

const scrollNext = (amount) => {
	if (document.body.clientHeight - window.innerHeight === window.scrollY) {
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	}
	else window.scrollBy({ top: amount, left: 0, behavior: 'smooth' });
};

const scrollPrev = (amount) => {
	if (window.scrollY === 0) {
		const bottom = document.body.clientHeight - window.innerHeight;
		window.scroll({ top: bottom, left: 0, behavior: 'smooth' });
	}
	else window.scrollBy({ top: -amount, left: 0, behavior: 'smooth' });
};

const initStory = () => {
	hideSelect();
	resetSlideShow();
	initSlideShow(JSON.parse(localStorage.getItem('story')));
};

module.exports = {
	initSlideShow,
	selectStory,
	resetSlideShow,
	hideSelect,
	scrollNext,
	scrollPrev,
	initStory,
};
