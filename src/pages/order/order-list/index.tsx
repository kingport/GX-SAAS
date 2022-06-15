import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
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
import type { OrderList } from './data';
// import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { getOrderList } from './service';
import { ORDER_CHANNEL, ORDER_IS_PAID, ORDER_IS_PAY, ORDER_STATUS } from '@/constant';
import moment from 'moment';

const SearchOrderList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');

  // 查询订单列表
  const orderList = async (params: any): Promise<any> => {
    console.log(params, 'MMKKIII');
    if (params.order_id || params.driver_phone || params.passenger_phone) {
      if (params.departure_time) {
        params.start_time = moment(params.departure_time[0]).format('YYYY-MM-DD 00:00:00');
        params.end_time = moment(params.departure_time[1]).format('YYYY-MM-DD 23:59:59');
        delete params.departure_time;
      }
      try {
        const res = await getOrderList({
          page_no: params.current,
          page_size: params.pageSize,
          ...params,
        });
        const { order_list, total_count } = res.data;
        return {
          data: order_list,
          success: true,
          total: total_count,
        };
      } catch (error) {}
    } else {
      return message.error('请至少填写订单号或司机手机号任意一项');
    }
    console.log(params, 'KKK');
  };

  const columns: ProColumns<OrderList>[] = [
    {
      title: '订单号',
      dataIndex: 'order_id',
      // initialValue: '11010000010001',
      valueType: 'textarea',
    },
    {
      title: '司机手机号',
      dataIndex: 'driver_phone',
      // initialValue: '10010001113',
      hideInTable: true,
      valueType: 'textarea',
    },
    {
      title: '乘客手机号',
      dataIndex: 'passenger_phone',
      // initialValue: '10010001113',
      hideInTable: true,
      valueType: 'textarea',
    },
    // {
    //   title: '业务类型',
    //   dataIndex: 'phone',
    //   valueType: 'textarea',
    //   hideInSearch: true,
    // },
    {
      title: '订单来源',
      dataIndex: 'channel',
      valueEnum: ORDER_CHANNEL,
      hideInSearch: true,
    },
    {
      title: '下单时间',
      dataIndex: 'departure_time',
      hideInSearch: true,
    },
    {
      title: '下单时间',
      dataIndex: 'departure_time',
      valueType: 'dateRange',
      hideInTable: true,
      // hideInSearch: true,
      initialValue: [
        moment().subtract(90, 'days').format('YYYY-MM-DD hh:mm:ss'),
        moment().format('YYYY-MM-DD hh:mm:ss'),
      ],
    },
    {
      title: '起始点',
      dataIndex: 'starting_name',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '目的地',
      dataIndex: 'dest_name',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '订单状态',
      dataIndex: 'order_status',
      initialValue: '-1',
      valueEnum: ORDER_STATUS,
      hideInSearch: true,
    },
    {
      title: '支付状态',
      dataIndex: 'is_pay',
      initialValue: '-1',
      valueEnum: ORDER_IS_PAY,
      hideInSearch: true,
    },
    {
      title: '垫付状态',
      dataIndex: 'is_platform_paid',
      initialValue: '-1',
      valueEnum: ORDER_IS_PAID,
      hideInSearch: true,
    },
    {
      title: '支付时间',
      dataIndex: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '订单总金额（元）',
      dataIndex: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '乘客实付（元）',
      dataIndex: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '退款乘客（元）',
      dataIndex: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '免单赔偿（元）',
      dataIndex: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key="config" onClick={() => history.push(`/order/detail/${record?.order_id}`)}>
          查看详情
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<OrderList>
        scroll={{
          x: 'max-content',
        }}
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          collapsed: false,
        }}
        actionRef={actionRef}
        rowKey={(record) => record.order_id}
        toolBarRender={() => []}
        request={orderList}
        columns={columns}
        manualRequest
      />
    </PageContainer>
  );
};

export default SearchOrderList;
