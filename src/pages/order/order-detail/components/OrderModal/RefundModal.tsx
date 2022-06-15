import { Button, message, Form, InputNumber, Space, Typography, Input } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Data, DataBill, RefundOrderParams } from '../../data';
import { fetchRefundOrder } from '../../service';

export type OrderProgressProps = {
  orderInfo: Data;
  billDetail: DataBill;
};

export default (props: OrderProgressProps) => {
  const { orderInfo, billDetail } = props;
  console.log(orderInfo, billDetail);

  return (
    <ModalForm
      title="退款"
      width={420}
      trigger={<Button type="primary">退款</Button>}
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values: RefundOrderParams) => {
        values.order_id = billDetail.order_detail.order_id;
        const res = await fetchRefundOrder(values);
        if (res.code === 0) {
          message.success('操作成功');
          return true;
        }
        console.log(values);
      }}
    >
      <ProForm.Group title="备注：调整后价格即为乘客实际支付金额，费用为0时即为全额退款"></ProForm.Group>
      <ProForm.Group>
        <ProFormText width="sm" name="name" label="工单编号" placeholder="请输入工单编号" />
      </ProForm.Group>
      {/* <ProForm.Group>
        <Form.Item label={`乘客可退款金额2元`}></Form.Item>
        <Form.Item label={`司机可退款金额2元`}></Form.Item>
      </ProForm.Group> */}
      <ProForm.Group>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="乘客退款金额（元）"
          name=""
        >
          <InputNumber style={{ width: 150 }} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="司机退回金额（元）"
          name=""
        >
          <InputNumber style={{ width: 150 }} />
        </Form.Item>
      </ProForm.Group>
      {/* <ProForm.Group>
        <ProFormTextArea
          label="备注"
          width="lg"
          name="remarks"
          placeholder="请输入备注"
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        />
      </ProForm.Group> */}
    </ModalForm>
  );
};
