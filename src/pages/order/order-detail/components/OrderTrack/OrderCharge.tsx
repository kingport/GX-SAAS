import React from 'react';
import { Card, Col, Collapse, Descriptions, Modal, Row, Space } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { Data, DataBill } from '../../data';
import { DriverCharge, PassengerCharge } from './constant';
export type OrderProgressProps = {
  billDetail: DataBill;
};

const OrderCharge: React.FC<OrderProgressProps> = (props) => {
  const { billDetail } = props;
  console.log(billDetail, 'KI');
  // init State

  return (
    <Row gutter={10}>
      <Col span={12}>
        <Collapse expandIconPosition="right" defaultActiveKey="passenger">
          <Collapse.Panel header={'乘客账单(元、公里)'} key="passenger">
            {billDetail && billDetail.passenger_bill &&
              PassengerCharge.map((k) => {
                return (
                  <Descriptions key={k.value}>
                    {k.isShow && (
                      <Descriptions.Item span={3} label={k.label}>
                        {billDetail.passenger_bill[k.value]}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                );
              })}
          </Collapse.Panel>
        </Collapse>
      </Col>
      <Col span={12}>
        <Collapse expandIconPosition="right" defaultActiveKey="driver">
          <Collapse.Panel header={'司机账单(元、公里)'} key="driver">
            {billDetail && billDetail.driver_bill &&
              DriverCharge.map((k) => {
                return (
                  <Descriptions key={k.value}>
                    {k.isShow && (
                      <Descriptions.Item span={3} label={k.label}>
                        {billDetail.driver_bill[k.value]}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                );
              })}
          </Collapse.Panel>
        </Collapse>
      </Col>
      <Col style={{ marginTop: 10 }} span={24}>
        <Collapse expandIconPosition="right" defaultActiveKey="passenger-pay">
          <Collapse.Panel header={'乘客支付信息(元、公里)'} key="passenger-pay">
          {billDetail && billDetail.passenger_bill ? (
            <Descriptions className="descriptions" size="small">
              <Descriptions.Item span={3} label="支付状态">{`${
                billDetail?.passenger_bill.is_pay === 1 ? '已支付' : '未支付'
              }`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="支付时间"
              >{`${billDetail?.passenger_bill.pay_time}`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="支付金额"
              >{`${billDetail?.passenger_bill.total_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="支付渠道"
              >{`${billDetail?.passenger_bill.channel_name}`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="预付费用"
              >{`${billDetail?.order_detail.pre_total_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="退款费用"
              >{`${billDetail?.passenger_bill.refund_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="高速费"
              >{`${billDetail?.passenger_bill.p_highway_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="路桥费"
              >{`${billDetail?.passenger_bill.p_bridge_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="停车费"
              >{`${billDetail?.passenger_bill.p_park_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="其他费"
              >{`${billDetail?.passenger_bill.p_other_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="取消费"
              >{`${billDetail?.passenger_bill.p_cancel_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="优惠券"
              >{`${billDetail?.passenger_bill.p_coupon_fee}元`}</Descriptions.Item>
              <Descriptions.Item
                span={3}
                label="发票状态"
              >{`${billDetail?.passenger_bill.invoice}`}</Descriptions.Item>
            </Descriptions>
          ) : ""}
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default OrderCharge;
