import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser } from './services/login';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { permissionToRouter } from './utils';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    if (localStorage.getItem('token') && localStorage.getItem('user_id')) {
      try {
        const msg = await currentUser({});
        const { data } = msg;
        const { permission = [] } = data.user_info;

        // 用 Map类型 参数只能为number
        let valueEnumCity = new Map();
        data.area_list.map((x: any) => valueEnumCity.set(x.city_code, x.city_name));
        data.area_list.map((x: any) => {
          x.label = x.city_name;
          x.value = x.city_code;
          x.children = x.county_list;
          x.children.map((k: any) => {
            k.value = k.county_code;
            k.label = k.county_name;
          });
        });
        data.brand_list.map((x: any) => {
          x.label = x.brand_name;
          x.value = x.brand_id;
        });
        Object.keys(data.series_list).map((x) => {
          data.series_list[x].map((k: any) => {
            k.label = k.series_name;
            k.value = k.series_id;
          });
        });
        data.valueEnumCity = valueEnumCity;
        // 权限路由
        if (permission) {
          const { rootRouterName, rootChildRouterName, rootRouter, rootPermissionKey } =
            permissionToRouter(permission);
          data.rootRouterName = rootRouterName;
          data.rootChildRouterName = rootChildRouterName;
          data.rootRouter = rootRouter;
          data.rootPermissionKey = rootPermissionKey;
        }

        // console.log(rootRouterName, 'rootRouterNameINDEX');
        // console.log(rootChildRouterName, 'rootRouterNameINDEX');
        // console.log(rootRouter, 'rootRouterNameINDEX');

        if (data) {
          return data;
        }
      } catch (error) {
        console.log(error, 'OPOPOP');
        // alert(2);
        // history.push(loginPath);
      }
    } else {
      history.push('/user/login');
    }
    // return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  if (localStorage.getItem('token') && localStorage.getItem('user_id')) {
    return {
      fetchUserInfo,
      settings: {},
    };
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  console.log(initialState, 'initialState');
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: `
      ${initialState?.currentUser?.user_info.real_name} ${initialState?.currentUser?.user_info.phone}
      `,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
