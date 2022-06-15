import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { fetchRoleList } from '../user-manage/service';
import { RoleList } from '../user-manage/data';
import { fetchAddPlatformRole } from './service';
import { AddplatformRoleParams } from './data';
import AuthForm from './components/AuthForm';
import { isApiAuth } from '@/utils';
import { useModel } from 'umi';

const getRoleList = async (params: any): Promise<any> => {
  try {
    const res = await fetchRoleList({
      page_no: params.current,
      page_size: params.pageSize,
      ...params,
    });
    const { role_list, total_count } = res.data;
    return {
      data: role_list,
      success: true,
      total: total_count,
    };
  } catch (error) {}
};

const RoleManage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { rootPermissionKey } = initialState.currentUser;
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [modalVisit, setModalVisit] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [slectId, setSlectId] = useState<number>(0);

  const setAuthHandle = (record: { id: number }) => {
    setSlectId(record.id);
    setModalVisit(true);
  };

  const columns: ProColumns<RoleList>[] = [
    {
      title: '角色名称',
      dataIndex: 'role_name',
    },
    // {
    //   title: '数量',
    //   dataIndex: 'num',
    //   hideInSearch: true,
    // },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        isApiAuth(900002003, rootPermissionKey) && (
          <a key="auth" onClick={() => setAuthHandle(record)}>
            设置权限
          </a>
        ),
        // <a key="edit">编辑</a>,
        // <a key="delect">删除</a>,
        <a key="log">操作日志</a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'角色列表'}
        actionRef={actionRef}
        rowKey={(x) => x.id}
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          isApiAuth(900002001, rootPermissionKey) && (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 新建
            </Button>
          ),
        ]}
        request={getRoleList}
        columns={columns}
      />
      <ModalForm
        title={'新建角色'}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (values: AddplatformRoleParams) => {
          const res = await fetchAddPlatformRole({ ...values });
          if (res.code === 0) {
            message.success('添加成功');
            actionRef.current.reload();
            return true;
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
          width="md"
          name="role_name"
          label="角色名称"
        />
        <ProFormTextArea
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
          width="md"
          label="角色说明"
          name="description"
        />
      </ModalForm>
      {modalVisit && (
        <AuthForm
          fetchUserList={actionRef.current.reload}
          modalVisit={modalVisit}
          setModalVisit={setModalVisit}
          slectId={slectId}
        />
      )}
    </PageContainer>
  );
};

export default RoleManage;
