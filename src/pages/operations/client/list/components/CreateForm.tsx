import React from 'react';
import { Button, Form, FormInstance, Input, message, Radio } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProFormGroup,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import { fetchAddMessage, fetchEditMessage, fetchGetMessage, fetchAuditMessage } from '../service';
import { EditMessageParams } from '../data';

export type CreateFormProps = {
  createModalVisible: boolean;
  handleModalVisible: any;
  actionRef: any;
  form: FormInstance<EditMessageParams>;
  type: string;
  selectId: number;
  setType: any;
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { initialState } = useModel('@@initialState');
  const { form, createModalVisible, setType, handleModalVisible, selectId, actionRef, type } =
    props;
  console.log(actionRef, 'actionRef');
  console.log(type, 'type');

  React.useEffect(() => {
    if (type !== 'create') {
      getMessage();
    }
  }, [type, selectId]);

  // 获取消息推送详情
  const getMessage = async () => {
    const res = await fetchGetMessage({
      id: selectId,
    });
    if (res.code === 0) {
      const { data } = res;
      form.setFieldsValue({
        ...data,
      });
      //  时间特殊处理
      if (res.data.send_time && res.data.end_time) {
        form.setFieldsValue({
          time: [res.data.send_time, res.data.end_time],
        });
      }
    }
  };
  return (
    <ModalForm
      form={form}
      title={'新增消息推送'}
      width="500px"
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          setType('create');
          form.resetFields();
        },
      }}
      submitter={{
        render: (props, defaultDoms) => {
          if (type === 'audit') {
            return [
              <Button
                key="no"
                onClick={async () => {
                  const res = await fetchAuditMessage({
                    id: selectId,
                    audit_status: 2,
                  });
                  if (res.code == 0) {
                    message.success('操作成功');
                    actionRef.current.reload();
                    handleModalVisible(false);
                    return true;
                  }
                }}
              >
                审核不通过
              </Button>,
              <Button
                key="ok"
                type="primary"
                onClick={async () => {
                  const res = await fetchAuditMessage({
                    id: selectId,
                    audit_status: 1,
                  });
                  if (res.code == 0) {
                    message.success('操作成功');
                    actionRef.current.reload();
                    handleModalVisible(false);
                    return true;
                  }
                }}
              >
                审核通过
              </Button>,
            ];
          } else {
            return defaultDoms;
          }
        },
        submitButtonProps: {
          style: {
            display: type === 'check' ? 'none' : 'block',
          },
        },
      }}
      visible={createModalVisible}
      onVisibleChange={handleModalVisible}
      onFinish={async (values: EditMessageParams) => {
        if (values.time) {
          values.send_time = values.time[0];
          values.end_time = values.time[1];
          delete values.time;
        }
        let res;
        if (type === 'create') {
          res = await fetchAddMessage(values);
        }
        if (type === 'edit') {
          values.id = selectId;
          res = await fetchEditMessage(values);
        }
        if (res.code === 0) {
          message.success('操作成功');
          actionRef.current.reload();
          handleModalVisible(false);
          return true;
        }
      }}
    >
      <ProFormGroup>
        <ProFormSelect
          disabled={type == 'check'}
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
          width="sm"
          options={[
            {
              value: 1,
              label: '安全消息',
            },
            {
              value: 2,
              label: '活动消息',
            },
            {
              value: 3,
              label: '其他消息',
            },
          ]}
          label="消息类别"
          name="type"
        />
        <ProFormSelect
          disabled={type == 'check'}
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
          width="sm"
          options={initialState?.currentUser?.area_list}
          label="城市"
          name="city_id"
        />
      </ProFormGroup>
      <ProFormDateTimeRangePicker
        disabled={type == 'check'}
        rules={[
          {
            required: true,
            message: '请选择',
          },
        ]}
        width="md"
        label="发送周期"
        name="time"
      />
      <Form.Item
        rules={[
          {
            required: true,
            message: '请选择',
          },
        ]}
        label="发送用户"
        name="range_person"
        initialValue={'0'}
      >
        <Radio.Group disabled={type == 'check'}>
          <Radio value={'0'}>全部司机</Radio>
          <Radio value={1}>指定司机</Radio>
          <Radio value={2}>IOS</Radio>
          <Radio value={3}>安卓</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.range_person !== currentValues.range_person
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('range_person') === 1 ? (
            <Form.Item name="driver_phone" label="指定司机手机号" rules={[{ required: true }]}>
              <Input.TextArea
                disabled={type == 'check'}
                placeholder="输入司机id，以“;”结尾，单次最多添加3000个"
              />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入',
          },
        ]}
        label="消息标题"
        name="content_title"
        placeholder="消息标题，最长不超过12字"
        disabled={type == 'check'}
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入',
          },
        ]}
        label="消息内容"
        name="content"
        placeholder="请输入消息内容"
        disabled={type == 'check'}
      />
      <ProFormTextArea
        rules={[
          {
            required: false,
            message: '请输入',
          },
        ]}
        label="消息简介"
        name="content_summary"
        placeholder="消息简介，最长不超过40字"
        disabled={type == 'check'}
      />
      <ProFormText
        rules={[
          {
            required: false,
            message: '请输入',
          },
        ]}
        label="消息链接"
        name="content_url"
        placeholder="消息链接"
        disabled={type == 'check'}
      />
    </ModalForm>
  );
};

export default CreateForm;
