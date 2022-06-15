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
  Tag,
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
  ProFormInstance,
} from '@ant-design/pro-form';
import { fetchChannelList, fetchPriceRuleList, fetchProductList, fetchCountyList } from './service';
import { PriceRuleList, PriceRuleParams } from './data';
import { useModel, useParams } from 'umi';
import { filterCountyName, filterCountys } from '@/utils/index';
import moment from 'moment';
import CreateForm from './components/CreateForm';
const Valuation: React.FC = () => {
  // init State
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const [countyList, setCountyList] = useState([]);
  const [countyEnum, setCountyEnum] = useState({});
  const [productList, setProductList] = useState([]);
  const [productEnum, setProductEnum] = useState({});
  const [optionType, setOptionType] = useState<string>('create');
  const [selectPriceId, setSelectPriceId] = useState<number>(0);

  const [modalVisit, setModalVisit] = useState(false);

  React.useEffect(() => {
    console.log(moment.locales(), 'sdsd');
    getProductList();
  }, []);

  // 获取配置列表
  const getPriceRuleList = async (params: any): Promise<any> => {
    if (params.district) {
      params.district = Number(params.district)
    }
    const NeedTransform = ["product_id", "district", "channel"];
    Object.keys(params).map((key) => {
      if (NeedTransform.indexOf(key) > -1) {
        params[key] = Number(params[key])
      }
    });
    const res = await fetchPriceRuleList({
      page_no: params.current,
      page_size: params.pageSize,
      ...params,
    });
    const { price_rule_list, total_count } = res.data;
    return {
      data: price_rule_list,
      success: true,
      total: total_count,
    };
  };

  // 获取平台列表
  const getProductList = async () => {
    const res = await fetchProductList({});
    if (res.code === 0) {
      let product_list = {};
      res.data.product_list.map(
        (x: { product_id: number; value: number; label: string; product_name: string }) => {
          product_list[x.product_id] = { text: x.product_name };
          x.label = x.product_name;
          x.value = x.product_id;
        },
      );
      console.log(product_list, "product_list")
      setProductEnum(product_list);
      setProductList(res.data.product_list);
    }
  };
  
  // 获取区县列表
  const getCountyList = async (city_code:any) => {
    const res = await fetchCountyList({city: city_code});
    if (res.code === 0) {
      let county_list = {};
      res.data.map(
        (x: { code: number; value: number; label: string; name: string }) => {
          county_list[x.code] = { text: x.name };
          x.label = x.name;
          x.value = x.code;
        },
      );
      setCountyEnum(county_list);
      setCountyList(res.data);
    }
  };

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const ref = useRef<ProFormInstance>();
  // const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  // const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  const columns: ProColumns<PriceRuleList>[] = [
    {
      title: '计价ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '品牌',
      dataIndex: 'product_id',
      valueEnum: productEnum,
    },
    {
      title: '渠道',
      dataIndex: 'channel',
      valueEnum: {
        10000: "滴滴",
        10100: "百度地图",
        10200: "腾讯地图",
        10500: "花小猪",
      },
    },
    // {
    //   title: '产品类型',
    //   dataIndex: 'product_id',
    //   hideInSearch: true,
    //   render: (_,record) => {
    //     console.log()
    //     return (
    //       <div></div>
    //     )
    //   }
    // },
    {
      title: '城市',
      dataIndex: 'area',
      valueEnum: initialState?.currentUser?.valueEnumCity,
      fieldProps: {
        onChange: (value: any) => {
          setCountyList([])
          setCountyEnum({})
          if(value) {
            ref.current.setFieldsValue({
              district: null,
            });
            getCountyList(value)
          }
        },
      }
    },
    {
      title: '区县',
      dataIndex: 'district',
      valueEnum: countyEnum,
      render: (_, record) => [
        <Typography.Text key="county">
          {filterCountyName(record.area, record.abstract_district.split(',')[1], initialState)}
        </Typography.Text>,
      ],
    },
    {
      title: '计费模式',
      dataIndex: 'price_mode',
      hideInSearch: true,
      valueEnum: {
        0: {
          text: '起步价',
        },
        1: {
          text: '一口价',
        },
      },
    },
    {
      title: '日期类型',
      dataIndex: 'day_type',
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '常规',
        },
        2: {
          text: '节假日',
        },
      },
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      valueEnum: {
        1: {
          text: '待审核',
          status: 'Error',
        },
        2: {
          text: '审核通过',
          status: 'Success',
        },
        3: {
          text: '审核不通过',
          status: 'Error',
        },
        4: {
          text: '终止',
          status: 'Error',
        },
      },
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      hideInSearch: true,
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      hideInSearch: true,
    },
    {
      title: '失效状态',
      hideInSearch: true,
      render: (_, record) => {
        if (moment(record.end_time).fromNow().indexOf('g') > -1) {
          return (
            <Tag color="red">
              {moment(record.end_time).fromNow()}
              已失效
            </Tag>
          );
        }
        return (
          <Tag color="green">
            {moment(record.end_time).fromNow()}
            失效
          </Tag>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="check"
          onClick={() => {
            setModalVisit(true);
            setOptionType('check');
            setSelectPriceId(record.id);
          }}
        >
          查看
        </a>,
        record.status === 1 && (
          <a
            key="edit"
            onClick={() => {
              setModalVisit(true);
              setOptionType('edit');
              setSelectPriceId(record.id);
            }}
          >
            编辑
          </a>
        ),
        <a
          key="copy"
          onClick={() => {
            setModalVisit(true);
            setOptionType('copy');
            setSelectPriceId(record.id);
          }}
        >
          复制
        </a>,
        record.status === 1 && (
          <a
            key="edit"
            onClick={() => {
              setModalVisit(true);
              setOptionType('audit');
              setSelectPriceId(record.id);
            }}
          >
            审核
          </a>
        ),
        record.status === 2 && (
          <Popconfirm
            key="stop"
            // onConfirm={() => stopCityPrice(record)}
            title="确定要操作吗?"
            okText="确定"
            cancelText="取消"
          >
            <a onClick={() => message.info('开发中')}>终止</a>
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
      <ProTable<PriceRuleList, PriceRuleParams>
        headerTitle={'计价列表'}
        actionRef={actionRef}
        formRef={ref}
        rowKey={(record) => record.id}
        search={{
          labelWidth: 'auto',
          collapseRender: false,
          collapsed: false,
        }}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => {
              setModalVisit(true);
            }}
          >
            <PlusOutlined /> 新增计价
          </Button>,
        ]}
        request={getPriceRuleList}
        columns={columns}
      />
      <CreateForm
        productList={productList}
        setModalVisit={setModalVisit}
        modalVisit={modalVisit}
        actionRef={actionRef}
        selectPriceId={selectPriceId}
        optionType={optionType}
        setOptionType={setOptionType}
      />
      {/* <ModalForm
        form={form}
        title={'新增招募配置'}
        width="500px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        // onFinish={async (values) => {
        //   const res = await fetchAddAreaPlan(values);
        //   if (res.code === 0) {
        //     message.success('添加成功');
        //     handleModalVisible(false);
        //     actionRef.current.reload();
        //   }
        // }}
      ></ModalForm> */}
    </PageContainer>
  );
};

export default Valuation;
