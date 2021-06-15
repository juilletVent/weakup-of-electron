"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var mainWindow = null;
electron_1.app.on("ready", function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 850,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: path.join(__dirname, "../public/favicon.ico")
    });
    var usrLocation = isDev ? "http://localhost:3000" : "dumm";
    mainWindow.loadURL(usrLocation);
});
