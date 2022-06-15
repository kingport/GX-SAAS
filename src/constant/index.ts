export const SIGN_KEY = `a1337326974b2118f75901771158c0b0`;

// 图片
export const UPLOAD_IMAGE_LIST = [
  'car_photo',
  'id_backend_photo',
  'id_card_hand_photo',
  'id_front_photo',
  'lic_left_photo',
  'lic_right_photo',
  'driving_license_photo',
  'driving_check_photo',
  'qualification_photo',
  'net_trans_permit_photo',
];

const account_status = new Map();
account_status.set(-1, '全部');
account_status.set(1, '正常');
account_status.set(2, '冻结');
account_status.set(3, '封禁');
account_status.set(4, '永久封禁');
account_status.set(5, '证件过期');
export const ACCOUNT_STATUS = account_status;

export const LICENSE_AUTH = {
  '-1': {
    text: '全部',
  },
  // 0: {
  //   text: '未认证',
  // },
  1: {
    text: '仅人证',
  },
  2: {
    text: '仅车证',
  },
  3: {
    text: '有双证',
  },
  4: {
    text: '无双证',
  },
};

// const audit_status = new Map();
// audit_status.set(-1, '全部');
// audit_status.set(0, '待审查');
// audit_status.set(1, '复审通过（未加复审流程时）');
// audit_status.set(2, '初审不通过');
// audit_status.set(3, '非营运车辆');
// audit_status.set(4, '审核不通过');
// audit_status.set(5, '初审通过');
// audit_status.set(6, '复核不通过');
export const AUDIT_STATUS = {
  '-1': {
    text: '全部',
  },
  0: {
    text: '待审查',
  },
  // 1: {
  //   text: '复审通过（未加复审流程时）',
  // },
  2: {
    text: '审核不通过',
  },
  3: {
    text: '非营运车辆',
  },
  // 4: {
  //   text: '审核不通过',
  // },
  5: {
    text: '审核通过',
  },
  // 6: {
  //   text: '审核不通过',
  // },
};

// 订单渠道
const order_channel = new Map();
order_channel.set(10000, '滴滴特惠');
order_channel.set(10100, '百度地图');
order_channel.set(10200, '腾讯地图');
order_channel.set(10500, '花小猪');
export const ORDER_CHANNEL = order_channel;

// 订单状态
export const ORDER_STATUS = {
  0: { text: '等待应答' },
  6: { text: '抢单前取消' },
  11: { text: '客服关闭' },
  '-1': { text: '全部' },
  1: { text: '已抢单' },
  2: { text: '到达上车点' },
  4: { text: '行程中' },
  5: { text: '已完成' },
  7: { text: '乘客取消' },
  12: { text: '司机取消' },
  // 0: { text: '未抢单' },
  // 1: { text: '已抢单' },
  // 2: { text: '已到达接乘客' },
  // 3: { text: '乘客上车' },
  // 4: { text: '开始计费' },
  // 5: { text: '订单完成' },
  // 6: { text: '抢单前取消（乘客）' },
  // 7: { text: '抢单后取消（乘客）' },
  // 8: { text: '已改派' },
  // 9: { text: '已改派失败' },
  // 10: { text: '司机和乘客协商时间，司机超时' },
  // 11: { text: '客服关闭' },
  // 12: { text: '未能完成服务' },
  // 13: { text: '支付完成' },
};

// 订单支付状态
export const ORDER_IS_PAY = {
  '-1': { text: '全部' },
  0: { text: '未支付' },
  1: { text: '已支付' },
};

// 垫付状态
export const ORDER_IS_PAID = {
  '-1': { text: '全部' },
  0: { text: '未垫付' },
  1: { text: '平台垫付' },
};
//////////////////////////////////saas/////////////////

// 代理商类型
export const AGENT_TYPE = [
  {
    id: 1,
    key: 1,
    value: '省级代理',
  },
  {
    id: 2,
    key: 2,
    value: '市级代理',
  },
  {
    id: 3,
    key: 3,
    value: '租赁公司',
  },
];
export const AGENT_TYPE_NAME = {
  1: '省级代理',
  2: '市级代理',
  3: '租赁公司',
};
// 合作模式
export const COOPERATION_MODE = [
  {
    id: 1,
    key: 1,
    value: '普通渠道',
  },
  {
    id: 2,
    key: 2,
    value: '代运营渠道',
  },
  {
    id: 3,
    key: 3,
    value: '拿牌渠道',
  },
];
export const COOPERATION_MODE_NAME = {
  1: '普通渠道',
  2: '代运营渠道',
  3: '拿牌渠道',
};
// 运力属性
export const TRANSPORT_PROPERTIES = [
  {
    id: 1,
    key: 1,
    value: '公海',
  },
  {
    id: 2,
    key: 2,
    value: '非公海',
  },
];
export const STATUS_COMPANY = [
  {
    id: 0,
    key: 0,
    value: '合作中',
  },
  {
    id: 1,
    key: 1,
    value: '已终止',
  },
  {
    id: 2,
    key: 2,
    value: '已删除',
  },
];
// 平台
export const CHANNEL = {
  1001: '车马',
};
// 优惠券类型
export const COUPON_TYPE = {
  1: '邀请赠券',
  2: '系统赠券',
  10: '注册赠券',
};
// 领取方式
export const GET_TYPE = {
  1: '司机邀请',
};
export const COUPON_STAUTS = {
  0: '待审核',
  1: '审核不通过',
  2: '审核通过',
  3: '已暂停',
  4: '已终止',
  5: '已过期',
};
export const COUPON_TEXT = {
  0: '未使用',
  1: '已使用',
  2: '已过期',
};
// 账号状态
// export const ACCOUNT_STATUS = {
//   0: {
//     label: '正常',
//     status: 'success',
//   },
//   1: {
//     label: '已删除',
//     status: 'error',
//   },
// };
export const CONFIG_PASSENGER_STATUS = {
  1: {
    label: '开启',
    status: 'success',
  },
  2: {
    label: '关闭',
    status: 'error',
  },
};
///////////////////////////////////////////////-----配置中心模块--------/////////////////////////////////////

export const CONFIG_CHANNEL = {
  10000: '滴滴',
  10200: '百度',
  10300: '腾讯',
  10100: '美团',
  1001: '车马',
};
export const CANCEL_CONFIGURATION = {
  1001: '车马',
  10000: '滴滴',
  10200: '百度',
};
export const CONFIG_CITY_PRICE_STATUS = {
  1: '待审核',
  2: '审核通过',
  3: '审核不通过',
  4: '终止',
};
export const CONFIG_CITY_PRICE_TYPE = {
  1: '快车',
};

//////////////////////////////////////////////-----加盟司机管理模块-----////////////////////////////////////
// 绑定状态
export const DRIVER_BIND_STATUS = {
  1: '已绑定',
  2: '未绑定',
};
// 账户状态 正常、冻结、封禁、永久封禁、异常
export const DRIVER_ACCOUNT_STATUS = {
  1: '正常',
  // 2: '冻结',
  3: '封禁',
  4: '永久封禁',
  5: '证件过期',
};
// 审核
export const DRIVER_AUDIT_STATUS = {
  0: {
    value: '待审查',
  },
  1: {
    value: '审核通过',
  },
  2: {
    value: '初审不通过',
  },
  3: {
    value: '非运营车辆',
  },
  // 4: {
  //   value: '完单',
  // },
};
// 认证状态
export const DRIVER_AUTHENTICATION_STATUS = {
  // 0: {
  //   value: '未认证',
  // },
  1: {
    value: '仅人证',
  },
  2: {
    value: '仅车证',
  },
  3: {
    value: '有双证',
  },
  4: {
    value: '无双证',
  },
};
// 渠道
export const DRIVER_CHANNEL_STATUS = {
  0: {
    value: '后台上传',
  },
  2: {
    value: '官方入口',
  },
  3: {
    value: '官方短信',
  },
  4: {
    value: '线下海报',
  },
  5: {
    value: '司机邀请-海报',
  },
  6: {
    value: '司机邀请-短信',
  },
  7: {
    value: '公司邀请',
  },
};
// 加入源
export const DRIVER_THE_SOURCE = {
  // 0: {
  //   value: '直营',
  // },
  1: {
    value: '个人加盟',
  },
  2: {
    value: '所属公司',
  },
};
// 司机性别
export const DRIVER_GENDER = {
  1: {
    value: '男',
  },
  2: {
    value: '女',
  },
};
// 驾照类型 A1、A2、A3、B1、B2、C1、C2
export const DRIVER_LICENSE_LEVEL = {
  A1: {
    text: 'A1',
  },
  A2: {
    text: 'A2',
  },
  A3: {
    text: 'A3',
  },
  B1: {
    text: 'B1',
  },
  B2: {
    text: 'B2',
  },
  C1: {
    text: 'C1',
  },
  C2: {
    text: 'C2',
  },
};
// 车辆能源类型 1-油,2-电,3-油电混合,4-油电混合插电式,5-油电混合非插电式, 6-其他
export const DRIVER_CAR_ENERGY = [
  {
    value: 1,
    label: '油',
  },
  {
    value: 2,
    label: '电',
  },
  {
    value: 3,
    label: '油电混合',
  },
  {
    value: 4,
    label: '油电混合插电式',
  },
  {
    value: 5,
    label: '油电混合非插电式',
  },
  {
    value: 0,
    label: '其他',
  },
];
// 车辆性质 1-本人车辆，2-租赁车辆
export const DRIVER_CAR_NATURE = {
  0: {
    value: '本人车辆',
  },
  1: {
    value: '租赁车辆',
  },
};
// 车辆颜色 1黑色、2银色、3灰色、4白色、5红色、6金色、7蓝色、8棕色、9紫色、10绿色、11粉色、12黄色、13橙色
export const DRIVER_CAR_COLOR = {
  黑色: {
    text: '黑色',
  },
  银色: {
    text: '银色',
  },
  灰色: {
    text: '灰色',
  },
  白色: {
    text: '白色',
  },
  红色: {
    text: '红色',
  },
  金色: {
    text: '金色',
  },
  蓝色: {
    text: '蓝色',
  },
  棕色: {
    text: '棕色',
  },
  紫色: {
    text: '紫色',
  },
  绿色: {
    text: '绿色',
  },
  粉色: {
    text: '粉色',
  },
  黄色: {
    text: '黄色',
  },
  橙色: {
    text: '橙色',
  },
};

// 司机招募配置
export const INVITER_ACTIVE_STATUS = {
  0: {
    value: '待审核',
  },
  1: {
    value: '审核通过',
  },
  2: {
    value: '审核不通过',
  },
  3: {
    value: '已终止',
  },
  4: {
    value: '已过期',
  },
};

////////////////////////////////////////////--------取消费配置--------/////////////////////////////
export const CONFIG_CANCEL_STATUS = {
  1: {
    value: '开启',
  },
  0: {
    value: '关闭',
  },
};

////////////////////////////////////////////--------订单中心--------/////////////////////////////
export const ORDER_CENTER_ADVANCE = {
  '-1': { value: '全部' },
  1: { value: '待审核' },
  2: { value: '已驳回' },
  3: { value: '已垫付' },
  4: { value: '乘客已支付' },
};
export const ORDER_CENTER_CHANNEL = {
  1: { value: '车马安卓端' },
  10100: { value: '美团' },
  102: { value: '车马IOS端' },
  // 20000: { value: '五快五小程序端' },
  10200: { value: '百度' },
  10300: { value: '腾讯' },
  10000: { value: '滴滴' },
  103: { value: '车马小程序端' },
  1001: { value: '车马' },
};
export const ORDER_CITYPRICE_CHANNEL = {
  10000: { value: '滴滴' },
  10100: { value: '美团乘客端' },
  10200: { value: '百度乘客端' },
  10300: { value: '腾讯乘客端' },
  1001: { value: '车马' },
  // 20000: { value: '五快五小程序端' },
};
////////////////////////////////////////////--------风控中心--------/////////////////////////////
export const RISK_CONTROL_CANCEL = {
  // 0: { value: '未判责' },
  1: { value: '有责' },
  2: { value: '无责' },
  // 20000: { value: '五快五小程序端' },
};
////////////////////////////////////////////--------财务中心--------/////////////////////////////
export const FINANCE_STATUS = {
  0: '待开票',
  1: '已开票',
  2: '待冲红',
  3: '已冲红',
};
