// 司机账单映射
export const DriverCharge = [
  {
    value: 'start_price',
    label: '起步价',
    isShow: false,
  },
  {
    value: 'normal_fee',
    label: '里程费',
    isShow: false,
  },

  {
    value: 'limit_fee',
    label: '最低消费',
    isShow: false,
  },
  {
    value: 'limit_pay',
    label: '补足最低消费金额',
    isShow: false,
  },
  {
    value: 'net_income',
    label: '司机收入',
    isShow: false,
  },
  {
    value: 'd_start_price',
    label: '起步价',
    isShow: true,
  },
  {
    value: 'd_normal_time_fee',
    label: '时长费',
    isShow: true,
  },
  {
    value: 'd_normal_fee',
    label: '里程费',
    isShow: true,
  },
  {
    value: 'd_empty_fee',
    label: '远程费',
    isShow: true,
  },
  {
    value: 'd_highway_fee',
    label: '高速费',
    isShow: true,
  },
  {
    value: 'd_bridge_fee',
    label: '路桥费',
    isShow: true,
  },
  {
    value: 'd_park_fee',
    label: '停车费',
    isShow: true,
  },
  {
    value: 'd_other_fee',
    label: '其他费',
    isShow: true,
  },
  {
    value: 'd_normal_distance',
    label: '里程',
    isShow: true,
  },
  {
    value: 'd_normal_time',
    label: '时长',
    isShow: true,
  },
  {
    value: 'd_empty_distance',
    label: '远程里程',
    isShow: true,
  },
  {
    value: 'info_fee',
    label: '信息服务费',
    isShow: true,
  },
  {
    value: 'rewards_fee',
    label: '奖励费',
    isShow: true,
  },
  {
    value: 'cancel_fee',
    label: '取消费',
    isShow: true,
  },
  {
    value: 'total_fee',
    label: '总费用',
    isShow: true,
  },
];

// 乘客账单映射
export const PassengerCharge = [
  {
    value: 'start_price',
    label: '起步价',
    isShow: false,
  },
  {
    value: 'normal_fee',
    label: '里程费',
    isShow: false,
  },

  {
    value: 'limit_fee',
    label: '最低消费',
    isShow: false,
  },
  {
    value: 'limit_pay',
    label: '补足最低消费金额',
    isShow: false,
  },
  {
    value: 'pre_total_fee',
    label: '预估费用',
    isShow: true,
  },
  {
    value: 'channel_name',
    label: '渠道名称',
    isShow: false,
  },
  {
    value: 'pre_cost',
    label: '预付费',
    isShow: true,
  },
  {
    value: 'pre_pay_time',
    label: '预付时间',
    isShow: true,
  },
  {
    value: 'pre_pay_status',
    label: '预付状态',
    isShow: true,
  },
  {
    value: 'p_start_price',
    label: '起步价',
    isShow: true,
  },
  {
    value: 'p_normal_time_fee',
    label: '时长费',
    isShow: true,
  },
  {
    value: 'p_normal_fee',
    label: '里程费',
    isShow: true,
  },
  {
    value: 'p_empty_fee',
    label: '远程费',
    isShow: true,
  },
  {
    value: 'p_highway_fee',
    label: '高速费',
    isShow: true,
  },
  {
    value: 'p_bridge_fee',
    label: '路桥费',
    isShow: true,
  },
  {
    value: 'p_park_fee',
    label: '停车费',
    isShow: true,
  },
  {
    value: 'p_other_fee',
    label: '其他费用',
    isShow: true,
  },
  {
    value: 'p_normal_distance',
    label: '里程/公里',
    isShow: true,
  },
  {
    value: 'p_normal_time',
    label: '时长/分钟',
    isShow: true,
  },
  {
    value: 'p_empty_distance',
    label: '远程里程/公里',
    isShow: true,
  },
  {
    value: 'p_coupon_fee',
    label: '优惠券金额',
    isShow: true,
  },
  {
    value: 'p_cancel_fee',
    label: '取消费',
    isShow: true,
  },
  {
    value: 'refund_fee',
    label: '退款费用',
    isShow: true,
  },
  {
    value: 'total_fee',
    label: '总费用',
    isShow: true,
  },
  {
    value: 'd_normal_fee',
    label: '是否支付',
    isShow: true,
  },
  {
    value: 'pay_time',
    label: '支付时间',
    isShow: true,
  },
  {
    value: 'invoice',
    label: '是否开票',
    isShow: true,
  },
];

// 改价模块乘客映射
export const PassengerChangePrice = [
  {
    label: '基础费',
    value: 'p_start_price',
    disabled: false,
  },
  {
    label: '里程费',
    value: 'p_normal_fee',
    disabled: true,
  },
  {
    label: '时长费',
    value: 'p_normal_time_fee',
    disabled: true,
  },
  {
    label: '远途费',
    value: 'p_empty_fee',
    disabled: true,
  },
  {
    label: '高速费',
    value: 'p_highway_fee',
    disabled: false,
  },
  {
    label: '路桥费',
    value: 'p_bridge_fee',
    disabled: false,
  },
  {
    label: '停车费',
    value: 'p_park_fee',
    disabled: false,
  },
  {
    label: '优惠券',
    value: 'p_coupon_fee',
    disabled: true,
  },
  {
    label: '其他费',
    value: 'p_other_fee',
    disabled: false,
  },
  {
    label: '取消费',
    value: 'p_cancel_fee',
    disabled: true,
  },
];

// 改价模块司机映射
export const DriverChangePrice = [
  {
    label: '基础费',
    value: 'd_start_price',
    disabled: false,
  },
  {
    label: '里程费',
    value: 'd_normal_fee',
    disabled: true,
  },
  {
    label: '时长费',
    value: 'd_normal_time_fee',
    disabled: true,
  },
  {
    label: '远途费',
    value: 'd_empty_fee',
    disabled: true,
  },
  {
    label: '高速费',
    value: 'd_highway_fee',
    disabled: false,
  },
  {
    label: '路桥费',
    value: 'd_bridge_fee',
    disabled: false,
  },
  {
    label: '停车费',
    value: 'd_park_fee',
    disabled: false,
  },
  {
    label: '服务费',
    value: 'info_fee',
    disabled: true,
  },
  {
    label: '其他费',
    value: 'd_other_fee',
    disabled: false,
  },
  {
    label: '取消费',
    value: 'cancel_fee',
    disabled: true,
  },
];
