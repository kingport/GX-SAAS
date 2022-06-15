import request from '@/utils/request';
import type {
  BillRootObject,
  ChangeBillParams,
  ChangeBillRes,
  CloseOrderParams,
  FreeChargeParams,
  RefundOrderParams,
  RootObject,
  TrackRootObject,
} from './data';
/**
 * @description 订单详情
 */
export async function fetchOrderInfo(params: { order_id: string }): Promise<RootObject> {
  return request('/v1/platform/order/getOrderInfo', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 账单详情
 */
export async function fetchBillDetail(params: { order_id: string }): Promise<BillRootObject> {
  return request('/v1/platform/order/getBillDetail', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 订单轨迹
 */
export async function fetchOrderTrack(params: { order_id: string }): Promise<TrackRootObject> {
  return request('/v1/platform/order/getOrderTrack', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 订单改价
 */
export async function fetchChangeBill(params: ChangeBillParams): Promise<ChangeBillRes> {
  return request('/v1/platform/order/changeBill', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 免单
 */
export async function fetchFreeCharge(params: FreeChargeParams): Promise<ChangeBillRes> {
  return request('/v1/platform/order/freeCharge', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 关单
 */
export async function fetchCloseOrder(params: CloseOrderParams): Promise<ChangeBillRes> {
  return request('/v1/platform/order/closeOrder', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 退款
 */
export async function fetchRefundOrder(params: RefundOrderParams): Promise<ChangeBillRes> {
  return request('/v1/platform/order/refundOrder', {
    method: 'POST',
    data: params,
  });
}
