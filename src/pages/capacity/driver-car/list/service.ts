import request from '@/utils/request';
import type { CarListParams, RootObject } from './data';
/**
 * @description 车辆列表
 */
export async function getCarList(params: CarListParams): Promise<RootObject> {
  return request('/v1/platform/car/carList', {
    method: 'POST',
    data: params,
  });
}
