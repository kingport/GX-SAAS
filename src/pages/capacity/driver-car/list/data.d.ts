export interface CarList {
  platform_id: number;
  gvid: number;
  plate_no: string;
  product_id: number;
  vin: string;
  engine_no: string;
  reg_date: string;
  issue_date: string;
  ins_valid_date: string;
  annual_check_date: string;
  net_trans_permit_location: number;
  net_trans_permit_id: string;
  net_trans_permit_valid_date: string;
  net_trans_permit_issue_date: string;
  owner: string;
  owner_address: string;
  brand_name: string;
  series_name: string;
  delivery: string;
  color: string;
  seat_num: number;
  extra_info: string;
  init_style_price: number;
  length: number;
  width: number;
  height: number;
  wheelbases: number;
  fuel_id: number;
  drive_distance: number;
  car_outlook_url: string;
  status: number;
  driving_license_photo: string;
  driving_check_photo: string;
  car_photo: string;
  net_trans_permit_photo: string;
  driving_valid_date: string;
  series_id: number;
  brand_id: number;
  area_id: number;
  channel: number;
  property: number;
  extra_biz: string;
  verify_status: number;
  is_security_access: number;
  security_uid: number;
  vehicle_type: string;
  trans_agency: string;
  trans_area: string;
  certify_date_b: string;
  register_date: string;
  plate_color: string;
  fix_state: string;
  check_state: string;
  source: number;
  audit_status: number;
  bind_status: number;
  first_company_id: number;
  first_company_name: string;
  join_company_id: number;
  join_company_name: string;
  audit_msg: string;
  audit_msg_json: string;
  biz_source: number;
  apply_driver_id: number;
}

export interface Data {
  total_count: number;
  car_list: CarList[];
  page_index: number;
}

export interface RootObject {
  code: number;
  message: string;
  data: Data;
}

export interface CarListParams {}
