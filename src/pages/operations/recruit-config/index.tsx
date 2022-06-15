import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Space,
  Popconfirm,
  Form,
  InputNumber,
  Typography,
  Radio,
  Cascader,
  Input,
  Select,
} from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {
  fetchAddAreaPlan,
  fetchAreaPlanList,
  fetchEditAreaPlan,
  fetchSetAreaPlanStatus,
} from './service';
import { AreaPlanList, AreaPlanListParams } from './data';
import { useModel } from 'umi';
import { filterCountyName, filterCountys, isApiAuth } from '@/utils/index';
const RecruitConfig: React.FC = () => {
  // init State
  const { initialState } = useModel('@@initialState');
  const { rootPermissionKey } = initialState.currentUser;
  const [form] = Form.useForm();
  const [countyList, setCountyList] = useState([]);
  const [type, setType] = useState<string>('create');
  const [editId, setEditId] = useState<number>(0);

  // 获取配置列表
  const getAreaPlanList = async (params: any): Promise<any> => {
    const res = await fetchAreaPlanList({
      page_no: params.current,
      page_size: params.pageSize,
      ...params,
    });
    const { area_plan_list, total_count } = res.data;
    return {
      data: area_plan_list,
      success: true,
      total: total_count,
    };
  };

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  // const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const columns: ProColumns<AreaPlanList>[] = [
    {
      title: '城市',
      dataIndex: 'city_code',
      valueEnum: initialState?.currentUser?.valueEnumCity,
    },
    {
      title: '区县',
      dataIndex: 'county_code',
      hideInSearch: true,
      render: (_: any, record) => [
        <Typography.Text key="county">
          {filterCountyName(record.city_code, _, initialState)}
        </Typography.Text>,
      ],
    },
    {
      title: '状态',
      dataIndex: 'driver_recruit_status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '全部',
          status: 'Default',
        },
        1: {
          text: '已开通',
          status: 'Processing',
        },
        2: {
          text: '已关闭',
          status: 'Error',
        },
      },
    },
    {
      title: '需要双证情况',
      hideInSearch: true,
      render: (_, record) => [
        <Space key="must">
          {record.must_dodl === 1 && record.must_dol === 0 && `仅需网约车运输证`}
          {record.must_dol === 1 && record.must_dodl === 0 && `仅需网约车驾驶员证`}
          {record.must_dol === 0 && record.must_dodl === 0 && `双证非必传`}
          {record.must_dol === 1 && record.must_dodl === 1 && `双证必传`}
        </Space>,
      ],
    },
    {
      title: '操作人',
      dataIndex: 'opt_name',
      hideInSearch: true,
    },
    {
      title: '最后一次操作时间',
      dataIndex: 'update_time',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        isApiAuth(300001002, rootPermissionKey) && (
          <a
            key="edit"
            onClick={() => {
              setType('edit');
              setEditId(record.id);
              handleModalVisible(true);
              if (record.city_code) {
                setCountyList(filterCountys(record.city_code, initialState));
              }
              form.setFieldsValue({ ...record });
            }}
          >
            编辑配置
          </a>
        ),
        isApiAuth(300001002, rootPermissionKey) && record.driver_recruit_status === 2 && (
          <Popconfirm
            title="确定开启入口吗"
            onConfirm={async () => {
              const res = await fetchSetAreaPlanStatus({
                id: record.id,
                driver_recruit_status: 1,
              });
              if (res.code === 0) {
                message.success('开启成功');
                actionRef.current.reload();
              }
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
            key="start"
          >
            <a>开启入口</a>
          </Popconfirm>
        ),
        isApiAuth(300001002, rootPermissionKey) && record.driver_recruit_status === 1 && (
          <Popconfirm
            title="确定关闭入口吗"
            onConfirm={async () => {
              const res = await fetchSetAreaPlanStatus({
                id: record.id,
                driver_recruit_status: 2,
              });
              if (res.code === 0) {
                message.success('关闭成功');
                actionRef.current.reload();
              }
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
            key="stop"
          >
            <a>关闭入口</a>
          </Popconfirm>
        ),
        <a key="log" onClick={() => message.info('开发中')}>
          操作日志
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<AreaPlanList, AreaPlanListParams>
        headerTitle={'招募配置'}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          isApiAuth(300001001, rootPermissionKey) && (
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
                setType('create');
              }}
            >
              <PlusOutlined /> 新增
            </Button>
          ),
        ]}
        request={getAreaPlanList}
        columns={columns}
      />

      <ModalForm
        form={form}
        title={'新增招募配置'}
        width="500px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (values) => {
          if (type === 'edit') {
            values.id = editId;
          }
          const res =
            type === 'create' ? await fetchAddAreaPlan(values) : await fetchEditAreaPlan(values);
          if (res.code === 0) {
            message.success('操作成功');
            handleModalVisible(false);
            actionRef.current.reload();
          }
        }}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            form.resetFields();
          },
        }}
      >
        <ProFormGroup>
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
            //
            options={initialState?.currentUser?.area_list}
            fieldProps={{
              onChange: (value: number) => {
                setCountyList([]);
                form.setFieldsValue({
                  county_code: [],
                });
                setCountyList(filterCountys(value, initialState));
              },
            }}
            disabled={type === 'edit'}
            width="sm"
            label="选择城市"
            name="city_code"
          />
          <ProFormSelect
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
            disabled={type === 'edit'}
            mode="multiple"
            options={countyList}
            width="sm"
            name="county_code"
            label="选择区县"
          />
        </ProFormGroup>
        {/* <Form.Item
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
          label="目标司机数"
          name="target_driver_num"
        >
          <InputNumber min={1} />
        </Form.Item> */}
        {/* <ProFormTextArea
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
          width="md"
          label="备注"
          name="remark"
        /> */}
        <Form.Item
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
          label="网约车运输资格证"
          name="must_dodl"
        >
          <Radio.Group value={0}>
            <Radio value={1}>必填</Radio>
            <Radio value={0}>不必填</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
          label="网约车从业资格证"
          name="must_dol"
        >
          <Radio.Group value={0}>
            <Radio value={1}>必填</Radio>
            <Radio value={0}>不必填</Radio>
          </Radio.Group>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default RecruitConfig;
