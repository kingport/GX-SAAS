export interface OrderList {
  order_id: any;
  platform_id: number;
  open_oid: string;
  passenger_phone: string;
  departure_time: string;
  area: number;
  to_area: number;
  county: number;
  to_county: number;
  starting_name: string;
  dest_name: string;
  start_dest_distance: number;
  channel: number;
  pre_total_fee: number;
  is_pay: number;
  type: number;
  extra_info: string;
  estimate_time: number;
  order_status: number;
  driver_start_distance: number;
  distance: number;
  strategy_token: string;
  new_time: string;
  assigned_time: string;
  prepared_time: string;
  begun_time: string;
  finished_time: string;
  completed_time: string;
  cancelled_time: string;
  is_platform_paid: number;
  advance_pay_status: number;
  estimate_id: string;
  pre_map_type: number;
  begun_map_type: number;
  _birth_time: string;
}

export interface Data {
  total_count: number;
  order_list: OrderList[];
  page_index: number;
}

export interface RootObject {
  code: number;
  message: string;
  data: Data;
}

export interface OrderListParams {
  driver_phone?: string;
  end_time: string;
  start_time: string;
  order_status: number;
  is_platform_paid: number;
  is_pay: number;
}
