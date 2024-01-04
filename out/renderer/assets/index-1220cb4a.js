import { r as reactExports, R as React } from "./index-861f41a7.js";
const verificationCode = "_verificationCode_y39cg_1";
const numberWrapper = "_numberWrapper_y39cg_13";
const itemPosition = "_itemPosition_y39cg_17";
const itemNumBox = "_itemNumBox_y39cg_32";
const item = "_item_y39cg_17";
const style = {
  verificationCode,
  numberWrapper,
  itemPosition,
  itemNumBox,
  item
};
function Index$1() {
  const [codeArray, setCodeArray] = reactExports.useState(new Array(6).fill(""));
  const [codeArrayIndex, setCodeArrayIndex] = reactExports.useState(0);
  const [codeMsg, setCodeMsg] = reactExports.useState("请输入验证码");
  const inputRef = reactExports.useRef(null);
  const hanldeInputCodeChange = (e) => {
    if (codeArrayIndex === 6)
      return;
    const value = e.target.value;
    codeArray[codeArrayIndex] = value;
    setCodeArray([...codeArray]);
    setCodeArrayIndex(codeArrayIndex + 1);
  };
  reactExports.useEffect(() => {
    if (codeArrayIndex === 6) {
      if (codeArray.join("") === "123456") {
        setCodeMsg("验证成功");
      } else {
        setCodeMsg("验证失败");
      }
      setCodeArray(new Array(6).fill(""));
      setCodeArrayIndex(0);
    }
    if (!codeArrayIndex) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [codeArrayIndex]);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.verificationCode
  }, /* @__PURE__ */ React.createElement("h5", null, codeMsg), /* @__PURE__ */ React.createElement("p", null, "验证码已发送至您的手机 123456"), /* @__PURE__ */ React.createElement("div", {
    className: style.numberWrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.itemNumBox
  }, codeArray.map((item2, index) => {
    return /* @__PURE__ */ React.createElement("section", {
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: `${style.item} ${item2 ? "active" : ""}`
    }, item2));
  })), codeArrayIndex < 6 && /* @__PURE__ */ React.createElement("div", {
    className: style.itemPosition,
    style: {
      left: `${codeArrayIndex / 6 * 100}%`
    }
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    value: "",
    onChange: hanldeInputCodeChange,
    pattern: "[0-9]*",
    autoComplete: "one-time-code",
    inputMode: "numeric",
    maxLength: 6,
    ref: inputRef
  }))));
}
function Index() {
  return /* @__PURE__ */ React.createElement(Index$1, null);
}
export {
  Index as default
};
