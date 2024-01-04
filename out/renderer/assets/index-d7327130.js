import { r as reactExports, R as React } from "./index-861f41a7.js";
import { R as Row, a as Radio } from "./row-e3580c4f.js";
import "./pickAttrs-80e333b2.js";
const wrapperRef = "_wrapperRef_1wy0u_1";
const content = "_content_1wy0u_8";
const list = "_list_1wy0u_1";
const horizontal = "_horizontal_1wy0u_20";
const item = "_item_1wy0u_24";
const horizontalRuning = "_horizontalRuning_1wy0u_28";
const style = {
  wrapperRef,
  content,
  list,
  horizontal,
  item,
  horizontalRuning
};
class NoticeLoopScroll {
  constructor(option) {
    for (let key in option) {
      this[key] = option[key];
    }
    if (!this.state && this.direction == "horizontal") {
      this.result = [...this.result, ...this.result];
    } else {
      this.result[this.result.length] = this.result[0];
    }
    this.init();
    this.renderKeyframes();
  }
  init() {
    let html = "";
    this.result.forEach((element) => {
      html += `<div class="${style.item}">${element}</div>`;
    });
    this.element.innerHTML = html;
    this.element.style.animationName = this.name;
    if (this.direction == "horizontal") {
      this.element.className = style.horizontal;
      if (!this.state) {
        this.element.className = `${style.horizontal} ${style.horizontalRuning}`;
      }
    } else {
      this.element.className = "";
    }
  }
  renderPauseTransform(text = "") {
    const len = this.result.length;
    const point = 100 / len;
    const space = len * 2 - 1;
    const spacePoint = 100 / space;
    const spaceList = [];
    for (let i = 0; i < space; i++) {
      spaceList.push(spacePoint * i);
    }
    spaceList.push(100);
    for (let i = 0; i < len; i++) {
      const iPoint = this.direction == "horizontal" ? i * 100 : i * point;
      const direction = () => {
        return this.direction == "horizontal" ? `(-${iPoint}%,0,0)` : `(0,-${iPoint}%,0)`;
      };
      text += `${spaceList[i * 2 ? i * 2 : 0]}% { transform:translate3d${direction()}}${spaceList[i * 2 ? i * 2 + 1 : 1]}% { transform:translate3d${direction()}}`;
    }
    return text;
  }
  renderRunningTransform(text = "") {
    const len = this.result.length;
    const space = 100 / (len - 1);
    const point = 100 / len;
    for (let i = 0; i < len; i++) {
      const iPoint = i * point;
      text += `${i * space}% {transform:translate3d(0,-${iPoint}%,0)}`;
    }
    return text;
  }
  renderRunningHorizontalTransform() {
    return `0%{transform:translate3d(0,0%,0)}100%{transform:translate3d(-50%,0,0)}`;
  }
  renderKeyframes() {
    if (!this.styleSheet) {
      this.styleSheet = document.createElement("style");
      document.head.appendChild(this.styleSheet);
    }
    let renderTransform = "";
    if (!this.state && this.direction == "horizontal") {
      renderTransform = this.renderRunningHorizontalTransform();
    } else {
      renderTransform = this.state ? this.renderPauseTransform() : this.renderRunningTransform();
    }
    this.styleSheet.innerHTML = `@keyframes ${this.name} { ${renderTransform} }`;
  }
}
function Index() {
  const wrapperRef2 = reactExports.useRef();
  const [params, setParams] = reactExports.useState({
    direction: "vertical",
    state: 1
  });
  reactExports.useEffect(() => {
    const arr = ["项目1", "项目2", "项目3", "秋水共长天一色", "落霞与孤鹜齐飞"];
    new NoticeLoopScroll({
      ...params,
      element: wrapperRef2.current,
      name: "myAnimation",
      result: arr
    });
  }, [params]);
  return /* @__PURE__ */ React.createElement("section", null, /* @__PURE__ */ React.createElement(Row, null, "方向：", /* @__PURE__ */ React.createElement(Radio.Group, {
    onChange: (e) => {
      setParams({
        ...params,
        direction: e.target.value ? "vertical" : "horizontal"
      });
    },
    defaultValue: 1
  }, /* @__PURE__ */ React.createElement(Radio, {
    value: 0
  }, "横向"), /* @__PURE__ */ React.createElement(Radio, {
    value: 1
  }, "垂直"))), /* @__PURE__ */ React.createElement(Row, null, "状态：", /* @__PURE__ */ React.createElement(Radio.Group, {
    onChange: (e) => {
      setParams({
        ...params,
        state: e.target.value
      });
    },
    defaultValue: 1
  }, /* @__PURE__ */ React.createElement(Radio, {
    value: 0
  }, "连续"), /* @__PURE__ */ React.createElement(Radio, {
    value: 1
  }, "停留"))), /* @__PURE__ */ React.createElement("div", {
    style: {
      height: 30
    }
  }), /* @__PURE__ */ React.createElement("section", {
    className: style.wrapperRef
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.content
  }, /* @__PURE__ */ React.createElement("div", {
    ref: wrapperRef2,
    id: style.list
  }))));
}
export {
  Index as default
};
