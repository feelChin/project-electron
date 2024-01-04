import { Tray, Menu } from "electron";
import { join } from "path";
import { variable } from "./base";

const createTray = () => {
  const appIcon = new Tray(join(__dirname, "../../pubilc/icon.png"));

  var contextMenu = Menu.buildFromTemplate([
    {
      label: "显示主界面",
      click: () => {
        variable.mainWindow.show();
      },
    },
    {
      label: "退出",
      click: () => {
        variable.mainWindow.close();
      },
    },
  ]);

  appIcon.setTitle("托盘功能");
  appIcon.setContextMenu(contextMenu);

  appIcon.on("click", () => {
    variable.mainWindow.isVisible()
      ? variable.mainWindow.hide()
      : variable.mainWindow.show();
    variable.mainWindow.isVisible()
      ? variable.mainWindow.setSkipTaskbar(false)
      : variable.mainWindow.setSkipTaskbar(true);
  });
};

export default createTray;
