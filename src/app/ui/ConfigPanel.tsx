import React, { useCallback, useEffect } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { BtnLayout, ConfigPanelLayout } from "./style";
import { SaveOutlined, SendOutlined } from "@ant-design/icons";
import { PATTERN_IP, PATTERN_MAC } from "../constant/regex";
import { ConfigItemI } from "../../types/ConfigItem";
import { useI18n } from "../hooks/useI18n.hooks";

interface Props {
  config?: ConfigItemI;
  onSave: (conf: ConfigItemI) => void;
  onWeakup: (conf: ConfigItemI) => void;
  languageKey: string;
}

const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 17 },
};
const checkPort = (errMsg: string) => (_: any, value: string | number) => {
  if (+value < 1 || +value > 65535) {
    return Promise.reject(new Error(errMsg));
  }
  return Promise.resolve();
};

function ConfigPanel(props: Props) {
  const { config, onSave, onWeakup, languageKey } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;
  const i18nConf = useI18n(languageKey);
  const onSaveInner = useCallback(
    (msg?: string) =>
      validateFields().then(
        (vals) => {
          const conf = { ...vals, id: config?.id };
          onSave(conf);
          if (msg) {
            message.success(msg, 1);
          }
          return conf;
        },
        () => {}
      ),
    [config?.id, onSave, validateFields]
  );
  const onWeakupInner = useCallback(() => {
    onSaveInner().then(onWeakup);
  }, [onSaveInner, onWeakup]);

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
          label={i18nConf.STR_MAC_TIPS}
          name="mac"
          rules={[
            { required: true, message: i18nConf.STR_MAC_PLACEHOLDER },
            {
              pattern: PATTERN_MAC,
              message: i18nConf.STR_MAC_ERR_MSG,
            },
          ]}
        >
          <Input placeholder={i18nConf.STR_MAC_PLACEHOLDER} allowClear />
        </Form.Item>

        <Form.Item
          label={i18nConf.STR_IP_TIPS}
          name="ip"
          rules={[
            { required: true, message: i18nConf.STR_IP_PLACEHOLDER },
            {
              pattern: PATTERN_IP,
              message: i18nConf.STR_IP_ERR_MSG,
            },
          ]}
        >
          <Input placeholder={i18nConf.STR_IP_PLACEHOLDER} allowClear />
        </Form.Item>
        <Form.Item
          label={i18nConf.STR_SUBMASK_TIPS}
          name="submask"
          rules={[
            { required: true, message: i18nConf.STR_SUBMASK_PLACEHOLDER },
            {
              pattern: PATTERN_IP,
              message: i18nConf.STR_SUBMASK_ERR_MSG,
            },
          ]}
        >
          <Input placeholder={i18nConf.STR_SUBMASK_PLACEHOLDER} allowClear />
        </Form.Item>
        <Form.Item
          label={i18nConf.STR_PORT_TIPS}
          name="port"
          validateFirst
          rules={[
            { required: true, message: i18nConf.STR_PORT_PLACEHOLDER },
            {
              validator: checkPort(i18nConf.STR_PORT_ERR_MSG),
            },
          ]}
        >
          <Input placeholder={i18nConf.STR_PORT_PLACEHOLDER} allowClear />
        </Form.Item>
        <Form.Item
          label={i18nConf.STR_MODE_TIPS}
          name="mode"
          rules={[{ required: true, message: i18nConf.STR_MODE_PLACEHOLDER }]}
        >
          <Select placeholder={i18nConf.STR_MODE_PLACEHOLDER}>
            <Option value={1}>{i18nConf.STR_MODE_OPT_1}</Option>
            <Option value={2}>{i18nConf.STR_MODE_OPT_2}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={i18nConf.STR_REMARK_TIPS}
          name="remark"
          rules={[
            {
              max: 200,
              message: i18nConf.STR_REMARK_ERR_MSG,
            },
          ]}
        >
          <Input placeholder={i18nConf.STR_MODE_PLACEHOLDER} allowClear />
        </Form.Item>

        <BtnLayout>
          <Button
            onClick={onWeakupInner}
            htmlType="submit"
            type="primary"
            icon={<SendOutlined />}
          >
            {i18nConf.STR_BTN_WEAKUP}
          </Button>
          <Button
            onClick={() => onSaveInner(i18nConf.STR_SAVE_SUCC_MSG)}
            icon={<SaveOutlined />}
          >
            {i18nConf.STR_BTN_SAVE}
          </Button>
        </BtnLayout>
      </Form>
    </ConfigPanelLayout>
  );
}

export default ConfigPanel;
