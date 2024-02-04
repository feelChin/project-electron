import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
class LoadingImg {
  constructor() {
    this.config = {
      rootMargin: "0px",
      threshold: 0
    };
    this.init();
  }
  init() {
    this.observer = new IntersectionObserver(function(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          this.unobserve(img);
        }
      });
    }, this.config);
    document.querySelectorAll("[data-src]").forEach((el) => {
      this.observer.observe(el);
    });
  }
}
const box = "_box_1lcvn_1";
const style = {
  box
};
function Index() {
  reactExports.useEffect(() => {
    new LoadingImg();
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("img", {
    "data-src": "https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20",
    alt: ""
  }), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("img", {
    "data-src": "https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20",
    alt: ""
  }), /* @__PURE__ */ React.createElement("div", null), /* @__PURE__ */ React.createElement("img", {
    "data-src": "https://bing.com/th?id=OHR.RoeTrentinoSnow_ZH-CN3122890500_800x480.jpg&qlt=20",
    alt: ""
  }));
}
export {
  Index as default
};
