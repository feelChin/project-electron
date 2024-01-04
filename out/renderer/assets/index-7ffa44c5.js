import { r as reactExports, R as React } from "./index-861f41a7.js";
class VisItemAni {
  constructor({
    content
  }) {
    const clientHeight = document.documentElement.clientHeight;
    this.theScrollWrapper = document.querySelector(content) || window;
    const state = {
      clientHeight,
      observer: null,
      current: document.querySelectorAll("[visitem]"),
      config: {
        rootMargin: clientHeight + "px",
        threshold: 0
      }
    };
    for (let key in state) {
      this[key] = state[key];
    }
    this.init();
    this.handleScroll = this.handleScroll.bind(this);
    this.theScrollWrapper.addEventListener("resize", () => {
      const newClientHeight = document.documentElement.clientHeight;
      this.clientHeight = newClientHeight;
      this.config.rootMargin = newClientHeight + "px";
    });
  }
  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const speed = target.getAttribute("speed") || 2;
        const {
          top,
          height
        } = target.getBoundingClientRect();
        const scrollTop = target.scrollTop;
        const option = {
          target,
          top,
          height,
          scrollTop,
          speed,
          clientHeight: this.clientHeight
        };
        if (entry.isIntersecting) {
          const handleScroll = () => {
            this.handleScroll(option);
          };
          this.theScrollWrapper.addEventListener("resize", handleScroll);
          this.theScrollWrapper.addEventListener("scroll", handleScroll);
          handleScroll();
        }
      });
    }, this.config);
    this.current.forEach((el) => {
      this.observer.observe(el);
    });
  }
  setValue(option) {
    const {
      top,
      height,
      scrollTop,
      speed,
      clientHeight
    } = option;
    if (height > clientHeight) {
      return Math.min(Math.max((scrollTop - top) / (height - clientHeight), 0) * speed, 1);
    } else {
      return Math.min(Math.max((scrollTop + clientHeight - top) / (clientHeight + height) * speed, 0), 1);
    }
  }
  setScrolled(option) {
    option.target.style.setProperty(`--scrolled`, `${this.setValue(option)}`);
  }
  handleScroll(option) {
    option.top = option.target.getBoundingClientRect().top;
    requestAnimationFrame(() => {
      this.setScrolled(option);
    });
  }
}
const box = "_box_zas65_1";
const item = "_item_zas65_6";
const place = "_place_zas65_11";
const img = "_img_zas65_14";
const img1 = "_img1_zas65_20";
const img2 = "_img2_zas65_23";
const img3 = "_img3_zas65_33";
const style = {
  box,
  item,
  place,
  img,
  img1,
  img2,
  img3
};
function Index() {
  reactExports.useEffect(() => {
    new VisItemAni({
      content: "." + style.box
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.place
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    visitem: "true"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.img} ${style.img1}`
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20",
    alt: ""
  }))), /* @__PURE__ */ React.createElement("div", {
    className: style.place
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    visitem: "true",
    speed: "1"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.img} ${style.img2}`
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20",
    alt: ""
  }))), /* @__PURE__ */ React.createElement("div", {
    className: style.place
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    visitem: "true"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.img} ${style.img3}`
  }, /* @__PURE__ */ React.createElement("img", {
    src: "https://bing.com/th?id=OHR.RoeTrentinoSnow_ZH-CN3122890500_800x480.jpg&qlt=20",
    alt: ""
  }))), /* @__PURE__ */ React.createElement("div", {
    className: style.place
  }));
}
export {
  Index as default
};
