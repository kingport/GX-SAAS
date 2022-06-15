import { Button, message, Form, InputNumber, Space, Typography } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { DriverChangePrice, PassengerChangePrice } from '../OrderTrack/constant';
import { Data, DataBill, ChangeBillParams } from '../../data';
import { fetchChangeBill } from '../../service';

export type OrderProgressProps = {
  orderInfo: Data;
  billDetail: DataBill;
};

export default (props: OrderProgressProps) => {
  const { orderInfo, billDetail } = props;
  console.log(orderInfo, billDetail);

  return (
    <ModalForm
      title="改价"
      width={420}
      trigger={<Button type="primary">改价</Button>}
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values: ChangeBillParams) => {
        let n_driver_bill = Object.keys(values.driver_bill).reduce((n, key) => {
          let nKey = key.replace('d_', '');
          n[nKey] = values.driver_bill[key];
          return n;
        }, {});
        let n_passenger_bill = Object.keys(values.passenger_bill).reduce((n, key) => {
          let nKey = key.replace('p_', '');
          n[nKey] = values.passenger_bill[key];
          return n;
        }, {});
        values.order_id = billDetail.order_detail.order_id;
        values.driver_bill = JSON.stringify(n_driver_bill);
        values.passenger_bill = JSON.stringify(n_passenger_bill);
        const res = await fetchChangeBill(values);
        if (res.code === 0) {
          message.success('提交成功');
          return true;
        }
      }}
      layout="inline"
    >
      <ProForm.Group>
        <ProFormText width="sm" name="name" label="工单编号" placeholder="请输入工单编号" />
      </ProForm.Group>
      <div style={{ display: 'flex', marginTop: 24 }}>
        <Space direction="vertical">
          <Typography.Text>乘客支付费用</Typography.Text>
          <Typography.Text>
            {` 费用总价:${billDetail && billDetail.passenger_bill['total_fee']}元`}
          </Typography.Text>
          <Form.Item style={{ width: '50%' }}>
            {PassengerChangePrice.map((x) => {
              return (
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={billDetail && billDetail.passenger_bill[x.value]}
                  style={{ marginBottom: 10 }}
                  name={['passenger_bill', x.value]}
                  label={x.label}
                  key={x.value}
                >
                  <InputNumber disabled={x.disabled} style={{ width: 100 }} />
                </Form.Item>
              );
            })}
          </Form.Item>
        </Space>
        <Space direction="vertical">
          <Typography.Text>司机收到费用（只可操作改价一次）</Typography.Text>
          <Typography.Text>
            {` 费用总价:${billDetail && billDetail.driver_bill['total_fee']}元`}
          </Typography.Text>
          <Form.Item>
            {DriverChangePrice.map((x) => {
              return (
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  initialValue={billDetail && billDetail.driver_bill[x.value]}
                  style={{ marginBottom: 10 }}
                  name={['driver_bill', x.value]}
                  label={x.label}
                  key={x.value}
                >
                  <InputNumber disabled={x.disabled} style={{ width: 100 }} />
                </Form.Item>
              );
            })}
          </Form.Item>
        </Space>
      </div>
      <ProForm.Group title="改价原因">
        <ProFormTextArea
          width="lg"
          name="reason"
          placeholder="请输入改价原因"
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};
