import { r as reactExports, R as React, _ as __vitePreload } from "./index-n8_yRRwO.js";
class ImgToVideo {
  constructor(imagesLength, imgModule, element, scrollElement) {
    this.imagesLength = imagesLength;
    this.imgModule = imgModule.sort((a, b) => a.match(/\d+/)[0] - b.match(/\d+/)[0]);
    this.element = element;
    this.scrollElement = scrollElement;
    this.canvas = element.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.imagesManager = [];
    this.scrollIndex = 0;
    this.scrolled = 0;
    this.currentIndex = 0;
    this.init();
  }
  init() {
    this.scrollElement.addEventListener("scroll", this.handleScroll.bind(this));
    this.loadImages();
  }
  async loadImages() {
    let _promise = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          this.imagesManager.push(img);
          resolve(img);
        };
      });
    };
    const promise = this.imgModule.map((i) => _promise(i));
    await Promise.all(promise);
    this.draw();
  }
  handleScroll() {
    const clientHeight = document.body.clientHeight;
    const scrollHeight = this.element.scrollHeight;
    const {
      top
    } = this.element.getBoundingClientRect();
    this.scrollIndex = Math.round(-top * 18 / (scrollHeight - clientHeight));
    this.scrolled = Math.min(Math.max(-top / (scrollHeight - clientHeight), 0), 1);
    if (this.scrollIndex >= 18) {
      this.scrollIndex = 18;
    }
    if (this.scrollIndex <= 0) {
      this.scrollIndex = 0;
    }
    this.run();
  }
  run() {
    this.raf = requestAnimationFrame(this.draw.bind(this));
  }
  draw() {
    if (this.currentIndex <= this.scrollIndex) {
      this.drawImages(this.imagesManager[this.currentIndex]);
      this.currentIndex + 1 < this.scrollIndex && this.currentIndex++;
    } else if (this.currentIndex >= this.scrollIndex) {
      this.drawImages(this.imagesManager[this.currentIndex]);
      this.currentIndex - 1 > this.scrollIndex && this.currentIndex--;
    }
  }
  drawImages(img) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }
}
const scroll = "_scroll_19l0c_1";
const wrapper = "_wrapper_19l0c_6";
const fixed = "_fixed_19l0c_11";
const text = "_text_19l0c_21";
const title = "_title_19l0c_33";
const style = {
  scroll,
  wrapper,
  fixed,
  text,
  title
};
function Index() {
  const [imgSrc, setImgSrc] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (imgSrc.length)
      new ImgToVideo(42, imgSrc, document.querySelector("." + style.wrapper), document.querySelector("." + style.scroll));
  }, [imgSrc]);
  reactExports.useEffect(() => {
    const loadImage = async () => {
      const importModule = await /* @__PURE__ */ Object.assign({ "./img/1.png": () => __vitePreload(() => import("./1-dwR4aNZr.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/10.png": () => __vitePreload(() => import("./10-TiV9a4vp.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/11.png": () => __vitePreload(() => import("./11-Gr8Fo1Qi.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/12.png": () => __vitePreload(() => import("./12-p_V4wEsq.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/13.png": () => __vitePreload(() => import("./13-7Icvzdmh.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/14.png": () => __vitePreload(() => import("./14-dZX56YE1.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/15.png": () => __vitePreload(() => import("./15-oEjFHv0W.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/16.png": () => __vitePreload(() => import("./16-DsMuJ1GI.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/17.png": () => __vitePreload(() => import("./17-CgkV5SG-.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/18.png": () => __vitePreload(() => import("./18-c8Kj1zcv.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/2.png": () => __vitePreload(() => import("./2-esc59pSB.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/3.png": () => __vitePreload(() => import("./3-3S4pd2lT.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/4.png": () => __vitePreload(() => import("./4-8J3R2EWH.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/5.png": () => __vitePreload(() => import("./5-0eU1MrDE.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/6.png": () => __vitePreload(() => import("./6-SgiYtDXp.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/7.png": () => __vitePreload(() => import("./7-qoVnbBs2.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/8.png": () => __vitePreload(() => import("./8-I9qrSzxp.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url), "./img/9.png": () => __vitePreload(() => import("./9-0ZDl_ZDc.js"), true ? __vite__mapDeps([]) : void 0, import.meta.url) });
      const allImg = Object.keys(importModule).map((item) => {
        return importModule[item]();
      });
      const _pormise = await Promise.all(allImg);
      setImgSrc(_pormise.map((item) => item.default));
    };
    loadImage();
  }, []);
  return /* @__PURE__ */ React.createElement("section", {
    className: style.scroll
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.fixed
  }, /* @__PURE__ */ React.createElement("canvas", null), /* @__PURE__ */ React.createElement("div", {
    className: style.text
  }, "滚动"))), /* @__PURE__ */ React.createElement("div", {
    className: style.title
  }, "结束"));
}
export {
  Index as default
};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}