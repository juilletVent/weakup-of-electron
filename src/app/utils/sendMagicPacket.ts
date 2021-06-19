import * as dgram from "dgram";
import { ConfigItemI, SendMode } from "../../types/ConfigItem";

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

const flipBit = (p: number) => (~p << 24) >>> 24;

function getDestinationIP(conf: ConfigItemI) {
  // If it is in IP mode, sent directly to the target IP
  if (+conf.mode === SendMode.IP) {
    return conf.ip;
  }
  // else，sent to the broadcast IP
  const ips = conf.ip.split(".");
  const masks = conf.submask.split(".").map((i) => parseInt(i));
  const flipMasks = conf.submask.split(".").map((i) => flipBit(parseInt(i)));
  const subnetAddr = ips.map((v, i) => +v & masks[i]);
  const broadcastAddr = subnetAddr.map((v, i) => v | flipMasks[i]).join(".");
  return broadcastAddr;
}

export async function sendMagicPacket(conf: ConfigItemI) {
  const udpClient = dgram.createSocket("udp4");
  udpClient.once("listening", function () {
    udpClient.setBroadcast(true);
  });
  const payload = getPayload(conf);
  const dstIp = getDestinationIP(conf);
  udpClient.send(payload, +conf.port, dstIp, (err, bytes) => {
    if (err) {
      throw err;
    }
    udpClient.close();
  });
}
