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
  /** send mode */
  mode: string;
  /** config remark */
  remark?: string;
}
