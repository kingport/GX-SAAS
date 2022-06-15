import React from 'react';
import { Card, Collapse, Descriptions, Modal, Space, Steps } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { Data, DataBill } from '../../data';
import { orderStep } from '../../utils/index';
import OrderCharge from './OrderCharge';
export type OrderProgressProps = {
  orderInfo: Data;
  billDetail: DataBill;
};

const OrderProgress: React.FC<OrderProgressProps> = (props) => {
  const { orderInfo, billDetail } = props;
  console.log(orderInfo, 'KI');
  // init State

  return (
    <Steps progressDot direction="vertical">
      {orderStep(orderInfo, billDetail).map((x: any, index: string) => {
        return (
          <Steps.Step
            status="finish"
            description={
              <div key={index} style={{ marginBottom: 12 }}>
                <Collapse expandIconPosition="right" defaultActiveKey={[0, 1, 2, 3, 4]}>
                  <Collapse.Panel header={x.title} key={index}>
                    {x.params.map((k: any, index: string) => {
                      return (
                        <Descriptions key={index}>
                          <Descriptions.Item span={3} label={k.key}>
                            {k.value}
                          </Descriptions.Item>
                        </Descriptions>
                      );
                    })}
                  </Collapse.Panel>
                </Collapse>
              </div>
            }
          ></Steps.Step>
        );
      })}
      <Steps.Step
        status="finish"
        description={<OrderCharge billDetail={billDetail} />}
      ></Steps.Step>
    </Steps>
  );
};

export default OrderProgress;
