import request from '@/utils/request';

/**
 * @description 用户登陆
 */
export async function login(params: { user_name: string; phone: string; code: number }) {
  return request<API.LoginResult>('/v1/platform/user/platformLogin', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 用户个人信息
 */
export async function currentUser(params: {}) {
  return request<{
    data: API.CurrentUser;
  }>('/v1/platform/user/getUserGlobalInfo', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 用户日志
 */
export async function userLog(params: {}) {
  return request<{
    data: API.CurrentUser;
  }>('/v1/platform/log/showLog', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 获取短信验证码
 */
export async function getPhoneCode(params: { phone: string; user_name: string }) {
  return request<any>('/v1/platform/user/getPlatformQueryCode', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 退出登录
 */
export async function platformLogout(params: {}) {
  return request<any>('/v1/platform/user/platformLogout', {
    method: 'POST',
    data: params,
  });
}
