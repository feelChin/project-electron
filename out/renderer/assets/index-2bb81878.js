import { r as reactExports, R as React } from "./index-861f41a7.js";
class Accordion {
  constructor(option) {
    const {
      element,
      elementBrother,
      event = "click",
      openMouseout = false
    } = option;
    const state = {
      event,
      openMouseout,
      height: new Array(),
      element: document.querySelectorAll(element),
      elementBrother: document.querySelectorAll(elementBrother)
    };
    for (let key in state) {
      this[key] = state[key];
    }
    this.init();
  }
  init() {
    const {
      element,
      elementBrother,
      openMouseout
    } = this;
    element.forEach((item2, index) => {
      if (!this.height[index]) {
        this.height[index] = elementBrother[index].children[0].offsetHeight;
      }
      item2.addEventListener(this.event, () => {
        this.judgeClass(item2, elementBrother[index], index);
      });
      if (openMouseout) {
        item2.addEventListener("mouseout", () => {
          this.removeClass(item2, elementBrother[index], index);
        });
      }
      if (item2.classList.contains("active")) {
        elementBrother[index].style.height = this.height[index] + "px";
      }
    });
  }
  initClass() {
    this.element.forEach((item2, index) => {
      item2.classList.remove("active");
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
    this.element.forEach((item2, index2) => {
      if (item2.classList.contains("active")) {
        this.removeClass(item2, this.elementBrother[index2]);
      }
    });
    element.classList.add("active");
    elementBrother.classList.add("active");
    elementBrother.style.height = this.height[index] + "px";
  }
  judgeClass(element, elementBrother, index) {
    element.classList.contains("active") ? this.removeClass(element, elementBrother) : this.setClass(element, elementBrother, index);
  }
}
const accordion = "_accordion_132zy_1";
const item = "_item_132zy_4";
const accordionHead = "_accordionHead_132zy_8";
const accordionContent = "_accordionContent_132zy_21";
const style = {
  accordion,
  item,
  accordionHead,
  accordionContent
};
function Index() {
  reactExports.useEffect(() => {
    new Accordion({
      event: "click",
      //  click  || mouseover
      openMouseout: false,
      // mouseout
      element: "." + style.accordionHead,
      elementBrother: "." + style.accordionContent
    });
  }, []);
  return /* @__PURE__ */ React.createElement("section", {
    className: style.accordion
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.accordionHead} `
  }, "苹果"), /* @__PURE__ */ React.createElement("div", {
    className: style.accordionContent
  }, /* @__PURE__ */ React.createElement("div", null, "苹果（Malus pumila Mill.），蔷薇科苹果属落叶乔木植物，茎干较高，小枝短而粗，呈圆柱形；叶片椭圆形，表面光滑，边缘有锯齿，叶柄粗壮；花朵较小呈伞状，淡粉色，表面有绒毛；果实较大，呈扁球形，果梗短粗；花期5月；果期7~10月"))), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.accordionHead
  }, "橘子"), /* @__PURE__ */ React.createElement("div", {
    className: style.accordionContent
  }, /* @__PURE__ */ React.createElement("div", null, "柑橘（Citrus reticulata Blanco）是芸香科柑橘属小乔木植物，分枝多，刺较少；叶片披针形，椭圆形或阔卵形；花单生或簇生，花柱细长；果实通常为扁圆形，果皮薄而光滑"))));
}
export {
  Index as default
};
