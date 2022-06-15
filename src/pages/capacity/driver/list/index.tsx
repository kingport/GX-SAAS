import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { history, useModel } from 'umi';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
// import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
// import ProDescriptions from '@ant-design/pro-descriptions';
// import type { FormValueType } from './components/UpdateForm';
// import UpdateForm from './components/UpdateForm';
import type { DriverListItem } from './data';
// import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { getDriverList } from './service';
import { ACCOUNT_STATUS, AUDIT_STATUS, LICENSE_AUTH } from '@/constant';
import OperationLog from '@/components/OperationLog';
import { filterCountyName, isApiAuth } from '@/utils';

const TableList: React.FC = () => {
  // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showOperationLogModal, setShowOperationLogModal] = useState<boolean>(false);
  const [logId, setLogId] = useState<string>();
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const { rootPermissionKey } = initialState.currentUser;
  // 获取司机列表
  const driverList = async (params: any): Promise<any> => {
    try {
      const res = await getDriverList({
        page_no: params.current,
        page_size: params.pageSize,
        ...params,
      });
      const { driver_list, total_count } = res.data;
      return {
        data: driver_list,
        success: true,
        total: total_count,
      };
    } catch (error) {}
  };

  const columns: ProColumns<DriverListItem>[] = [
    {
      title: '司机姓名',
      dataIndex: 'name',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '司机手机号',
      dataIndex: 'phone',
      valueType: 'textarea',
    },
    {
      title: '司机ID',
      dataIndex: 'driver_id',
      valueType: 'textarea',
    },
    {
      title: '车牌号',
      dataIndex: 'plate_no',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: '账号状态',
      dataIndex: 'account_status',
      hideInForm: true,
      initialValue: -1,
      valueEnum: ACCOUNT_STATUS,
    },
    {
      title: '双证状态',
      dataIndex: 'license_auth',
      hideInForm: true,
      initialValue: '-1',
      valueEnum: LICENSE_AUTH,
    },
    {
      title: '当前公司',
      dataIndex: 'join_company_name',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '招募公司',
      dataIndex: 'first_company_name',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '选择城市',
      dataIndex: 'area_id',
      valueEnum: initialState?.currentUser?.valueEnumCity,
    },
    {
      title: '选择区县',
      dataIndex: 'county_id',
      hideInSearch: true,
      render: (_, record) => [
        <Typography.Text key="county">
          {filterCountyName(record.area_id, _, initialState)}
        </Typography.Text>,
      ],
    },
    {
      title: '审核状态',
      dataIndex: 'audit_status',
      hideInForm: true,
      initialValue: '-1',
      valueEnum: AUDIT_STATUS,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        isApiAuth(100002006, rootPermissionKey) && (
          <a
            key="config"
            onClick={() =>
              history.push(`/capacity/driver/create?driver_id=${record?.driver_id}&type=check`)
            }
          >
            证件信息
          </a>
        ),
        isApiAuth(100001001, rootPermissionKey) && record.audit_status !== 5 && (
          <a
            onClick={() =>
              history.push(`/capacity/driver/create?driver_id=${record?.driver_id}&type=audit`)
            }
            key="audit"
          >
            审核
          </a>
        ),
        isApiAuth(100002002, rootPermissionKey) && (
          <a
            key="detail"
            onClick={() => history.push(`/capacity/driver/detail/${record?.driver_id}`)}
          >
            司机详情
          </a>
        ),
        // <a key="subscribeAlert">变更公司</a>,
        <a
          key="log"
          onClick={() => {
            setShowOperationLogModal(true);
            setLogId(`${record.driver_id}`);
          }}
        >
          操作日志
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<DriverListItem>
        scroll={{
          x: 'max-content',
        }}
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          collapsed: false,
        }}
        headerTitle={'司机列表'}
        actionRef={actionRef}
        rowKey={(record) => record.driver_id}
        toolBarRender={() => [
          // <Button
          //   type="primary"
          //   key="primary"
          //   onClick={() => {
          //     history.push(`/capacity/driver/create?type=create`);
          //   }}
          // >
          //   <PlusOutlined /> 新增司机
          // </Button>,
        ]}
        request={driverList}
        columns={columns}
      />
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
          type={100002}
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

export default TableList;
