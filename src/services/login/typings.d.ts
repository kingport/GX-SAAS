// // @ts-ignore
// /* eslint-disable */

declare namespace API {
  type CurrentUser = {
    valueEnumCity: any;
    access?: string;
    rootRouterName: any;
    rootChildRouterName: any;
    rootPermissionKey: any;
    rootRouter: any;
    user_info: {
      email?: string;
      phone?: string;
      platform_id?: number;
      platform_name?: string;
      user_id?: number;
      user_name?: string;
      real_name?: string;
      role_name?: string;
      permission: [];
    };
    area_list: {
      city_code?: number;
      city_name?: string;
      label: string;
      value: number;
      county_list?: {
        county_code: number;
        county_name: string;
        label: string;
        value: number;
      }[];
      district?: string;
    }[];
    brand_list: {
      brand_id: number;
      brand_name: string;
      label: string;
      value: number;
    }[];
    series_list: {
      brand_id: number;
      series_id: number;
      series_name: string;
    }[];

    // name?: string;
    // avatar?: string;
    // userid?: string;
    // email?: string;
    // signature?: string;
    // title?: string;
    // group?: string;
    // tags?: { key?: string; label?: string }[];
    // notifyCount?: number;
    // unreadCount?: number;
    // country?: string;
    // access?: string;
    // geographic?: {
    //   province?: { label?: string; key?: string };
    //   city?: { label?: string; key?: string };
    // };
    // address?: string;
    // phone?: string;
  };

  // type LoginResult = {
  //   status?: string;
  //   type?: string;
  //   currentAuthority?: string;
  // };

  // type PageParams = {
  //   current?: number;
  //   pageSize?: number;
  // };

  // type RuleListItem = {
  //   key?: number;
  //   disabled?: boolean;
  //   href?: string;
  //   avatar?: string;
  //   name?: string;
  //   owner?: string;
  //   desc?: string;
  //   callNo?: number;
  //   status?: number;
  //   updatedAt?: string;
  //   createdAt?: string;
  //   progress?: number;
  // };

  // type RuleList = {
  //   data?: RuleListItem[];
  //   /** 列表的内容总数 */
  //   total?: number;
  //   success?: boolean;
  // };

  type FakeCaptcha = {
    user_name?: string;
    phone?: string;
    code?: number;
  };

  type LoginParams = {
    user_name: string;
    phone: string;
    code: number;
    status?: string;
  };
  type LoginResult = {
    code?: number;
    currentAuthority?: string;
    msg?: string;
    data?: {
      email?: string;
      phone?: string;
      platform_id?: number;
      token: string;
      user_id: string;
      user_name?: string;
    };
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
