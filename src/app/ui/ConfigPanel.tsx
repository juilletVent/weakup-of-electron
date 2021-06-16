import React, { useCallback, useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { BtnLayout, ConfigPanelLayout } from "./style";
import { SaveOutlined, SendOutlined } from "@ant-design/icons";
import { PATTERN_IP, PATTERN_MAC } from "../constant/regex";
import { ConfigItemI } from "../../types/ConfigItem";

export interface Props {
  config?: ConfigItemI;
  onSave: (conf: ConfigItemI) => void;
  onWeakup: (conf: ConfigItemI) => void;
}

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};
const checkPort = (_: any, value: string | number) => {
  if (+value < 1 || +value > 65535) {
    return Promise.reject(new Error("端口无效，请输入1-65535之间的端口号"));
  }
  return Promise.resolve();
};

function ConfigPanel(props: Props) {
  const { config, onSave, onWeakup } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;
  const onSaveInner = useCallback(() => {
    validateFields().then((vals) => {
      onSave({ ...vals, id: config?.id });
    });
  }, [config?.id, onSave, validateFields]);
  const onWeakupInner = useCallback(() => {}, []);

  useEffect(() => {
    form.resetFields();
    if (config) {
      form.setFieldsValue(config);
    }
  }, [config, form]);

  return (
    <ConfigPanelLayout>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="MAC地址"
          name="mac"
          rules={[
            { required: true, message: "请输入目标机器MAC地址" },
            {
              pattern: PATTERN_MAC,
              message: "目标机器MAC地址，横线或冒号分割均可",
            },
          ]}
        >
          <Input placeholder="请输入目标机器MAC地址" allowClear />
        </Form.Item>

        <Form.Item
          label="IP地址"
          name="ip"
          rules={[
            { required: true, message: "请输入目标机器IP地址" },
            {
              pattern: PATTERN_IP,
              message: "请有效的IP地址",
            },
          ]}
        >
          <Input placeholder="请输入目标机器IP地址" allowClear />
        </Form.Item>
        <Form.Item
          label="子网掩码"
          name="submask"
          rules={[
            { required: true, message: "请输入目标机器子网掩码" },
            {
              pattern: PATTERN_IP,
              message: "请有效的子网掩码",
            },
          ]}
        >
          <Input placeholder="请输入目标机器子网掩码" allowClear />
        </Form.Item>
        <Form.Item
          label="目标端口"
          name="port"
          validateFirst
          rules={[
            { required: true, message: "请输入目标端口（通常为7或9）" },
            {
              validator: checkPort,
            },
          ]}
        >
          <Input placeholder="请输入目标端口（通常为7或9）" allowClear />
        </Form.Item>
        <Form.Item
          label="发送模式"
          name="mode"
          rules={[{ required: true, message: "请选择发送模式" }]}
        >
          <Select placeholder="请选择发送模式">
            <Option value="1">发送至目标IP地址</Option>
            <Option value="2">发送至广播地址</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="备注"
          name="remark"
          rules={[
            {
              max: 200,
              message: "备注过长，至多200个字符",
            },
          ]}
        >
          <Input placeholder="请输入配置备注，默认为IP地址" allowClear />
        </Form.Item>

        <BtnLayout>
          <Button
            onClick={onWeakupInner}
            htmlType="submit"
            type="primary"
            icon={<SendOutlined />}
          >
            唤醒
          </Button>
          <Button onClick={onSaveInner} icon={<SaveOutlined />}>
            保存
          </Button>
        </BtnLayout>
      </Form>
    </ConfigPanelLayout>
  );
}

export default ConfigPanel;
