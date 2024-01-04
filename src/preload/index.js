const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // 打开主窗口
  openMain: () => {
    ipcRenderer.send("window-init");
  },
  // 更新检查
  checkVersion: () => {
    ipcRenderer.send("window-checkVersion");
  },
  // 最小化窗口
  windowMin: () => {
    ipcRenderer.send("window-min");
  },
  // 关闭窗口
  windowClose: () => {
    ipcRenderer.send("window-close");
  },
  // 退出重新打开程序
  windowRestart: () => {
    ipcRenderer.send("restart-app");
  },
  // 监听消息
  getMessage: (callBack) => {
    ipcRenderer.on("message", (event, message) => {
      callBack(message);
    });
  },
  // 打开浏览器
  openBrowser: (val) => {
    function isDomainName(val) {
      const domainRegex =
        /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})$/;
      return domainRegex.test(val);
    }

    function containsHttpOrHttps(val) {
      const httpRegex = /(http|https)/;
      return httpRegex.test(val);
    }

    ipcRenderer.send(
      "open-browser",
      isDomainName(val)
        ? containsHttpOrHttps(val)
          ? val
          : `http://${val}`
        : `https://cn.bing.com/search?q=${val}`
    );
  },

  // 下载全量安装包
  windowDownload: () => {
    ipcRenderer.send("go-download");
  },
  // 下载增量安装包
  windowDownloadPart: () => {
    ipcRenderer.send("update-part");
  },
  // 下载增量安装包超时 网络连接中断
  windowDownloadPartDestroy: () => {
    ipcRenderer.send("request-update-destroy");
  },
  // 下载更新进度
  listenMessageDownload: (callBack) => {
    ipcRenderer.on("message-download", (event, message) => {
      callBack(message);
    });
  },
});
