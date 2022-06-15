export type DriverDetailParams = {
  driver_id: number;
};

export type DriverDetailResult = {
  data: {
    base_info?: {
      platform_id?: number;
      driver_id?: string;
      cell?: string;
      account_status?: number;
      audit_status?: number;
      audit_msg?: string;
      audit_msg_json?: string;
      license_auth?: number;
      license_expired_date?: string;
      license_expired_status?: number;
      gvid?: number;
    };
    driver_apply?: {
      driver_id: number;
      cell: string;
      biz_source: number;
      company_id: number;
      area_id: number;
      county_id: number;
      channel_source: number;
    };
    driver_idcard?: {
      id_no: string;
      name: string;
      id_front_photo: string;
      id_backend_photo: string;
      id_valid_date: string;
      sex: number;
      census_place: string;
      address: string;
      idcard_front_photo: string;
    };
    driver_license?: {
      lic_no: string;
      lic_left_photo: string;
      lic_right_photo: string;
      lic_issue_date: string;
      lic_valid_date: string;
      lic_class: string;
    };
    driver_online_license?: {
      qualification_id: string;
      qualification_photo: string;
      qualification_issue_date: string;
      qualification_id_valid_date: string;
    };
    driving_license?: {
      driving_license_photo: string;
      driving_check_photo: string;
      reg_date: string;
      issue_date: string;
      driving_valid_date: string;
    };
    driver_car?: {
      plate_no: string;
      owner: string;
      brand_name: string;
      brand_id: number;
      series_name: string;
      series_id: number;
      color: string;
      seat_num: number;
      drive_distance: number;
      fuel_id: number;
      owner_address: string;
      ins_valid_date: string;
      annual_check_date: string;
      vin: string;
      car_photo: string;
      length: number;
      width: number;
      height: number;
      wheelbases: number;
      delivery: string;
      init_style_price: number;
      engine_no: string;
      area_id: number;
      property: number;
      register_date: string;
    };
    driver_online_driving_license?: {
      net_trans_permit_id: string;
      net_trans_permit_photo: string;
      net_trans_permit_issue_date: string;
      net_trans_permit_valid_date: string;
    };
  };
  code?: number;
  message?: string;
};

//--------------------------------------start----------------
export interface BaseInfo {
  platform_id: number;
  driver_id: number;
  cell: string;
  account_status: number;
  audit_status: number;
  audit_msg: string;
  audit_msg_json: string;
  license_auth: number;
  license_expired_date: string;
  license_expired_status: number;
  gvid: number;
}

export interface DriverApply {
  driver_id: number;
  cell: string;
  biz_source: number;
  company_id: number;
  area_id: number;
  county_id: number;
  channel_source: number;
  inviter_driver_id: string;
}

export interface DriverIdcard {
  id_no: string;
  name: string;
  id_front_photo: string;
  id_backend_photo: string;
  id_valid_date: string;
  sex: number;
  census_place: string;
  address: string;
  id_card_hand_photo: string;
}

export interface DriverLicense {
  lic_no: string;
  lic_left_photo: string;
  lic_right_photo: string;
  lic_issue_date: string;
  lic_valid_date: string;
  lic_class: string;
}

export interface DriverOnlineLicense {
  qualification_id: string;
  qualification_photo: string;
  qualification_issue_date: string;
  qualification_id_valid_date: string;
}

export interface DriverDrivingLicense {
  driving_license_photo: string;
  driving_check_photo: string;
  reg_date: string;
  issue_date: string;
  driving_valid_date: string;
}

export interface DriverCar {
  plate_no: string;
  owner: string;
  brand_name: string;
  brand_id: number;
  series_name: string;
  series_id: number;
  color: string;
  seat_num: number;
  driver_distance: number;
  fuel_id: number;
  owner_address: string;
  ins_valid_date: string;
  annual_check_date: string;
  vin: string;
  car_photo: string;
  length: number;
  width: number;
  height: number;
  wheelbases: number;
  delivery: number;
  init_style_price: number;
  engine_no: string;
  area_id: number;
  property: number;
  register_date: string;
}

export interface DriverOnlineDrivingLicense {
  net_trans_permit_id: string;
  net_trans_permit_photo: string;
  net_trans_permit_issue_date: string;
  net_trans_permit_valid_date: string;
}

export interface Data {
  driver_driving_license: any;
  base_info: BaseInfo;
  driver_apply: DriverApply;
  driver_idcard: DriverIdcard;
  driver_license: DriverLicense;
  driver_online_license: DriverOnlineLicense;
  driver_driving_license: DriverDrivingLicense;
  driver_car: DriverCar;
  driver_online_driving_license: DriverOnlineDrivingLicense;
}

export interface RootObject {
  code: number;
  message: string;
  data: Data;
}

//--------------------------------------------end-----------------

export type DriverListItem = {
  driver_id: number;
  account_status?: number;
  audit_status?: number;
  join_company_name?: string;
  name?: string;
  license_auth?: string;
};

export type DriverAuditParams = {
  driver_id: number;
  audit_msg_json: string;
  audit_status: number;
};

export type AuditLogParams = {
  op_time?: string;
  op_user_name?: string;
  op_type_txt?: string;
  op_remarks?: string;
};

export type DriverLicConfigParams = {
  city_code: number;
  county_code: number;
};
