import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Empty, List, message, Modal, Select } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { pick } from "lodash";
import { ConfigLayout, MainLayout, NavLayout } from "./style";
import { ConfigItemI, SendMode } from "../../types/ConfigItem";
import ConfigPanel from "./ConfigPanel";
import i18n from "../i18n";
import { useI18n } from "../hooks/useI18n.hooks";

const { Option } = Select;
const { ipcRenderer } = window.require("electron");

function MainPage() {
  const [confs, setConfs] = useState<ConfigItemI[]>();
  const [activeConf, setActiveConf] = useState<ConfigItemI>();
  const [activeLanguage, setActiveLanguage] = useState<string>("zh-CN");
  const i18nConf = useI18n(activeLanguage);
  const i18nOpt = useMemo(
    () => i18n.map((item) => pick(item, ["key", "title"])),
    []
  );
  const onAddConfig = useCallback(() => {
    setActiveConf({
      id: Date.now().toString(),
      ip: "",
      mac: "",
      submask: "",
      port: "9",
      mode: SendMode.IP,
    });
  }, []);
  const onSave = useCallback(
    (conf: ConfigItemI) => {
      const targetIndex = (confs || []).findIndex(
        (item) => item.id === conf.id
      );
      if (targetIndex !== -1 && confs) {
        // replace
        const nextConf = [...confs];
        nextConf[targetIndex] = conf;
        setConfs(nextConf);
      } else {
        // add
        setConfs([...(confs || []), conf]);
      }
    },
    [confs]
  );
  const onDelete = useCallback(
    (target: ConfigItemI) => {
      setConfs(confs?.filter((conf) => conf.id !== target.id));
    },
    [confs]
  );
  const onConfigActive = useCallback((item: ConfigItemI) => {
    setActiveConf(item);
  }, []);
  const onWeakup = useCallback((item?: ConfigItemI) => {
    if (item) {
      // send magic packet
      ipcRenderer.send("send", item);
    }
  }, []);

  useEffect(() => {
    ipcRenderer.on("send-reply", (event, arg) => {
      if (arg.code === 1) {
        message.success(i18nConf.STR_SEND_SUCC_MSG);
        return;
      }
      Modal.error({
        title: i18nConf.STR_SEND_ERR_MSG,
        content: arg.msg,
      });
    });
    ipcRenderer.on("init-config", (event, arg) => {
      setConfs(arg);
      setActiveConf(arg[0]);
    });
    // 发送消息通知主线程加载配置文件
    ipcRenderer.send("load-cofnig");

    return () => {
      ipcRenderer.removeAllListeners("send-reply");
      ipcRenderer.removeAllListeners("init-config");
    };
  }, [i18nConf]);

  useEffect(() => {
    if (confs) {
      ipcRenderer.send("write-cofnig", confs);
    }
  }, [confs]);

  return (
    <MainLayout>
      <NavLayout>
        {/* 新增按钮 */}
        <Button type="primary" block onClick={onAddConfig}>
          <PlusOutlined />
          {i18nConf.STR_BTN_ADD}
        </Button>
        {/* 已有配置列表 */}
        <List
          bordered
          dataSource={confs || []}
          renderItem={(item) => (
            <List.Item
              className={activeConf?.id === item.id ? "active" : ""}
              title={item.remark || item.ip}
              onClick={() => onConfigActive(item)}
            >
              {item.remark || item.ip}
              <Button
                title={i18nConf.STR_BTN_DELETE}
                className="del-btn"
                key="delete"
                type="link"
                danger
                onClick={() => onDelete(item)}
              >
                <DeleteOutlined />
              </Button>
            </List.Item>
          )}
          size="small"
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={i18nConf.STR_EMPTY}
              />
            ),
          }}
        />
        <Select
          value={activeLanguage}
          onChange={setActiveLanguage}
          style={{ width: "100%" }}
          size="small"
        >
          {i18nOpt.map((conf) => (
            <Option key={conf.key} value={conf.key}>
              {conf.title}
            </Option>
          ))}
        </Select>
      </NavLayout>
      <ConfigLayout>
        <ConfigPanel
          config={activeConf}
          onSave={onSave}
          onWeakup={onWeakup}
          languageKey={activeLanguage}
        />
      </ConfigLayout>
    </MainLayout>
  );
}

export default MainPage;
