let socket;

class MyWebSocket {
  constructor(url, callback) {
    socket = new WebSocket(`ws://${url}`);

    this.callback = callback;
    this.timer = null;
    this.timeOut = 10000;

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

export const WebSocketClose = () => {
  socket.close();
};

export const WebSocketSend = (data) => {
  socket.send(data);
};

export const WebSocketInit = (url, callback) => {
  new MyWebSocket(url, callback);
};
