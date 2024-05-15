import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
class Tilt {
  constructor(option) {
    const {
      element,
      point = 10
    } = option;
    const node = document.querySelector(element);
    const current = node.children[0];
    const currentChildren = node.children[0].children[0];
    const {
      width,
      height
    } = node.getBoundingClientRect();
    const state = {
      width: width / 2,
      height: height / 2,
      mouseX: 0,
      mouseY: 0,
      point,
      node,
      current,
      currentChildren
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
const box = "_box_5s0ki_1";
const items = "_items_5s0ki_9";
const item = "_item_5s0ki_9";
const img = "_img_5s0ki_22";
const wrapper = "_wrapper_5s0ki_37";
const style = {
  box,
  items,
  item,
  img,
  wrapper
};
function Index() {
  reactExports.useEffect(() => {
    new Tilt({
      element: "[tilt3D-1]",
      point: 10
    });
    new Tilt({
      element: "[tilt3D-2]",
      point: 15
    });
    new Tilt({
      element: "[tilt3D-3]",
      point: 20
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.items
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    "tilt3D-1": ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.img
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20",
    alt: ""
  })))), /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    "tilt3D-2": ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.img
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20",
    alt: ""
  })))), /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    "tilt3D-3": ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.img
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.RoeTrentinoSnow_ZH-CN3122890500_800x480.jpg&qlt=20",
    alt: ""
  }))))));
}
export {
  Index as default
};
