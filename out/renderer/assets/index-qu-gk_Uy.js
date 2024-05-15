import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
let socket;
class MyWebSocket {
  constructor(url, callback) {
    socket = new WebSocket(`ws://${url}`);
    this.callback = callback;
    this.timer = null;
    this.timeOut = 1e4;
    socket.addEventListener("close", this.socketOnClose.bind(this));
    socket.addEventListener("error", this.socketOnError.bind(this));
    socket.addEventListener("message", this.socketOnMessage.bind(this));
    socket.addEventListener("open", this.socketOnOpen.bind(this));
  }
  resetHeartBeat() {
    clearTimeout(this.timer);
    this.startHeartCheck();
  }
  startHeartBeat() {
    this.timer = setTimeout(() => {
      socket.send("heartBeat");
    }, this.timeOut);
  }
  socketOnOpen() {
    console.log("连接成功");
  }
  socketOnClose(data) {
    console.log("连接关闭");
    this.callback(data);
  }
  socketOnError() {
    console.log("连接错误");
  }
  socketOnMessage(data) {
    this.callback(data);
  }
}
const WebSocketClose = () => {
  socket.close();
};
const WebSocketSend = (data) => {
  socket.send(data);
};
const WebSocketInit = (url, callback) => {
  new MyWebSocket(url, callback);
};
const websocket = "_websocket_wr5sx_1";
const websocketWrapper = "_websocketWrapper_wr5sx_5";
const item = "_item_wr5sx_10";
const buttonFlex = "_buttonFlex_wr5sx_13";
const style = {
  websocket,
  websocketWrapper,
  item,
  buttonFlex
};
function Index() {
  const [msgData, setMasData] = reactExports.useState([]);
  function sockenStart() {
    WebSocketInit("121.40.165.18:8800", (result) => {
      if (result.type === "close") {
        setMasData([...msgData, `${(/* @__PURE__ */ new Date()).toLocaleTimeString()} <br> websocket连接已关闭`]);
      } else {
        const dataArray = msgData;
        dataArray.push(result.data);
        setMasData([...dataArray]);
      }
    });
  }
  function renderItem() {
    return msgData.length > 0 && msgData.map((item2, index) => /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: style.item,
      dangerouslySetInnerHTML: {
        __html: item2
      }
    }));
  }
  return /* @__PURE__ */ React.createElement("section", {
    className: style.websocket
  }, /* @__PURE__ */ React.createElement("section", {
    className: style.websocketWrapper
  }, renderItem()), /* @__PURE__ */ React.createElement("section", {
    className: style.buttonFlex
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      sockenStart();
    }
  }, "开启连接"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      WebSocketSend();
    }
  }, "推送现在时间"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      WebSocketClose();
    }
  }, "关闭连接")));
}
export {
  Index as default
};
