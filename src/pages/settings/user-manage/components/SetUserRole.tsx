import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
  ModalForm,
  ProFormDateRangePicker,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { fetchRoleList, fetchSetPlatformUserRole } from '../service';
import { PlatformUserParams, PlatformUserRoleParams, RoleList } from '../data';
export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};
export type SetUserRoleProps = {
  // fetchUserList: () => void;
  setModalRoleVisit?: (values: boolean) => void;
  modalRoleVisit: boolean;
  uid: number;
};

const SetUserRole: React.FC<SetUserRoleProps> = (props) => {
  const { setModalRoleVisit, uid } = props;
  // init State
  const [roleList, setRoleList] = useState<RoleList[]>();

  // 获取角色列表
  const getRoleList = async () => {
    const params = {
      page_size: 200,
      page_no: 1,
    };
    const res = await fetchRoleList(params);
    if (res) {
      res.data.role_list.map((x) => {
        x.label = x.role_name;
        x.value = x.id;
      });
      setRoleList(res.data.role_list);
    }
  };

  React.useEffect(() => {
    getRoleList();
  }, []);

  return (
    <ProForm
      title={`设置用户角色`}
      layout="horizontal"
      submitter={null}
      onFinish={async (values: PlatformUserRoleParams) => {
        const res = await fetchSetPlatformUserRole({
          ...values,
          uid,
        });
        if (res.code === 0) {
          message.success('操作成功');
          // fetchUserList();
          setModalRoleVisit(false);
        }
      }}
    >
      <ProFormSelect options={roleList} width="md" name="role_id" label="角色" required />
    </ProForm>
  );
};

export default SetUserRole;
