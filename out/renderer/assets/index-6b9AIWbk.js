import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
import "./index-2YrWd7R0.js";
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
