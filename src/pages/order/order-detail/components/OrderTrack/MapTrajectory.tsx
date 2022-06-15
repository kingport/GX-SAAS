import React, { useState, useEffect } from 'react';
import { Spin, Checkbox, Affix, Space } from 'antd';
import moment from 'moment';
import { Data, TrackData } from '../../data';
let map;
let d_marker;
let d_markers: any[] = [];

let p_marker;
let p_markers = [];

var mass;
var ruler;
var driving;
var pathSimplifierIns = null;

const styles: {} = {
  position: 'absolute',
  padding: 5,
  background: '#fff',
  top: 23.7,
  left: 25,
  zIndex: 10,
  borderRadius: 8,
};

export type MapTrajectoryProps = {
  orderTrackInfo: TrackData;
  orderInfo: Data;
};

export type RenderPoint = {
  lnglat: number[];
  name: string;
  time: string;
  style: number;
};

export type LocationLatLng = {
  lat: number | boolean;
  lng: number | boolean;
  time: string | boolean;
  title: string;
  icon: string;
  width: number;
  height: number;
};
declare let AMap: any;
const MapTrajectory: React.FC<MapTrajectoryProps> = (props) => {
  const { orderTrackInfo, orderInfo } = props;

  const [trackType, setTrackType] = useState(['driverTrack']);
  // 乘客起点经纬度
  const [pLatLng, setPLatLng] = useState<LocationLatLng[]>([]);
  // 司机起点经纬度
  const [dLatLng, setDLatLng] = useState<LocationLatLng[]>([]);

  useEffect(() => {
    d_markers = [];
    p_markers = [];
    if (orderInfo) {
      setPLatLng([
        {
          lat:
            (orderInfo?.order_detail['乘客发单'] && orderInfo?.order_detail['乘客发单'].new_lat) ||
            false,
          lng:
            (orderInfo.order_detail['乘客发单'] && orderInfo.order_detail['乘客发单'].new_lng) ||
            false,
          time:
            (orderInfo.order_detail['乘客发单'] && orderInfo.order_detail['乘客发单'].new_time) ||
            false,
          title: '乘客发单',
          icon: 'https://static.tonggangfw.net/saas/map/passengers@2x.png',
          width: 67,
          height: 100,
        },
        {
          lat: orderInfo.order_detail.starting_lat,
          lng: orderInfo.order_detail.starting_lng,
          time: '--',
          title: '乘客订单起点',
          icon: 'https://static.tonggangfw.net/saas/map/orderstartingpoint@2x.png',
          width: 67,
          height: 100,
        },
        {
          lat: orderInfo.order_detail.dest_lat,
          lng: orderInfo.order_detail.dest_lng,
          time: '--',
          title: '乘客订单终点',
          icon: 'https://static.tonggangfw.net/saas/map/orderthefinish@2x.png',
          width: 67,
          height: 100,
        },
      ]);
      setDLatLng([
        {
          lat:
            (orderInfo.order_detail['司机接单'] &&
              orderInfo.order_detail['司机接单'].assigned_lat) ||
            false,
          lng:
            (orderInfo.order_detail['司机接单'] &&
              orderInfo.order_detail['司机接单'].assigned_lng) ||
            false,
          time:
            (orderInfo.order_detail['司机接单'] &&
              orderInfo.order_detail['司机接单'].assigned_time) ||
            false,
          title: '司机接单',
          icon: 'https://static.tonggangfw.net/saas/map/driverorders@2x.png',
          width: 117,
          height: 61,
        },
        {
          lat:
            (orderInfo.order_detail['司机到达'] &&
              orderInfo.order_detail['司机到达'].prepared_lat) ||
            false,
          lng:
            (orderInfo.order_detail['司机到达'] &&
              orderInfo.order_detail['司机到达'].prepared_lng) ||
            false,
          time:
            (orderInfo.order_detail['司机到达'] &&
              orderInfo.order_detail['司机到达'].prepared_time) ||
            false,
          title: '司机到达',
          icon: 'https://static.tonggangfw.net/saas/map/driverarrived@2x.png',
          width: 117,
          height: 126,
        },
        {
          lat:
            (orderInfo.order_detail['服务开始'] && orderInfo.order_detail['服务开始'].begun_lat) ||
            false,
          lng:
            (orderInfo.order_detail['服务开始'] && orderInfo.order_detail['服务开始'].begun_lng) ||
            false,
          time:
            (orderInfo.order_detail['服务开始'] && orderInfo.order_detail['服务开始'].begun_time) ||
            false,
          title: '开始计费',
          icon: 'https://static.tonggangfw.net/saas/map/startbilling@2x.png',
          width: 117,
          height: 61,
        },
        {
          lat:
            (orderInfo.order_detail['服务结束'] &&
              orderInfo.order_detail['服务结束'].finished_lat) ||
            false,
          lng:
            (orderInfo.order_detail['服务结束'] &&
              orderInfo.order_detail['服务结束'].finished_lng) ||
            false,
          time:
            (orderInfo.order_detail['服务结束'] &&
              orderInfo.order_detail['服务结束'].finished_time) ||
            false,
          title: '司机结束计费',
          icon: 'https://static.tonggangfw.net/saas/map/endofthebilling@2x.png',
          width: 151,
          height: 61,
        },
      ]);
    }
  }, [orderInfo]);

  // init page
  useEffect(() => {
    if (dLatLng.length > 0 && pLatLng.length > 0 && orderTrackInfo) {
      initPage();
    }
  }, [pLatLng, dLatLng, orderTrackInfo]);

  /**
   * @description: 创建地图实例
   * @param {*}
   * @return {*}
   */
  const initPage = () => {
    map = new AMap.Map('container', {
      zoom: 12,
      // center: [120.334543 * 1, 30.112344 * 1], //默认中心(订单起点)
      center: [pLatLng[1].lng, pLatLng[1].lat], //默认中心(订单起点)
      resizeEnable: true,
    });
    var scale = new AMap.Scale({
      visible: true,
    });
    var toolBar = new AMap.ToolBar({
      visible: true,
      position: {
        top: '110px',
        right: '40px',
      },
    });
    map.addControl(scale);
    map.addControl(toolBar);
    console.log(map, 'LOP');
    // 存在司机点
    if (dLatLng[0].lat && dLatLng[0].lng) {
      setDriverMapPoint(map, dLatLng);
    }
    // 订单轨迹
    getOrderPoint(map);
  };

  /**
   * @description: 司机标记点位创建 开始计费点位 司机接单 司机达到 司机结束计费
   * @param {*}
   * @return {*}
   */
  const setDriverMapPoint = (map: any, dLatLng: LocationLatLng[]) => {
    dLatLng.map((item) => {
      if (item.lat && item.lng) {
        // 创建司机起点图标
        var dPosition = new AMap.LngLat(item.lng, item.lat);
        // 司机点标记显示内容，
        var startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(item.width, item.height),
          // 图标的取图地址
          image: item.icon,
          // 图标所用图片大小
          imageSize: new AMap.Size(item.width, item.height),
        });
        d_marker = new AMap.Marker({
          topWhenClick: true,
          // draggable: true,
          position: dPosition,
          // 将 html 传给 content
          icon: startIcon,
          // anchor: new AMap.Pixel(item.width / 2, item.height),
          // 以 icon 的 [center bottom] 为原点
          offset: new AMap.Pixel(-1 * (item.width / 2), -1 * item.height),
          // offset: new AMap.Pixel(0, 0),
        });
        d_marker.setTitle(`${item.title}: ${[item.lng, item.lat]} 时间:${item.time}`);
        d_markers.push(d_marker);
      }
    });
    map.add(d_markers);
  };

  /**
   * @description: 乘客标记点位创建 订单开始 订单结束位置 乘客发单位置
   * @param {*}
   * @return {*}
   */
  // const setPassengerMapPoint = (map, pLatLng) => {
  //   pLatLng.map((item, index) => {
  //     if (item.lat && item.lng) {
  //       // 创建乘客起点图标
  //       var pPosition = new AMap.LngLat(item.lng, item.lat);
  //       // 司机点标记显示内容，
  //       var startIcon = new AMap.Icon({
  //         // 图标尺寸
  //         size: new AMap.Size(item.width, item.height),
  //         // 图标的取图地址
  //         image: item.icon,
  //         // 图标所用图片大小
  //         imageSize: new AMap.Size(item.width, item.height),
  //       });
  //       p_marker = new AMap.Marker({
  //         topWhenClick: true,
  //         // draggable: true,
  //         position: pPosition,
  //         // 将 html 传给 content
  //         icon: startIcon,
  //         // 以 icon 的 [center bottom] 为原点
  //         // offset: new AMap.Pixel(-13, -30),
  //         // anchor: new AMap.Pixel(item.width / 2, item.height),
  //         // offset: new AMap.Pixel(0, 0),
  //         offset: new AMap.Pixel(-1 * (item.width / 2), -1 * item.height),
  //       });
  //       p_marker.setTitle(`${item.title}: ${[item.lng * 1, item.lat * 1]} 时间:${item.time}`);
  //       p_markers.push(p_marker);
  //     }
  //   });
  //   // 将 司机起点图标 添加到地图
  //   map.add(p_markers);
  // };

  /**
   * @description: 删除点位 乘客or司机
   * @param {*}
   * @return {*}
   */
  // const removeRolePoint = (type) => {
  //   if (type == 'driver') {
  //     // 删除点标记
  //     map.remove(d_markers);
  //     if (orderTrackInfo.trackPoints) {
  //       mass.hide();
  //     }
  //   }
  //   if (type == 'passenger') {
  //     // 删除点标记
  //     map.remove(p_markers);
  //   }
  //   if (type == 'direction') {
  //     if (pathSimplifierIns) {
  //       pathSimplifierIns.setData([]);
  //     }
  //   }
  // };

  /**
   * @description: 获取订单轨迹点位
   * @param {*}
   * @return {*}
   */
  const getOrderPoint = (map: any) => {
    const trackPoints = orderTrackInfo.track_points;
    let citys: RenderPoint[] = [];
    trackPoints.map((item) => {
      let obj: RenderPoint = {
        lnglat: [item['lng'], item['lat']],
        name: `${item['lng']},${item['lat']}`,
        time: moment.unix(item.timestamp).format('YYYY/MM/DD HH:mm:ss'),
        style: 0,
      };
      citys.push(obj);
    });
    var style = [
      {
        url: 'https://static.tonggangfw.net/saas/map/passengerslot@2x.png',
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 11),
      },
    ];
    console.log(citys, 'citys');
    mass = new AMap.MassMarks(citys, {
      opacity: 0.8,
      zIndex: 111,
      cursor: 'pointer',
      style: style,
    });
    var marker = new AMap.Marker({ content: ' ', map: map });
    mass.on('mouseover', function (e: any) {
      marker.setPosition(e.data.lnglat);
      marker.setLabel({ content: e.data.name + '时间:' + e.data.time });
    });
    mass.setMap(map);
  };

  /**
   * @description: 轨迹变换, 对应的左侧进度和右侧地图都需要刷新
   * @param {*}
   * @return {*}
   */
  // const onChangeTrack = (checkedValues) => {
  //   setTrackType(checkedValues);
  //   if (checkedValues.find((x) => x == 'driverTrack')) {
  //     if (dLatLng[0].lat && dLatLng[0].lng) {
  //       setDriverMapPoint(map, dLatLng);
  //     }
  //     if (orderTrackInfo.trackPoints) {
  //       mass.show();
  //     }
  //   } else {
  //     removeRolePoint('driver');
  //   }
  //   if (checkedValues.find((x) => x == 'passengerTrack')) {
  //     setPassengerMapPoint(map, pLatLng);
  //   } else {
  //     removeRolePoint('passenger');
  //   }
  //   if (checkedValues.find((x) => x == 'directionTrack')) {
  //     if (orderTrackInfo.trackPoints) {
  //       directionTrajectory();
  //     }
  //   } else {
  //     removeRolePoint('direction');
  //   }

  //   // 开启测距
  //   if (checkedValues.find((x) => x == 'rangingRuler')) {
  //     ruler = new AMap.RangingTool(map);
  //     ruler.turnOn();
  //   } else {
  //     if (ruler) {
  //       ruler.turnOff();
  //     }
  //   }

  //   // 开启高德规划
  //   if (checkedValues.find((x) => x == 'drivingGaode')) {
  //     gAmapDriving();
  //   } else {
  //     if (driving) {
  //       driving.clear();
  //     }
  //   }
  // };

  /**
   * @description: 方向轨迹渲染
   * @param {*}
   * @return {*}
   */
  // const directionTrajectory = () => {
  //   const trackPoints = orderTrackInfo.trackPoints;
  //   let pathArr = [];
  //   Object.keys(trackPoints).map((key) => {
  //     let path = [trackPoints[key]['loc:lng'], trackPoints[key]['loc:lat']];
  //     pathArr.push(path);
  //   });

  //   AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {
  //     if (!PathSimplifier.supportCanvas) {
  //       alert('当前环境不支持 Canvas！');
  //       return;
  //     }
  //     var colors = ['#3366cc'];
  //     pathSimplifierIns = new PathSimplifier({
  //       zIndex: 100,
  //       map: map, //所属的地图实例

  //       getPath: function (pathData) {
  //         return pathData.path;
  //       },
  //       getHoverTitle: function (pathData, pathIndex, pointIndex) {
  //         // console.log(pathData, pointIndex);
  //         if (pointIndex >= 0) {
  //           //point
  //           return `${pathData.name}，经纬度：${JSON.stringify(
  //             pathArr[pointIndex],
  //           )}，第${pointIndex}/${pathData.path.length}个点`;
  //         }

  //         return pathData.name + '，点数量' + pathData.path.length;
  //       },
  //       renderOptions: {
  //         pathLineStyle: {
  //           dirArrowStyle: true,
  //         },
  //         getPathStyle: function (pathItem, zoom) {
  //           var color = colors[pathItem.pathIndex % colors.length],
  //             lineWidth = 5;
  //           return {
  //             pathLineStyle: {
  //               strokeStyle: color,
  //               lineWidth: lineWidth,
  //             },
  //             pathLineSelectedStyle: {
  //               lineWidth: lineWidth + 2,
  //             },
  //             pathNavigatorStyle: {
  //               fillStyle: color,
  //             },
  //           };
  //         },
  //       },
  //     });

  //     var d = [
  //       {
  //         name: `${startingName}->${destName}`,
  //         path: pathArr,
  //       },
  //     ];

  //     pathSimplifierIns.setData(d);
  //   });
  // };

  /**
   * @description: 开启高德路线规划
   * @param {*}
   * @return {*}
   */
  // const gAmapDriving = () => {
  //   var drivingOption = {
  //     policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
  //     ferry: 1, // 是否可以使用轮渡
  //     province: '京', // 车牌省份的汉字缩写
  //     map: map,
  //     panel: 'panel',
  //   };
  //   // 构造路线导航类
  //   driving = new AMap.Driving(drivingOption);
  //   // 根据起终点经纬度规划驾车导航路线
  //   driving.search(
  //     new AMap.LngLat(pLatLng[1].lng, pLatLng[1].lat),
  //     new AMap.LngLat(pLatLng[2].lng, pLatLng[2].lat),
  //     function (status, result) {
  //       // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
  //       if (status === 'complete') {
  //         log.success('绘制驾车路线完成');
  //       } else {
  //         log.error('获取驾车数据失败：' + result);
  //       }
  //     },
  //   );
  // };

  return (
    <Spin spinning={false}>
      <Affix style={styles}>
        <Checkbox.Group
          // onChange={onChangeTrack}
          defaultValue={trackType}
        >
          <Space>
            <Checkbox className="checkbox-track" value="driverTrack">
              司机轨迹
            </Checkbox>
            <Checkbox className="checkbox-track" value="passengerTrack">
              乘客轨迹
            </Checkbox>
            <Checkbox className="checkbox-track" value="directionTrack">
              方向轨迹
            </Checkbox>
            <Checkbox className="checkbox-track" value="drivingGaode">
              对比高德驾车规划
            </Checkbox>
            <Checkbox className="checkbox-track" value="rangingRuler">
              开启测距(点击地图获取量测点，右键或双击左键结束测量)
            </Checkbox>
          </Space>
        </Checkbox.Group>
      </Affix>
      <div style={{ width: '100%', height: 800 }} id="container"></div>
      <div id="panel"></div>
    </Spin>
  );
};

export default React.memo(MapTrajectory);
