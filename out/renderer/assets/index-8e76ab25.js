import { r as reactExports, R as React, _ as __vitePreload } from "./index-861f41a7.js";
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
    this.scrollIndex = Math.round(-top * 42 / (scrollHeight - clientHeight));
    this.scrolled = Math.min(Math.max(-top / (scrollHeight - clientHeight), 0), 1);
    if (this.scrollIndex >= 42) {
      this.scrollIndex = 42;
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
      const importModule = await /* @__PURE__ */ Object.assign({ "./img/1.png": () => __vitePreload(() => import("./1-42670437.js"), true ? [] : void 0, import.meta.url), "./img/10.png": () => __vitePreload(() => import("./10-1a037c37.js"), true ? [] : void 0, import.meta.url), "./img/11.png": () => __vitePreload(() => import("./11-a6bc2813.js"), true ? [] : void 0, import.meta.url), "./img/12.png": () => __vitePreload(() => import("./12-ca5d9944.js"), true ? [] : void 0, import.meta.url), "./img/13.png": () => __vitePreload(() => import("./13-1a5dd053.js"), true ? [] : void 0, import.meta.url), "./img/14.png": () => __vitePreload(() => import("./14-64c8dcca.js"), true ? [] : void 0, import.meta.url), "./img/15.png": () => __vitePreload(() => import("./15-f2f4907e.js"), true ? [] : void 0, import.meta.url), "./img/16.png": () => __vitePreload(() => import("./16-b53bc6db.js"), true ? [] : void 0, import.meta.url), "./img/17.png": () => __vitePreload(() => import("./17-7ca21c6b.js"), true ? [] : void 0, import.meta.url), "./img/18.png": () => __vitePreload(() => import("./18-2f168723.js"), true ? [] : void 0, import.meta.url), "./img/19.png": () => __vitePreload(() => import("./19-41a0f76e.js"), true ? [] : void 0, import.meta.url), "./img/2.png": () => __vitePreload(() => import("./2-7530f04e.js"), true ? [] : void 0, import.meta.url), "./img/20.png": () => __vitePreload(() => import("./20-887f9951.js"), true ? [] : void 0, import.meta.url), "./img/21.png": () => __vitePreload(() => import("./21-9ea711f5.js"), true ? [] : void 0, import.meta.url), "./img/22.png": () => __vitePreload(() => import("./22-94cd9f36.js"), true ? [] : void 0, import.meta.url), "./img/23.png": () => __vitePreload(() => import("./23-b463847e.js"), true ? [] : void 0, import.meta.url), "./img/24.png": () => __vitePreload(() => import("./24-6da3f206.js"), true ? [] : void 0, import.meta.url), "./img/25.png": () => __vitePreload(() => import("./25-bb351a99.js"), true ? [] : void 0, import.meta.url), "./img/26.png": () => __vitePreload(() => import("./26-c3e4ba2f.js"), true ? [] : void 0, import.meta.url), "./img/27.png": () => __vitePreload(() => import("./27-6e3e8325.js"), true ? [] : void 0, import.meta.url), "./img/28.png": () => __vitePreload(() => import("./28-b48b8026.js"), true ? [] : void 0, import.meta.url), "./img/29.png": () => __vitePreload(() => import("./29-1b2f7583.js"), true ? [] : void 0, import.meta.url), "./img/3.png": () => __vitePreload(() => import("./3-85c8f4ee.js"), true ? [] : void 0, import.meta.url), "./img/30.png": () => __vitePreload(() => import("./30-66b012fc.js"), true ? [] : void 0, import.meta.url), "./img/31.png": () => __vitePreload(() => import("./31-c22d23e9.js"), true ? [] : void 0, import.meta.url), "./img/32.png": () => __vitePreload(() => import("./32-a3189add.js"), true ? [] : void 0, import.meta.url), "./img/33.png": () => __vitePreload(() => import("./33-6014a1e0.js"), true ? [] : void 0, import.meta.url), "./img/34.png": () => __vitePreload(() => import("./34-9f751089.js"), true ? [] : void 0, import.meta.url), "./img/35.png": () => __vitePreload(() => import("./35-db749db4.js"), true ? [] : void 0, import.meta.url), "./img/36.png": () => __vitePreload(() => import("./36-dbe72334.js"), true ? [] : void 0, import.meta.url), "./img/37.png": () => __vitePreload(() => import("./37-aaa334fb.js"), true ? [] : void 0, import.meta.url), "./img/38.png": () => __vitePreload(() => import("./38-bd1e4efe.js"), true ? [] : void 0, import.meta.url), "./img/39.png": () => __vitePreload(() => import("./39-69d6010c.js"), true ? [] : void 0, import.meta.url), "./img/4.png": () => __vitePreload(() => import("./4-84b4c25b.js"), true ? [] : void 0, import.meta.url), "./img/40.png": () => __vitePreload(() => import("./40-586e396f.js"), true ? [] : void 0, import.meta.url), "./img/41.png": () => __vitePreload(() => import("./41-3f2f44d5.js"), true ? [] : void 0, import.meta.url), "./img/42.png": () => __vitePreload(() => import("./42-81dd0416.js"), true ? [] : void 0, import.meta.url), "./img/5.png": () => __vitePreload(() => import("./5-f6babfce.js"), true ? [] : void 0, import.meta.url), "./img/6.png": () => __vitePreload(() => import("./6-e9d5bb94.js"), true ? [] : void 0, import.meta.url), "./img/7.png": () => __vitePreload(() => import("./7-309b8350.js"), true ? [] : void 0, import.meta.url), "./img/8.png": () => __vitePreload(() => import("./8-dddfedda.js"), true ? [] : void 0, import.meta.url), "./img/9.png": () => __vitePreload(() => import("./9-3bd4de28.js"), true ? [] : void 0, import.meta.url) });
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
