export interface SetAuthParams {
  id: number;
  permission: string;
}

export interface GetUserAuthParams {
  uid: number;
}

export interface GetRoleAuth {
  id: number;
}

export interface AddplatformRoleParams {
  role_name: string;
  description: string;
}
