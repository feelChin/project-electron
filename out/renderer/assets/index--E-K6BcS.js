import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
class Color {
  constructor(option) {
    this.startColor = option[0];
    this.endColor = option[1];
  }
  init() {
    return this.gradientColors(this.startColor, this.endColor, 100)[this.calculateDanage(0, 99)];
  }
  parseColor(hexStr) {
    return hexStr.length === 4 ? hexStr.substr(1).split("").map(function(s) {
      return 17 * parseInt(s, 16);
    }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function(s) {
      return parseInt(s, 16);
    });
  }
  pad(s) {
    return s.length === 1 ? "0" + s : s;
  }
  gradientColors(start, end, steps, gamma) {
    let ms, me, output = [], so = [];
    gamma = gamma || 1;
    let normalize = function(channel) {
      return Math.pow(channel / 255, gamma);
    };
    start = this.parseColor(start).map(normalize);
    end = this.parseColor(end).map(normalize);
    for (let i = 0; i < steps; i++) {
      ms = i / (steps - 1);
      me = 1 - ms;
      for (let j = 0; j < 3; j++) {
        so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
      }
      output.push("#" + so.join(""));
    }
    return output;
  }
  calculateDanage(min, max) {
    return Math.max(Math.floor(Math.random() * max) + 1, min);
  }
}
class Shell {
  constructor(data = ["#333", "#f3f3f3"]) {
    this.data = data;
    this.element = document.querySelectorAll("[shell]");
    this.config = {
      rootMargin: "0px",
      threshold: 0
    };
    this.init();
  }
  init() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.element.forEach((el) => {
        el.classList.add("isIe");
      });
      return;
    }
    const color = this.data;
    this.observer = new IntersectionObserver(function(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.style.setProperty("--bg", new Color(color).init());
          target.classList.add("active");
          const elReset = () => {
            target.classList.add("reset");
            target.removeEventListener("transitionend", elReset);
          };
          target.addEventListener("transitionend", elReset);
          this.unobserve(target);
        }
      });
    }, this.config);
    this.element.forEach((el) => {
      this.observer.observe(el);
    });
  }
}
const box = "_box_sl9p0_1";
const items = "_items_sl9p0_7";
const item = "_item_sl9p0_7";
const style = {
  box,
  items,
  item
};
function Index() {
  reactExports.useEffect(() => {
    new Shell();
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("section", {
    className: style.items
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    shell: "true"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20",
    alt: ""
  })), /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    shell: "true"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20",
    alt: ""
  })), /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    shell: "true"
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.RoeTrentinoSnow_ZH-CN3122890500_800x480.jpg&qlt=20",
    alt: ""
  }))));
}
export {
  Index as default
};
