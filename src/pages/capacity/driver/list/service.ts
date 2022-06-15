import request from '@/utils/request';
import type { DriverListParams, DriverListResult } from './data';
/**
 * @description 司机列表
 */
export async function getDriverList(params: DriverListParams): Promise<DriverListResult> {
  return request('/v1/platform/driver/driverList', {
    method: 'POST',
    data: params,
  });
}
