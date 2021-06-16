import React, { useCallback, useState } from "react";
import { Button, Empty, List, message } from "antd";
import { uniqueId } from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import { ConfigLayout, MainLayout, NavLayout } from "./style";
import ConfigPanel from "./ConfigPanel";
import { ConfigItemI } from "../../types/ConfigItem";

export interface Props {}

function MainPage(props: Props) {
  const [confs, setConfs] = useState<ConfigItemI[]>([]);
  const [activeConf, setActiveConf] = useState<ConfigItemI>();
  const onAddConfig = useCallback(() => {
    console.log("new");

    setActiveConf({
      id: uniqueId("id_"),
      ip: "192.168.1.1",
      mac: "04-D4-C4-EC-D0-37",
      submask: "255.255.255.0",
      port: "9",
      mode: "1",
    });
  }, []);
  const onSave = useCallback(
    (conf: ConfigItemI) => {
      const targetIndex = confs.findIndex((item) => item.id === conf.id);
      if (targetIndex !== -1) {
        // 替换
        const nextConf = [...confs];
        nextConf[targetIndex] = conf;
        console.log("nextConf", nextConf);

        setConfs(nextConf);
      } else {
        console.log("add conf", conf);
        setConfs([...confs, conf]);
      }
      message.success("保存成功", 1);
    },
    [confs]
  );
  const onConfigActive = useCallback((item: ConfigItemI) => {
    setActiveConf(item);
  }, []);

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
          dataSource={confs}
          renderItem={(item) => (
            <List.Item
              title={item.remark || item.ip}
              onClick={() => onConfigActive(item)}
            >
              {item.remark || item.ip}
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
        <ConfigPanel config={activeConf} onSave={onSave} onWeakup={() => {}} />
      </ConfigLayout>
    </MainLayout>
  );
}

export default MainPage;
