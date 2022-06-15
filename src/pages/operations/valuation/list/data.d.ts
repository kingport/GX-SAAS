export type PriceRuleParams = {
  channel: number;
  area_id: number;
  district: number;
  status: number;
  page_no: number;
  page_size: number;
};

export interface PriceRuleList {
  id: number;
  platform_id: number;
  product_id: number;
  car_level: number;
  area: number;
  district: string;
  abstract_district: string;
  channel: number;
  prepay_rule: string;
  operator: string;
  d_rule: string;
  p_rule: string;
  status: number;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  day_type: number;
  info_fee: number;
  price_mode: number;
}

export interface PriceRuleData {
  total_count: number;
  price_rule_list: PriceRuleList[];
  page_index: number;
}

export interface PriceRuleRootObject {
  code: number;
  message: string;
  data: Data;
}

export interface ProductList {
  product_id: number;
  product_name: string;
}

export interface ProductData {
  total_count: number;
  product_list: ProductList[];
}

export interface ProductRootObject {
  code: number;
  message: string;
  data: Data;
}

export interface AddRuleParams {
  product_id: number;
  area: number;
  district: string;
  abstract_district: string;
  channel: number;
  prepay_rule: string;
  start_time: string;
  end_time: string;
  day_type: number;
  info_fee: number;
  price_mode: number;
  d_rule: string;
  p_rule: string;
}
