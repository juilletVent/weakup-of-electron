import zhCN from "./zh-CN";
import en from "./en";

export type ConfKey = keyof typeof en;
export type I18nConf = {
  [key in ConfKey]: string;
};

type IconConf = {
  key: string;
  title: string;
  language: I18nConf;
};

const i18n: IconConf[] = [
  {
    key: "en",
    title: "English",
    language: en,
  },
  {
    key: "zh-CN",
    title: "简体中文",
    language: zhCN,
  },
];

export default i18n;
