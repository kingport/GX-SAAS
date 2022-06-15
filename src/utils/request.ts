/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
// import qs from 'qs';
import { extend } from 'umi-request';
import { notification } from 'antd';
import _ from 'lodash';
import { apiSign } from './index';
const { NODE_ENV } = process.env;
import { history } from 'umi';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface CodeMsgType {
  [name: number]: string;
}
const codeMessage: CodeMsgType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  prefix: NODE_ENV === 'production' ? '/saas/api' : '/saas/api',
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 30 * 1000,
});

/**
 * 配置request拦截
 */

request.interceptors.request.use((url, options) => {
  // 公参
  options.data = _.pickBy(
    Object.assign(
      {
        user_id: 1 * Number(localStorage.getItem('user_id')),
        token: localStorage.getItem('token'),
        platform_id: localStorage.getItem('platform_id'),
      },
      options.data,
    ),
    _.identity,
  );
  // string => number 需要转0的字段
  const NeedTransform = [
    'audit_status',
    'license_auth',
    'driver_recruit_status',
    'status',
    'ban_code',
    'is_pay',
    'order_status',
    'is_platform_paid',
    'order_id',
    'order_status',
    'range_person',
    'driver_id',
    'platform_id',
    'price_mode',
  ];
  Object.keys(options.data).map((key) => {
    if (NeedTransform.indexOf(key) > -1) {
      options.data[key] = Number(options.data[key]);
    }
  });

  if (options.method === 'GET') {
    options.params = options.data;
  }
  // Sign:128947c529007173f71b650117381a3b（万能签名 测试用）
  const headers = {
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/ban-types
    Sign: apiSign(options as { data: {} }),
    // Sign: "128947c529007173f71b650117381a3b",
    // apiSign(options as { data: {} }),
  };
  return {
    url,
    options: { ...options, headers, interceptors: true },
  };
});

/**
 * 配置response拦截
 */
request.interceptors.response.use(async (response) => {
  const res = await response.clone().json();
  const { code, message } = res;

  if (code !== 0) {
    if (code === 10007) {
      return history.push('/user/login');
    }
    notification.error({
      message: `请求错误 ${code}`,
      description: message,
    });
  }
  return res;
});

export default request;
