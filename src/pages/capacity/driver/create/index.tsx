import { Button, Form, Upload, message, Row, Col, Input, Drawer, Card, InputNumber } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Space } from 'antd';
import ProForm, { ProFormText, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-form';
import {
  fetchDriverDetail,
  fetchDriverDistinguish,
  fetchDriverEdit,
  fetchDriverLicConfig,
} from './service';
import { Data } from './data';
import UploadElement from '@/components/UploadElement';

import AuditForm from './components/AuditForm';
import { useModel } from 'umi';
import {
  DRIVER_CAR_COLOR,
  DRIVER_CAR_ENERGY,
  DRIVER_LICENSE_LEVEL,
  UPLOAD_IMAGE_LIST,
} from '@/constant/index';
const CreateDriver: React.FC = (props) => {
  // props
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { driver_id, type } = props['location'].query;

  //init state
  const [detail, setDetail] = React.useState<Data>();
  const [countyList, setCountyList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [licConfig, setLicConfig] = useState<{ must_dodl: number; must_dol: number }>({
    must_dodl: 0,
    must_dol: 0,
  });

  // 表单赋值
  const setField = (params: string) => {
    form.setFieldsValue(params);
  };

  // 表单提交
  const onFinish = async (values: any) => {
    // apply
    if (values.driver_apply) {
      values.driver_apply.driver_id = `${detail.driver_apply.driver_id}`;
    }
    // car
    if (values.driver_car) {
      values.driver_car.car_photo = values.car_photo;
      values.driver_car.brand_name = initialState?.currentUser?.brand_list.find(
        (x) => x.brand_id === values.driver_car.brand_id,
      )?.brand_name;
      let seriesSelect: any = initialState?.currentUser?.series_list[values.driver_car.brand_id];
      values.driver_car.series_name = seriesSelect.find(
        (x: { series_id: number }) => x.series_id === values.driver_car.series_id,
      ).series_name;
    }
    // idcard
    if (values.driver_idcard) {
      values.driver_idcard.id_backend_photo = values.id_backend_photo;
      values.driver_idcard.id_card_hand_photo = values.id_card_hand_photo;
      values.driver_idcard.id_front_photo = values.id_front_photo;
    }
    // license
    if (values.driver_license) {
      values.driver_license.lic_left_photo = values.lic_left_photo;
      values.driver_license.lic_right_photo = values.lic_right_photo;
    }
    // driving_license
    if (values.driver_driving_license) {
      values.driver_driving_license.driving_license_photo = values.driving_license_photo;
      values.driver_driving_license.driving_check_photo = values.driving_check_photo;
    }
    // 人证
    if (values.qualification_photo) {
      values.driver_online_license.qualification_photo = values.qualification_photo;
    }
    // 车证
    if (values.net_trans_permit_photo) {
      values.driver_online_driving_license.net_trans_permit_photo = values.net_trans_permit_photo;
    }
    // 删除
    UPLOAD_IMAGE_LIST.map((x) => values[x] && delete values[x]);

    const res = await fetchDriverEdit(values);
    if (res.code === 0) {
      message.success('更新成功');
    }
  };

  // 查找区县列表
  const filterCountys = (areaId: number) => {
    if (areaId) {
      let countys: any = initialState?.currentUser?.area_list.find((x) => x.city_code === areaId);
      if (countys) {
        countys.county_list.map((x: any) => {
          x.label = x.county_name;
          x.value = x.county_code;
        });
        setCountyList(countys.county_list);
      } else {
        return areaId;
      }
    }
  };

  // 查找车系
  const filterSeries = (brandId: number) => {
    if (brandId) {
      let series: any = initialState?.currentUser?.series_list[brandId];
      setSeriesList(series);
    }
  };

  // 获取配置
  const getLicConfig = async (city_code: number, county_code: number) => {
    const res = await fetchDriverLicConfig({
      city_code,
      county_code,
    });
    if (res.code === 0) {
      setLicConfig(res.data);
    }
  };

  // 身份识别正面/反面
  const discernMessage = async () => {
    // 正面识别
    const driver_idcard = JSON.stringify({
      driver_idcard: {
        id_front_photo: form.getFieldValue(['id_front_photo']),
      },
      id_no: form.getFieldValue(['driver_idcard', 'id_no']),
      name: form.getFieldValue(['driver_idcard', 'name']),
      sex: form.getFieldValue(['driver_idcard', 'sex']),
    });
    const params = {
      driver_id: `${detail.driver_apply.driver_id}`,
      card_type: 'id_card',
      card_info: driver_idcard,
      card_side: 'FRONT',
    };
    const res = await fetchDriverDistinguish(params);
    if (res.code === 0) {
      form.setFieldsValue({
        ...res.data,
      });
    }
    // 反面识别
    const driver_idcard_back = JSON.stringify({
      driver_idcard: {
        id_backend_photo: form.getFieldValue(['id_backend_photo']),
      },
      id_valid_date: form.getFieldValue(['driver_idcard', 'id_valid_date']),
    });
    const params_back = {
      driver_id: `${detail.driver_apply.driver_id}`,
      card_type: 'id_card',
      card_info: driver_idcard_back,
      card_side: 'BACK',
    };
    const resBack = await fetchDriverDistinguish(params_back);
    if (res.code === 0) {
      message.success('识别成功');
      form.setFieldsValue({
        ...resBack.data,
      });
    }
  };

  // 驾驶证识别
  const discernLicense = async () => {
    const driver_license = JSON.stringify({
      driver_license: {
        lic_left_photo: form.getFieldValue(['lic_left_photo']),
      },
      lic_issue_date: form.getFieldValue(['driver_license', 'lic_issue_date']),
      lic_valid_date: form.getFieldValue(['driver_license', 'lic_valid_date']),
      lic_class: form.getFieldValue(['driver_license', 'lic_class']),
      lic_no: form.getFieldValue(['driver_license', 'lic_no']),
    });
    const params = {
      driver_id: `${detail.driver_apply.driver_id}`,
      card_type: 'driver_license',
      card_info: driver_license,
      card_side: 'BACK',
    };
    const res = await fetchDriverDistinguish(params);
    if (res.code === 0) {
      form.setFieldsValue({
        ...res.data,
      });
    }
  };

  // 行驶证正面/反面
  const discernDrivingLicense = async () => {
    // 行驶证正面
    const car_info = {
      plate_no: form.getFieldValue(['driver_car', 'plate_no']),
      owner: form.getFieldValue(['driver_car', 'owner']),
      owner_address: form.getFieldValue(['driver_car', 'owner_addressform']),
      vin: form.getFieldValue(['driver_car', 'vin']),
      engine_no: form.getFieldValue(['driver_car', 'engine_no']),
      seat_num: form.getFieldValue(['driver_car', 'seat_num']),
      init_style_price: form.getFieldValue(['driver_car', 'init_style_price']),
      wheelbases: form.getFieldValue(['driver_car', 'wheelbases']),
      length: form.getFieldValue(['driver_car', 'length']),
      width: form.getFieldValue(['driver_car', 'width']),
      height: form.getFieldValue(['driver_car', 'height']),
    };
    let driver_driving_license = JSON.stringify({
      driver_driving_license: {
        driving_license_photo: form.getFieldValue('driving_license_photo'),
        driving_check_photo: form.getFieldValue('driving_check_photo'),
        reg_date: form.getFieldValue(['driver_driving_license', 'reg_date']),
        issue_date: form.getFieldValue(['driver_driving_license', 'issue_date']),
      },
      driver_car: car_info,
    });
    const params = {
      driver_id: `${detail.driver_apply.driver_id}`,
      card_type: 'driver_driving_license',
      card_info: driver_driving_license,
      card_side: 'FRONT',
    };
    const res = await fetchDriverDistinguish(params);
    if (res.code === 0) {
      form.setFieldsValue({
        ...res.data,
      });
    }

    // 行驶证反面
    const paramsBack = {
      driver_id: `${detail.driver_apply.driver_id}`,
      card_type: 'driver_driving_license',
      card_info: driver_driving_license,
      card_side: 'BACK',
    };
    const resBack = await fetchDriverDistinguish(paramsBack);
    if (resBack.code === 0) {
      form.setFieldsValue({
        ...resBack.data,
      });
    }
  };

  return (
    <PageContainer>
      <Space direction="vertical">
        <ProForm
          form={form}
          onFinish={onFinish}
          submitter={{
            render: (_, dom) => {
              if (type === 'create') {
                return <FooterToolbar>{dom}</FooterToolbar>;
              }
              if (type === 'audit') {
                return (
                  <FooterToolbar>
                    <Button type="primary" htmlType="submit">
                      保存更改
                    </Button>
                  </FooterToolbar>
                );
              }
            },
          }}
          request={async () => {
            if (type !== 'create') {
              const params = {
                driver_id: driver_id * 1,
              };
              const res = await fetchDriverDetail(params);
              setDetail(res.data);
              const areaId = res.data.driver_apply.area_id;
              const countyId = res.data.driver_apply.county_id;
              // 获取双证件配置
              getLicConfig(areaId, countyId);
              // 城市code
              if (areaId) {
                filterCountys(areaId);
              }
              // 品牌id
              if (res.data.driver_car.brand_id) {
                const brandId = res.data.driver_car.brand_id;
                filterSeries(brandId);
              }
              console.log(res.data, '()()()()');
              return {
                driver_idcard: res.data.driver_idcard,
                base_info: res.data.base_info,
                driver_apply: res.data.driver_apply,
                driver_car: res.data.driver_car,
                driver_license: res.data.driver_license,
                driver_online_driving_license: res.data.driver_online_driving_license,
                driver_online_license: res.data.driver_online_license,
                driver_driving_license: res.data.driver_driving_license,
              };
            } else {
              return {};
            }
          }}
        >
          <Space direction="vertical" size={24}>
            <Card title="申请信息">
              <Row gutter={24}>
                <Col span={8}>
                  <ProFormText
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    name={['driver_apply', 'cell']}
                    label="手机号"
                    placeholder="请输入名称"
                    disabled={type !== 'create'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    width="lg"
                    options={[
                      {
                        value: 0,
                        label: '直营',
                      },
                      {
                        value: 1,
                        label: '个人加盟',
                      },
                      {
                        value: 2,
                        label: '租赁公司',
                      },
                    ]}
                    name={['driver_apply', 'biz_source']}
                    label="司机加入来源"
                    rules={[{ required: true, message: '请输入' }]}
                    disabled={type === 'check'}
                    // disabled
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    width="lg"
                    options={[
                      {
                        value: 1,
                        label: '嘟嘟',
                      },
                    ]}
                    disabled={type === 'check'}
                    name={['driver_apply', 'company_id']}
                    rules={[{ required: true, message: '请输入' }]}
                    label="所属公司"
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    initialValue={initialState?.currentUser?.user_info.platform_id || ''}
                    options={[
                      {
                        value: initialState?.currentUser?.user_info.platform_id || '',
                        label: initialState?.currentUser?.user_info.platform_name || '',
                      },
                    ]}
                    name={['driver_apply', 'platform_id']}
                    label="所属平台"
                    disabled
                    // disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    width="lg"
                    options={initialState?.currentUser?.area_list}
                    disabled={type === 'check'}
                    rules={[{ required: true, message: '请输入' }]}
                    label="加盟城市"
                    fieldProps={{
                      onChange: (value: number) => {
                        setCountyList([]);
                        form.setFieldsValue({
                          driver_apply: {
                            county_id: null,
                          },
                        });
                        filterCountys(value);
                      },
                    }}
                    name={['driver_apply', 'area_id']}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    width="lg"
                    options={countyList || []}
                    disabled={type === 'check'}
                    rules={[{ required: true, message: '请输入' }]}
                    label="加盟区县"
                    name={['driver_apply', 'county_id']}
                    fieldProps={{
                      onChange: async (value: number) => {
                        const res = await fetchDriverLicConfig({
                          city_code: form.getFieldValue(['driver_apply', 'area_id']),
                          county_code: value,
                        });
                        if (res.code === 0) {
                          setLicConfig(res.data);
                        }
                      },
                    }}
                  />
                </Col>
                <Col style={{ visibility: 'collapse' }} span={8}>
                  <ProFormSelect
                    width="lg"
                    options={[
                      {
                        value: 1,
                        label: '平台直营',
                      },
                    ]}
                    disabled={type === 'check'}
                    label="渠道来源"
                    name={['driver_apply', 'channel_source']}
                  />
                </Col>
              </Row>
            </Card>
            <Card
              title={
                <div>
                  <Space>
                    <span>身份信息:(注意：加*为必填字段)</span>
                    <>
                      {type === 'audit' && (
                        <Button onClick={discernMessage} disabled={type === 'check'} type="primary">
                          识别
                        </Button>
                      )}
                    </>
                  </Space>
                </div>
              }
            >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    rules={[{ required: true, message: '请输入' }]}
                    label="身份证头像页"
                    name="id_front_photo"
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_idcard.id_front_photo}
                      setField={setField}
                      itemName="id_front_photo"
                      uploadTxt="身份证头像页"
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    rules={[{ required: true, message: '请上传身份证国徽页' }]}
                    name="id_backend_photo"
                    label="身份证国徽页"
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_idcard.id_backend_photo}
                      setField={setField}
                      itemName="id_backend_photo"
                      uploadTxt="身份证国徽页"
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: '请上传手持身份证',
                      },
                    ]}
                    // 自定义字段无法使用嵌套字段
                    // name={["driver_idcard","idcard_front_photo"]}

                    name="id_card_hand_photo"
                    label="手持身份证"
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_idcard.id_card_hand_photo}
                      setField={setField}
                      itemName="id_card_hand_photo"
                      uploadTxt="手持身份证"
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <ProFormText
                    rules={[
                      {
                        required: true,
                        message: '请输入名称',
                      },
                    ]}
                    width="lg"
                    name={['driver_idcard', 'name']}
                    label="#姓名"
                    placeholder="请输入姓名"
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    name={['driver_idcard', 'id_no']}
                    label="#身份证号"
                    placeholder="请输入名称"
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    width="lg"
                    options={[
                      {
                        value: 1,
                        label: '男',
                      },
                      {
                        value: 2,
                        label: '女',
                      },
                    ]}
                    name={['driver_idcard', 'sex']}
                    label="#性别"
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    width="lg"
                    disabled={type === 'check'}
                    label="户籍所在地"
                    placeholder="请输入"
                    name={['driver_idcard', 'census_place']}
                  />
                </Col>
                <Col span={8}>
                  <ProFormDatePicker
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    label="#身份证有效期"
                    name={['driver_idcard', 'id_valid_date']}
                    disabled={type === 'check'}
                  />
                </Col>
              </Row>
            </Card>
            <Card
              title={
                <div>
                  <Space>
                    <span>驾驶证信息:(注意：加*为必填字段)</span>
                    <>
                      {type === 'audit' && (
                        <Button onClick={discernLicense} disabled={type === 'check'} type="primary">
                          识别
                        </Button>
                      )}
                    </>
                  </Space>
                </div>
              }
            >
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="驾驶证正页"
                    rules={[{ required: true, message: '请上传驾驶证正页' }]}
                    name="lic_left_photo"
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_license.lic_left_photo}
                      setField={setField}
                      itemName="lic_left_photo"
                      uploadTxt="驾驶证正页"
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <ProFormSelect
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    valueEnum={DRIVER_LICENSE_LEVEL}
                    name={['driver_license', 'lic_class']}
                    label="#驾照类型"
                    disabled={type === 'check'}
                    placeholder="请选择"
                  />
                </Col>
                <Col span={8}>
                  <ProFormDatePicker
                    rules={[{ required: true, message: '请输入' }]}
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                    width="lg"
                    label="#初次领取驾驶证时间"
                    name={['driver_license', 'lic_issue_date']}
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormDatePicker
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                    label="#驾驶证有效期"
                    name={['driver_license', 'lic_valid_date']}
                    disabled={type === 'check'}
                  />
                </Col>
              </Row>
            </Card>
            <Card
              title={
                <div>
                  <Space>
                    <span>车辆信息:(注意：加*为必填字段)</span>
                    <>
                      {type === 'audit' && (
                        <Button
                          onClick={discernDrivingLicense}
                          disabled={type === 'check'}
                          type="primary"
                        >
                          识别
                        </Button>
                      )}
                    </>
                  </Space>
                </div>
              }
            >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    label="行驶证正本"
                    rules={[{ required: false, message: '请上传行驶证正本' }]}
                    // rules={[{ required: true, message: '请输入' }]}
                    name="driving_license_photo"
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_driving_license.driving_license_photo}
                      setField={setField}
                      itemName="driving_license_photo"
                      uploadTxt="行驶证正本"
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="行驶证副本"
                    name="driving_check_photo"
                    rules={[{ required: false, message: '请上传行驶证副本' }]}
                    // rules={[{ rules={[ {required: true,message: '请输入', }]}: true }]}
                    // valuePropName="fileList"
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_driving_license.driving_check_photo}
                      setField={setField}
                      itemName="driving_check_photo"
                      uploadTxt="行驶证副本"
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="车辆照片"
                    name="car_photo"
                    rules={[{ required: true, message: '请上传车辆照片' }]}
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_car.car_photo}
                      setField={setField}
                      itemName="car_photo"
                      uploadTxt="车辆照片"
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <ProFormText
                    rules={[{ required: true, message: '请输入' }]}
                    disabled={type === 'check'}
                    width="lg"
                    name={['driver_car', 'plate_no']}
                    label="#车牌号"
                    placeholder="请输入名称"
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    options={initialState?.currentUser?.area_list}
                    label="运营城市"
                    name={['driver_car', 'area_id']}
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    options={[
                      {
                        value: 0,
                        label: '本人车辆',
                      },
                      {
                        value: 1,
                        label: '租赁车辆',
                      },
                    ]}
                    name={['driver_car', 'property']}
                    label="车辆性质"
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    label="#车辆所有人（或公司）"
                    placeholder="请输入名称"
                    name={['driver_car', 'owner']}
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    label="#车辆所有人（或公司）地址"
                    placeholder="请输入名称"
                    name={['driver_car', 'owner_address']}
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    options={initialState?.currentUser?.brand_list}
                    name={['driver_car', 'brand_id']}
                    label="品牌"
                    disabled={type === 'check'}
                    fieldProps={{
                      onChange: (value: number) => {
                        setCountyList([]);
                        form.setFieldsValue({
                          driver_car: {
                            series_id: null,
                          },
                        });
                        filterSeries(value);
                      },
                    }}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    options={seriesList}
                    name={['driver_car', 'series_id']}
                    label="车系"
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    options={DRIVER_CAR_ENERGY}
                    label="能源类型"
                    name={['driver_car', 'fuel_id']}
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <Form.Item label="排量" name={['driver_car', 'delivery']}>
                    {/* <ProFormText
                    disabled={type === 'check'}
                    width="lg"
                    label="排量"
                    name={['driver_car', 'delivery']}
                    fieldProps={{
                      type: 'tel',
                    }}
                    placeholder="请输入名称"
                  /> */}
                    <InputNumber />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="出场指导价（万）" name={['driver_car', 'init_style_price']}>
                    <InputNumber />
                  </Form.Item>
                  {/* <ProFormText
                    fieldProps={{
                      type: 'tel',
                    }}
                    width="lg"
                    label="出场指导价（万）"
                    placeholder="请输入名称"
                    name={['driver_car', 'init_style_price']}
                    disabled={type === 'check'}
                  /> */}
                </Col>
                <Col span={8}>
                  <Space>
                    <ProFormText
                      width="xs"
                      label="长"
                      name={['driver_car', 'length']}
                      disabled={type === 'check'}
                      placeholder="请输入"
                    />
                    <ProFormText
                      disabled={type === 'check'}
                      width="xs"
                      label="宽"
                      placeholder="请输入"
                      name={['driver_car', 'width']}
                    />
                    <ProFormText
                      disabled={type === 'check'}
                      width="xs"
                      label="高"
                      placeholder="请输入"
                      name={['driver_car', 'height']}
                    />
                  </Space>
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    valueEnum={DRIVER_CAR_COLOR}
                    label="车辆颜色"
                    name={['driver_car', 'color']}
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="#座位数"
                    name={['driver_car', 'seat_num']}
                    rules={[
                      { required: true, message: '请输入' },
                      () => ({
                        validator(rule, value) {
                          if (value > 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject('座位数不能为0');
                        },
                      }),
                    ]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                  {/* <ProFormText
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    label="#座位数"
                    placeholder="请输入"
                    name={['driver_car', 'seat_num']}
                    disabled={type === 'check'}
                    fieldProps={{
                      type: 'tel',
                    }}
                  /> */}
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="行驶里程（km）"
                    name={['driver_car', 'driver_distance']}
                    rules={[
                      { required: true, message: '请输入' },
                      () => ({
                        validator(rule, value) {
                          if (value > 0) {
                            return Promise.resolve();
                          }
                          return Promise.reject('行驶里程不能为0');
                        },
                      }),
                    ]}
                  >
                    <InputNumber min={1} />
                  </Form.Item>
                  {/* <ProFormText
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    name={['driver_car', 'driver_distance']}
                    label="行驶里程（km）"
                    placeholder="请输入"
                    disabled={type === 'check'}
                    fieldProps={{
                      type: 'tel',
                    }}
                  /> */}
                </Col>
                <Col span={8}>
                  <ProFormText
                    width="lg"
                    disabled={type === 'check'}
                    name={['driver_car', 'vin']}
                    label="#车辆VN码"
                    placeholder="请输入"
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    width="lg"
                    disabled={type === 'check'}
                    name={['driver_car', 'engine_no']}
                    label="#发动机号"
                    placeholder="请输入"
                  />
                </Col>
                <Col span={8}>
                  <ProFormDatePicker
                    disabled={type === 'check'}
                    width="lg"
                    label="车辆注册日期"
                    name={['driver_car', 'register_date']}
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                  />
                </Col>
                <Col span={8}>
                  <ProFormDatePicker
                    disabled={type === 'check'}
                    width="lg"
                    label="保险有效期"
                    name={['driver_car', 'ins_valid_date']}
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                  />
                </Col>
                <Col span={8}>
                  <ProFormDatePicker
                    disabled={type === 'check'}
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    label="#行驶证注册日期"
                    name={['driver_driving_license', 'reg_date']}
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                  />
                </Col>
                <Col span={8}>
                  <ProFormDatePicker
                    disabled={type === 'check'}
                    rules={[{ required: true, message: '请输入' }]}
                    width="lg"
                    label="#行驶证发证日期"
                    name={['driver_driving_license', 'issue_date']}
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                  />
                </Col>
                <Col span={8}>
                  <ProFormDatePicker
                    disabled={type === 'check'}
                    width="lg"
                    label="下次年检日期"
                    name={['driver_car', 'annual_check_date']}
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                  />
                </Col>
              </Row>
            </Card>
            <Card title="人证信息">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="网约车驾驶员证"
                    rules={[{ required: licConfig?.must_dol === 1, message: '请输入' }]}
                    name="qualification_photo"
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_online_license.qualification_photo}
                      setField={setField}
                      itemName="qualification_photo"
                      uploadTxt="网约车驾驶员证"
                      canRemove={true}
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <ProFormText
                    rules={[{ required: licConfig?.must_dol === 1, message: '请输入' }]}
                    width="lg"
                    name={['driver_online_license', 'qualification_id']}
                    label="网约车驾驶员证号"
                    placeholder="请输入"
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={12}>
                  <ProFormDatePicker
                    disabled={type === 'check'}
                    rules={[{ required: licConfig?.must_dol === 1, message: '请输入' }]}
                    width="lg"
                    label="有效期"
                    name={['driver_online_license', 'qualification_id_valid_date']}
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                  />
                </Col>
              </Row>
            </Card>
            <Card title="车证信息">
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item
                    label="网约车运输证"
                    rules={[{ required: licConfig?.must_dodl === 1, message: '请输入' }]}
                    name="net_trans_permit_photo"
                  >
                    <UploadElement
                      initialImageUrl={detail?.driver_online_driving_license.net_trans_permit_photo}
                      setField={setField}
                      itemName="net_trans_permit_photo"
                      uploadTxt="网约车运输证"
                      canRemove={true}
                      disabled={type === 'check'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <ProFormText
                    rules={[{ required: licConfig?.must_dodl === 1, message: '请输入' }]}
                    width="lg"
                    name={['driver_online_driving_license', 'net_trans_permit_id']}
                    label="网约车运输证号"
                    placeholder="请输入"
                    disabled={type === 'check'}
                  />
                </Col>
                <Col span={12}>
                  <ProFormDatePicker
                    disabled={type === 'check'}
                    width="lg"
                    label="有效期"
                    rules={[{ required: licConfig?.must_dodl === 1, message: '请输入' }]}
                    fieldProps={{
                      format: 'YYYY-MM-DD',
                    }}
                    name={['driver_online_driving_license', 'net_trans_permit_valid_date']}
                  />
                </Col>
              </Row>
            </Card>
          </Space>
        </ProForm>
        {type === 'audit' && detail && (
          <Card>
            <AuditForm detail={detail} />
          </Card>
        )}
      </Space>
    </PageContainer>
  );
};

export default CreateDriver;
