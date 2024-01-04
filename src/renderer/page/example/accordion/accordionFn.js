class Accordion {
  constructor(option) {
    const {
      element,
      elementBrother,
      event = "click",
      openMouseout = false,
    } = option;

    const state = {
      event,
      openMouseout,
      height: new Array(),
      element: document.querySelectorAll(element),
      elementBrother: document.querySelectorAll(elementBrother),
    };

    for (let key in state) {
      this[key] = state[key];
    }

    this.init();
  }

  init() {
    const { element, elementBrother, openMouseout } = this;

    element.forEach((item, index) => {
      if (!this.height[index]) {
        this.height[index] = elementBrother[index].children[0].offsetHeight;
      }

      item.addEventListener(this.event, () => {
        this.judgeClass(item, elementBrother[index], index);
      });

      if (openMouseout) {
        item.addEventListener("mouseout", () => {
          this.removeClass(item, elementBrother[index], index);
        });
      }

      if (item.classList.contains("active")) {
        elementBrother[index].style.height = this.height[index] + "px";
      }
    });
  }

  initClass() {
    this.element.forEach((item, index) => {
      item.classList.remove("active");
      this.elementBrother[index].classList.remove("active");

      this.elementBrother[index].style.height = "0px";
    });
  }

  removeClass(element, elementBrother) {
    element.classList.remove("active");
    elementBrother.classList.remove("active");

    elementBrother.style.height = "0px";
  }

  setClass(element, elementBrother, index) {
    this.element.forEach((item, index) => {
      if (item.classList.contains("active")) {
        this.removeClass(item, this.elementBrother[index]);
      }
    });

    element.classList.add("active");
    elementBrother.classList.add("active");

    elementBrother.style.height = this.height[index] + "px";
  }

  judgeClass(element, elementBrother, index) {
    element.classList.contains("active")
      ? this.removeClass(element, elementBrother)
      : this.setClass(element, elementBrother, index);
  }
}

export default Accordion;
