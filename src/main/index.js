import { app, BrowserWindow, ipcMain } from "electron";
import createLoading from "./loading";
import createWindow from "./main";
import createTray from "./tray";

Object.defineProperty(app, "isPackaged", {
  get() {
    return true;
  },
});

app.on("ready", async () => {
  await createLoading();
  await createWindow();

  createTray();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 在最后一个窗口关闭时退出应用程序
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("restart-app", () => {
  app.relaunch();
  app.quit();
});
