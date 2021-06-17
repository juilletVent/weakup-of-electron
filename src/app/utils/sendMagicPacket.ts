import * as dgram from "dgram";
import { ConfigItemI } from "../../types/ConfigItem";

function getPayload(conf: ConfigItemI) {
  let buffer = new Array(6);
  // fill header
  buffer.fill(0xff, 0);
  // get data of mac address
  const macAddr = conf.mac.replace(/:/g, "-");
  const fragmentForMac = macAddr.split("-").map((i) => parseInt(i, 16));
  // fill data for mac address,repeat 16 items
  for (let i = 0; i < 16; i++) {
    buffer = buffer.concat(fragmentForMac);
  }
  return Uint8Array.from(buffer);
}

export async function sendMagicPacket(conf: ConfigItemI) {
  const udpClient = dgram.createSocket("udp4");
  const payload = getPayload(conf);
  udpClient.send(payload, +conf.port, conf.ip, (err, bytes) => {
    if (err) {
      throw err;
    }
    udpClient.close();
  });
}
