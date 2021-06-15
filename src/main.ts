import { app, BrowserWindow } from "electron";
import * as isDev from "electron-is-dev";
import * as path from "path";

let mainWindow = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 850,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, "../public/favicon.ico"),
  });

  const usrLocation = isDev ? "http://localhost:3000" : "dumm";
  mainWindow.loadURL(usrLocation);
});
