import { BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import { variable } from "./base";
import { updater, updaterPart } from "./updateCheck";

const createLoading = () => {
  return new Promise((resolve) => {
    variable.loadingWindow = new BrowserWindow({
      width: 120,
      height: 120,
      frame: false,
      transparent: true,
      resizable: false,
      webPreferences: {
        devTools: true, // 调试 ctrl + shift + i
        preload: join(__dirname, "../preload/index.js"),
        sandbox: false,
      },
    });

    if (process.env["ELECTRON_RENDERER_URL"]) {
      variable.loadingWindow.loadURL(
        process.env["ELECTRON_RENDERER_URL"] + "#/loadingPage"
      );
    } else {
      variable.loadingWindow.loadFile(
        join(__dirname, "../renderer/index.html"),
        {
          hash: "#/loadingPage",
        }
      );
    }

    variable.loadingWindow.show();

    ipcMain.on("window-checkVersion", async () => {
      await updater(); // 全量更新检查;
      await updaterPart(); // 增量更新检查;
      resolve();
    });
  });
};

export default createLoading;
