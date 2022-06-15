export type AreaPlanListParams = {
  city_id?: number;
  county_id?: number;
  driver_recruit_status?: number;
  page_no: number;
  page_size: number;
};

export type AddPlanListParams = {
  city_code: number;
  county_code: number;
  target_driver_num: number;
  remark: string;
  must_dodl: number;
  must_dol: number;
};

export type EditPlanListParams = AddPlanListParams;

export type SetPlanParams = {
  id: number;
  driver_recruit_status: number;
};
export interface AreaPlanList {
  id: number;
  platform_id: number;
  city_code: number;
  county_code: number;
  public_id: string;
  target_driver_num: number;
  remark: string;
  must_dodl: number;
  must_dol: number;
  city_open_status: number;
  driver_recruit_status: number;
  create_time: string;
  update_time: string;
}

export interface Data {
  total_count: number;
  area_plan_list: AreaPlanList[];
  page_index: number;
}

export interface RootObject {
  code: number;
  message: string;
  data: Data;
}
