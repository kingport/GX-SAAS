import request from '@/utils/request';
import type { OrderListParams, RootObject } from './data';
/**
 * @description 订单列表
 */
export async function getOrderList(params: OrderListParams): Promise<RootObject> {
  return request('/v1/platform/order/orderList', {
    method: 'POST',
    data: params,
  });
}
