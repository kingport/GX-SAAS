import request from '@/utils/request';
import type {
  AddPlanListParams,
  AreaPlanListParams,
  EditPlanListParams,
  RootObject,
  SetPlanParams,
} from './data';
/**
 * @description 开城列表
 */
export async function fetchAreaPlanList(params: AreaPlanListParams): Promise<RootObject> {
  return request('/v1/platform/area/areaPlanList', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 添加开成配置
 */
export async function fetchAddAreaPlan(params: AddPlanListParams): Promise<RootObject> {
  return request('/v1/platform/area/addAreaPlan', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 修改开成配置
 */
export async function fetchEditAreaPlan(params: EditPlanListParams): Promise<RootObject> {
  return request('/v1/platform/area/editAreaPlan', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 关闭/开启
 */
export async function fetchSetAreaPlanStatus(params: SetPlanParams): Promise<RootObject> {
  return request('/v1/platform/area/setAreaPlanStatus', {
    method: 'POST',
    data: params,
  });
}
