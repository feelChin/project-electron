import { e as client, R as React, r as reactExports } from "./index-861f41a7.js";
const message = "";
let add, element, reactFiber, maxCount = 5, timeout = 3e3;
const _seed = () => {
  const time = Date.now();
  return time + (Math.random() * time).toFixed();
};
const _init = () => {
  return new Promise((resolve) => {
    if (!element) {
      element = document.createElement("div");
      element.className = "customMessage";
      element.style.setProperty("--time", timeout / 1e3 - 0.5 + "s");
      document.body.appendChild(element);
      reactFiber = client.createRoot(element);
      reactFiber.render(/* @__PURE__ */ React.createElement(RenderMessage, {
        resolve
      }));
    } else {
      resolve();
    }
  });
};
function RenderMessage(props) {
  const {
    resolve
  } = props;
  const [notices, setNotices] = reactExports.useState([]);
  function remove(notice) {
    const {
      key
    } = notice;
    setNotices((prevNotices) => prevNotices.filter(({
      key: itemKey
    }) => key !== itemKey));
  }
  add = (notice) => {
    setNotices((prevNotices) => [...prevNotices, notice]);
    setTimeout(() => {
      remove(notice);
    }, timeout);
  };
  reactExports.useEffect(() => {
    resolve();
    if (notices.length > maxCount) {
      const [firstNotice] = notices;
      remove(firstNotice);
    }
  }, [notices]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, notices.map((item2) => /* @__PURE__ */ React.createElement(MessageChild, item2)));
}
function MessageChild(props) {
  const {
    text,
    type
  } = props;
  return /* @__PURE__ */ React.createElement("div", {
    className: "message"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `icon ${type}`
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text"
  }, text));
}
const Message = {
  success: async (text) => {
    await _init();
    add({
      text,
      key: _seed(),
      type: "success"
    });
  },
  error: async (text) => {
    await _init();
    add({
      text,
      key: _seed(),
      type: "error"
    });
  }
};
const messageWrapper = "_messageWrapper_dilip_1";
const item = "_item_dilip_4";
const style = {
  messageWrapper,
  item
};
function Index() {
  return /* @__PURE__ */ React.createElement("section", {
    className: style.messageWrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    onClick: () => {
      Message.success("点击成功");
    }
  }, "成功"), /* @__PURE__ */ React.createElement("div", {
    className: style.item,
    onClick: () => {
      Message.error("点击失败");
    }
  }, "错误"));
}
export {
  Index as default
};
