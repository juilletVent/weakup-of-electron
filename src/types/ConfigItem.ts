export enum SendMode {
  /** send to target ip */
  IP = 1,
  /** send to broadcast ip */
  broadcast,
}

export interface ConfigItemI {
  id: string;
  /** address of mac */
  mac: string;
  /** address of ip */
  ip: string;
  /** subnet mask */
  submask: string;
  /** send port */
  port: string;
  /** send mode：1 ip / 2 broadcast */
  mode: SendMode;
  /** config remark */
  remark?: string;
}
