"use strict";
const electron = require("electron");
const path = require("path");
const variable = {
  loadingWindow: "",
  mainWindow: ""
};
const createUpdate = (part) => {
  return new Promise(() => {
    variable.updateWindow = new electron.BrowserWindow({
      width: 320,
      height: 220,
      frame: false,
      transparent: true,
      resizable: false,
      webPreferences: {
        devTools: true,
        // 调试 ctrl + shift + i
        preload: path.join(__dirname, "../preload/index.js"),
        sandbox: false
      }
    });
    if (process.env["ELECTRON_RENDERER_URL"]) {
      variable.updateWindow.loadURL(
        process.env["ELECTRON_RENDERER_URL"] + `#/updatePage${part ? `?isPart=true` : ""}`
      );
    } else {
      variable.updateWindow.loadFile(
        path.join(__dirname, "../renderer/index.html"),
        {
          hash: `#/updatePage${part ? `?isPart=true` : ""}`
        }
      );
    }
    variable.updateWindow.on("ready-to-show", () => {
      variable.loadingWindow.close();
      variable.updateWindow.show();
    });
  });
};
const fs = require("fs");
const AdmZip = require("adm-zip");
const https = require("https");
const { autoUpdater } = require("electron-updater");
const updater = () => {
  return new Promise((resolve) => {
    if (process.env["ELECTRON_RENDERER_URL"]) {
      resolve();
    } else {
      autoUpdater.checkForUpdates();
    }
    autoUpdater.autoDownload = false;
    autoUpdater.setFeedURL("https://www-dev.zzjiasuqi.com/electron");
    function sendStatusToWindow(text) {
      variable.updateWindow.webContents.send("message", text);
    }
    electron.ipcMain.on("go-download", () => {
      sendStatusToWindow("发起更新");
      autoUpdater.downloadUpdate().then(() => sendStatusToWindow("发起更新成功...")).catch(() => sendStatusToWindow("发起更新失败..."));
    });
    autoUpdater.on("checking-for-update", () => {
      sendStatusToWindow("Checking for update...");
    });
    autoUpdater.on("update-available", () => {
      createUpdate();
    });
    autoUpdater.on("update-not-available", () => {
      resolve();
    });
    autoUpdater.on("error", (err) => {
      sendStatusToWindow(err);
      sendStatusToWindow("更新错误");
    });
    autoUpdater.on("download-progress", (progressObj) => {
      variable.updateWindow.webContents.send("message-download", progressObj);
    });
    autoUpdater.on("update-downloaded", (info) => {
      sendStatusToWindow(info);
      autoUpdater.quitAndInstall();
    });
  });
};
const updaterPart = () => {
  return new Promise((resolve) => {
    if (process.env["ELECTRON_RENDERER_URL"]) {
      resolve();
    } else {
      checkVersionPart();
    }
    function checkVersionPart() {
      const request = https.get(`${"https://www-dev.zzjiasuqi.com/electron"}/version.json`, (res) => {
        let data = "";
        variable.loadingWindow.webContents.send(
          "message",
          `${"https://www-dev.zzjiasuqi.com/electron"}/version.json`
        );
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          const onlineVersion = JSON.parse(data);
          fs.readFile(
            path.join(__dirname, "../../../version.json"),
            (err, data2) => {
              if (err) {
                variable.loadingWindow.webContents.send(
                  "message",
                  "读取失败"
                );
                variable.loadingWindow.webContents.send("message", err);
              }
              const offlineVersion = data2 ? JSON.parse(data2.toString()) : onlineVersion;
              if (onlineVersion.data === offlineVersion.data) {
                resolve();
              } else {
                createUpdate(true);
              }
            }
          );
        });
      }).on("error", (err) => {
        variable.loadingWindow.webContents.send("message", 213132);
        variable.loadingWindow.webContents.send("message", err);
        request.destroy();
      });
      request.end();
    }
    electron.ipcMain.on("update-part", () => {
      const fileUrl = `${"https://www-dev.zzjiasuqi.com/electron"}/app.zip`;
      const filePath = path.join(electron.app.getPath("userData"), "app.zip");
      const file = fs.createWriteStream(filePath);
      const request = https.get(fileUrl, (response) => {
        const fileSize = parseInt(response.headers["content-length"], 10);
        let downloadedSize = 0;
        let progress = 0;
        let timer;
        response.on("data", (data) => {
          downloadedSize += data.length;
          if (!timer) {
            timer = setTimeout(() => {
              progress = downloadedSize / fileSize * 100;
              variable.updateWindow.webContents.send("message-download", {
                percent: progress
              });
              timer = null;
            }, 500);
          }
        });
        electron.ipcMain.on("request-update-destroy", () => {
          variable.updateWindow.webContents.send("message", "中止连接");
          request.destroy();
        });
        response.pipe(file);
        variable.updateWindow.webContents.send(
          "message",
          electron.app.getPath("userData")
        );
        file.on("finish", () => {
          file.close(() => {
            const zip = new AdmZip(filePath);
            zip.extractAllToAsync(
              path.join(__dirname, "../../../"),
              true,
              (err) => {
                if (err) {
                  variable.updateWindow.webContents.send(
                    "message",
                    "文件覆盖写入" + error
                  );
                  return;
                } else {
                  variable.updateWindow.webContents.send(
                    "message",
                    "文件覆盖写入"
                  );
                  fs.unlink(filePath, (err2) => {
                    if (err2) {
                      variable.updateWindow.webContents.send(
                        "message",
                        "删掉缓存" + err2
                      );
                      return;
                    }
                    variable.updateWindow.webContents.send(
                      "message",
                      "删掉缓存"
                    );
                    electron.app.relaunch();
                    electron.app.quit();
                  });
                }
              }
            );
          });
        });
      }).on("error", (err) => {
        variable.updateWindow.webContents.send("message", "请求错误" + err);
        request.destroy();
      });
      request.end();
    });
  });
};
const createLoading = () => {
  return new Promise((resolve) => {
    variable.loadingWindow = new electron.BrowserWindow({
      width: 120,
      height: 120,
      frame: false,
      transparent: true,
      resizable: false,
      webPreferences: {
        devTools: true,
        // 调试 ctrl + shift + i
        preload: path.join(__dirname, "../preload/index.js"),
        sandbox: false
      }
    });
    if (process.env["ELECTRON_RENDERER_URL"]) {
      variable.loadingWindow.loadURL(
        process.env["ELECTRON_RENDERER_URL"] + "#/loadingPage"
      );
    } else {
      variable.loadingWindow.loadFile(
        path.join(__dirname, "../renderer/index.html"),
        {
          hash: "#/loadingPage"
        }
      );
    }
    variable.loadingWindow.show();
    electron.ipcMain.on("window-checkVersion", async () => {
      await updater();
      await updaterPart();
      resolve();
    });
  });
};
const createWindow = () => {
  return new Promise((resolve) => {
    variable.mainWindow = new electron.BrowserWindow({
      width: 1024,
      height: 700,
      minWidth: 1024,
      minHeight: 700,
      frame: false,
      resizable: true,
      show: false,
      webPreferences: {
        devTools: true,
        // 调试 ctrl + shift + i
        preload: path.join(__dirname, "../preload/index.js"),
        sandbox: false
      }
    });
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
      variable.mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
    }
    function initEnd() {
      return new Promise((resolve2) => {
        electron.ipcMain.on("window-init", () => {
          resolve2();
        });
      });
    }
    variable.mainWindow.on("ready-to-show", async () => {
      await initEnd();
      variable.loadingWindow.close();
      variable.mainWindow.show();
      resolve();
    });
    electron.ipcMain.on("window-min", () => {
      variable.mainWindow.hide();
    });
    electron.ipcMain.on("window-close", () => {
      variable.mainWindow.close();
    });
    electron.ipcMain.on("open-browser", (event, url) => {
      electron.shell.openExternal(url);
    });
  });
};
const createTray = () => {
  const appIcon = new electron.Tray(path.join(__dirname, "../../pubilc/icon.png"));
  var contextMenu = electron.Menu.buildFromTemplate([
    {
      label: "显示主界面",
      click: () => {
        variable.mainWindow.show();
      }
    },
    {
      label: "退出",
      click: () => {
        variable.mainWindow.close();
      }
    }
  ]);
  appIcon.setTitle("托盘功能");
  appIcon.setContextMenu(contextMenu);
  appIcon.on("click", () => {
    variable.mainWindow.isVisible() ? variable.mainWindow.hide() : variable.mainWindow.show();
    variable.mainWindow.isVisible() ? variable.mainWindow.setSkipTaskbar(false) : variable.mainWindow.setSkipTaskbar(true);
  });
};
Object.defineProperty(electron.app, "isPackaged", {
  get() {
    return true;
  }
});
electron.app.on("ready", async () => {
  await createLoading();
  await createWindow();
  createTray();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.on("restart-app", () => {
  electron.app.relaunch();
  electron.app.quit();
});
