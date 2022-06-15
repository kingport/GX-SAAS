export interface 乘客发单2 {
  new_time: string;
  start_dest_distance: number;
  pre_total_fee: number;
  new_lat: number;
  new_lng: number;
}

export interface 司机接单2 {
  assigned_time: string;
  assigned_lat: number;
  assigned_lng: number;
  driver_phone: string;
  driver_name: string;
  plate_no: string;
  brand_name: string;
}

export interface 司机到达2 {
  prepared_time: string;
  prepared_lng: number;
  prepared_lat: number;
}

export interface 服务开始2 {
  begun_time: string;
  driver_phone: string;
  brand_name: string;
  begun_lng: number;
  begun_lat: number;
}

export interface 服务结束2 {
  distance: number;
  total_fee: number;
  normal_time: number;
  is_pay: number;
  finished_time: string;
  finished_lat: number;
  finished_lng: number;
}

export interface OrderDetail {
  乘客发单: 乘客发单2;
  司机接单: 司机接单2;
  司机到达: 司机到达2;
  服务开始: 服务开始2;
  服务结束: 服务结束2;
  starting_name: string;
  starting_lat: number;
  starting_lng: number;
  dest_name: string;
  dest_lat: number;
  dest_lng: number;
  cancel_time: string;
}

export interface Data {
  order_id: number;
  open_oid: string;
  order_status: number;
  order_status_name: string;
  channel: number;
  channel_name: string;
  driver_phone: string;
  city: string;
  passenger_phone: string;
  is_pay: number;
  advance: number;
  pre_map_type: number;
  begun_map_type: number;
  price_mode: number;
  judge_status: number;
  judge_exemption_count: number;
  judge_count: number;
  order_detail: OrderDetail;
}

export interface RootObject {
  code: number;
  message: string;
  data: Data;
}

export interface OrderDetailBill {
  area: string;
  order_id: number;
  start_dest_distance: number;
  estimate_time: number;
  pre_total_fee: number;
  total_distance: number;
  total_time: number;
  begun_time: string;
  finished_time: string;
  price_mode: number;
}

export interface PassengerBill {
  start_price: number;
  normal_time_fee: number;
  normal_fee: number;
  total_fee: number;
  limit_fee: number;
  limit_pay: number;
  pre_total_fee: number;
  cost: number;
  channel_name: string;
  pay_time: string;
  is_pay: number;
  pre_cost: number;
  pre_pay_time: string;
  pre_pay_status: number;
  invoice: number;
  refund_fee: number;
  p_start_price: number;
  p_normal_time_fee: number;
  p_normal_fee: number;
  p_empty_fee: number;
  p_highway_fee: number;
  p_bridge_fee: number;
  p_park_fee: number;
  p_other_fee: number;
  p_normal_distance: number;
  p_normal_time: number;
  p_empty_distance: number;
  p_coupon_fee: number;
  p_cancel_fee: number;
}

export interface DriverBill {
  start_price: number;
  normal_fee: number;
  total_fee: number;
  limit_fee: number;
  limit_pay: number;
  net_income: number;
  d_start_price: number;
  d_normal_time_fee: number;
  d_normal_fee: number;
  d_empty_fee: number;
  d_highway_fee: number;
  d_bridge_fee: number;
  d_park_fee: number;
  d_other_fee: number;
  d_normal_distance: number;
  d_normal_time: number;
  d_empty_distance: number;
  info_fee: number;
  rewards_fee: number;
  cancel_fee: number;
}

export interface DataBill {
  order_detail: OrderDetailBill;
  passenger_bill: PassengerBill;
  driver_bill: DriverBill;
}

export interface BillRootObject {
  code: number;
  message: string;
  data: DataBill;
}

export interface TrackPoint {
  lng: number;
  lat: number;
  timestamp: any;
}

export interface TrackData {
  track_points: TrackPoint[];
}

export interface TrackRootObject {
  code: number;
  message: string;
  data: TrackData;
}

export interface ChangeBillParams {
  order_id: number;
  passenger_bill: string;
  driver_bill: string;
  reason: string;
}

export interface ChangeBillRes {
  code: number;
  message: string;
}

export interface FreeChargeParams {
  order_id: number;
  detail_content: string;
  remarks: string;
}

export interface CloseOrderParams {
  order_id: number;
  detail_content: string;
  remarks: string;
}

// export type CloseOrderParams = FreeChargeParams;
export type RefundOrderParams = FreeChargeParams;
