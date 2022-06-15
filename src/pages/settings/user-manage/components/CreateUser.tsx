import React, { useRef, useState } from 'react';
import { Button, Form, message, Modal } from 'antd';
import ProForm, { ProFormText, ModalForm } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { fetchRoleList, fetchAddPlatformUser, fetchEditPlatformUser } from '../service';
import { Data, PlatformUserParams, UserColumns } from '../data';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};
export type CreateUserFormProps = {
  fetchUserList: () => void;
  setModalVisit: (values: boolean) => void;
  setOptType: (val: string) => void;
  modalVisit: boolean;
  optType: string;
  selectDetail: UserColumns;
};

const CreateUser: React.FC<CreateUserFormProps> = (props) => {
  const { fetchUserList, modalVisit, setModalVisit, optType, selectDetail } = props;
  const [form] = Form.useForm();
  // init State
  const [roleList, setRoleList] = useState<Data>();

  // 获取角色列表
  const getRoleList = async () => {
    const params = {
      page_size: 200,
      page_no: 1,
    };
    const res = await fetchRoleList(params);
    if (res) {
      setRoleList(res.data);
    }
  };

  React.useEffect(() => {
    getRoleList();
    if (optType !== 'create') {
      form.setFieldsValue({ ...selectDetail });
    }
  }, [selectDetail && selectDetail.user_id && optType]);
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  return (
    <ModalForm
      form={form}
      title={`${optType === 'create' ? '新建' : '编辑'}用户`}
      layout="horizontal"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
      }
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          props.setOptType('create');
          form.resetFields();
        },
      }}
      submitter={optType !== 'check' && null}
      visible={modalVisit}
      onVisibleChange={setModalVisit}
      onFinish={async (values: PlatformUserParams) => {
        const res =
          optType === 'edit'
            ? await fetchEditPlatformUser({
                uid: selectDetail.user_id * 1,
                ...values,
              })
            : await fetchAddPlatformUser({
                ...values,
              });
        if (res.code === 0) {
          message.success('提交成功');
          fetchUserList();
          return true;
        }
      }}
      {...formItemLayout}
    >
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value.length <= 40) {
                return Promise.resolve();
              }
              return Promise.reject('请输入40字符以内');
            },
          }),
        ]}
        width="md"
        name="real_name"
        label="姓名"
        placeholder="请输入姓名"
        disabled={optType === 'check'}
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value.length <= 40) {
                return Promise.resolve();
              }
              return Promise.reject('请输入40字符以内');
            },
          }),
        ]}
        width="md"
        name="name"
        label="用户名"
        placeholder="请输入用户名"
        disabled={optType !== 'create'}
      />
      <ProFormText
        disabled={optType === 'check'}
        rules={[
          {
            required: true,
            message: '请输入',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              const pattern = /^1\d{10}$/;
              if (pattern.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject('您输入的手机号格式不正确');
            },
          }),
        ]}
        name="phone"
        width="md"
        label="手机号码"
        placeholder="请输入手机号码"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value.length <= 40) {
                return Promise.resolve();
              }
              return Promise.reject('请输入40字符以内');
            },
          }),
        ]}
        name="email"
        width="md"
        label="用户邮箱"
        placeholder="请输入用户邮箱"
      />
    </ModalForm>
  );
};

export default CreateUser;
