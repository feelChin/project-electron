import { r as reactExports, R as React } from "./index-861f41a7.js";
class Aninum {
  constructor({
    start,
    end,
    delay,
    element
  }) {
    this.pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.start = start;
    this.end = end;
    this.delay = delay;
    this.element = document.querySelector(element);
    this.element.innerHTML = this.start > this.end ? this.start : this.end;
    const {
      width,
      height
    } = getComputedStyle(this.element);
    this.element_width = width;
    this.element.style.width = width;
    this.element_height = height;
    this.element.style.height = height;
    this.init();
    this.compute();
    this.animationEnd();
  }
  init() {
    let space_key = String(this.start).length - String(this.end).length;
    let zero = "0".repeat(Math.abs(space_key));
    if (space_key !== 0 && space_key > 0) {
      this.end = zero + this.end;
    } else {
      this.start = zero + this.start;
    }
    this.start_arr = String(this.start).split("");
    this.end_arr = String(this.end).split("");
  }
  compute() {
    let result = "";
    this.start_arr.forEach((start_key, index) => {
      const end_key = Number(this.end_arr[index]);
      let html = "";
      let render_arr = "";
      if (end_key > start_key) {
        render_arr = this.pool.slice(start_key, end_key + 1);
      }
      if (end_key < start_key) {
        render_arr = this.pool.slice(start_key).concat(this.pool.slice(0, end_key + 1));
      }
      if (end_key == start_key) {
        render_arr = [end_key];
      }
      render_arr.forEach((item) => {
        html += `<i>${item}</i>`;
      });
      result += `<div class="num_ani_item" style="width:${100 / this.start_arr.length}%;"><div class="num_ani_item_wrapper" style="--num:${render_arr.length - 1};--h:${this.element_height};--delay:${this.delay * index + 1}">${html}</div ></div >`;
    });
    this.element.innerHTML = result;
  }
  animationEnd() {
    this.aniEndKey = 0;
    this.fn = () => {
      this.aniEndKey++;
      if (this.aniEndKey == this.end_arr.length) {
        this.element.removeAttribute("style");
        this.element.innerHTML = Number(this.end);
        this.element.removeEventListener("animationend", this.fn);
      }
    };
    this.element.addEventListener("animationend", this.fn);
  }
  unload() {
    this.element.removeAttribute("style");
    this.element.innerHTML = Number(this.end);
    this.element.removeEventListener("animationend", this.fn);
  }
}
const box = "_box_msinn_1";
const render = "_render_msinn_8";
const flex = "_flex_msinn_11";
const text = "_text_msinn_14";
const ani = "_ani_msinn_1";
const style = {
  box,
  render,
  flex,
  text,
  ani
};
function Index() {
  const the = reactExports.useRef({
    start: 123456,
    end: 756842,
    fn: null
  });
  function start() {
    the.current.fn?.unload();
    if (the.current.fn) {
      the.current.fn = null;
    }
    the.current.fn = new Aninum({
      element: ".num_ani",
      start: the.current.start,
      end: the.current.end,
      delay: 0.5
    });
  }
  reactExports.useEffect(() => {
    start();
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.render
  }, /* @__PURE__ */ React.createElement("div", {
    className: "num_ani"
  }, the.current.start)), /* @__PURE__ */ React.createElement("div", {
    className: style.flex
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.text
  }, "开始：", /* @__PURE__ */ React.createElement("input", {
    onChange: (e) => {
      the.current.start = e.target.value;
    },
    type: "number",
    defaultValue: the.current.start,
    min: 0,
    max: 999999
  })), /* @__PURE__ */ React.createElement("div", {
    className: style.text
  }, "结束：", /* @__PURE__ */ React.createElement("input", {
    onChange: (e) => {
      the.current.end = e.target.value;
    },
    type: "number",
    defaultValue: the.current.end,
    min: 0,
    max: 999999
  })), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      start();
    }
  }, "开始")));
}
export {
  Index as default
};
