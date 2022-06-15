import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  message,
  Radio,
  Row,
  Space,
  Table,
} from 'antd';
import { history } from 'umi';
import { fetchDriverAudit } from '../service';
import { AuditLogParams, Data, DriverAuditParams } from '../data';
import { ColumnProps } from 'antd/lib/table';

export type FormValueType = {
  audit_status?: string;
  driver_idcard?: string;
  driver_license?: string;
};

export type AuditFormProps = {
  detail: Data;
};

const AuditForm: React.FC<AuditFormProps> = (props) => {
  const [form] = Form.useForm();
  const { detail } = props;
  const [auditType, setAuditType] = React.useState(1);
  const [auditMsg, setAuditMsg] = React.useState<Data>();
  const plainOptions_iden = [
    { label: '身份证（头像页）反光', value: 'front_img_reflective' },
    { label: '身份证（国徽页）反光', value: 'backend_img_reflective' },
    { label: '手持身份证反光', value: 'front_in_hand_reflective' },
    { label: '身份证（头像页）模糊', value: 'front_img_blur' },
    { label: '身份证（国徽页）模糊', value: 'backend_img_blur' },
    { label: '手持身份证模糊', value: 'front_in_hand_blur' },
    { label: '身份证（头像页）不符', value: 'front_img_mismatch' },
    { label: '身份证（国徽页）不符', value: 'backend_img_mismatch' },
    { label: '手持身份证不符', value: 'front_in_hand_mismatch' },
  ];
  // 驾驶证
  const plainOptions_driving = [
    { label: '驾驶证正面反光', value: 'front_img_reflective' },
    // { label: '驾驶证反面反光', value: 'backend_img_reflective' },
    { label: '驾驶证正面模糊', value: 'front_img_blur' },
    // { label: '驾驶证反面模糊', value: 'backend_img_blur' },
    { label: '驾驶证正面不符', value: 'front_img_mismatch' },
    // { label: '驾驶证反面不符', value: 'backend_img_mismatch' },
  ];
  // 行驶证
  const plainOptions_license = [
    // { label: '行驶证正面反光', value: 'front_img_reflective' },
    // { label: '行驶证反面反光', value: 'backend_img_reflective' },
    { label: '行驶证正面模糊', value: 'front_img_blur' },
    { label: '行驶证反面模糊', value: 'backend_img_blur' },
    { label: '行驶证正面不符', value: 'front_img_mismatch' },
    { label: '行驶证反面不符', value: 'backend_img_mismatch' },
  ];
  // 车辆
  const plainOptions_car = [
    { label: '车辆照片反光', value: 'main_img_reflective' },
    { label: '车辆照片模糊', value: 'main_img_blur' },
    { label: '车辆照片不符', value: 'main_img_mismatch' },
  ];
  // 网约车人证
  const plainOptions_online_p = [
    { label: '网约车人证反光', value: 'front_img_reflective' },
    { label: '网约车人证模糊', value: 'front_img_blur' },
    { label: '网约车人证不符', value: 'front_img_mismatch' },
  ];
  // 网约车车证
  const plainOptions_online_c = [
    { label: '网约车车证反光', value: 'front_img_reflective' },
    { label: '网约车车证模糊', value: 'front_img_blur' },
    { label: '网约车车证不符', value: 'front_img_mismatch' },
  ];

  const columns: ColumnProps<AuditLogParams>[] = [
    {
      title: '审查时间',
      dataIndex: 'op_time',
      align: 'center',
      key: 'op_time',
      width: 150,
    },
    {
      title: '审查人',
      dataIndex: 'op_user_name',
      align: 'center',
      key: 'op_user_name',
      width: 100,
    },
    {
      title: '审查结果',
      dataIndex: 'op_type_txt',
      align: 'center',
      key: 'op_type_txt',
      width: 100,
    },
    {
      title: '原因',
      dataIndex: 'op_remarks',
      align: 'left',
      key: 'op_remarks',
    },
  ];

  React.useEffect(() => {
    if (detail) {
      const { audit_status, audit_msg_json } = detail?.base_info;
      setAuditType(audit_status);
      if (audit_status == 2 || audit_status == 3) {
        if (audit_msg_json != '') {
          setAuditMsg(JSON.parse(audit_msg_json));
        }
      }
      // 获取审核日志
      // getDriverLogs();
    }
  }, [detail]);

  /**
   * @description: 获取表单信息
   */
  const onFinish = (values: FormValueType) => {
    console.log(values);
    form
      .validateFields()
      .then((values) => {
        // 删除空数组
        Object.keys(values).map((x) => {
          if (values[x] && values[x].length == 0) {
            delete values[x];
          }
        });
        values.driver_id = detail.base_info?.driver_id;
        let data = JSON.stringify({
          driver_car: values.driver_car,
          driver_idcard: values.driver_idcard,
          driver_driving_license: values.driver_driving_license,
          driver_license: values.driver_license,
          driver_online_driving_license: values.driver_online_driving_license,
          driver_online_license: values.driver_online_license,
        });
        if (data == '{}' && values.audit_status === 2) {
          return message.error('请至少勾选一项');
        }
        const params = {
          driver_id: values.driver_id,
          audit_msg_json: data,
          audit_status: values.audit_status,
        };
        driverAudit(params);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  /**
   * @description: 司机审核
   * @param {object} params 审核参数
   * @return {*}
   */
  const driverAudit = async (params: DriverAuditParams) => {
    const res = await fetchDriverAudit(params);
    if (res.code === 0) {
      message.success('操作成功');
      history.push('/capacity/driver/list');
    }
  };

  return (
    <Card>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Divider orientation="left">审查结果</Divider>
        <Row gutter={24}>
          <Col span={24}>
            <Space size={40}>
              <Form.Item initialValue={detail?.base_info?.audit_status} name="audit_status">
                <Radio.Group
                  onChange={(e) => {
                    setAuditType(e.target.value);
                  }}
                >
                  <Radio value={2}>审核失败</Radio>
                  <Radio value={5}>审核通过</Radio>
                  <Radio value={3}>非营运车辆</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  确认
                </Button>
              </Form.Item>
            </Space>
          </Col>
        </Row>

        {auditType == 2 && (
          <>
            <Divider style={{ color: 'red' }} orientation="left">
              初审不通过需要重新上传
            </Divider>
            <Row>
              <Form.Item initialValue={auditMsg?.driver_idcard} name="driver_idcard" label="身份证">
                <Checkbox.Group options={plainOptions_iden}></Checkbox.Group>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                initialValue={auditMsg?.driver_license}
                name="driver_license"
                label="驾驶证"
              >
                <Checkbox.Group options={plainOptions_driving}></Checkbox.Group>
              </Form.Item>
            </Row>
            {/* <Row>
              <Form.Item
                initialValue={auditMsg?.driver_driving_license}
                name="driver_driving_license"
                label="行驶证"
              >
                <Checkbox.Group options={plainOptions_license}></Checkbox.Group>
              </Form.Item>
            </Row> */}
            <Row>
              <Form.Item initialValue={auditMsg?.driver_car} name="driver_car" label="车辆">
                <Checkbox.Group options={plainOptions_car}></Checkbox.Group>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                initialValue={auditMsg?.driver_online_license}
                name="driver_online_license"
                label="网约车人证"
              >
                <Checkbox.Group options={plainOptions_online_p}></Checkbox.Group>
              </Form.Item>
            </Row>
            <Row>
              <Form.Item
                initialValue={auditMsg?.driver_online_driving_license}
                name="driver_online_driving_license"
                label="网约车车证"
              >
                <Checkbox.Group options={plainOptions_online_c}></Checkbox.Group>
              </Form.Item>
            </Row>
          </>
        )}

        <Divider orientation="left">审查记录</Divider>
        <Row>
          <Col span={24}>
            <Table
              rowKey={`key`}
              bordered
              scroll={{ x: 'max-content' }}
              size="small"
              // loading={loading}
              columns={columns}
              // dataSource={auditRecord}
              // pagination={paginationProps}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AuditForm;
