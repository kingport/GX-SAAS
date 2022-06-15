import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { history, useModel } from 'umi';
// import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
// import ProDescriptions from '@ant-design/pro-descriptions';
// import type { FormValueType } from './components/UpdateForm';
// import UpdateForm from './components/UpdateForm';
import type { CarList } from './data';
// import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { getCarList } from './service';
import { ACCOUNT_STATUS, AUDIT_STATUS, LICENSE_AUTH } from '@/constant';
import OperationLog from '@/components/OperationLog';

const DriverCarList: React.FC = () => {
  // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showOperationLogModal, setShowOperationLogModal] = useState<boolean>(false);
  const [logId, setLogId] = useState<string>();
  // const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');

  /**
   * @description 获取车辆列表
   *
   */
  const carList = async (params: any): Promise<any> => {
    try {
      const res = await getCarList({
        page_no: params.current,
        page_size: params.pageSize,

        ...params,
      });
      const { car_list, total_count } = res.data;
      return {
        data: car_list,
        success: true,
        total: total_count,
      };
    } catch (error) {}
  };

  const columns: ProColumns<CarList>[] = [
    {
      title: '车牌号',
      dataIndex: 'plate_no',
      valueType: 'textarea',
    },
    {
      title: '车辆所有人',
      dataIndex: 'owner',
      valueType: 'textarea',
    },
    {
      title: '运营城市',
      dataIndex: 'area_id',
      valueEnum: initialState?.currentUser?.valueEnumCity,
    },
    {
      title: '所属公司',
      dataIndex: 'join_company_name',
      valueType: 'textarea',
    },
    {
      title: '车辆来源',
      dataIndex: 'source',
      valueEnum: {
        1: { text: '注册带入' },
        2: { text: '后台新增' },
        3: { text: '端内换车' },
        4: { text: '被替换车' },
      },
    },
    {
      title: '加入来源',
      dataIndex: 'biz_source',
      valueEnum: {
        0: { text: '直营' },
        1: { text: '个人加盟' },
        2: { text: '租赁公司' },
      },
    },
    {
      title: '绑定司机状态',
      dataIndex: 'bind_status',
      valueEnum: {
        0: { text: '未绑定' },
        1: { text: '已绑定' },
      },
    },
    {
      title: '审核状态',
      dataIndex: 'verify_status',
      valueEnum: {
        0: { text: '待审核' },
        1: { text: '审核通过' },
        2: { text: '审核不通过' },
      },
    },
    {
      title: '车辆审核状态',
      dataIndex: 'verify_status',
      valueEnum: {
        0: { text: '未审核' },
        1: { text: '已审核' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="detail" onClick={() => history.push(`/capacity/driver/detail/${record?.gvid}`)}>
          查看
        </a>,
        <a
          onClick={() =>
            history.push(`/capacity/driver/create?driver_id=${record?.gvid}&type=audit`)
          }
          key="audit"
        >
          审核
        </a>,
        <a
          key="log"
          onClick={() => {
            setShowOperationLogModal(true);
            setLogId(`${record.gvid}`);
          }}
        >
          操作日志
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<CarList>
        scroll={{
          x: 'max-content',
        }}
        search={{
          labelWidth: 'auto',
        }}
        actionRef={actionRef}
        rowKey={(record) => record.gvid}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push(`/capacity/driver/create?type=create`);
            }}
          >
            <PlusOutlined /> 新增车辆
          </Button>,
        ]}
        request={carList}
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

export default DriverCarList;
