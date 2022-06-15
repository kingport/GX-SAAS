export type UserParams = {
  name?: string;
  email?: string;
  status?: number;
  page_no: number;
  page_size: number;
};

export type UserColumns = {
  name?: string;
  email?: string;
  status?: number;
  page_index?: number;
  user_id?: number;
  phone?: string;
  create_time?: string;
  page_no?: number;
  role_name: string;
};

export type RoleParams = {
  role_name?: string;
  status?: number;
  page_no: number;
  page_size: number;
};
export interface RoleList {
  label: string;
  value: number;
  id: number;
  role_name: string;
  description: string;
  status: number;
  create_time: string;
}

export interface Data {
  total_count: number;
  role_list: RoleList[];
  page_index: number;
}

export interface RootObject {
  code: number;
  message: string;
  data: Data;
}

export interface PlatformUserParams {
  name: string;
  phone: string;
  email: string;
  uid?: number;
}

export interface PlatformUserRoleParams {
  uid: number;
  role_id: number;
}

export interface PlatformSetUserParams {
  status: number;
  uid: number;
}
