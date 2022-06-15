import { Data } from '../data';

export const orderStep = (orderInfo: Data, billDetail: any) => {
  const { order_detail } = orderInfo;
  const { pre_map_type, begun_map_type, passenger_phone } = orderInfo;
  const { starting_name, dest_name } = order_detail;
  console.log(billDetail, 'billDetail');
  const stepData: any = [];
  const dataName = [
    '乘客发单',
    '司机接单',
    '司机到达',
    '乘客抢单后取消',
    '服务开始',
    '服务结束',
    '客服关单',
  ];
  // const keyName = Object.keys(order_detail);
  dataName.map((item) => {
    if (order_detail[item]) {
      const itemData = order_detail[item];
      console.log(itemData, 'itemData');
      // 乘客发单
      if (item === '乘客发单') {
        stepData.push({
          title: item,
          time: itemData.new_time || '',
          params: [
            {
              key: '发单时间',
              value: `${itemData.new_time}`,
            },
            {
              key: '地点',
              value: `${starting_name}`,
            },
            {
              key: '乘客手机号',
              value: `${passenger_phone}`,
            },
            {
              key: '起始点',
              value: `${starting_name}`,
            },
            {
              key: '目的地',
              value: `${dest_name}`,
            },
            {
              key: '用车时间',
              value: `${itemData.new_time}`,
            },
            {
              key: '预估里程',
              value: `${itemData.start_dest_distance}km`,
            },
            {
              key: '预估时长',
              value: `${billDetail && billDetail.order_detail.estimate_time}分钟`,
            },
            {
              key: '预估费用',
              value: `${itemData.pre_total_fee}元`,
            },

            {
              key: '预估地图',
              value: `${pre_map_type === 1 ? '滴滴地图' : '高德地图'}`,
            },
          ],
        });
      }
      // 乘客发单后取消
      // if (item === '乘客发单' && ['6'].indexOf(orderData.order_status) > -1) {
      //   stepData.push({
      //     title: orderData.order_status_name,
      //     params: [
      //       {
      //         key: '取消时间',
      //         value: orderData.order_detail.cancelled_time,
      //       },
      //     ],
      //   });
      // }
      // 司机接单
      if (item === '司机接单') {
        stepData.push({
          title: item,
          time: itemData.assigned_time,
          params: [
            {
              key: '接单时间',
              value: itemData.assigned_time,
            },
            {
              key: '车牌号',
              value: itemData.plate_no,
            },
            {
              key: '车辆品牌名称',
              value: itemData.brand_name,
            },
            {
              key: '司机姓名',
              value: itemData.driver_name,
            },
            {
              key: '联系电话',
              value: itemData.driver_phone,
            },
          ],
        });
        // 司机接单后司机取消
        // if (
        //   item === '司机接单' &&
        //   ['12'].indexOf(orderData.order_status) > -1 &&
        //   keyName.indexOf('司机到达') == -1
        // ) {
        //   stepData.push({
        //     title: orderData.order_status_name,
        //     params: [
        //       {
        //         key: '取消时间',
        //         value: orderData.order_detail.cancelled_time,
        //       },
        //     ],
        //   });
        // }
        // 司机接单后乘客取消
        // if (
        //   item === '司机接单' &&
        //   ['7'].indexOf(orderData.order_status) > -1 &&
        //   keyName.indexOf('司机到达') == -1
        // ) {
        //   stepData.push({
        //     title: orderData.order_status_name || '--',
        //     params: [
        //       {
        //         key: '取消时间',
        //         value: orderData.order_detail.cancelled_time,
        //       },
        //     ],
        //   });
        // }
      }

      // 司机到达后 乘客司机 均可取消
      if (item === '司机到达') {
        stepData.push({
          title: item,
          time: itemData.prepared_time,
          params: [
            {
              key: '司机到达时间',
              value: itemData.prepared_time,
            },
          ],
        });
        // 司机到达后司机取消
        // if (item === '司机到达' && ['12'].indexOf(orderData.order_status) > -1) {
        //   stepData.push({
        //     title: orderData.order_status_name,
        //     params: [
        //       {
        //         key: '取消时间',
        //         value: orderData.order_detail.cancelled_time,
        //       },
        //     ],
        //   });
        // }
        // 司机到达后乘客取消
        // if (item === '司机到达' && ['7'].indexOf(orderData.order_status) > -1) {
        //   stepData.push({
        //     title: orderData.order_status_name || '--',
        //     params: [
        //       {
        //         key: '取消时间',
        //         value: orderData.order_detail.cancelled_time,
        //       },
        //     ],
        //   });
        // }
      }

      // 服务开始
      if (item === '服务开始') {
        stepData.push({
          title: item,
          time: itemData.begun_time,
          params: [
            {
              key: '开始计费时间',
              value: itemData.begun_time,
            },
            {
              key: '联系电话',
              value: itemData.driver_phone,
            },
          ],
        });
      }
      // 服务结束
      if (item === '服务结束') {
        stepData.push({
          title: item,
          time: itemData.finished_time,
          params: [
            {
              key: '结束计费时间',
              value: `${itemData.finished_time}`,
            },
            {
              key: '订单时长',
              value: `${itemData.normal_time || 0}分钟`,
            },
            {
              key: '行驶里程',
              value: `${itemData.distance || 0.0}公里`,
            },
            {
              key: '支付状态',
              value: `${itemData.is_pay === 1 ? '已支付' : '未支付'}`,
            },
            {
              key: '账单费用',
              value: `${itemData.total_fee * 1 || 0.0}元`,
            },
          ],
        });
      }
      // 客服关单
      if (item === '客服关单') {
        stepData.push({
          title: item,
          time: '',
          params: [
            {
              key: '关单时间',
              value: itemData.cancelled_time,
            },
          ],
        });
      }
    }
    return item;
  });
  return stepData;
};
