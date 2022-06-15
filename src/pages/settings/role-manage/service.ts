import request from '@/utils/request';
import type { SetAuthParams, GetUserAuthParams, AddplatformRoleParams, GetRoleAuth } from './data';

/**
 * @description 添加角色
 */
export async function fetchAddPlatformRole(params: AddplatformRoleParams): Promise<any> {
  return request('/v1/platform/user/addPlatformRole', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 角色的默认权限
 */
export async function fetchGetRoleAuth(params: GetRoleAuth): Promise<any> {
  return request('/v1/platform/user/getPlatformRole', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 用户的权限列表
 */
 export async function fetchGetUserAuth(params: GetUserAuthParams): Promise<any> {
  return request('/v1/platform/user/getPlatformUserPermission', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 设置权限
 */
export async function fetchSetRoleAuth(params: SetAuthParams): Promise<any> {
  return request('/v1/platform/user/setPlatformRolePermission', {
    method: 'POST',
    data: params,
  });
}
