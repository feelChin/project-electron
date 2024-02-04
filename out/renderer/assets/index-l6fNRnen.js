import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
class SplitText {
  constructor() {
    this.element = document.querySelectorAll("[splitText]");
    this.config = {
      rootMargin: "0px",
      threshold: 0
    };
    this.setText();
    this.init();
  }
  init() {
    this.observer = new IntersectionObserver(function(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          item.classList.add("active");
          this.unobserve(item);
        }
      });
    }, this.config);
    this.element.forEach((el) => {
      this.observer.observe(el);
    });
  }
  setText() {
    this.element.forEach((item) => {
      let flag = false, delay = parseInt(item.getAttribute("delay")) || 200, delayGap = parseInt(item.getAttribute("delayGap")) || 50, bool = item.getAttribute("random") || false, arr = item.innerHTML.replace(/<br>/g, "\n").replace(/<i>/g, "\\").replace(/<\/i>/g, "	").replace(/&amp;/g, "&").split("");
      item.innerHTML = "";
      arr.forEach((letter, i) => {
        let span = document.createElement("span"), random = 1;
        if (letter.indexOf("\n") >= 0) {
          let br = document.createElement("br"), fragment = document.createDocumentFragment();
          fragment.appendChild(br);
          item.appendChild(fragment);
          return;
        }
        if (letter.indexOf("\\") >= 0) {
          flag = true;
          return;
        }
        if (letter.indexOf("	") >= 0) {
          flag = false;
          return;
        }
        if (flag) {
          span.className = "letters";
        }
        if (bool) {
          random = Math.random();
        }
        delay += delayGap;
        span.style.animationDelay = delay * random + "ms";
        span.innerHTML = letter;
        let fragments = document.createDocumentFragment();
        fragments.appendChild(span);
        item.appendChild(fragments);
      });
    });
  }
}
const box = "_box_15gxb_1";
const element = "_element_15gxb_14";
const textAni = "_textAni_15gxb_1";
const style = {
  box,
  element,
  textAni
};
function Index() {
  reactExports.useEffect(() => {
    new SplitText();
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.element,
    splitText: "splitText",
    random: "true"
  }, "此情可待成追忆"), /* @__PURE__ */ React.createElement("div", {
    className: style.element,
    splitText: "splitText",
    delay: 1e3
  }, "当时只道是寻常"), /* @__PURE__ */ React.createElement("div", {
    className: style.element,
    splitText: "splitText",
    delayGap: 250
  }, "人生若只如初见"), /* @__PURE__ */ React.createElement("div", {
    className: style.element,
    splitText: "splitText"
  }, /* @__PURE__ */ React.createElement("i", null, "花"), "飞花谢花满天，", /* @__PURE__ */ React.createElement("br", null), "红消香断有谁", /* @__PURE__ */ React.createElement("i", null, "怜")));
}
export {
  Index as default
};
