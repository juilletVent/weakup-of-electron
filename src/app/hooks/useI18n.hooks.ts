import { useMemo } from "react";
import i18n from "../i18n";

export function useI18n(languageKey: string) {
  const lanConf = useMemo(() => {
    const conf = i18n.find((item) => item.key === languageKey);
    if (conf) {
      return conf.language;
    }
    return i18n[0].language;
  }, [languageKey]);

  return lanConf;
}
