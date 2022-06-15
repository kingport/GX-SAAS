import React, { useState } from 'react';
import { Button, message, Space, Form, Radio, InputNumber, Row, Col } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormList,
  ProFormTimePicker,
  ProFormDateTimePicker,
  ProFormDigit,
} from '@ant-design/pro-form';
import { useModel } from 'umi';
import { filterCityDistrict, filterCountys } from '@/utils';
import Card from '@/components/Card';
import {
  fetchAddPriceRule,
  fetchChannelList,
  fetchEditPriceRule,
  fetchGetPriceRule,
  fetchReviewPriceRulePriceRule,
} from '../service';

export type FormProps = {
  modalVisit: boolean;
  setModalVisit: any;
  productList: any;
  actionRef: any;
  selectPriceId: number;
  optionType: string;
  setOptionType: (val: string) => void;
};
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 13 },
};
const formItemLayoutType = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
};
const formItemLayoutAgain = {
  labelCol: { span: 10 },
  wrapperCol: { span: 11 },
};
const formItemLayout_d = {
  labelCol: { span: 13 },
  wrapperCol: { span: 8 },
};
export default (props: FormProps) => {
  const {
    modalVisit,
    setModalVisit,
    setOptionType,
    productList,
    optionType,
    actionRef,
    selectPriceId,
  } = props;
  console.log(modalVisit, 'modalVisitmodalVisit');
  console.log(optionType, 'optionTypeoptionType');
  console.log(productList, 'productListproductList');
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();

  // init state
  const [countyList, setCountyList] = useState([]);
  const [channelType, setChannelTypes] = useState([]);

  // 获取产品类型
  const getfetchChannelList = async (product_id: number) => {
    const res = await fetchChannelList({
      product_id,
      partner_id: 1000, // 滴滴
    });
    if (res.code === 0) {
      res.data.channel_list.map(
        (x: { label: string; value: number; channel_name: string; channel: number }) => {
          x.label = x.channel_name;
          x.value = x.channel;
        },
      );
      setChannelTypes(res.data.channel_list);
    }
  };

  // 获取计价详情
  const getPriceRule = async () => {
    const res = await fetchGetPriceRule({
      id: selectPriceId,
    });
    if (res.code === 0) {
      res.data.p_rule = JSON.parse(res.data.p_rule);
      res.data.d_rule = JSON.parse(res.data.d_rule);
      const NeedTransform = ["start_price_by_time_interval", "distance_by_time_interval", "time_by_time_interval", "empty_by_distance_serial_interval"];
      Object.keys(res.data.p_rule).map((key) => {
        if (NeedTransform.indexOf(key) > -1) {
          if (res.data.p_rule[key] && typeof(res.data.p_rule[key]) == "string") {
            res.data.p_rule[key] = JSON.parse(res.data.p_rule[key]);
          }
        }
      });
      Object.keys(res.data.d_rule).map((key) => {
        if (NeedTransform.indexOf(key) > -1) {
          if (res.data.d_rule[key] && typeof(res.data.d_rule[key]) == "string") {
            res.data.d_rule[key] = JSON.parse(res.data.d_rule[key]);
          }
        }
      });
      console.log(res.data, 'lop');
      console.log(res.data, 'res.data');
      // 区县列表
      if (res.data.area) {
        setCountyList(filterCountys(res.data.area, initialState));
      }
      // 品牌渠道
      if (res.data.product_id) {
        getfetchChannelList(res.data.product_id);
      }

      form.setFieldsValue({
        ...res.data,
      });
      // 计费模式 0 特殊处理
      if (res.data.price_mode === 0) {
        form.setFieldsValue({
          price_mode: `${res.data.price_mode}`,
        });
      }
      // 区号特殊处理
      if (res.data.abstract_district.indexOf(',') > 0) {
        form.setFieldsValue({
          abstract_district: res.data.abstract_district.split(',')[1] * 1,
        });
      } else {
        form.setFieldsValue({
          abstract_district: null,
        });
      }
    }
  };

  React.useEffect(() => {
    if (optionType !== 'create') {
      getPriceRule();
    }
  }, [optionType, selectPriceId]);
  return (
    <>
      <ModalForm
        form={form}
        title={`新建计价`}
        visible={modalVisit}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            setOptionType('create');
            form.resetFields()
          },
        }}
        submitter={{
          render: (props, defaultDoms) => {
            if (optionType === 'audit') {
              return [
                <Button
                  key="no"
                  onClick={async () => {
                    const res = await fetchReviewPriceRulePriceRule({
                      id: selectPriceId,
                      status: 3,
                    });
                    if (res.code == 0) {
                      message.success('操作成功');
                      actionRef.current.reload();
                      setModalVisit(false);
                      return true;
                    }
                  }}
                >
                  审核不通过
                </Button>,
                <Button
                  key="ok"
                  type="primary"
                  onClick={async () => {
                    const res = await fetchReviewPriceRulePriceRule({
                      id: selectPriceId,
                      status: 2,
                    });
                    if (res.code == 0) {
                      message.success('操作成功');
                      setModalVisit(false);
                      actionRef.current.reload();
                      return true;
                    }
                  }}
                >
                  审核通过
                </Button>,
              ];
            } else {
              return defaultDoms;
            }
          },
          submitButtonProps: {
            style: {
              display: optionType === 'check' ? 'none' : 'block',
            },
          },
        }}
        onFinish={async (values) => {
          // 查找区号
          if (values.area) {
            values.district = filterCityDistrict(values.area, initialState);
            // 区县可能不填
            if (values.abstract_district) {
              values.abstract_district = `${values.district},${values.abstract_district}`;
            } else {
              values.abstract_district = `${values.district}`;
            }
          }

          const NeedTransform = ["start_price_by_time_interval", "distance_by_time_interval", "time_by_time_interval", "empty_by_distance_serial_interval"];
          const NeedcalcHmTimeFiel = ["start_price_by_time_interval", "distance_by_time_interval", "time_by_time_interval"];
          Object.keys(values.p_rule).map((key) => {
            if (NeedTransform.indexOf(key) > -1) {
              if (NeedcalcHmTimeFiel.indexOf(key) > -1) {
                if(values.p_rule[key].intervals && values.p_rule[key].intervals.length > 0) {
                  for (let i in values.p_rule[key].intervals) {
                    if (values.p_rule[key].intervals[i].begin && values.p_rule[key].intervals[i].begin.length > 0) {
                      values.p_rule[key].intervals[i].begin = values.p_rule[key].intervals[i].begin.substr(-8, 5)
                    }
                    if (values.p_rule[key].intervals[i].end && values.p_rule[key].intervals[i].end.length > 0) {
                      values.p_rule[key].intervals[i].end = values.p_rule[key].intervals[i].end.substr(-8, 5)
                    }
                  }
                }
              }
              if (values.p_rule[key]) {
                values.p_rule[key] = JSON.stringify(values.p_rule[key]);
              }
            }
          });
          Object.keys(values.d_rule).map((key) => {
            if (NeedTransform.indexOf(key) > -1) {
              if (NeedcalcHmTimeFiel.indexOf(key) > -1) {
                if(values.d_rule[key].intervals && values.d_rule[key].intervals.length > 0) {
                  for (let i in values.d_rule[key].intervals) {
                    if (values.d_rule[key].intervals[i].begin && values.d_rule[key].intervals[i].begin.length > 0) {
                      values.d_rule[key].intervals[i].begin = values.d_rule[key].intervals[i].begin.substr(-8, 5)
                    }
                    if (values.d_rule[key].intervals[i].end && values.d_rule[key].intervals[i].end.length > 0) {
                      values.d_rule[key].intervals[i].end = values.d_rule[key].intervals[i].end.substr(-8, 5)
                    }
                  }
                }
              }
              if (values.d_rule[key]) {
                values.d_rule[key] = JSON.stringify(values.d_rule[key]);
              }
            }
          });

          values.p_rule = JSON.stringify(values.p_rule);
          values.d_rule = JSON.stringify(values.d_rule);
          console.log(values, 'VALUES');
          // return false;
          let res;
          if (optionType === 'create' || optionType === 'copy') {
            res = await fetchAddPriceRule(values);
          }
          if (optionType === 'edit') {
            values.id = selectPriceId;
            res = await fetchEditPriceRule(values);
          }

          if (res.code === 0) {
            setOptionType('create');
            message.success('操作成功');
            actionRef.current.reload();
            return true;
          }
        }}
        onVisibleChange={setModalVisit}
        layout="horizontal"
        width={900}
      >
        <ProForm.Group title="类型选择"></ProForm.Group>
        <ProFormSelect
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
          options={productList}
          name="product_id"
          label="品牌"
          placeholder="请选择"
          fieldProps={{
            onChange: (value: number) => {
              setChannelTypes([]);
              form.setFieldsValue({
                channel: [],
              });
              if (value) {
                getfetchChannelList(value);
              }
            },
          }}
          disabled={optionType === 'check'}
          {...formItemLayoutType}
        />
        <ProFormSelect
          disabled={optionType === 'check'}
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
          options={channelType}
          name="channel"
          label="渠道"
          placeholder="请选择"
          {...formItemLayoutType}
        />
        <ProForm.Group title="生效范围"></ProForm.Group>
        <Space style={{ marginLeft: 35 }}>
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
                  abstract_district: [],
                });
                setCountyList(filterCountys(value, initialState));
              },
            }}
            width="sm"
            label="选择城市"
            name="area"
            disabled={optionType === 'check'}

            // {...formItemLayoutType}
          />
          <ProFormSelect
            rules={[
              {
                required: false,
                message: '请选择',
              },
            ]}
            // mode="multiple"
            options={countyList}
            width="md"
            name="abstract_district"
            label="选择区县"
            disabled={optionType === 'check'}

            // {...formItemLayoutType}
          />
        </Space>

        <ProFormSelect
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
          options={[
            {
              label: '常规',
              value: 1,
            },
            {
              label: '节假日',
              value: 2,
            },
          ]}
          width="sm"
          name="day_type"
          label="日期类型"
          disabled={optionType === 'check'}
          {...formItemLayoutType}
        />
        <ProForm.Group title="计费模式"></ProForm.Group>
        <Form.Item
          rules={[
            {
              required: true,
              message: '请选择',
            },
          ]}
          label="模式"
          name="price_mode"
          initialValue={'0'}
          {...formItemLayoutType}
        >
          <Radio.Group disabled={optionType === 'check'}>
            <Radio value={'0'}>起步价</Radio>
            <Radio value={1}>一口价</Radio>
          </Radio.Group>
        </Form.Item>

        <ProForm.Group title="信息服务费"></ProForm.Group>
        {/* <Form.Item label="费用" name="info_fee" {...formItemLayoutType}>
          <InputNumber disabled={optionType === 'check'} placeholder="请输入" /> 元
        </Form.Item> */}
        <Form.Item>
            <ProFormDigit
              label="费用"
              name="info_fee"
              width="sm"
              min={0}
              disabled={optionType === 'check'}
              placeholder="请输入"
              addonAfter="元"
              {...formItemLayoutType} />
        </Form.Item>
        {/* <ProForm.Group title="计价详情配置"></ProForm.Group>
        <Form.Item label="默认抽成比例" name="range_person" {...formItemLayoutType}>
          <InputNumber placeholder="请输入" />
        </Form.Item> */}
        <Row>
          <Col span={12}>
            <h3 style={{ textAlign: 'center' }}>乘客</h3>
          </Col>
          <Col span={12}>
            <h3 style={{ textAlign: 'center' }}>司机</h3>
          </Col>
        </Row>
        {/* 起步价 */}
        <Card title="起步价">
          <Row gutter={16}>
            <Col span={12} className="details">
              <Form.Item
                label="起步价（元）"
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                name={['p_rule', 'start_price']}
                // initialValue={_.get(data, 'p_rule.start_price')}
                {...formItemLayout}
              >
                <InputNumber min={0} disabled={optionType === 'check'} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                label="起步里程（Km）"
                name={['p_rule', 'start_distance']}
                // initialValue={_.get(data, 'p_rule.start_distance')}
                {...formItemLayout}
              >
                <InputNumber disabled={optionType === 'check'} min={0} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                label="起步时长（分钟）"
                name={['p_rule', 'start_package_time']}
                // initialValue={_.get(data, 'p_rule.start_package_time')}
                {...formItemLayout}
              >
                <InputNumber disabled={optionType === 'check'} min={0} />
              </Form.Item>
              <ProFormList
                name={['p_rule', 'start_price_by_time_interval', 'intervals']}
                label="高峰时段"
                copyIconProps={false}
                creatorButtonProps={{
                  creatorButtonText: '新增',
                }}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {/* <Form.Item style={{ margin: 0 }}> */}
                    <ProFormTimePicker
                      // dataFormat="HH:mm"
                      fieldProps={{
                        format: 'HH:mm',
                      }}
                      name="begin"
                      disabled={optionType === 'check'}
                    />
                    {/* </Form.Item> */}
                  </Col>
                  <Col span={12}>
                    {/* <Form.Item style={{ margin: 0 }}> */}
                    <ProFormTimePicker
                      // dataFormat="HH:mm"
                      fieldProps={{
                        format: 'HH:mm',
                      }}
                      name="end"
                      disabled={optionType === 'check'}
                    />
                    {/* </Form.Item> */}
                  </Col>
                </Row>
                <Row>
                  <Form.Item>
                    <ProFormDigit
                      disabled={optionType === 'check'}
                      name="price"
                      placeholder="请输入价格"
                      addonAfter="元"
                    />
                  </Form.Item>
                </Row>
              </ProFormList>
            </Col>
            <Col span={12}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                label="起步价（元）"
                name={['d_rule', 'start_price']}
                // initialValue={_.get(data, 'd_rule.start_price')}
                {...formItemLayout_d}
              >
                <InputNumber disabled={optionType === 'check'} min={0} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                label="起步里程（Km）"
                name={['d_rule', 'start_distance']}
                // initialValue={_.get(data, 'd_rule.start_distance')}
                {...formItemLayout_d}
              >
                <InputNumber disabled={optionType === 'check'} min={0} />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                label="起步时长（分钟）"
                name={['d_rule', 'start_package_time']}
                // initialValue={_.get(data, 'd_rule.start_package_time')}
                {...formItemLayout_d}
              >
                <InputNumber disabled={optionType === 'check'} min={0} />
              </Form.Item>
              <div style={{ marginLeft: 40 }}>
                <ProFormList
                  name={['d_rule', 'start_price_by_time_interval', 'intervals']}
                  label="高峰时段"
                  copyIconProps={false}
                  creatorButtonProps={{
                    creatorButtonText: '新增',
                  }}
                >
                  <Row gutter={8}>
                    <Col span={12}>
                      {/* <Form.Item style={{ margin: 0 }}> */}
                      <ProFormTimePicker
                        // dataFormat="HH:mm"
                        fieldProps={{
                          format: 'HH:mm',
                        }}
                        name="begin"
                        disabled={optionType === 'check'}
                      />
                      {/* </Form.Item> */}
                    </Col>
                    <Col span={12}>
                      {/* <Form.Item style={{ margin: 0 }}> */}
                      <ProFormTimePicker
                        // dataFormat="HH:mm"
                        fieldProps={{
                          format: 'HH:mm',
                        }}
                        name="end"
                        disabled={optionType === 'check'}
                      />
                      {/* </Form.Item> */}
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item>
                      <ProFormDigit
                        disabled={optionType === 'check'}
                        name="price"
                        placeholder="请输入价格"
                        addonAfter="元"
                      />
                    </Form.Item>
                  </Row>
                </ProFormList>
              </div>
            </Col>
          </Row>
        </Card>
        {/* 里程 */}
        <Card title="里程费">
          <Row gutter={16}>
            <Col span={12} className="details">
              <Form.Item
                label="普通时段单价(元/km)"
                name={['p_rule', 'normal_unit_price']}
                // initialValue={_.get(data, 'p_rule.normal_unit_price')}
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                {...formItemLayoutAgain}
              >
                <InputNumber
                  // disabled={type === 'show'}
                  disabled={optionType === 'check'}
                  min={0}
                />
              </Form.Item>
              <ProFormList
                name={['p_rule', 'distance_by_time_interval', 'intervals']}
                label="高峰时段"
                copyIconProps={false}
                creatorButtonProps={{
                  creatorButtonText: '新增',
                }}

                // initialValue={[
                //   {
                //     name: '1111',
                //     nickName: '1111',
                //     age: 111,
                //     birth: '2021-02-18',
                //     sex: 'man',
                //     addrList: [{ addr: ['taiyuan', 'changfeng'] }],
                //   },
                // ]}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {/* <Form.Item style={{ margin: 0 }}> */}
                    <ProFormTimePicker
                      // dataFormat="HH:mm"
                      fieldProps={{
                        format: 'HH:mm',
                      }}
                      name="begin"
                      disabled={optionType === 'check'}
                    />
                    {/* </Form.Item> */}
                  </Col>
                  <Col span={12}>
                    {/* <Form.Item style={{ margin: 0 }}> */}
                    <ProFormTimePicker
                      fieldProps={{
                        format: 'HH:mm',
                      }}
                      name="end"
                      disabled={optionType === 'check'}
                    />
                    {/* </Form.Item> */}
                  </Col>
                </Row>
                <Row>
                  <Form.Item>
                    <ProFormDigit
                      disabled={optionType === 'check'}
                      name="price"
                      placeholder="请输入价格"
                      addonAfter="元"
                    />
                  </Form.Item>
                </Row>
              </ProFormList>
            </Col>
            <Col span={12}>
              <Form.Item
                label="普通时段单价(元/km)"
                name={['d_rule', 'normal_unit_price']}
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                {...formItemLayoutAgain}
              >
                <InputNumber disabled={optionType === 'check'} min={0} />
              </Form.Item>
              <div style={{ marginLeft: 40 }}>
                <ProFormList
                  name={['d_rule', 'distance_by_time_interval', 'intervals']}
                  label="高峰时段"
                  copyIconProps={false}
                  creatorButtonProps={{
                    creatorButtonText: '新增',
                  }}
                  // initialValue={[
                  //   {
                  //     name: '1111',
                  //     nickName: '1111',
                  //     age: 111,
                  //     birth: '2021-02-18',
                  //     sex: 'man',
                  //     addrList: [{ addr: ['taiyuan', 'changfeng'] }],
                  //   },
                  // ]}
                >
                  <Row gutter={8}>
                    <Col span={12}>
                      {/* <Form.Item style={{ margin: 0 }}> */}
                      <ProFormTimePicker
                        fieldProps={{
                          format: 'HH:mm',
                        }}
                        name="begin"
                        disabled={optionType === 'check'}
                      />
                      {/* </Form.Item> */}
                    </Col>
                    <Col span={12}>
                      {/* <Form.Item style={{ margin: 0 }}> */}
                      <ProFormTimePicker
                        fieldProps={{
                          format: 'HH:mm',
                        }}
                        name="end"
                        disabled={optionType === 'check'}
                      />
                      {/* </Form.Item> */}
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item>
                      <ProFormDigit
                        disabled={optionType === 'check'}
                        name="price"
                        placeholder="请输入价格"
                        addonAfter="元"
                      />
                    </Form.Item>
                  </Row>
                </ProFormList>
              </div>
            </Col>
          </Row>
        </Card>
        {/* 时间费 */}
        <Card title="时间费">
          <Row gutter={16}>
            <Col span={12} className="details">
              <Form.Item
                label="普通时段单价(元/分钟)"
                name={['p_rule', 'time_unit_price']}
                // initialValue={_.get(data, 'p_rule.normal_unit_price')}
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                {...formItemLayoutAgain}
              >
                <InputNumber
                  // disabled={type === 'show'}
                  disabled={optionType === 'check'}
                  min={0}
                />
              </Form.Item>
              <ProFormList
                name={['p_rule', 'time_by_time_interval', 'intervals']}
                label="高峰时段"
                copyIconProps={false}
                creatorButtonProps={{
                  creatorButtonText: '新增',
                }}
                // initialValue={[
                //   {
                //     name: '1111',
                //     nickName: '1111',
                //     age: 111,
                //     birth: '2021-02-18',
                //     sex: 'man',
                //     addrList: [{ addr: ['taiyuan', 'changfeng'] }],
                //   },
                // ]}
              >
                <Row gutter={8}>
                  <Col span={12}>
                    {/* <Form.Item style={{ margin: 0 }}> */}
                    <ProFormTimePicker
                      fieldProps={{
                        format: 'HH:mm',
                      }}
                      name="begin"
                      disabled={optionType === 'check'}
                    />
                    {/* </Form.Item> */}
                  </Col>
                  <Col span={12}>
                    {/* <Form.Item style={{ margin: 0 }}> */}
                    <ProFormTimePicker
                      fieldProps={{
                        format: 'HH:mm',
                      }}
                      name="end"
                      disabled={optionType === 'check'}
                    />
                    {/* </Form.Item> */}
                  </Col>
                </Row>
                <Row>
                  <Form.Item>
                    <ProFormDigit
                      disabled={optionType === 'check'}
                      name="price"
                      placeholder="请输入价格"
                      addonAfter="元"
                    />
                  </Form.Item>
                </Row>
              </ProFormList>
            </Col>
            <Col span={12}>
              <Form.Item
                label="普通时段单价(元/分钟)"
                name={['d_rule', 'time_unit_price']}
                // initialValue={_.get(data, 'd_rule.normal_unit_price')}
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                {...formItemLayoutAgain}
              >
                <InputNumber disabled={optionType === 'check'} min={0} />
              </Form.Item>
              <div style={{ marginLeft: 40 }}>
                <ProFormList
                  name={['d_rule', 'time_by_time_interval', 'intervals']}
                  label="高峰时段"
                  copyIconProps={false}
                  creatorButtonProps={{
                    creatorButtonText: '新增',
                  }}
                  // initialValue={[
                  //   {
                  //     name: '1111',
                  //     nickName: '1111',
                  //     age: 111,
                  //     birth: '2021-02-18',
                  //     sex: 'man',
                  //     addrList: [{ addr: ['taiyuan', 'changfeng'] }],
                  //   },
                  // ]}
                >
                  <Row gutter={8}>
                    <Col span={12}>
                      {/* <Form.Item style={{ margin: 0 }}> */}
                      <ProFormTimePicker
                        // dataFormat="HH:mm"
                        fieldProps={{
                          format: 'HH:mm',
                        }}
                        name="begin"
                        disabled={optionType === 'check'}
                      />
                      {/* </Form.Item> */}
                    </Col>
                    <Col span={12}>
                      {/* <Form.Item style={{ margin: 0 }}> */}
                      <ProFormTimePicker
                        // dataFormat="HH:mm"
                        fieldProps={{
                          format: 'HH:mm',
                        }}
                        name="end"
                        disabled={optionType === 'check'}
                      />
                      {/* </Form.Item> */}
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item>
                      <ProFormDigit
                        disabled={optionType === 'check'}
                        name="price"
                        placeholder="请输入价格"
                        addonAfter="元"
                      />
                    </Form.Item>
                  </Row>
                </ProFormList>
              </div>
            </Col>
          </Row>
        </Card>
        {/* 超公里费 */}
        <Card title="超公里费">
          <Row gutter={16}>
            <Col span={12} className="details">
              <ProFormList
                name={['p_rule', 'empty_by_distance_serial_interval', 'intervals']}
                label="分段里程"
                copyIconProps={false}
                creatorButtonProps={{
                  creatorButtonText: '新增',
                }}
              >
                <Row>
                  <Col span={24}>
                    <Space>
                      <Form.Item>
                        <ProFormText style={{ margin: 0 }} readonly>
                          大于
                        </ProFormText>
                      </Form.Item>
                      <Form.Item>
                        <ProFormDigit
                          disabled={optionType === 'check'}
                          width="xs"
                          name="begin"
                          placeholder="请输入价格"
                        />
                      </Form.Item>
                      <Form.Item>
                        <ProFormText readonly>km</ProFormText>
                      </Form.Item>
                      <Form.Item>
                        <ProFormDigit
                          disabled={optionType === 'check'}
                          width="xs"
                          name="price"
                          placeholder="请输入价格"
                        />
                      </Form.Item>
                      <Form.Item>
                        <ProFormText style={{ margin: 0 }} readonly>
                          元/km
                        </ProFormText>
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              </ProFormList>
            </Col>
            <Col span={12} className="detailsSuper details">
              <ProFormList
                name={['d_rule', 'empty_by_distance_serial_interval', 'intervals']}
                label="分段里程"
                copyIconProps={false}
                creatorButtonProps={{
                  creatorButtonText: '新增',
                }}
              >
                <Row gutter={8}>
                  <Col span={24}>
                    <Space>
                      <Form.Item>
                        <ProFormText readonly>大于</ProFormText>
                      </Form.Item>
                      <Form.Item>
                        <ProFormDigit
                          disabled={optionType === 'check'}
                          width="xs"
                          name="begin"
                          placeholder="请输入价格"
                        />
                      </Form.Item>
                      <Form.Item>
                        <ProFormText readonly>km</ProFormText>
                      </Form.Item>
                      <Form.Item>
                        <ProFormDigit
                          disabled={optionType === 'check'}
                          width="xs"
                          name="price"
                          placeholder="请输入价格"
                        />
                      </Form.Item>
                      <Form.Item>
                        <ProFormText readonly>元/km</ProFormText>
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
              </ProFormList>
            </Col>
          </Row>
        </Card>
        {/* 生效时间 */}
        <Card title="生效时间">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="开始时间" {...formItemLayout}>
                <ProFormDateTimePicker
                  disabled={optionType === 'check'}
                  width="md"
                  name="start_time"
                  placeholder="请选择开始时间"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="结束时间" {...formItemLayout}>
                <ProFormDateTimePicker
                  disabled={optionType === 'check'}
                  width="md"
                  name="end_time"
                  placeholder="请选择结束时间"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </ModalForm>
    </>
  );
};
