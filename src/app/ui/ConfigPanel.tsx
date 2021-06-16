import React, { useCallback } from "react";
import { Button, Form, Input } from "antd";
import { ConfigPanelLayout } from "./style";

export interface Props {
  config: any;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function ConfigPanel(props: Props) {
  const { config } = props;

  const onFinish = useCallback(() => {}, []);

  return (
    <ConfigPanelLayout>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ConfigPanelLayout>
  );
}

export default ConfigPanel;
