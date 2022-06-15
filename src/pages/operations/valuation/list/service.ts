import request from '@/utils/request';
import type {
  AddRuleParams,
  PriceRuleParams,
  PriceRuleRootObject,
  ProductRootObject,
} from './data';
/**
 * @description 计价规则列表
 */
export async function fetchPriceRuleList(params: PriceRuleParams): Promise<PriceRuleRootObject> {
  return request('/v1/platform/price/priceRuleList', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 获取产品列表
 */
export async function fetchProductList(params: {}): Promise<ProductRootObject> {
  return request('/v1/platform/price/productList', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 获取产品类型
 */
export async function fetchChannelList(params: {
  partner_id: number;
  product_id: number;
}): Promise<ProductRootObject> {
  return request('/v1/platform/price/channelList', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 添加城市计价
 */
export async function fetchAddPriceRule(params: AddRuleParams): Promise<ProductRootObject> {
  return request('/v1/platform/price/addPriceRule', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 编辑城市计价
 */
export async function fetchEditPriceRule(params: AddRuleParams): Promise<ProductRootObject> {
  return request('/v1/platform/price/editPriceRule', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 审核计价规则
 */
export async function fetchReviewPriceRulePriceRule(params: {
  id: number;
  status: number;
}): Promise<ProductRootObject> {
  return request('/v1/platform/price/reviewPriceRule', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 获取计价详情
 */
export async function fetchGetPriceRule(params: { id: number }): Promise<ProductRootObject> {
  return request('/v1/platform/price/getPriceRule', {
    method: 'POST',
    data: params,
  });
}

/**
 * @description 获取产品列表
 */
 export async function fetchCountyList(params: {city: number}): Promise<ProductRootObject> {
  return request('/v1/common/getCountyList', {
    method: 'POST',
    data: params,
  });
}

/**
//  * @description 添加开成配置
//  */
// export async function fetchAddAreaPlan(params: AddPlanListParams): Promise<RootObject> {
//   return request('/v1/platform/area/addAreaPlan', {
//     method: 'POST',
//     data: params,
//   });
// }

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
