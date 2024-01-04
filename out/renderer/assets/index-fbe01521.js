import { r as reactExports, R as React } from "./index-861f41a7.js";
class FollowArrow {
  constructor(option) {
    const {
      element,
      event = "click",
      openMouseout = false,
      time = 300
    } = option;
    const state = {
      event,
      time,
      timer: null,
      openMouseout,
      element: document.querySelectorAll(element),
      elementParent: document.querySelectorAll(element)[0].parentNode,
      elementActive: {}
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
    const {
      element,
      event,
      elementParent,
      openMouseout
    } = this;
    element.forEach((item2) => {
      if (item2.classList.contains("active")) {
        this.elementActive.node = item2;
      }
      item2.addEventListener(event, () => {
        this.setClass(item2);
      });
    });
    if (openMouseout) {
      elementParent.addEventListener("mouseout", this.debounce(this.initClass, this.time));
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
      if (this.timer)
        clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        fn.apply(this, args);
      }, time);
    };
  }
  removeClass() {
    const {
      element
    } = this;
    element.forEach((item2) => {
      if (item2.classList.contains("active")) {
        item2.classList.remove("active");
      }
    });
  }
  setClass(item2) {
    if (this.timer)
      clearTimeout(this.timer);
    const {
      elementParent
    } = this;
    elementParent.style.setProperty("--x", item2.offsetLeft + "px");
    elementParent.style.setProperty("--w", item2.offsetWidth + "px");
    this.removeClass();
    item2.classList.add("active");
  }
  initClass() {
    const {
      elementParent,
      elementActive: {
        node,
        x,
        w
      }
    } = this;
    elementParent.style.setProperty("--x", x + "px");
    elementParent.style.setProperty("--w", w + "px");
    this.removeClass();
    node.classList.add("active");
  }
}
const nav1 = "_nav1_1pmlq_6";
const nav2 = "_nav2_1pmlq_10";
const flex = "_flex_1pmlq_15";
const item = "_item_1pmlq_27";
const style = {
  nav1,
  nav2,
  flex,
  item
};
function Index() {
  reactExports.useEffect(() => {
    new FollowArrow({
      element: `.${style.nav1} .${style.item}`,
      event: "mouseover",
      //  click  || mouseover   **/ default click
      openMouseout: true,
      //  open mouseout         **/ default true
      time: 500
      //       **/ default 300
    });
    new FollowArrow({
      element: `.${style.nav2} .${style.item}`,
      event: "click",
      //  click  || mouseover   **/ default click
      openMouseout: true,
      //  open mouseout         **/ default true
      time: 500
      //       **/ default 300
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.flex
  }, /* @__PURE__ */ React.createElement("h5", null, "mouseover:"), /* @__PURE__ */ React.createElement("nav", {
    className: style.nav1
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "美利坚合众国"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "大韩民国"), /* @__PURE__ */ React.createElement("div", {
    className: `${style.item} active`
  }, "大不列颠及北爱尔兰联合王国"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "新西兰"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "澳大利亚联邦"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "日本国"), /* @__PURE__ */ React.createElement("i", null))), /* @__PURE__ */ React.createElement("div", {
    className: style.flex
  }, /* @__PURE__ */ React.createElement("h5", null, "click:"), /* @__PURE__ */ React.createElement("nav", {
    className: style.nav2
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "美利坚合众国"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "大韩民国"), /* @__PURE__ */ React.createElement("div", {
    className: `${style.item} active`
  }, "大不列颠及北爱尔兰联合王国"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "新西兰"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "澳大利亚联邦"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "日本国"), /* @__PURE__ */ React.createElement("i", null))));
}
export {
  Index as default
};
