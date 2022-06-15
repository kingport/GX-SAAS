export type DriverDetailParams = {
  driver_id: number;
};
export interface Data {
  driver_id: number;
  name: string;
  cell: string;
  area_id: number;
  county_id: number;
  account_status: number;
  account_status_name: string;
  ban_status: number;
  ban_time: string;
  ban_end_time: string;
  verify_status: number;
  is_security_access: number;
  company_id: number;
  company_name: string;
  inviter_driver_id: number;
  inviter_driver_cell: string;
  inviter_history_amount: number;
  create_time: string;
}

export interface RootObject {
  code: number;
  message: string;
  data: Data;
}

export interface SetBanStatusParams {
  driver_id?: number;
  ban_code?: number | string;
  ban_time?: string;
  ban_end_time?: string;
  reason?: string;
}
