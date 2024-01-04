import { app, ipcMain } from "electron";
import { join } from "path";
import createUpdate from "./update";
import { variable } from "./base";

const fs = require("fs");
const AdmZip = require("adm-zip");
const https = require("https");

const { autoUpdater } = require("electron-updater");

export const updater = () => {
  // 执行检查更新
  return new Promise((resolve) => {
    if (process.env["ELECTRON_RENDERER_URL"]) {
      resolve();
    } else {
      autoUpdater.checkForUpdates();
    }

    autoUpdater.autoDownload = false;
    autoUpdater.setFeedURL(import.meta.env.MAIN_VITE_base_url); // 更新包的地址

    function sendStatusToWindow(text) {
      variable.updateWindow.webContents.send("message", text);
    }

    ipcMain.on("go-download", () => {
      sendStatusToWindow("发起更新");
      autoUpdater
        .downloadUpdate()
        .then(() => sendStatusToWindow("发起更新成功..."))
        .catch(() => sendStatusToWindow("发起更新失败..."));
    });

    // 开始检查更新-监听    接收到渲染进程来的讯息后检测更新
    autoUpdater.on("checking-for-update", () => {
      sendStatusToWindow("Checking for update...");
    });

    // 检测到有新版本更新
    autoUpdater.on("update-available", () => {
      createUpdate();
    });

    // 暂无新版本可更新
    autoUpdater.on("update-not-available", () => {
      resolve();
    });

    // 更新错误
    autoUpdater.on("error", (err) => {
      sendStatusToWindow(err);
      sendStatusToWindow("更新错误");
    });

    // 更新下载进度事件
    autoUpdater.on("download-progress", (progressObj) => {
      variable.updateWindow.webContents.send("message-download", progressObj);
    });

    // 下载完成,退出且重新安装
    autoUpdater.on("update-downloaded", (info) => {
      sendStatusToWindow(info);

      autoUpdater.quitAndInstall(); //退出且重新安装
    });
  });
};

export const updaterPart = () => {
  return new Promise((resolve) => {
    if (process.env["ELECTRON_RENDERER_URL"]) {
      resolve();
    } else {
      checkVersionPart();
    }

    function checkVersionPart() {
      const request = https
        .get(`${import.meta.env.MAIN_VITE_base_url}/version.json`, (res) => {
          let data = "";
          variable.loadingWindow.webContents.send(
            "message",
            `${import.meta.env.MAIN_VITE_base_url}/version.json`
          );
          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            const onlineVersion = JSON.parse(data);

            fs.readFile(
              join(__dirname, "../../../version.json"),
              (err, data) => {
                if (err) {
                  variable.loadingWindow.webContents.send(
                    "message",
                    "读取失败"
                  );
                  variable.loadingWindow.webContents.send("message", err);
                }
                // run priview 预览时赋值
                const offlineVersion = data
                  ? JSON.parse(data.toString())
                  : onlineVersion;

                if (onlineVersion.data === offlineVersion.data) {
                  //增量版本相同 无需更新
                  resolve();
                } else {
                  // 增量更新
                  createUpdate(true);
                }
              }
            );
          });
        })
        .on("error", (err) => {
          variable.loadingWindow.webContents.send("message", 213132);
          variable.loadingWindow.webContents.send("message", err);
          request.destroy();
        });

      request.end();
    }

    ipcMain.on("update-part", () => {
      const fileUrl = `${import.meta.env.MAIN_VITE_base_url}/app.zip`;
      const filePath = join(app.getPath("userData"), "app.zip");
      const file = fs.createWriteStream(filePath);

      const request = https
        .get(fileUrl, (response) => {
          const fileSize = parseInt(response.headers["content-length"], 10);
          let downloadedSize = 0;
          let progress = 0;
          let timer;

          response.on("data", (data) => {
            downloadedSize += data.length;
            if (!timer) {
              timer = setTimeout(() => {
                progress = (downloadedSize / fileSize) * 100;
                variable.updateWindow.webContents.send("message-download", {
                  percent: progress,
                });
                timer = null;
              }, 500);
            }
          });

          ipcMain.on("request-update-destroy", () => {
            variable.updateWindow.webContents.send("message", "中止连接");
            request.destroy();
          });

          // 写入文件
          response.pipe(file);

          variable.updateWindow.webContents.send(
            "message",
            app.getPath("userData")
          );

          file.on("finish", () => {
            file.close(() => {
              const zip = new AdmZip(filePath);

              zip.extractAllToAsync(
                join(__dirname, "../../../"),
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

                    // 删掉缓存
                    fs.unlink(filePath, (err) => {
                      if (err) {
                        variable.updateWindow.webContents.send(
                          "message",
                          "删掉缓存" + err
                        );
                        return;
                      }

                      variable.updateWindow.webContents.send(
                        "message",
                        "删掉缓存"
                      );

                      app.relaunch();
                      app.quit();
                    });
                  }
                }
              );
            });
          });
        })
        .on("error", (err) => {
          variable.updateWindow.webContents.send("message", "请求错误" + err);
          request.destroy();
        });

      request.end();
    });
  });
};
