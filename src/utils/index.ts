import md5 from 'md5';
import { SIGN_KEY } from '@/constant/index';

// 是否是object
export const isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
// 是否是string
export const isString = (str: any) => {
  return Object.prototype.toString.call(str) === '[object String]';
};
// 是否是数组
export const isArray = (array: any) => {
  return Object.prototype.toString.call(array) === '[object Array]';
};

// 递归遍历
export const mapObjectKey = (data: any) => {
  Object.keys(data).map((x) => {
    return (data[x] = data[x].replace(/\s*/g, ''));
  });
};

// 签名生成
export const apiSign = (params: { data: {} }) => {
  // 将每一个字段去除空格
  const { data } = params;
  // let newData = JSON.parse(JSON.stringify(data));
  // Object.keys(newData).map((key) => {
  //   // 如果该字段是string 则直接去除空格
  //   if (isString(newData[key])) {
  //     newData[key] = newData[key].replace(/\s*/g, '');
  //   }
  //   if (isObject(newData[key])) {
  //     mapObjectKey(newData[key]);
  //   }
  // });
  // console.log(isString('1233'), 'skjdksjkdjk');
  // console.log(isObject({ a: [] }), 'skjdksjkdjk');
  const dataFilter = JSON.stringify(data);
  // console.log(dataFilter, '签名前');
  const sign = `${dataFilter}${SIGN_KEY}`;
  return md5(sign);
};

// 查找区县列表
export const filterCountys = (areaId: number, initialState: any) => {
  if (areaId) {
    let countys: any = initialState?.currentUser?.area_list.find(
      (x: { city_code: number }) => x.city_code === areaId,
    )?.county_list;
    countys.map((x: any) => {
      x.label = x.county_name;
      x.value = x.county_code;
    });
    return countys;
  }
};

// 查找城市名字
export const filterCityName = (areaId: number, initialState: any) => {
  let countyName;
  if (areaId) {
    countyName = initialState?.currentUser?.area_list.find(
      (x: { city_code: number }) => x.city_code === areaId,
    ).city_name;
    if (!countyName) {
      return areaId;
    } else {
      return countyName;
    }
  }
};

// 查找城市区号
export const filterCityDistrict = (areaId: number, initialState: any) => {
  let districtCode;
  if (areaId) {
    districtCode = initialState?.currentUser?.area_list.find(
      (x: { city_code: number }) => x.city_code === areaId,
    ).district;
    if (!districtCode) {
      return areaId;
    } else {
      return districtCode;
    }
  }
};

// 查找区县名字
export const filterCountyName = (areaId: number, countyId: number | string, initialState: any) => {
  if (areaId) {
    let countyName = '-';
    let county_list: any = initialState?.currentUser?.area_list.find(
      (x: { city_code: number }) => x.city_code === areaId,
    )?.county_list;
    if (county_list) {
      countyName = county_list.find((x: { county_code: number }) => x.county_code == countyId);
      if (countyName) {
        return countyName['county_name'];
      } else {
        countyName = `${countyId || '-'}`;
      }
    } else {
      countyName = `${countyId || '-'}`;
    }
    return countyName;
  }
};

// 根据权限生成路由
export const permissionToRouter = (permission: any) => {
  // const { permission } = data.user_info;
  if (permission) {
    // 一级路由
    const rootRouter = permission.filter((x: { parent_id: number }) => x.parent_id === 0);
    const rootPermissionKey: any = [];
    permission.map((x: { permission_id: number }) => rootPermissionKey.push(x.permission_id));
    let rootRouterName: any = [];
    rootRouter.map((x: { permission_name: string; children: [] }) => {
      x.children = [];
      rootRouterName.push(x.permission_name);
    });
    // 一级路由的子路由
    let rootChildRouterName: any = [];
    permission.map((x: { parent_id: number; permission_id: number }) => {
      rootRouter.map((k: { permission_id: number; children: any[] }) => {
        if (x.parent_id === k.permission_id) {
          k.children.push(x);
        }
      });
    });
    rootRouter.map((x: { permission_name: string; children: [] }) => {
      x.children.map((j: { children: [] }) => {
        j.children = [];
      });
    });
    // 一级路由的子路由的接口
    permission.map((x: { parent_id: number; permission_id: number }) => {
      rootRouter.map((k: { permission_id: number; children: any[] }) => {
        k.children.map((j: { permission_name: string; permission_id: number; children: any[] }) => {
          if (x.parent_id === j.permission_id) {
            rootChildRouterName.push(j.permission_name);
            j.children.push(x);
          }
        });
      });
    });

    return {
      rootRouterName,
      rootChildRouterName,
      rootRouter,
      rootPermissionKey,
    };
  }
};

// 树选择框添加字段
export const renderTreeList = (treeData: any) => {
  treeData.map((x: any) => {
    x.title = x.permission_name;
    x.key = x.permission_id;
    if (x.children) {
      x.children.map((k: any) => {
        k.title = k.permission_name;
        k.key = k.permission_id;
        k.children.map((j: any) => {
          j.title = j.permission_name;
          j.key = j.permission_id;
        });
      });
    }
  });
  return treeData;
};

// 是否拥有接口权限 所有权限key
export const isApiAuth = (permission_id: number, permission_list: Array<string | number>) => {
  if (permission_list.includes(permission_id)) {
    return true;
  } else {
    return false;
  }
};
