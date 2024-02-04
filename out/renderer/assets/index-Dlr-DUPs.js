import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
function entrust(element5, callback) {
  const body = document.body;
  const _event = (e) => {
    let target = e.target;
    while (target != body) {
      if (!target.parentNode)
        return;
      const entrust2 = target.getAttribute("entrust");
      if (entrust2 === element5) {
        callback(target);
        break;
      }
      target = target.parentNode;
    }
  };
  body.addEventListener("click", _event);
}
const element = "_element_1krk4_1";
const element1 = "_element1_1krk4_7";
const element2 = "_element2_1krk4_13";
const element3 = "_element3_1krk4_19";
const element4 = "_element4_1krk4_25";
const box = "_box_1krk4_31";
const list = "_list_1krk4_35";
const style = {
  element,
  element1,
  element2,
  element3,
  element4,
  box,
  list
};
function Index() {
  const [info, setInfo] = reactExports.useState("");
  reactExports.useEffect(() => {
    entrust("element", (target) => {
      setInfo(`${target.getAttribute("content")}`);
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.element} ${style.element1}`,
    entrust: "element",
    content: "1"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.element} ${style.element2}`,
    entrust: "element",
    content: "2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.element} ${style.element3}`,
    entrust: "element",
    content: "3"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.element} ${style.element4}`,
    entrust: "element",
    content: "4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.text,
    entrust: "element",
    content: "内容"
  }, "内容"))))), /* @__PURE__ */ React.createElement("div", {
    className: style.list
  }, /* @__PURE__ */ React.createElement("h5", null, "输出："), /* @__PURE__ */ React.createElement("div", {
    className: style.text
  }, info)));
}
export {
  Index as default
};
