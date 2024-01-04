export default class Tilt {
  constructor(option) {
    const { element, point = 10 } = option;

    const node = document.querySelector(element);
    const current = node.children[0];
    const currentChildren = node.children[0].children[0];

    const { width, height } = node.getBoundingClientRect();

    const state = {
      width: width / 2,
      height: height / 2,
      mouseX: 0,
      mouseY: 0,
      point,
      node,
      current,
      currentChildren,
    };

    for (let key in state) {
      this[key] = state[key];
    }

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.init();
  }

  init() {
    this.node.addEventListener("mousemove", this.handleMouseMove);
    this.node.addEventListener("mouseleave", this.handleMouseLeave);
  }

  raf() {
    requestAnimationFrame(() => {
      this.currentAnimation();
    });
  }

  handleMouseMove(e) {
    this.mouseY = -(e.offsetY - this.height) / this.point;
    this.mouseX = (e.offsetX - this.width) / this.point;

    this.raf();
  }

  currentAnimation() {
    this.current.style.transform = `rotateX(${this.mouseY}deg) rotateY(${this.mouseX}deg)`;
    this.currentChildren.style.transform = `translate3d(${this.mouseX}px,${this.mouseY}px,0)`;
  }

  handleMouseLeave() {
    this.mouseX = 0;
    this.mouseY = 0;

    this.raf();
  }
}
