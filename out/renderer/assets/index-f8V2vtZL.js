import { R as React } from "./index-D_CyF5zi.js";
const home = "_home_13kmb_1";
const search = "_search_13kmb_8";
const style = {
  home,
  search
};
function Index() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: style.home
  }, /* @__PURE__ */ React.createElement("section", {
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
  }))));
}
export {
  Index as default
};
