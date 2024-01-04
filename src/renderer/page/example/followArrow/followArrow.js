export default class FollowArrow {
  constructor(option) {
    const {
      element,
      event = "click",
      openMouseout = false,
      time = 300,
    } = option;

    const state = {
      event,
      time,
      timer: null,
      openMouseout,
      element: document.querySelectorAll(element),
      elementParent: document.querySelectorAll(element)[0].parentNode,
      elementActive: {},
    };

    for (let key in state) {
      this[key] = state[key];
    }

    if (this.event === "click") {
      this.openMouseout = false;
    }

    this.init();
  }

  init() {
    const { element, event, elementParent, openMouseout } = this;

    element.forEach((item) => {
      if (item.classList.contains("active")) {
        this.elementActive.node = item;
      }
      item.addEventListener(event, () => {
        this.setClass(item);
      });
    });

    if (openMouseout) {
      elementParent.addEventListener(
        "mouseout",
        this.debounce(this.initClass, this.time)
      );
    }

    if (this.elementActive.node) {
      const x = this.elementActive.node.offsetLeft;
      const w = this.elementActive.node.offsetWidth;

      this.elementActive.x = x;
      this.elementActive.w = w;

      elementParent.style.setProperty("--x", x + "px");
      elementParent.style.setProperty("--w", w + "px");
    } else {
      elementParent.style.setProperty("--x", element[0].offsetLeft + "px");
      elementParent.style.setProperty("--w", element[0].offsetWidth + "px");
    }
  }

  debounce(fn, time) {
    return (...args) => {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        fn.apply(this, args);
      }, time);
    };
  }

  removeClass() {
    const { element } = this;

    element.forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
  }

  setClass(item) {
    if (this.timer) clearTimeout(this.timer);

    const { elementParent } = this;

    elementParent.style.setProperty("--x", item.offsetLeft + "px");
    elementParent.style.setProperty("--w", item.offsetWidth + "px");

    this.removeClass();
    item.classList.add("active");
  }

  initClass() {
    const {
      elementParent,
      elementActive: { node, x, w },
    } = this;

    elementParent.style.setProperty("--x", x + "px");
    elementParent.style.setProperty("--w", w + "px");

    this.removeClass();
    node.classList.add("active");
  }
}
