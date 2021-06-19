import React, { useCallback, useEffect, useState } from "react";
import { Button, Empty, List, message, Modal } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { ConfigLayout, MainLayout, NavLayout } from "./style";
import ConfigPanel from "./ConfigPanel";
import { ConfigItemI, SendMode } from "../../types/ConfigItem";

const { ipcRenderer } = window.require("electron");

function MainPage() {
  const [confs, setConfs] = useState<ConfigItemI[]>();
  const [activeConf, setActiveConf] = useState<ConfigItemI>();
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
        message.success(arg.msg);
        return;
      }
      Modal.error({
        title: "发送失败",
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
  }, []);

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
          新增配置
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
                title="删除"
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
                description="暂无配置"
              />
            ),
          }}
        />
      </NavLayout>
      <ConfigLayout>
        <ConfigPanel config={activeConf} onSave={onSave} onWeakup={onWeakup} />
      </ConfigLayout>
    </MainLayout>
  );
}

export default MainPage;
