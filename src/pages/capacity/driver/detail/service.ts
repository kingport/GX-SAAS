import request from '@/utils/request';
import type { DriverDetailParams, RootObject, SetBanStatusParams } from './data';

/**
 * @description 获取司机详情
 */
export async function fetchDriverDetail(params: DriverDetailParams): Promise<RootObject> {
  return request('/v1/platform/driver/driverBizInfo', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 封禁/解封 司机
 */
export async function fetchSetBanStatus(params: SetBanStatusParams): Promise<any> {
  return request('/v1/platform/driver/setBanStatus', {
    method: 'POST',
    data: params,
  });
}
