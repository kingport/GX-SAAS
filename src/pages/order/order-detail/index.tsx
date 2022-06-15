import { Button, Card, Col, Descriptions, Modal, Row, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { useModel } from 'umi';
import type { Data, DataBill, TrackData } from './data';
import { fetchBillDetail, fetchOrderInfo, fetchOrderTrack } from './service';
import ProCard from '@ant-design/pro-card';
import OrderProgress from './components/OrderTrack/OrderProgress';
import MapTrajectory from './components/OrderTrack/MapTrajectory';
import ChangePriceModal from './components/OrderModal/ChangePriceModal';
import FreeChargeModal from './components/OrderModal/FreeChargeModal';
import CloseOrderModal from './components/OrderModal/CloseOrderModal';
import RefundModal from './components/OrderModal/RefundModal';
import OperationLog from '@/components/OperationLog';

const OrderDetail: React.FC = (props) => {
  const { id } = props['match'].params;
  // const actionRef = useRef<ActionType>();
  // const { initialState } = useModel('@@initialState');
  // 订单信息
  const [orderInfo, setOrderInfo] = useState<Data>();
  // 账单信息
  const [billDetail, setBillDetail] = useState<DataBill>();
  // 轨迹信息
  const [orderTrackInfo, setOrderTrackInfo] = useState<TrackData>();
  const [showOperationLogModal, setShowOperationLogModal] = useState<boolean>(false);
  const [logId, setLogId] = useState<string>();

  /**
   * @description 获取订单详情
   */
  const getOrderInfo = async () => {
    const params = {
      order_id: id,
    };
    const res = await fetchOrderInfo(params);
    if (res.code === 0) {
      setOrderInfo(res.data);
    }
  };

  /**
   * @description 获取账单详情
   */
  const getBillDetail = async () => {
    const params = {
      order_id: id,
    };
    const res = await fetchBillDetail(params);
    if (res.code === 0) {
      if (res.data && res.data.driver_bill && res.data.driver_bill.info_fee > 0) {
        res.data.driver_bill.info_fee = -(res.data.driver_bill.info_fee)
      }
      setBillDetail(res.data);
    }
  };

  /**
   * @description 获取订单估计
   */
  const getOrderTrack = async () => {
    const params = {
      order_id: id,
    };
    const res = await fetchOrderTrack(params);
    if (res.code === 0) {
      setOrderTrackInfo(res.data);
    }
  };

  React.useEffect(() => {
    getOrderInfo();
    getBillDetail();
    getOrderTrack();
  }, []);

  return (
    <PageContainer title>
      <Space direction="vertical" size={24}>
        <Row gutter={24}>
          <Col span={24}>
            <ProCard>
              <Descriptions title="订单详情">
                <Descriptions.Item label="订单号">{orderInfo?.order_id}</Descriptions.Item>
                <Descriptions.Item label="订单状态">
                  {orderInfo?.order_status_name}
                </Descriptions.Item>
                <Descriptions.Item label="城市">{orderInfo?.city}</Descriptions.Item>
                <Descriptions.Item label="计价模式">
                  {orderInfo?.price_mode === 1 ? '一口价' : '起步价'}
                </Descriptions.Item>
                <Descriptions.Item label="订单来源">{orderInfo?.channel_name}</Descriptions.Item>
                <Descriptions.Item label="平台垫付">
                  {orderInfo?.advance === 0 ? '未垫付' : '已垫付'}
                </Descriptions.Item>
              </Descriptions>
            </ProCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <ProCard title="订单操作">
              <Space size={24}>
                {/* 关单 */}
                {orderInfo && orderInfo.order_status < 5 && (
                  <CloseOrderModal orderInfo={orderInfo} billDetail={billDetail} />
                )}
                {/* 改价 免单 */}
                {orderInfo &&
                  orderInfo.order_status === 5 &&
                  orderInfo.is_pay === 0 &&
                  orderInfo.advance !== 3 &&
                  orderInfo.advance !== 4 && (
                    <>
                      <ChangePriceModal orderInfo={orderInfo} billDetail={billDetail} />
                      <FreeChargeModal billDetail={billDetail} orderInfo={orderInfo} />
                    </>
                  )}
                {orderInfo &&
                  (orderInfo.order_status === 7 || orderInfo.order_status === 11) &&
                  billDetail &&
                  billDetail.driver_bill &&
                  billDetail.driver_bill.cancel_fee * 1 > 0 &&
                  orderInfo.is_pay === 0 &&
                  orderInfo.advance !== 3 &&
                  orderInfo.advance !== 4 && (
                    <FreeChargeModal billDetail={billDetail} orderInfo={orderInfo} />
                  )}
                {/* 退款 */}
                {orderInfo && orderInfo.order_status === 5 && orderInfo.is_pay === 1 && (
                  <RefundModal orderInfo={orderInfo} billDetail={billDetail} />
                )}
                {/* <Button type="primary">创建工单</Button>
                <Button type="primary">行程录音</Button> */}
                <Button
                  onClick={() => {
                    setLogId(`${billDetail.order_detail.order_id}`);
                    setShowOperationLogModal(true);
                  }}
                  type="primary"
                >
                  操作日志
                </Button>
                {/* <Button type="primary">垫付记录</Button> */}
              </Space>
            </ProCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={7}>
            <ProCard loading={!orderInfo} title="订单流转">
              <OrderProgress orderInfo={orderInfo} billDetail={billDetail} />
            </ProCard>
          </Col>
          <Col span={17}>
            <Card>
              <MapTrajectory orderInfo={orderInfo} orderTrackInfo={orderTrackInfo} />
            </Card>
          </Col>
        </Row>
      </Space>
      <Modal
        title="操作日志"
        visible={showOperationLogModal}
        destroyOnClose
        onCancel={() => setShowOperationLogModal(false)}
        footer={null}
        width={544}
        className="teamModal"
        bodyStyle={{ padding: '0 12px' }}
      >
        <OperationLog
          type={200001001}
          id={logId}
          // addColumns={[
          //   {
          //     title: '操作结果',
          //     dataIndex: 'op_status',
          //     key: 'op_status',
          //     width: 80,
          //     render: (text) => {
          //       return (
          //         <>
          //           <div>{text ? '成功' : '失败'}</div>
          //         </>
          //       );
          //     },
          //   },
          // ]}
        />
      </Modal>
    </PageContainer>
  );
};

export default OrderDetail;
