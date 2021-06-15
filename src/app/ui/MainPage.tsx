import React from "react";
import { Button, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ConfigLayout, MainLayout, NavLayout } from "./style";

export interface Props {}

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

function MainPage(props: Props) {
  return (
    <MainLayout>
      <NavLayout>
        {/* 新增按钮 */}
        <Button type="primary" block>
          <PlusOutlined />
          新增配置
        </Button>
        {/* 已有配置列表 */}
        <List
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item title={item}>{item}</List.Item>}
          size="small"
        />
      </NavLayout>
      <ConfigLayout>
        right
        {/* 配置页面 */}
        Mac IP Address Subnet Mask Port Send Mode
      </ConfigLayout>
    </MainLayout>
  );
}

export default MainPage;
