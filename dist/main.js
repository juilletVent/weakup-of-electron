"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var loadConfig_1 = require("./app/utils/loadConfig");
var sendMagicPacket_1 = require("./app/utils/sendMagicPacket");
electron_1.app.on("ready", function () {
    var mainWindow = new electron_1.BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, "../public/favicon.ico")
    });
    // hide menu
    electron_1.Menu.setApplicationMenu(null);
    // hide menu for Mac
    if (!process.platform.includes("win")) {
        electron_1.app.dock.hide();
    }
    var usrLocation = isDev ? "http://localhost:7000" : "dumm";
    mainWindow.loadURL(usrLocation);
    // 打开控制台
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    electron_1.ipcMain.on("send", function (event, arg) {
        sendMagicPacket_1.sendMagicPacket(arg)
            .then(function () {
            event.reply("send-reply", { code: 1, msg: "唤醒请求已发送" });
        })["catch"](function (err) {
            event.reply("send-reply", { code: 0, msg: "\u53D1\u9001\u5931\u8D25\uFF1A" + err.message });
        });
    });
    electron_1.ipcMain.on("load-cofnig", function (event, arg) {
        loadConfig_1.loadConfig(mainWindow);
    });
    electron_1.ipcMain.on("write-cofnig", function (event, confs) {
        loadConfig_1.writeConfig(confs);
    });
});
