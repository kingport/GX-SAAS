import request from '@/utils/request';
import type {
  DriverDetailParams,
  DriverAuditParams,
  RootObject,
  Data,
  DriverLicConfigParams,
} from './data';

/**
 * @description 获取司机详情
 */
export async function fetchDriverDetail(params: DriverDetailParams): Promise<RootObject> {
  return request('/v1/platform/driver/driverDetail', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 司机审核
 */
export async function fetchDriverAudit(params: DriverAuditParams): Promise<any> {
  return request('/v1/platform/driver/audit', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 司机编辑
 */
export async function fetchDriverEdit(params: Data): Promise<any> {
  return request('/v1/platform/driver/edit', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 获取城市下的双证配置
 */
export async function fetchDriverLicConfig(params: DriverLicConfigParams): Promise<any> {
  return request('/v1/platform/driver/licConfig', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 证件识别
 */
export async function fetchDriverDistinguish(params: any): Promise<any> {
  return request('/v1/platform/driver/distinguish', {
    method: 'POST',
    data: params,
  });
}
