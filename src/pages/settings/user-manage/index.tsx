import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { fetchSetPlatformUserStatus, fetchUserList } from './service';
import { UserColumns } from './data';
import CreateUser from './components/CreateUser';
import SetUserRole from './components/SetUserRole';
import { message, Modal, Popconfirm } from 'antd';
import OperationLog from '@/components/OperationLog';
import { useModel } from 'umi';
import { isApiAuth } from '@/utils';

const getUserList = async (params: any): Promise<any> => {
  try {
    const res = await fetchUserList({
      page_no: params.current,
      page_size: params.pageSize,
      ...params,
    });
    const { user_list, total_count } = res.data;
    return {
      data: user_list,
      success: true,
      total: total_count,
    };
  } catch (error) {}
};

const UserManage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { rootPermissionKey } = initialState.currentUser;
  // init State
  const [modalVisit, setModalVisit] = useState(false);
  const [modalRoleVisit, setModalRoleVisit] = useState(false);
  const [selectUserid, setSelectUserid] = useState<number>();
  const [optType, setOptType] = useState<string>('create');
  const [selectDetail, setSelectDetail] = useState<UserColumns>();
  const [showOperationLogModal, setShowOperationLogModal] = useState<boolean>(false);
  const [logId, setLogId] = useState<string>();

  const actionRef = useRef<ActionType>();

  React.useEffect(() => {
    actionRef.current.reload();
  }, [modalRoleVisit]);

  const columns: ProColumns<UserColumns>[] = [
    {
      title: '姓名',
      dataIndex: 'real_name',
      valueType: 'textarea',
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        1: {
          text: '正常',
          status: 'Processing',
        },
        2: {
          text: '禁用',
          status: 'Error',
        },
      },
    },
    {
      title: '手机',
      dataIndex: 'phone',
      valueType: 'textarea',
    },
    {
      title: '用户账号',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'role_name',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        isApiAuth(900001002, rootPermissionKey) && (
          <a
            key="detail"
            onClick={() => {
              setSelectDetail(record);
              setOptType('check');
              setModalVisit(true);
            }}
          >
            详情
          </a>
        ),
        isApiAuth(900001003, rootPermissionKey) && record.role_name !== '超级管理员' && (
          <a
            key="edit"
            onClick={() => {
              setSelectDetail(record);
              setOptType('edit');
              setModalVisit(true);
            }}
          >
            编辑
          </a>
        ),

        isApiAuth(900001005, rootPermissionKey) && record.role_name !== '超级管理员' && (
          <a
            key="setRole"
            onClick={() => {
              setModalRoleVisit(true);
              setSelectUserid(record.user_id);
            }}
          >
            设置用户角色
          </a>
        ),
        isApiAuth(900001004, rootPermissionKey) &&
          record.role_name !== '超级管理员' &&
          record.status === 1 && (
            <Popconfirm
              key="stop"
              onConfirm={async () => {
                const res = await fetchSetPlatformUserStatus({
                  status: 2,
                  uid: record.user_id,
                });
                if (res.code === 0) {
                  message.success('操作成功');
                  actionRef.current.reload();
                }
              }}
              title={'确定禁用该用户吗？'}
              okText="确定"
              cancelText="取消"
            >
              <a>禁用</a>
            </Popconfirm>
          ),
        isApiAuth(900001004, rootPermissionKey) && record.status === 2 && (
          <Popconfirm
            key="start"
            onConfirm={async () => {
              const res = await fetchSetPlatformUserStatus({
                status: 1,
                uid: record.user_id,
              });
              if (res.code === 0) {
                message.success('操作成功');
                actionRef.current.reload();
              }
            }}
            title={'确定开启该用户吗？'}
            okText="确定"
            cancelText="取消"
          >
            <a>开启</a>
          </Popconfirm>
        ),
        // <a key="delect">删除</a>,
        <a
          key="optlog"
          onClick={() => {
            setShowOperationLogModal(true);
            setLogId(`${record.user_id}`);
          }}
        >
          操作日志
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={'用户列表'}
        actionRef={actionRef}
        rowKey={(x) => x.user_id}
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          collapsed: false,
        }}
        toolBarRender={() => [
          isApiAuth(900001001, rootPermissionKey) && (
            <CreateUser
              fetchUserList={actionRef.current.reload}
              modalVisit={modalVisit}
              setModalVisit={setModalVisit}
              optType={optType}
              setOptType={setOptType}
              selectDetail={selectDetail}
            />
          ),
        ]}
        request={getUserList}
        columns={columns}
      />
      <Modal
        destroyOnClose
        footer={null}
        visible={modalRoleVisit}
        onCancel={() => setModalRoleVisit(false)}
      >
        <SetUserRole
          uid={selectUserid}
          // fetchUserList={actionRef?.current.reload}
          modalRoleVisit={modalVisit}
          setModalRoleVisit={setModalRoleVisit}
        />
      </Modal>
      <Modal
        title="操作日志"
        visible={showOperationLogModal}
        destroyOnClose
        onCancel={() => setShowOperationLogModal(false)}
        footer={null}
        width={544}
        className="teamModal"
        bodyStyle={{ padding: '0 12px' }}
      >
        <OperationLog
          type={900001}
          id={logId}
          // addColumns={[
          //   {
          //     title: '操作结果',
          //     dataIndex: 'op_status',
          //     key: 'op_status',
          //     width: 80,
          //     render: (text) => {
          //       return (
          //         <>
          //           <div>{text ? '成功' : '失败'}</div>
          //         </>
          //       );
          //     },
          //   },
          // ]}
        />
      </Modal>
    </PageContainer>
  );
};

export default UserManage;
