export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  // const { permission } = currentUser?.user_info;
  // console.log(permission, 'permission');
  if (currentUser?.rootRouterName) {
    const { rootRouterName, rootChildRouterName, rootRouter, rootPermissionKey } = currentUser;

    return {
      // 一级路由
      normalRouteFilter: (x: { name: string }) => rootRouterName.includes(x.name),
      // 二级路由
      normalRouteChildFilter: (x: { name: string }) =>
        Array.from(new Set(rootChildRouterName)).includes(x.name),
      // 一级路由详细
      rootRouter: rootRouter,
      // 接口权限key
      rootPermissionKey: rootPermissionKey,
    };
  } else {
    return {};
  }
}
