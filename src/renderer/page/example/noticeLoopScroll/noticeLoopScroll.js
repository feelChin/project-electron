import style from "./index.module.scss";

export default class NoticeLoopScroll {
  constructor(option) {
    for (let key in option) {
      this[key] = option[key];
    }

    if (!this.state && this.direction == "horizontal") {
      this.result = [...this.result, ...this.result];
    } else {
      this.result[this.result.length] = this.result[0];
    }

    this.init();
    this.renderKeyframes();
  }

  init() {
    let html = "";

    this.result.forEach((element) => {
      html += `<div class="${style.item}">${element}</div>`;
    });

    this.element.innerHTML = html;
    this.element.style.animationName = this.name;

    if (this.direction == "horizontal") {
      this.element.className = style.horizontal;
      if (!this.state) {
        this.element.className = `${style.horizontal} ${style.horizontalRuning}`;
      }
    } else {
      this.element.className = "";
    }
  }

  renderPauseTransform(text = "") {
    const len = this.result.length;
    const point = 100 / len;
    const space = len * 2 - 1;
    const spacePoint = 100 / space;

    const spaceList = [];
    for (let i = 0; i < space; i++) {
      spaceList.push(spacePoint * i);
    }
    spaceList.push(100);

    for (let i = 0; i < len; i++) {
      const iPoint = this.direction == "horizontal" ? i * 100 : i * point;
      const direction = () => {
        return this.direction == "horizontal"
          ? `(-${iPoint}%,0,0)`
          : `(0,-${iPoint}%,0)`;
      };

      text += `${
        spaceList[i * 2 ? i * 2 : 0]
      }% { transform:translate3d${direction()}}${
        spaceList[i * 2 ? i * 2 + 1 : 1]
      }% { transform:translate3d${direction()}}`;
    }

    return text;
  }

  renderRunningTransform(text = "") {
    const len = this.result.length;
    const space = 100 / (len - 1);
    const point = 100 / len;

    for (let i = 0; i < len; i++) {
      const iPoint = i * point;
      text += `${i * space}% {transform:translate3d(0,-${iPoint}%,0)}`;
    }

    return text;
  }

  renderRunningHorizontalTransform() {
    return `0%{transform:translate3d(0,0%,0)}100%{transform:translate3d(-50%,0,0)}`;
  }

  renderKeyframes() {
    if (!this.styleSheet) {
      this.styleSheet = document.createElement("style");
      document.head.appendChild(this.styleSheet);
    }

    let renderTransform = "";

    if (!this.state && this.direction == "horizontal") {
      renderTransform = this.renderRunningHorizontalTransform();
    } else {
      renderTransform = this.state
        ? this.renderPauseTransform()
        : this.renderRunningTransform();
    }

    this.styleSheet.innerHTML = `@keyframes ${this.name} { ${renderTransform} }`;
  }
}
