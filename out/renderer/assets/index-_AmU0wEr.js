import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
const getParam = (data, result = "") => {
  const url = window.location.href;
  if (url.indexOf(data) === -1) {
    return null;
  }
  let params = url.split("?");
  if (params[1].indexOf("&") > -1) {
    params = params[1].split("&");
  }
  try {
    params.forEach((item) => {
      if (item.indexOf(data + "=") > -1) {
        result = item.replace(data + "=", "");
        throw Error();
      }
    });
  } catch {
  }
  return result;
};
const update = "_update_1l573_1";
const updatePool = "_updatePool_1l573_10";
const r = "_r_1l573_1";
const text = "_text_1l573_52";
const updateErr = "_updateErr_1l573_66";
const t = "_t_1l573_52";
const style = {
  update,
  updatePool,
  r,
  text,
  updateErr,
  t
};
function Index() {
  const isPart = getParam("isPart");
  const progressRef = reactExports.useRef(0);
  const prevProgressRef = reactExports.useRef(0);
  const [state, setState] = reactExports.useState(true);
  const [progress, setProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    window.electron.listenMessageDownload(({
      percent
    }) => {
      progressRef.current = percent.toFixed(2);
      setProgress(progressRef.current);
    });
    window.electron.getMessage((message) => {
      console.log(message);
      if (message === "更新错误") {
        setState(false);
      }
    });
  }, []);
  reactExports.useEffect(() => {
    if (!state)
      return;
    setProgress(0);
    isPart ? window.electron.windowDownloadPart() : window.electron.windowDownload();
    let timer = setInterval(() => {
      if (progressRef.current === prevProgressRef.current) {
        setState(false);
        isPart && window.electron.windowDownloadPartDestroy();
      } else {
        prevProgressRef.current = progressRef.current;
      }
    }, 6e3);
    return () => {
      clearInterval(timer);
    };
  }, [state]);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.update
  }, state ? /* @__PURE__ */ React.createElement("div", {
    className: style.updatePool,
    style: {
      "--top": progress + "%"
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.text
  }, isPart ? "增量  " : "全量  ", progress, "%")) : /* @__PURE__ */ React.createElement("div", {
    className: style.updateErr
  }, /* @__PURE__ */ React.createElement("h5", null, "更新失败"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      setState(true);
    }
  }, /* @__PURE__ */ React.createElement("span", null, "请重试"))));
}
export {
  Index as default
};
