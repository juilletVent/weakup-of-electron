const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");

export async function loadConfig(mainWindow: any) {
  const confFilePath = path.resolve(process.cwd(), "config.json");
  if (fs.existsSync(confFilePath)) {
    // 读取配置
    const configStr = await fsp.readFile(confFilePath, "utf8");
    try {
      const confs = JSON.parse(configStr);
      // 发送至UI线程
      mainWindow.webContents.send("init-config", confs);
    } catch (error) {
      // 静默失败
    }
  } else {
    console.log("no config");
  }
}

export async function writeConfig(confs: any) {
  const confFilePath = path.resolve(process.cwd(), "config.json");
  const data = JSON.stringify(confs);
  await fsp.writeFile(confFilePath, data, "utf8");
}
