export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404' },
    ],
  },
  { path: '/welcome', name: '欢迎', hideInMenu: true, icon: 'smile', component: './Welcome' },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
  //     { component: './404' },
  //   ],
  // },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  // 运力中心
  {
    path: '/capacity',
    name: '运力中心',
    icon: 'CarOutlined',
    // component: './capacity/driver/list',
    access: 'normalRouteFilter',
    routes: [
      // 加盟司机管理
      {
        name: '加盟司机管理',
        path: '/capacity/driver/list',
        component: './capacity/driver/list',
        access: 'normalRouteChildFilter',
        // 权限配置，需要与 plugin-access 插件配合使用
      },
      // {
      //   name: '车辆管理',
      //   path: '/capacity/drviercar/list',
      //   component: './capacity/driver-car/list',
      // },
      // {
      //   name: '司机准入审核',
      //   path: '/capacity/driver/audit',
      //   component: './capacity/driver-audit',
      // },
      {
        name: '司机新增',
        path: '/capacity/driver/create',
        hideInMenu: true,
        component: './capacity/driver/create',
      },
      // 新增 查看 编辑 审核 司机页
      {
        name: '证件信息',
        path: '/capacity/driver/credentials',
        hideInMenu: true,
        component: './capacity/driver/credentials',
      },
      // 司机详情
      {
        name: '司机详情',
        hideInMenu: true,
        path: '/capacity/driver/detail/:id',
        component: './capacity/driver/detail',
      },
      // 邀请司机管理详情
      // {
      //   name: 'invited-driver-detail',
      //   path: '/capacity/invited-driver-detail/:id',
      //   hideInMenu: true,
      //   component: './capacity/invited-driver-detail',
      // },
      // // 邀请乘客列表
      // {
      //   name: 'invited-passenger-list',
      //   path: '/capacity/invited-passenger-list',
      //   component: './capacity/invited-passenger-list',
      // },
      // // 邀请乘客详情
      // {
      //   name: 'invited-passenger-detail',
      //   path: '/capacity/invited-passenger-detail/:id',
      //   hideInMenu: true,
      //   component: './capacity/invited-passenger-detail',
      // },
      // // 优惠券活动列表
      // {
      //   name: 'ticket-list',
      //   path: '/capacity/ticket-list',
      //   component: './capacity/ticket-list',
      // },
      // // 优惠券详情
      // {
      //   name: 'detail',
      //   path: '/capacity/detail/:id',
      //   hideInMenu: true,
      //   component: './capacity/detail',
      // },
      // // 系统发券列表
      // {
      //   name: 'system-list',
      //   path: '/capacity/system-list',
      //   component: './capacity/system-list',
      // },
      // // 意向司机列表
      // {
      //   name: 'intended-drivers-list',
      //   path: '/capacity/intended-drivers-list',
      //   component: './capacity/intended-drivers-list',
      // },
      // // 全职司机列表
      // {
      //   name: 'full-time-driver',
      //   path: '/capacity/full-time-driver',
      //   component: './capacity/full-time-driver',
      // },
      // // 疫情打卡记录
      // {
      //   name: 'epidemic-record',
      //   path: '/capacity/epidemic-record',
      //   component: './capacity/epidemic-record',
      // },
    ],
  },
  // 运营管理
  {
    path: '/operations',
    name: '运营管理',
    icon: 'ProfileOutlined',
    access: 'normalRouteFilter',
    routes: [
      {
        name: '招募配置',
        path: '/operations/recruit/config',
        component: './operations/recruit-config',
        access: 'normalRouteChildFilter',
      },
      // 端内消息
      {
        name: '端内消息',
        path: '/operations/client/list',
        component: './operations/client/list',
        access: 'normalRouteChildFilter',
      },
      // 计价列表
      {
        name: '计价列表',
        path: '/operations/valuation/list',
        component: './operations/valuation/list',
        access: 'normalRouteChildFilter',
      },
      // {
      //   name: '开城列表',
      //   path: '/operations/open/citys',
      //   component: './operations/open-citys',
      // },
    ],
  },
  // 订单中心
  {
    path: '/order',
    name: '订单管理',
    icon: 'UnorderedListOutlined',
    access: 'normalRouteFilter',
    routes: [
      // 订单列表
      {
        name: '订单查询',
        path: '/order/list',
        component: './order/order-list',
        access: 'normalRouteChildFilter',
      },
      // 垫付列表
      // {
      //   name: 'advancepay-list',
      //   path: '/order/advancepay-list',
      //   component: './order/advancepay-list',
      // },
      // 订单详情
      {
        name: '订单详情',
        path: '/order/detail/:id',
        hideInMenu: true,
        component: './order/order-detail',
      },
    ],
  },
  // 系统设置
  {
    path: '/settings',
    name: '系统设置',
    icon: 'SettingOutlined',
    access: 'normalRouteFilter',
    routes: [
      {
        name: '用户管理',
        path: '/settings/user/manage',
        component: './settings/user-manage',
        access: 'normalRouteChildFilter',
      },
      {
        name: '角色管理',
        path: '/settings/role/manage',
        component: './settings/role-manage',
        access: 'normalRouteChildFilter',
      },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
