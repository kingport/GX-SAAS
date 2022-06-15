import request from '@/utils/request';
import type {
  UserParams,
  RoleParams,
  RootObject,
  PlatformUserParams,
  PlatformUserRoleParams,
  PlatformSetUserParams,
} from './data';

/**
 * @description 获取用户列表
 */
export async function fetchUserList(params: UserParams): Promise<any> {
  return request('/v1/platform/user/platformUserList', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 获取角色列表
 */
export async function fetchRoleList(params: RoleParams): Promise<RootObject> {
  return request('/v1/platform/user/platformRoleList', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 添加平台用户
 */
export async function fetchAddPlatformUser(params: PlatformUserParams): Promise<RootObject> {
  return request('/v1/platform/user/addPlatformUser', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 编辑平台用户
 */
export async function fetchEditPlatformUser(params: PlatformUserParams): Promise<RootObject> {
  return request('/v1/platform/user/editPlatformUser', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 设置平台用户角色
 */
export async function fetchSetPlatformUserRole(params: PlatformUserRoleParams): Promise<any> {
  return request('/v1/platform/user/setPlatformUserRole', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 设置平台用户禁用/开启
 */
export async function fetchSetPlatformUserStatus(params: PlatformSetUserParams): Promise<any> {
  return request('/v1/platform/user/setPlatformUserStatus', {
    method: 'POST',
    data: params,
  });
}
