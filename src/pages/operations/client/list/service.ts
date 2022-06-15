import request from '@/utils/request';
import type {
  AddMessageParams,
  DetailRootObject,
  EditMessageParams,
  MessageListParams,
  RootObject,
} from './data';
/**
 * @description 端内消息列表
 */
export async function fetchMessageList(params: MessageListParams): Promise<RootObject> {
  return request('/v1/platform/message/messageList', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 新建端内消息
 */
export async function fetchAddMessage(params: AddMessageParams): Promise<RootObject> {
  return request('/v1/platform/message/addMessage', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 编辑端内消息
 */
export async function fetchEditMessage(params: EditMessageParams): Promise<RootObject> {
  return request('/v1/platform/message/editMessage', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 获取推送详情
 */
export async function fetchGetMessage(params: { id: number }): Promise<DetailRootObject> {
  return request('/v1/platform/message/getMessage', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 审核推送
 */
export async function fetchAuditMessage(params: {
  id: number;
  audit_status: number;
}): Promise<DetailRootObject> {
  return request('/v1/platform/message/auditMessage', {
    method: 'POST',
    data: params,
  });
}

// /**
//  * @description 修改开成配置
//  */
// export async function fetchEditAreaPlan(params: EditPlanListParams): Promise<RootObject> {
//   return request('/v1/platform/area/editAreaPlan', {
//     method: 'POST',
//     data: params,
//   });
// }

// /**
//  * @description 关闭/开启
//  */
// export async function fetchSetAreaPlanStatus(params: SetPlanParams): Promise<RootObject> {
//   return request('/v1/platform/area/setAreaPlanStatus', {
//     method: 'POST',
//     data: params,
//   });
// }
