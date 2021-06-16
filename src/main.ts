import { app, BrowserWindow, Menu } from "electron";
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

  // hide menu
  Menu.setApplicationMenu(null);
  // hide menu for Mac
  if (!process.platform.includes("win")) {
    app.dock.hide();
  }

  const usrLocation = isDev ? "http://localhost:7000" : "dumm";
  mainWindow.loadURL(usrLocation);
});
