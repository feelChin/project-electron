import { r as reactExports, R as React } from "./index-861f41a7.js";
import "./index-52ae2fe4.js";
const loading = "_loading_s992z_1";
const style = {
  loading
};
function Index() {
  reactExports.useEffect(() => {
    window.electron.checkVersion();
    window.electron.getMessage((message) => {
      console.log(message);
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.loading
  }, /* @__PURE__ */ React.createElement("div", {
    className: "skFadingCircle"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "skCircle"
  })));
}
export {
  Index as default
};
