import { BrowserWindow } from "electron";
import { join } from "path";
import { variable } from "./base";

const createUpdate = (part) => {
  return new Promise(() => {
    variable.updateWindow = new BrowserWindow({
      width: 320,
      height: 220,
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
      variable.updateWindow.loadURL(
        process.env["ELECTRON_RENDERER_URL"] +
          `#/updatePage${part ? `?isPart=true` : ""}`
      );
    } else {
      variable.updateWindow.loadFile(
        join(__dirname, "../renderer/index.html"),
        {
          hash: `#/updatePage${part ? `?isPart=true` : ""}`,
        }
      );
    }

    variable.updateWindow.on("ready-to-show", () => {
      variable.loadingWindow.close();
      variable.updateWindow.show();
    });
  });
};

export default createUpdate;
