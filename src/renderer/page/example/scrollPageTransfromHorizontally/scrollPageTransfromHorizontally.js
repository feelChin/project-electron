class ScrollPageTransfrom {
	constructor(option) {
		const { element, elementChild } = option;

		const state = {
			current: 0,
			target: 0,
			ease: 0.075,
			rafId: null,
			rafActive: false,
			countWidth: 0,
			elementQuery: document.querySelector(element),
			elementChildQuery: document.querySelectorAll(elementChild),
			updateScroll: this.updateScroll.bind(this),
			updateAnimation: this.updateAnimation.bind(this),
		};

		for (let key in state) {
			this[key] = state[key];
		}

		this.init();
	}

	init() {
		this.elementChildQuery.forEach((el) => {
			this.countWidth += el.getBoundingClientRect().width;
		});
		this.screenWidth = this.countWidth - document.body.offsetWidth;

		this.elementQuery.parentNode.style.height = this.countWidth + "px";

		this.startAnimation();

		this.elementParent = this.elementQuery.parentNode.parentNode || window;

		this.elementParent.addEventListener("scroll", this.updateScroll);
	}

	updateScroll() {
		this.target = this.elementParent.scrollTop || window.scrollY;

		this.startAnimation();

		if (this.target > this.screenWidth) {
			this.elementParent.scrollTo({
				top: this.screenWidth,
			});
			this.target = this.screenWidth;
		}
	}

	startAnimation() {
		if (!this.rafActive) {
			this.rafActive = true;
			this.rafId = requestAnimationFrame(this.updateAnimation);
		}
	}

	updateAnimation() {
		let diff = this.target - this.current;
		let delta = Math.abs(diff) < 0.1 ? 0 : diff * this.ease;

		if (delta) {
			this.current += delta;
			this.current = parseFloat(this.current.toFixed(2));
			this.rafId = requestAnimationFrame(this.updateAnimation);
		} else {
			this.current = this.target;
			this.rafActive = false;
			cancelAnimationFrame(this.rafId);
		}

		this.elementQuery.style.transform =
			"translate3d( " + -this.current + "px,0,0)";
	}
}

export default ScrollPageTransfrom;
