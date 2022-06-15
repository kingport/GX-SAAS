import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, message, Space, Tooltip, Form, Descriptions, Radio, Popconfirm } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import ProCard from '@ant-design/pro-card';
import { fetchDriverDetail, fetchSetBanStatus } from './service';
import { Data, SetBanStatusParams } from './data';
import { useModel } from 'umi';
import { filterCityName } from '@/utils';
import ProForm, {
  ModalForm,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormInstance,
  ProFormTextArea,
} from '@ant-design/pro-form';
export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  status: string;
  creator: string;
  createdAt: number;
};
const DriverDetail: React.FC = (props) => {
  console.log(props);
  const [form] = Form.useForm();
  const { id } = props['match'].params;
  const { initialState } = useModel('@@initialState');

  const [detail, setDetail] = React.useState<Data>();

  // const actionRef = useRef<ActionType>();

  React.useEffect(() => {
    getDriverDetail();
  }, []);

  // 获取司机详情
  const getDriverDetail = async () => {
    const params = {
      driver_id: id * 1,
    };
    const res = await fetchDriverDetail(params);
    if (res.code === 0) {
      setDetail(res.data);
    }
  };
  const valueEnum = {
    0: 'close',
    1: 'running',
    2: 'online',
    3: 'error',
  };
  const tableListDataSource: TableListItem[] = [];

  const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

  for (let i = 0; i < 5; i += 1) {
    tableListDataSource.push({
      key: i,
      name: 'AppName',
      containers: Math.floor(Math.random() * 20),
      status: valueEnum[Math.floor(Math.random() * 10) % 4],
      createdAt: Date.now() - Math.floor(Math.random() * 2000),
      creator: creators[Math.floor(Math.random() * creators.length)],
    });
  }
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '应用名称',
      dataIndex: 'name',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      valueEnum: {
        all: { text: '全部' },
        付小小: { text: '付小小' },
        曲丽丽: { text: '曲丽丽' },
        林东东: { text: '林东东' },
        陈帅帅: { text: '陈帅帅' },
        兼某某: { text: '兼某某' },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 'all',
      filters: true,
      onFilter: true,
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        close: { text: '待发布', status: 'Default' },
        running: { text: '发布中', status: 'Processing' },
        online: { text: '发布成功', status: 'Success' },
        error: { text: '发布失败', status: 'Error' },
      },
    },
    {
      title: '容器数量',
      dataIndex: 'containers',
      align: 'right',
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: (
        <>
          创建时间
          <Tooltip placement="top" title="这是一段描述">
            <QuestionCircleOutlined style={{ marginLeft: 4 }} />
          </Tooltip>
        </>
      ),
      width: 140,
      key: 'since',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, record) => [
        record.status === 'close' && <a key="link">发布</a>,
        (record.status === 'running' || record.status === 'online') && <a key="warn">停用</a>,
        record.status === 'error' && <a key="republish">重新发布</a>,
        <a
          key="republish"
          style={
            record.status === 'running'
              ? {
                  color: 'rgba(0,0,0,.25)',
                  cursor: 'not-allowed',
                }
              : {}
          }
        >
          监控
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <Space style={{ width: '100%' }} size={24} direction="vertical">
        <ProCard
          title={
            <Space>
              {/* <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  message.error('开发中');
                }}
              >
                冻结
              </Button> */}
              <ModalForm<SetBanStatusParams>
                title="封禁司机"
                trigger={<Button type="primary">封禁</Button>}
                modalProps={{
                  destroyOnClose: true,
                  onCancel: () => console.log('run'),
                }}
                initialValues={{
                  ban_code: 1,
                }}
                onFinish={async (values: SetBanStatusParams) => {
                  console.log(values);
                  const res = await fetchSetBanStatus({
                    ...values,
                    driver_id: id * 1,
                  });
                  if (res.code === 0) {
                    message.success('操作成功');
                    getDriverDetail();
                    return true;
                  }
                }}
                form={form}
              >
                <Form.Item
                  label="是否永久封禁"
                  rules={[{ required: true, message: '请选择' }]}
                  name="ban_code"
                >
                  <Radio.Group>
                    <Radio value={1}>封禁指定时间</Radio>
                    <Radio value={2}>永久封禁</Radio>
                  </Radio.Group>
                </Form.Item>
                <ProForm.Group>
                  <ProFormDependency name={['ban_code']}>
                    {({ ban_code }) => {
                      return (
                        ban_code === 1 && (
                          <ProFormDateTimePicker
                            rules={[
                              {
                                required: true,
                                message: '请选择时间',
                              },
                            ]}
                            name="ban_time"
                            label="封禁开始时间"
                          />
                        )
                      );
                    }}
                  </ProFormDependency>
                  <ProFormDependency name={['ban_code']}>
                    {({ ban_code }) => {
                      return (
                        ban_code === 1 && (
                          <ProFormDateTimePicker
                            rules={[
                              {
                                required: true,
                                message: '请选择时间',
                              },
                            ]}
                            name="ban_end_time"
                            label="封禁结束时间"
                          />
                        )
                      );
                    }}
                  </ProFormDependency>
                </ProForm.Group>
                <ProForm.Group>
                  <ProFormTextArea
                    width="lg"
                    name="reason"
                    label="封禁说明"
                    placeholder="请输入封禁说明"
                  />
                </ProForm.Group>
              </ModalForm>
              {/* {detail?.ban_status === 1 && (
                <Popconfirm
                  title={'确定解封改司机吗？'}
                  okText="确定"
                  cancelText="取消"
                  onConfirm={async () => {
                    const res = await fetchSetBanStatus({
                      driver_id: id * 1,
                      ban_code: '0',
                    });
                    if (res.code === 0) {
                      message.success('操作成功');
                      getDriverDetail();
                    }
                  }}
                >
                  <Button type="primary">解封</Button>
                </Popconfirm>
              )} */}
              {/* <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  message.error('开发中');
                }}
              >
                强制收车
              </Button>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  message.error('开发中');
                }}
              >
                备注
              </Button>
              <Button
                type="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  message.error('开发中');
                }}
              >
                修改手机
              </Button> */}
            </Space>
          }
        >
          <Descriptions title={``} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            <Descriptions.Item label="司机姓名">{detail?.name}</Descriptions.Item>
            <Descriptions.Item label="司机ID">{detail?.driver_id}</Descriptions.Item>
            <Descriptions.Item label="账号状态">{detail?.account_status_name}</Descriptions.Item>
            {detail?.ban_status === 1 && (
              <Descriptions.Item label="封禁状态">{'封禁中'}</Descriptions.Item>
            )}
            {detail?.ban_status === 1 && (
              <Descriptions.Item label="封禁时间">
                {detail?.ban_time}至 {detail?.ban_end_time}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="手机号码">{detail?.cell}</Descriptions.Item>
            <Descriptions.Item label="加盟城市">
              {filterCityName(detail?.area_id, initialState)}
            </Descriptions.Item>
            <Descriptions.Item label="注册时间">{detail?.create_time}</Descriptions.Item>
            <Descriptions.Item label="所属公司">{detail?.company_name}</Descriptions.Item>
            <Descriptions.Item label="推荐人手机号">
              {detail?.inviter_driver_cell}
            </Descriptions.Item>
            <Descriptions.Item label="最近完单">{``}</Descriptions.Item>
            <Descriptions.Item label="累计拉新">{``}</Descriptions.Item>
            <Descriptions.Item label="累计邀请奖励">
              {detail?.inviter_history_amount}
            </Descriptions.Item>
          </Descriptions>
        </ProCard>
        {/* <ProCard
          tabs={{
            type: 'card',
          }}
        >
          <ProCard.TabPane key="tab1" tab="拉新纪录">
            <ProTable<TableListItem>
              columns={columns}
              // request={(params, sorter, filter) => {
              //   // 表单搜索项会从 params 传入，传递给后端接口。
              //   console.log(params, sorter, filter);
              //   return Promise.resolve({
              //     data: tableListDataSource,
              //     success: true,
              //   });
              // }}
              toolBarRender={false}
              rowKey="key"
              pagination={{
                showQuickJumper: true,
              }}
              search={false}
            />
          </ProCard.TabPane>
          <ProCard.TabPane key="tab2" tab="奖励发放记录"></ProCard.TabPane>
          <ProCard.TabPane key="tab3" tab="完单列表"></ProCard.TabPane>
          <ProCard.TabPane key="tab4" tab="操作日志"></ProCard.TabPane>
          <ProCard.TabPane key="tab5" tab="流水记录"></ProCard.TabPane>
          <ProCard.TabPane key="tab6" tab="疫情打卡记录"></ProCard.TabPane>
        </ProCard> */}
      </Space>
    </PageContainer>
  );
};

export default DriverDetail;
