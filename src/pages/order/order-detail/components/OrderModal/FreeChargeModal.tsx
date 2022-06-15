import { Button, message } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Data, DataBill, FreeChargeParams } from '../../data';
import { fetchFreeCharge } from '../../service';

export type OrderProgressProps = {
  orderInfo: Data;
  billDetail: DataBill;
};

export default (props: OrderProgressProps) => {
  const { orderInfo, billDetail } = props;
  console.log(orderInfo, billDetail);

  return (
    <ModalForm
      title="免单"
      width={420}
      trigger={<Button type="primary">免单</Button>}
      modalProps={{
        onCancel: () => console.log('run'),
      }}
      onFinish={async (values: FreeChargeParams) => {
        values.order_id = billDetail.order_detail.order_id;
        values.remarks = values.detail_content;
        const res = await fetchFreeCharge(values);
        if (res.code === 0) {
          message.success('操作成功');
          return true;
        }
        console.log(values);
      }}
    >
      <ProForm.Group title="备注：将乘客已付款金额原路退回"></ProForm.Group>
      <ProForm.Group>
        <ProFormText width="sm" name="name" label="工单编号" placeholder="请输入工单编号" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          label="免单原因"
          width="lg"
          name="detail_content"
          placeholder="请输入免单原因，限制120字"
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        />
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
