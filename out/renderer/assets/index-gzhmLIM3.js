import { R as React, r as reactExports } from "./index-D_CyF5zi.js";
function fixedZero(value) {
  return value < 10 ? `0${value}` : value;
}
const initTime = (value, now) => {
  let targetTime;
  if (Object.prototype.toString.call(value) === "[object Date]") {
    targetTime = value.getTime();
  } else {
    targetTime = new Date(value).getTime();
  }
  const count = targetTime - now;
  return count > 0 ? count : 0;
};
function TimeCountDown(props) {
  const timer = reactExports.useRef();
  const interval = 1e3;
  const {
    time,
    onEnd,
    type,
    nowTime = /* @__PURE__ */ new Date()
  } = props;
  const [lastTime, setLasttime] = reactExports.useState(initTime(time, nowTime.getTime()));
  reactExports.useEffect(() => {
    setLasttime(initTime(time, nowTime.getTime()));
  }, [time]);
  function defaultFormat(time2) {
    const hours = 60 * 60 * 1e3;
    const minutes = 60 * 1e3;
    const h = Math.floor(time2 / hours);
    const m = Math.floor((time2 - h * hours) / minutes);
    const s = Math.floor((time2 - h * hours - m * minutes) / 1e3);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, type === "simple" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, fixedZero(h)), /* @__PURE__ */ React.createElement("small", null, "时"), /* @__PURE__ */ React.createElement("span", null, fixedZero(m)), /* @__PURE__ */ React.createElement("small", null, "分"), /* @__PURE__ */ React.createElement("span", null, fixedZero(s)), /* @__PURE__ */ React.createElement("small", null, "秒")) : /* @__PURE__ */ React.createElement("span", null, fixedZero(h), ":", fixedZero(m), ":", fixedZero(s)));
  }
  reactExports.useEffect(() => {
    if (lastTime < interval) {
      setLasttime(0);
      onEnd && onEnd();
      return;
    }
    timer.current = setTimeout(() => {
      setLasttime(lastTime - interval);
    }, interval);
    return () => {
      clearTimeout(timer.current);
    };
  }, [lastTime, onEnd]);
  return /* @__PURE__ */ React.createElement("section", {
    className: "timeCountDown"
  }, lastTime ? defaultFormat(lastTime) : "");
}
const TimeCountDown$1 = React.memo(TimeCountDown);
const timeCountDown = "_timeCountDown_1522f_1";
const style = {
  timeCountDown
};
function Index() {
  const [state] = reactExports.useState((/* @__PURE__ */ new Date()).getTime() + 1e4);
  const [text, setText] = reactExports.useState("");
  function onEnd() {
    setText("倒计时已结束");
  }
  return /* @__PURE__ */ React.createElement("section", {
    className: `${style.timeCountDown} page`
  }, /* @__PURE__ */ React.createElement(TimeCountDown$1, {
    nowTime: /* @__PURE__ */ new Date(),
    onEnd,
    time: state
  }), /* @__PURE__ */ React.createElement("p", null, text || "正在倒计时"));
}
export {
  Index as default
};
