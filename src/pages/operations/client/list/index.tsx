import { PlusOutlined } from '@ant-design/icons';
import { Button,  Space, Popconfirm, Form, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { fetchMessageList } from './service';
import OperationLog from '@/components/OperationLog';

import { useModel } from 'umi';
import CreateForm from './components/CreateForm';
import type { MessageList, MessageListParams } from './data';
import { isApiAuth } from '@/utils';
const RecruitConfig: React.FC = () => {
  // init State
  const { initialState } = useModel('@@initialState');
  const { rootPermissionKey } = initialState.currentUser;

  const [form] = Form.useForm();
  const [type, setType] = useState<string>('create');
  const [selectId, setSelectId] = useState<number>(0);

  // 获取消息列表
  const getMessageList = async (params: any): Promise<any> => {
    if (params.time) {
      params.send_time = params.time[0];
      params.end_time = params.time[1];
      delete params.time;
    }
    const res = await fetchMessageList({
      page_no: params.current,
      page_size: params.pageSize,
      ...params,
    });
    const { message_list, total_count } = res.data;
    return {
      data: message_list,
      success: true,
      total: total_count,
    };
  };

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [showOperationLogModal, setShowOperationLogModal] = useState<boolean>(false);
  const [logId, setLogId] = useState<number>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<MessageList>[] = [
    {
      title: '消息ID',
      dataIndex: 'id',
    },
    {
      title: '消息类别',
      dataIndex: 'type',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '全部',
        },
        1: {
          text: '安全消息',
        },
        2: {
          text: '活动消息',
        },
        3: {
          text: '其他消息',
        },
      },
    },
    {
      title: '发送周期',
      dataIndex: 'time',
      valueType: 'dateTimeRange',
      render: (_, record) => {
        return (
          <Space>
            {record.send_time}至{record.end_time}
          </Space>
        );
      },
    },
    {
      title: '城市',
      dataIndex: 'city_id',
      valueEnum: initialState?.currentUser?.valueEnumCity,
    },
    {
      title: '范围',
      dataIndex: 'range_person',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '全部司机',
        },
        1: {
          text: '指定司机',
        },
        2: {
          text: 'IOS',
        },
        3: {
          text: '安卓',
        },
      },
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '全部',
        },
        1: {
          text: '待审核',
        },
        2: {
          text: '审核通过',
        },
        3: {
          text: '审核不通过',
        },
        4: {
          text: '已终止',
        },
      },
    },
    {
      title: '发布状态',
      dataIndex: 'send_status',
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '待发布',
        },
        2: {
          text: '已发布',
        },
        3: {
          text: '已终止',
        },
      },
    },
    {
      title: '创建人',
      dataIndex: 'operator_name',
      hideInSearch: true,
    },
    {
      title: '消息简介',
      dataIndex: 'content_summary',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        isApiAuth(300005002, rootPermissionKey) && (
          <a
            key="check"
            onClick={() => {
              setType('check');
              setSelectId(record.id);
              handleModalVisible(true);
            }}
          >
            查看
          </a>
        ),
        isApiAuth(300005003, rootPermissionKey) && record.status === 1 && (
          <a
            key="edit"
            onClick={() => {
              setType('edit');
              setSelectId(record.id);
              handleModalVisible(true);
            }}
          >
            编辑
          </a>
        ),
        isApiAuth(300005004, rootPermissionKey) && (
          <a
            key="audit"
            onClick={() => {
              setType('audit');
              setSelectId(record.id);
              handleModalVisible(true);
            }}
          >
            审核
          </a>
        ),
        isApiAuth(300005005, rootPermissionKey) && record.city_id === 2 && (
          <Popconfirm
            title="确定开启入口吗"
            onConfirm={async () => {
              // const res = await fetchSetAreaPlanStatus({
              //   id: record.id,
              //   driver_recruit_status: 1,
              // });
              // if (res.code === 0) {
              //   message.success('开启成功');
              //   actionRef.current.reload();
              // }
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
            key="start"
          >
            <a>终止</a>
          </Popconfirm>
        ),
        isApiAuth(300005005, rootPermissionKey) && record.city_id === 1 && (
          <Popconfirm
            title="确定关闭入口吗"
            onConfirm={async () => {
              // const res = await fetchSetAreaPlanStatus({
              //   id: record.id,
              //   driver_recruit_status: 2,
              // });
              // if (res.code === 0) {
              //   message.success('关闭成功');
              //   actionRef.current.reload();
              // }
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
            key="stop"
          >
            <a>关闭入口</a>
          </Popconfirm>
        ),
        <a
          key="log"
          onClick={() => {
            setShowOperationLogModal(true);
            setLogId(record.id);
          }}
        >
          操作日志
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<MessageList, MessageListParams>
        headerTitle={'消息列表'}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        scroll={{
          x: 'max-content',
        }}
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建消息
          </Button>,
        ]}
        request={getMessageList}
        columns={columns}
      />
      <CreateForm
        setType={setType}
        type={type}
        selectId={selectId}
        form={form}
        createModalVisible={createModalVisible}
        handleModalVisible={handleModalVisible}
        actionRef={actionRef}
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
          type={300005}
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

export default RecruitConfig;
