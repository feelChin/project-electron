import { BrowserWindow, ipcMain, shell } from "electron";
import { join } from "path";
import { variable } from "./base";

const createWindow = () => {
  return new Promise((resolve) => {
    variable.mainWindow = new BrowserWindow({
      width: 1024,
      height: 700,
      minWidth: 1024,
      minHeight: 700,
      frame: false,
      resizable: true,
      show: false,
      webPreferences: {
        devTools: true, // 调试 ctrl + shift + i
        preload: join(__dirname, "../preload/index.js"),
        sandbox: false,
      },
    });

    // 设置drag功能 关闭鼠标右键
    variable.mainWindow.hookWindowMessage(278, () => {
      variable.mainWindow.setEnabled(false);
      setTimeout(() => {
        variable.mainWindow.setEnabled(true);
      }, 100);

      return true;
    });

    if (process.env["ELECTRON_RENDERER_URL"]) {
      variable.mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    } else {
      variable.mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }

    function initEnd() {
      return new Promise((resolve) => {
        ipcMain.on("window-init", () => {
          resolve();
        });
      });
    }

    // 初始化显示
    variable.mainWindow.on("ready-to-show", async () => {
      await initEnd();
      variable.loadingWindow.close();
      variable.mainWindow.show();
      resolve();
    });

    ipcMain.on("window-min", () => {
      variable.mainWindow.hide();
    });

    ipcMain.on("window-close", () => {
      variable.mainWindow.close();
    });

    ipcMain.on("open-browser", (event, url) => {
      shell.openExternal(url);
    });
  });
};

export default createWindow;
