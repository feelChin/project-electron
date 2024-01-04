export default class ScrollPageTransfrom {
  constructor({ content, element }) {
    this.theScrollWrapper = document.querySelector(content) || window;

    const state = {
      current: 0,
      target: 0,
      ease: 0.075,
      rafId: null,
      rafActive: false,
      elementQuery: document.querySelector(element),
      updateScroll: this.updateScroll.bind(this),
      updateAnimation: this.updateAnimation.bind(this),
    };

    for (let key in state) {
      this[key] = state[key];
    }

    this.init();
  }

  init() {
    const containerHeight = this.elementQuery.getBoundingClientRect().height;

    this.elementQuery.parentNode.style.height = containerHeight + "px";

    this.startAnimation();

    this.theScrollWrapper.addEventListener("scroll", this.updateScroll);
    this.theScrollWrapper.addEventListener("resize", this.updateScroll);
  }

  updateScroll() {
    this.target =
      this.theScrollWrapper === window
        ? this.theScrollWrapper.scrollY || this.theScrollWrapper.pageYOffset
        : this.theScrollWrapper.scrollTop;

    this.startAnimation();
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
      "translate3d(0," + -this.current + "px,0)";
  }
}
