import { R as React } from "./index-n8_yRRwO.js";
const img = "_img_xhj8m_1";
const search = "_search_xhj8m_8";
const style = {
  img,
  search
};
function Index() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: style.img
  }), /* @__PURE__ */ React.createElement("section", {
    className: style.search
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    onKeyDown: (e) => {
      const value = e.target.value;
      if (value && e.keyCode === 13) {
        window.electron.openBrowser(value);
      }
    },
    placeholder: "搜索网页"
  })));
}
export {
  Index as default
};
