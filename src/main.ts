import { app, BrowserWindow, Menu, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";
import { loadConfig, writeConfig } from "./app/utils/loadConfig";
import { sendMagicPacket } from "./app/utils/sendMagicPacket";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, "../public/favicon.ico"),
  });

  // hide menu
  Menu.setApplicationMenu(null);
  // hide menu for Mac
  if (!process.platform.includes("win")) {
    app.dock.hide();
  }

  const usrLocation = isDev ? "http://localhost:7000" : "dumm";
  mainWindow.loadURL(usrLocation);

  // 打开控制台
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on("send", (event, arg) => {
    sendMagicPacket(arg)
      .then(() => {
        event.reply("send-reply", { code: 1, msg: "唤醒请求已发送" });
      })
      .catch((err) => {
        event.reply("send-reply", { code: 0, msg: `发送失败：${err.message}` });
      });
  });

  ipcMain.on("load-cofnig", (event, arg) => {
    loadConfig(mainWindow);
  });

  ipcMain.on("write-cofnig", (event, confs) => {
    writeConfig(confs);
  });
});
