# 接口文档

| 版本 | 时间       | 起草人 | 审核人 | 更新内容                                                     |
| ---- | ---------- | ------ | ------ | ------------------------------------------------------------ |
| 1.0  | 2021/09/16 | 吴镇文 | 吴镇文 | 创建文档<br /><br />出行平台接口：<br />1、用户模块<br />2、司机账户模块<br />3、开城计划模块<br />4、司机模块<br />5、车辆模块<br />6、发票<br />7、订单<br />8、计价配置<br />9、疫情打卡<br />10、提现<br />11、日志操作<br />12、系统设置<br />13、垫付 |
| 1.1  | 2021/10/08 | 吴镇文 | 吴镇文 | 1、司机列表增加返回手机号 4.1<br />2、获取平台开城列表 8.8<br />3、新增获取全局信息接口 1.5 |
| 1.2  | 2021/10/18 | 吴镇文 | 吴镇文 | 1、用户列表，增加返回角色名称字段 1.2<br />2、获取用户全局信息，增加返回角色名称，权限列表 1.5<br />3、新增 平台角色列表接口 1.6<br />4、新增 添加平台角色接口 1.7<br />5、新增 查看平台角色接口 1.8<br />6、新增 设置平台角色权限接口 1.9<br />7、新增 设置用户角色接口 1.10 |
| 1.3  | 2021/10/19 | shelon | shelon | 1、上传文件接口 14.1<br />2、显示图片接口 14.2<br />3、司机编辑接口 4.8 |
| 1.4  | 2021/10/21 | 吴镇文 | 吴镇文 | 1、新增 平台渠道商列表接口 15.1<br />2、新增 添加平台渠道商接口 15.2<br />3、新增 编辑平台渠道商接口 15.3<br />4、新增 设置平台渠道商状态接口 15.4<br />5、新增 设置平台渠道商合作状态接口 15.5<br />6、新增 获取平台渠道商详情接口 15.6 |
| 1.5  | 2021/10/23 | 吴镇文 | 吴镇文 | 1、新增 编辑用户接口 1.11<br />2、新增 获取用户接口 1.12<br />3、修改订单列表接口参数，调整driver_phone参数 7.1<br />4、修改getUserGlobalInfo接口，增加返回channel_list(平台渠道商列表) 1.5 |
| 1.6  | 2021/10/26 | 吴镇文 | 吴镇文 | 1、新增 添加消息推送 接口 16.1<br />2、新增 编辑消息推送 接口 16.2<br />3、新增 查看消息推送 接口 16.3<br />4、新增 审核消息推送 接口 16.4<br />5、新增 终止消息推送 接口 16.5<br />6、新增 消息推送列表 接口 16.6<br />用户属性增加姓名<br />1、用户登录接口 1.1<br />2、用户列表接口 1.2<br />3、添加用户接口 1.3<br />4、获取用户全局属性接口 1.5<br />5、编辑用户接口 1.11<br />6、获取用户信息接口 1.12 |
| 1.7  | 2021/10/28 | 吴镇文 | 吴镇文 | 1、新增 变更司机归属渠道商接口 4.9                           |
| 1.8  | 2021/10/28 | shelon | shelon | 1、修改 添加开城计划接口 3.2                                 |
| 1.9  | 2021/11/01 | shelon | shelon | 1、添加 获取平台用户登陆验证码接口 1.13                      |
| 1.10 | 2021/11/08 | 吴镇文 | 吴镇文 | 1、新增 用户退出登录接口 1.14                                |



## Saas

```
saas管理平台接口
```

### 公共Header参数

| 参数名 | 类型   | 是否必填 | 描述                             |
| ------ | ------ | -------- | -------------------------------- |
| Sign   | string | 是       | 签名串，注意参数名是大写开头Sign |

### 公共参数

除登录接口不需要传公共参数，其他接口都必传，token会话时长为10分钟，请求过程中会延长时间，直到会话时间限定时长内，没有接口交互，则token即过期。

| 参数名  | 类型   | 是否必填 | 描述                |
| ------- | ------ | -------- | ------------------- |
| user_id | long   | 是       | 当前登录的用户id    |
| token   | string | 是       | 当前登录的用户token |

### 公共响应头

| 参数名  | 类型   | 是否必填 | 描述                         |
| ------- | ------ | -------- | ---------------------------- |
| code    | int    | 是       | 错误码，0（成功）非0（失败） |
| message | string | 是       | 非0时，对应的错误描述        |



## Platform

```
出行平台接口
```

### 公共Header参数

| 参数名 | 类型   | 是否必填 | 描述                             |
| ------ | ------ | -------- | -------------------------------- |
| Sign   | string | 是       | 签名串，注意参数名是大写开头Sign |

### 公共参数

| 参数名  | 类型   | 是否必填 | 描述                |
| ------- | ------ | -------- | ------------------- |
| user_id | long   | 是       | 当前登录的用户id    |
| token   | string | 是       | 当前登录的用户token |

### 1 user 用户

```
用户模块
```
#### 1.1 platformLogin

```
用户登录，注：用户登录接口，不需要传公共参数
```

##### Url
```
/api/v1/platform/user/platformLogin
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名    | 类型   | 是否必填 | 描述   |
| --------- | ------ | -------- | ------ |
| user_name | string | 是       | 用户名 |
| phone     | string | 否       | 手机号 |
| code      | string | 否       | 验证码 |
示例:
```json
{
    "user_name":"ddcx_admin",
    "phone":"18963374856",
    "code":"888888"
}
```

##### Response

| 参数名      | 类型   | 是否必填 | 描述          |
| ----------- | ------ | -------- | ------------- |
| platform_id | int    | 是       | 出行平台id    |
| token       | string | 是       | 用户登录token |
| user_id     | int    | 是       | 出行平台id    |
| user_name   | long   | 是       | 用户名        |
| email       | string | 是       | 邮箱          |
| phone       | string | 是       | 手机号        |
| real_name | string | 是 | 姓名 |
|示例:||||
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "platform_id": 1101,
        "token": "tABddAvLc7p7Cb0QvKdd-vyKXOG5A8DiKXkWfSLJCb00ykEOwiAQRuG7_GsWjBUELkNIOxpi2zHTYWW8u1Hj7n3Je-KxNruKbrUvKESeHMbB-mUKKefpHHJwOGTozCgnB5X1FyZ33mu7MQr9tQxt1mVHid47zMrNuFrfPlOcKIULpfh6BwAA__8=",
        "user_id": 8589934595,
        "user_name": "ddcx_admin",
        "email": "zhangerpao@duduchuxing.com",
        "phone": "18963374856",
        "real_name": "张三"
    }
}
```

#### 1.2 platformUserList

```
用户列表
```

##### Url
```
/api/v1/platform/user/platformUserList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                         |
| ----------- | ------ | -------- | ---------------------------- |
| platform_id | int    | 是       | 出行平台id                   |
| name        | string | 否       | 用户名                       |
| phone       | string | 否       | 手机号                       |
| email       | string | 否       | 邮箱                         |
| status      | int    | 否       | 用户状态 0全部; 1正常; 2禁用 |
| page_no     | int    | 是       | 页码，从1开始                |
| page_size   | int    | 是       | 每页记录数                   |
示例:
```json
{
    "platform_id":1101,
    "name":"",
    "phone":"",
    "email":"",
    "status":0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                | 类型   | 是否必填 | 描述                     |
| --------------------- | ------ | -------- | ------------------------ |
| total_count           | int    | 是       | 总记录数，用于前端分页   |
| user_list             | array  | 是       | 用户列表                 |
| user_list.platform_id | int    | 是       | 出行平台id               |
| user_list.user_id     | long   | 是       | 用户id                   |
| user_list.name        | string | 是       | 司机姓名                 |
| user_list.phone       | string | 是       | 手机号                   |
| user_list.email       | string | 是       | 邮箱                     |
| user_list.real_name | string | 是 | 姓名 |
| user_list.status      | int    | 是       | 用户状态  1:正常; 2:禁用 |
| user_list.role_name | string | 是 | 角色名称 |
| user_list.create_time | string | 是       | 创建时间                 |
| page_index            | int    | 是       | 当前页码                 |
|示例:||||
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "user_list": [
            {
                "platform_id": 1101,
                "user_id": 8589934595,
                "name": "ddcx_admin",
                "phone": "18963374856",
                "email": "zhangerpao@duduchuxing.com",
                "real_name": "张二炮",
                "status": 1,
                "role_name": "超级管理员",
                "create_time": "2021-09-15 14:19:27"
            }
        ],
        "page_index": 1
    }
}
```
#### 1.3 addPlatformUser

```
添加平台账户
```

##### Url
```
/api/v1/platform/user/addPlatformUser
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述       |
| ----------- | ------ | -------- | ---------- |
| platform_id | int    | 是       | 出行平台id |
| name        | string | 是       | 用户名     |
| phone       | string | 否       | 手机号     |
| email       | string | 否       | 邮箱       |
| real_name | string | 是 | 姓名 |
|示例:||||
```json
{
	"platform_id":1101,
    "name":"ddcx_user",
    "phone":"13374858966",
    "email":"abcde@duduchuxing.com",
    "real_name": "张三",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 1.4 setPlatformUserStatus

```
设置平台账户状态
```

##### Url

```
/api/v1/platform/user/setPlatformUserStatus
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述           |
| ----------- | ---- | -------- | -------------- |
| platform_id | int  | 是       | 出行平台id     |
| uid         | long | 是       | 要修改的用户id |
| status      | int  | 是       | 1:可用；2:禁用 |

示例:

```json
{
	"platform_id":1101,
    "uid":665343356,
    "status":2,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 1.5 getUserGlobalInfo

```
获取用户全局信息
```

##### Url

```
/api/v1/platform/user/getUserGlobalInfo
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述           |
| ----------- | ---- | -------- | -------------- |
| platform_id | int  | 是       | 出行平台id     |
| user_id     | long | 是       | 用户id         |
| status      | int  | 是       | 1:可用；2:禁用 |

示例:

```json
{
	"platform_id":1101,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
	"code": 0,
	"message": "Success",
	"data": {
		"user_info": {
			"platform_id": 1101,
			"platform_name": "长沙嘟嘟出行科技有限公司",
			"user_id": 8589934595,
			"user_name": "ddcx_admin",
			"phone": "18963374856",
			"email": "zhangerpao@duduchuxing.com",
			"real_name": "张三",
			"role_name": "超级管理员",
			"permission": [
                {
                    "permission_id": 100,
                    "permission_name": "运力中心",
                    "parent_id": 0,
                    "icon": "",
                    "sort_id": 10100,
                    "type": 1
                },
                {
                    "permission_id": 100001,
                    "permission_name": "加盟司机管理",
                    "parent_id": 100,
                    "icon": "",
                    "sort_id": 10101,
                    "type": 1
                },
                {
                    "permission_id": 100001001,
                    "permission_name": "司机列表",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10102,
                    "type": 2
                },
                {
                    "permission_id": 100001002,
                    "permission_name": "新增司机",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10103,
                    "type": 2
                },
                {
                    "permission_id": 100001003,
                    "permission_name": "编辑司机",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10104,
                    "type": 2
                },
                {
                    "permission_id": 100001004,
                    "permission_name": "审核司机",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10105,
                    "type": 2
                },
                {
                    "permission_id": 100001005,
                    "permission_name": "封禁司机",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10106,
                    "type": 2
                },
                {
                    "permission_id": 100001006,
                    "permission_name": "证件信息",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10107,
                    "type": 2
                },
                {
                    "permission_id": 100001007,
                    "permission_name": "编辑证件",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10108,
                    "type": 2
                },
                {
                    "permission_id": 100001008,
                    "permission_name": "导出司机",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10109,
                    "type": 2
                },
                {
                    "permission_id": 100001009,
                    "permission_name": "操作日志",
                    "parent_id": 100001,
                    "icon": "",
                    "sort_id": 10110,
                    "type": 2
                },
                {
                    "permission_id": 100002,
                    "permission_name": "车辆管理",
                    "parent_id": 100,
                    "icon": "",
                    "sort_id": 10200,
                    "type": 1
                },
                {
                    "permission_id": 100002001,
                    "permission_name": "车辆列表",
                    "parent_id": 100002,
                    "icon": "",
                    "sort_id": 10201,
                    "type": 2
                },
                {
                    "permission_id": 100002002,
                    "permission_name": "新增车辆",
                    "parent_id": 100002,
                    "icon": "",
                    "sort_id": 10202,
                    "type": 2
                },
                {
                    "permission_id": 100002003,
                    "permission_name": "审核车辆",
                    "parent_id": 100002,
                    "icon": "",
                    "sort_id": 10203,
                    "type": 2
                },
                {
                    "permission_id": 100002004,
                    "permission_name": "操作日志",
                    "parent_id": 100002,
                    "icon": "",
                    "sort_id": 10204,
                    "type": 2
                },
                {
                    "permission_id": 100003,
                    "permission_name": "疫情打卡",
                    "parent_id": 100,
                    "icon": "",
                    "sort_id": 10300,
                    "type": 1
                },
                {
                    "permission_id": 100003001,
                    "permission_name": "打卡列表",
                    "parent_id": 100003,
                    "icon": "",
                    "sort_id": 10301,
                    "type": 2
                },
                {
                    "permission_id": 100003002,
                    "permission_name": "查看健康码",
                    "parent_id": 100003,
                    "icon": "",
                    "sort_id": 10302,
                    "type": 2
                },
                {
                    "permission_id": 100003003,
                    "permission_name": "查看口罩图",
                    "parent_id": 100003,
                    "icon": "",
                    "sort_id": 10303,
                    "type": 2
                },
                {
                    "permission_id": 100003004,
                    "permission_name": "疫情承诺书",
                    "parent_id": 100003,
                    "icon": "",
                    "sort_id": 10304,
                    "type": 2
                },
                {
                    "permission_id": 200,
                    "permission_name": "订单中心",
                    "parent_id": 0,
                    "icon": "",
                    "sort_id": 10400,
                    "type": 1
                },
                {
                    "permission_id": 200001,
                    "permission_name": "订单查询",
                    "parent_id": 200,
                    "icon": "",
                    "sort_id": 20101,
                    "type": 2
                },
                {
                    "permission_id": 200001001,
                    "permission_name": "关闭订单",
                    "parent_id": 200001,
                    "icon": "",
                    "sort_id": 20202,
                    "type": 2
                },
                {
                    "permission_id": 200001002,
                    "permission_name": "免单",
                    "parent_id": 200001,
                    "icon": "",
                    "sort_id": 20203,
                    "type": 2
                },
                {
                    "permission_id": 200001003,
                    "permission_name": "改价",
                    "parent_id": 200001,
                    "icon": "",
                    "sort_id": 20204,
                    "type": 2
                },
                {
                    "permission_id": 200001004,
                    "permission_name": "退款",
                    "parent_id": 200001,
                    "icon": "",
                    "sort_id": 20205,
                    "type": 2
                },
                {
                    "permission_id": 200002005,
                    "permission_name": "操作日志",
                    "parent_id": 200002,
                    "icon": "",
                    "sort_id": 20206,
                    "type": 2
                },
                {
                    "permission_id": 200002,
                    "permission_name": "订单垫付",
                    "parent_id": 200001,
                    "icon": "",
                    "sort_id": 20301,
                    "type": 1
                },
                {
                    "permission_id": 200002001,
                    "permission_name": "垫付列表",
                    "parent_id": 200002,
                    "icon": "",
                    "sort_id": 20302,
                    "type": 2
                },
                {
                    "permission_id": 200002002,
                    "permission_name": "垫付",
                    "parent_id": 200002,
                    "icon": "",
                    "sort_id": 20303,
                    "type": 2
                },
                {
                    "permission_id": 200002003,
                    "permission_name": "驳回",
                    "parent_id": 200002,
                    "icon": "",
                    "sort_id": 20304,
                    "type": 2
                },
                {
                    "permission_id": 200002004,
                    "permission_name": "备注",
                    "parent_id": 200002,
                    "icon": "",
                    "sort_id": 20305,
                    "type": 2
                }
            ]
		},
		"area_list": [{
				"city_code": 440100,
				"city_name": "广州市",
				"district": "020",
				"county_list": [{
						"county_code": 440103,
						"county_name": "荔湾区"
					},
					{
						"county_code": 440104,
						"county_name": "越秀区"
					},
					{
						"county_code": 440105,
						"county_name": "海珠区"
					},
					{
						"county_code": 440106,
						"county_name": "天河区"
					},
					{
						"county_code": 440111,
						"county_name": "白云区"
					},
					{
						"county_code": 440112,
						"county_name": "黄埔区"
					},
					{
						"county_code": 440113,
						"county_name": "番禺区"
					},
					{
						"county_code": 440114,
						"county_name": "花都区"
					},
					{
						"county_code": 440115,
						"county_name": "南沙区"
					},
					{
						"county_code": 440117,
						"county_name": "从化区"
					},
					{
						"county_code": 440118,
						"county_name": "增城区"
					}
				]
			},
			{
				"city_code": 440300,
				"city_name": "深圳市",
				"district": "0755",
				"county_list": [{
						"county_code": 440303,
						"county_name": "罗湖区"
					},
					{
						"county_code": 440304,
						"county_name": "福田区"
					},
					{
						"county_code": 440305,
						"county_name": "南山区"
					},
					{
						"county_code": 440306,
						"county_name": "宝安区"
					},
					{
						"county_code": 440307,
						"county_name": "龙岗区"
					},
					{
						"county_code": 440308,
						"county_name": "盐田区"
					},
					{
						"county_code": 440309,
						"county_name": "龙华区"
					},
					{
						"county_code": 440310,
						"county_name": "坪山区"
					},
					{
						"county_code": 440311,
						"county_name": "光明区"
					}
				]
			}
		],
		"brand_list": [{
				"brand_name": "梅尔库斯",
				"brand_id": 11110
			},
			{
				"brand_name": "众泰",
				"brand_id": 111100
			}
		],
		"series_list": {
			"11110": [{
				"series_name": "梅尔库斯[进口]",
				"series_id": 1112086,
				"brand_id": 11110
			}],
			"111100": [{
					"series_name": "V10",
					"series_id": 1112800,
					"brand_id": 111100
				},
				{
					"series_name": "Z300",
					"series_id": 1112534,
					"brand_id": 111100
				},
				{
					"series_name": "梦迪博朗",
					"series_id": 111619,
					"brand_id": 111100
				}
			]
		}
	}
}
```

#### 1.6 platformRoleList

```
平台角色列表
```

##### Url

```
/api/v1/platform/user/platformRoleList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                         |
| ----------- | ------ | -------- | ---------------------------- |
| platform_id | int    | 是       | 出行平台id                   |
| role_name   | string | 否       | 角色名称                     |
| status      | int    | 否       | 用户状态 0全部; 1正常; 2禁用 |
| page_no     | int    | 是       | 页码，从1开始                |
| page_size   | int    | 是       | 每页记录数                   |
| 示例:       |        |          |                              |

```json
{
    "platform_id":1101,
    "role_name":"",
    "status":0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                | 类型   | 是否必填 | 描述                     |
| --------------------- | ------ | -------- | ------------------------ |
| total_count           | int    | 是       | 总记录数，用于前端分页   |
| role_list             | array  | 是       | 用户列表                 |
| role_list.id          | long   | 是       | 角色id                   |
| user_list.role_name   | string | 是       | 角色名称                 |
| user_list.description | string | 是       | 角色描述                 |
| user_list.status      | int    | 是       | 用户状态  1:正常; 2:禁用 |
| user_list.create_time | string | 是       | 创建时间                 |
| page_index            | int    | 是       | 当前页码                 |
| 示例:                 |        |          |                          |

```json
{
	"code": 0,
	"message": "Success",
	"data": {
		"total_count": 1,
		"role_list": [{
			"id": 1,
			"role_name": "系统管理员",
			"description": "系统管理员",
			"status": 1,
			"create_time": "2021-10-18 13:00:00"
		}],
		"page_index": 1
	}
}
```

#### 1.7 addPlatformRole

```
添加平台角色
```

##### Url

```
/api/v1/platform/user/addPlatformRole
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述       |
| ----------- | ------ | -------- | ---------- |
| platform_id | int    | 是       | 出行平台id |
| role_name   | string | 是       | 角色名称   |
| description | string | 否       | 角色描述   |
| 示例:       |        |          |            |

```json
{
	"platform_id":1101,
    "role_name":"客服人员",
    "description":"客服团队成员，处理乘客,司机进线问题",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
| 示例:  |      |          |      |

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 1.8 getPlatformRole

```
获取平台角色
```

##### Url

```
/api/v1/platform/user/getPlatformRole
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | long | 是       | 角色id     |
| 示例:       |      |          |            |

```json
{
	"platform_id":1101,
    "id":1,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                          | 类型          | 是否必填 | 描述                        |
| ------------------------------- | ------------- | -------- | --------------------------- |
| data                            | object        | 是       | 角色信息                    |
| data.id                         | long          | 是       | 角色id                      |
| data.role_name                  | string        | 是       | 角色名称                    |
| data.description                | string        | 是       | 角色描述                    |
| data.status                     | int           | 是       | 角色状态 1（正常）2（禁用） |
| data.permission                 | array(object) | 是       | 角色权限                    |
| data.permission.permission_id   | long          | 是       | 权限id                      |
| data.permission.permission_name | string        | 是       | 权限名称                    |
| data.permission.parent_id       | long          | 是       | 父级权限id，1级权限父级为0  |
| data.permission.icon            | string        | 是       | icon路径                    |
| data.permission.sort_id         | int           | 是       | 排序号                      |
| data.permission.type            | int           | 是       | 1：页面；2：功能            |

示例：

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "id": 1,
        "role_name": "系统管理员",
        "description": "系统管理员",
        "status": 1,
        "permission": [
            {
                "permission_id": 100,
                "permission_name": "运力中心",
                "parent_id": 0,
                "icon": "",
                "sort_id": 10100,
                "type": 1
            },
            {
                "permission_id": 100001,
                "permission_name": "加盟司机管理",
                "parent_id": 100,
                "icon": "",
                "sort_id": 10101,
                "type": 1
            },
            {
                "permission_id": 100001001,
                "permission_name": "司机列表",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10102,
                "type": 2
            },
            {
                "permission_id": 100001002,
                "permission_name": "新增司机",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10103,
                "type": 2
            },
            {
                "permission_id": 100001003,
                "permission_name": "编辑司机",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10104,
                "type": 2
            },
            {
                "permission_id": 100001004,
                "permission_name": "审核司机",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10105,
                "type": 2
            },
            {
                "permission_id": 100001005,
                "permission_name": "封禁司机",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10106,
                "type": 2
            },
            {
                "permission_id": 100001006,
                "permission_name": "证件信息",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10107,
                "type": 2
            },
            {
                "permission_id": 100001007,
                "permission_name": "编辑证件",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10108,
                "type": 2
            },
            {
                "permission_id": 100001008,
                "permission_name": "导出司机",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10109,
                "type": 2
            },
            {
                "permission_id": 100001009,
                "permission_name": "操作日志",
                "parent_id": 100001,
                "icon": "",
                "sort_id": 10110,
                "type": 2
            },
            {
                "permission_id": 100002,
                "permission_name": "车辆管理",
                "parent_id": 100,
                "icon": "",
                "sort_id": 10200,
                "type": 1
            },
            {
                "permission_id": 100002001,
                "permission_name": "车辆列表",
                "parent_id": 100002,
                "icon": "",
                "sort_id": 10201,
                "type": 2
            },
            {
                "permission_id": 100002002,
                "permission_name": "新增车辆",
                "parent_id": 100002,
                "icon": "",
                "sort_id": 10202,
                "type": 2
            },
            {
                "permission_id": 100002003,
                "permission_name": "审核车辆",
                "parent_id": 100002,
                "icon": "",
                "sort_id": 10203,
                "type": 2
            },
            {
                "permission_id": 100002004,
                "permission_name": "操作日志",
                "parent_id": 100002,
                "icon": "",
                "sort_id": 10204,
                "type": 2
            },
            {
                "permission_id": 100003,
                "permission_name": "疫情打卡",
                "parent_id": 100,
                "icon": "",
                "sort_id": 10300,
                "type": 1
            },
            {
                "permission_id": 100003001,
                "permission_name": "打卡列表",
                "parent_id": 100003,
                "icon": "",
                "sort_id": 10301,
                "type": 2
            },
            {
                "permission_id": 100003002,
                "permission_name": "查看健康码",
                "parent_id": 100003,
                "icon": "",
                "sort_id": 10302,
                "type": 2
            },
            {
                "permission_id": 100003003,
                "permission_name": "查看口罩图",
                "parent_id": 100003,
                "icon": "",
                "sort_id": 10303,
                "type": 2
            },
            {
                "permission_id": 100003004,
                "permission_name": "疫情承诺书",
                "parent_id": 100003,
                "icon": "",
                "sort_id": 10304,
                "type": 2
            },
            {
                "permission_id": 200,
                "permission_name": "订单中心",
                "parent_id": 0,
                "icon": "",
                "sort_id": 10400,
                "type": 1
            },
            {
                "permission_id": 200001,
                "permission_name": "订单查询",
                "parent_id": 200,
                "icon": "",
                "sort_id": 20101,
                "type": 2
            },
            {
                "permission_id": 200001001,
                "permission_name": "关闭订单",
                "parent_id": 200001,
                "icon": "",
                "sort_id": 20202,
                "type": 2
            },
            {
                "permission_id": 200001002,
                "permission_name": "免单",
                "parent_id": 200001,
                "icon": "",
                "sort_id": 20203,
                "type": 2
            },
            {
                "permission_id": 200001003,
                "permission_name": "改价",
                "parent_id": 200001,
                "icon": "",
                "sort_id": 20204,
                "type": 2
            },
            {
                "permission_id": 200001004,
                "permission_name": "退款",
                "parent_id": 200001,
                "icon": "",
                "sort_id": 20205,
                "type": 2
            },
            {
                "permission_id": 200002005,
                "permission_name": "操作日志",
                "parent_id": 200002,
                "icon": "",
                "sort_id": 20206,
                "type": 2
            },
            {
                "permission_id": 200002,
                "permission_name": "订单垫付",
                "parent_id": 200001,
                "icon": "",
                "sort_id": 20301,
                "type": 1
            },
            {
                "permission_id": 200002001,
                "permission_name": "垫付列表",
                "parent_id": 200002,
                "icon": "",
                "sort_id": 20302,
                "type": 2
            },
            {
                "permission_id": 200002002,
                "permission_name": "垫付",
                "parent_id": 200002,
                "icon": "",
                "sort_id": 20303,
                "type": 2
            },
            {
                "permission_id": 200002003,
                "permission_name": "驳回",
                "parent_id": 200002,
                "icon": "",
                "sort_id": 20304,
                "type": 2
            },
            {
                "permission_id": 200002004,
                "permission_name": "备注",
                "parent_id": 200002,
                "icon": "",
                "sort_id": 20305,
                "type": 2
            }
        ]
    }
}
```

#### 1.9 setPlatformRolePermission

```
设置平台角色权限
```

##### Url

```
/api/v1/platform/user/setPlatformRolePermission
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述           |
| ----------- | ------ | -------- | -------------- |
| platform_id | int    | 是       | 出行平台id     |
| role_id     | long   | 是       | 角色id         |
| permission  | string | 是       | 权限json字符串 |
| 示例:       |        |          |                |

```json
{
	"platform_id":1101,
    "role_id":1,
    "permission":"[{\"permission_id\":100,\"permission_name\":\"运力中心\",\"parent_id\":0,\"icon\":\"\",\"sort_id\":10100,\"type\":1},{\"permission_id\":100001,\"permission_name\":\"加盟司机管理\",\"parent_id\":100,\"icon\":\"\",\"sort_id\":10101,\"type\":1},{\"permission_id\":100001001,\"permission_name\":\"司机列表\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10102,\"type\":2},{\"permission_id\":100001002,\"permission_name\":\"新增司机\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10103,\"type\":2},{\"permission_id\":100001003,\"permission_name\":\"编辑司机\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10104,\"type\":2},{\"permission_id\":100001004,\"permission_name\":\"审核司机\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10105,\"type\":2},{\"permission_id\":100001005,\"permission_name\":\"封禁司机\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10106,\"type\":2},{\"permission_id\":100001006,\"permission_name\":\"证件信息\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10107,\"type\":2},{\"permission_id\":100001007,\"permission_name\":\"编辑证件\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10108,\"type\":2},{\"permission_id\":100001008,\"permission_name\":\"导出司机\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10109,\"type\":2},{\"permission_id\":100001009,\"permission_name\":\"操作日志\",\"parent_id\":100001,\"icon\":\"\",\"sort_id\":10110,\"type\":2},{\"permission_id\":100002,\"permission_name\":\"车辆管理\",\"parent_id\":100,\"icon\":\"\",\"sort_id\":10200,\"type\":1},{\"permission_id\":100002001,\"permission_name\":\"车辆列表\",\"parent_id\":100002,\"icon\":\"\",\"sort_id\":10201,\"type\":2},{\"permission_id\":100002002,\"permission_name\":\"新增车辆\",\"parent_id\":100002,\"icon\":\"\",\"sort_id\":10202,\"type\":2},{\"permission_id\":100002003,\"permission_name\":\"审核车辆\",\"parent_id\":100002,\"icon\":\"\",\"sort_id\":10203,\"type\":2},{\"permission_id\":100002004,\"permission_name\":\"操作日志\",\"parent_id\":100002,\"icon\":\"\",\"sort_id\":10204,\"type\":2},{\"permission_id\":100003,\"permission_name\":\"疫情打卡\",\"parent_id\":100,\"icon\":\"\",\"sort_id\":10300,\"type\":1},{\"permission_id\":100003001,\"permission_name\":\"打卡列表\",\"parent_id\":100003,\"icon\":\"\",\"sort_id\":10301,\"type\":2},{\"permission_id\":100003002,\"permission_name\":\"查看健康码\",\"parent_id\":100003,\"icon\":\"\",\"sort_id\":10302,\"type\":2},{\"permission_id\":100003003,\"permission_name\":\"查看口罩图\",\"parent_id\":100003,\"icon\":\"\",\"sort_id\":10303,\"type\":2},{\"permission_id\":100003004,\"permission_name\":\"疫情承诺书\",\"parent_id\":100003,\"icon\":\"\",\"sort_id\":10304,\"type\":2},{\"permission_id\":200,\"permission_name\":\"订单中心\",\"parent_id\":0,\"icon\":\"\",\"sort_id\":10400,\"type\":1},{\"permission_id\":200001,\"permission_name\":\"订单查询\",\"parent_id\":200,\"icon\":\"\",\"sort_id\":20101,\"type\":2},{\"permission_id\":200001001,\"permission_name\":\"关闭订单\",\"parent_id\":200001,\"icon\":\"\",\"sort_id\":20202,\"type\":2},{\"permission_id\":200001002,\"permission_name\":\"免单\",\"parent_id\":200001,\"icon\":\"\",\"sort_id\":20203,\"type\":2},{\"permission_id\":200001003,\"permission_name\":\"改价\",\"parent_id\":200001,\"icon\":\"\",\"sort_id\":20204,\"type\":2},{\"permission_id\":200001004,\"permission_name\":\"退款\",\"parent_id\":200001,\"icon\":\"\",\"sort_id\":20205,\"type\":2},{\"permission_id\":200002005,\"permission_name\":\"操作日志\",\"parent_id\":200002,\"icon\":\"\",\"sort_id\":20206,\"type\":2},{\"permission_id\":200002,\"permission_name\":\"订单垫付\",\"parent_id\":200001,\"icon\":\"\",\"sort_id\":20301,\"type\":1},{\"permission_id\":200002001,\"permission_name\":\"垫付列表\",\"parent_id\":200002,\"icon\":\"\",\"sort_id\":20302,\"type\":2},{\"permission_id\":200002002,\"permission_name\":\"垫付\",\"parent_id\":200002,\"icon\":\"\",\"sort_id\":20303,\"type\":2},{\"permission_id\":200002003,\"permission_name\":\"驳回\",\"parent_id\":200002,\"icon\":\"\",\"sort_id\":20304,\"type\":2},{\"permission_id\":200002004,\"permission_name\":\"备注\",\"parent_id\":200002,\"icon\":\"\",\"sort_id\":20305,\"type\":2}]",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
| 示例:  |      |          |      |

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 1.10 setPlatformUserRole

```
设置平台用户角色
```

##### Url

```
/api/v1/platform/user/setPlatformUserRole
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| uid         | long | 是       | 用户id     |
| role_id     | long | 是       | 角色id     |
| 示例:       |      |          |            |

```json
{
	"platform_id":1101,
    "uid":1,
    "role_id":1,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
| 示例:  |      |          |      |

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 1.11 editPlatformUser

```
编辑平台账户
```

##### Url

```
/api/v1/platform/user/editPlatformUser
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述           |
| ----------- | ------ | -------- | -------------- |
| platform_id | int    | 是       | 出行平台id     |
| uid         | long   | 是       | 要编辑的用户id |
| phone       | string | 否       | 手机号         |
| email       | string | 否       | 邮箱           |
| real_name   | string | 是       | 姓名           |
| 示例:       |        |          |                |

```json
{
	"platform_id":1101,
    "uid":12345678,
    "phone":"13374858966",
    "email":"abcde@duduchuxing.com",
    "real_name": "张三",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
| 示例:  |      |          |      |

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 1.12 getPlatformUser

```
获取平台账户
```

##### Url

```
/api/v1/platform/user/getPlatformUser
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| uid         | long | 是       | 用户id     |
| 示例:       |      |          |            |

```json
{
	"platform_id":1101,
    "uid":12345678,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名     | 类型   | 是否必填 | 描述                               |
| ---------- | ------ | -------- | ---------------------------------- |
| uid        | long   | 是       | 用户id                             |
| name       | string | 是       | 用户名                             |
| phone      | string | 是       | 手机号                             |
| email      | string | 是       | 邮箱                               |
| real_name  | string | 是       | 姓名                               |
| company_id | long   | 是       | 公司id，paltform用户，公司为平台id |
| role_id    | long   | 是       | 角色id                             |
| status     | int    | 是       | 状态: 1:正常;2:禁用                |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
    	"uid":123456,
    	"name":"name",
    	"phone":"13726653364",
    	"email":"11222333@qq.com",
    	"real_name":"张三",
    	"company_id":1101,
    	"role_id":1,
    	"status":1
    }
}
```

#### 1.13 getPlatformQueryCode

```
获取平台用户登录验证码，注：获取平台用户登录验证码接口，不需要传公共参数
```

##### Url
```
/api/v1/platform/user/getPlatformQueryCode
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名    | 类型   | 是否必填 | 描述   |
| --------- | ------ | -------- | ------ |
| user_name | string | 是       | 用户名 |
| phone     | string | 是       | 手机号 |
示例:
```json
{
    "user_name":"ddcx_admin",
    "phone":"18963374856"
}
```

##### Response

示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 1.14 platformLogout

```
帐号退出
```

##### Url

```
/api/v1/platform/user/platformLogout
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| 示例:       |      |          |            |

```json
{
	"platform_id":1101,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

### 2 account 司机账户

```
司机账户模块
```

#### 2.1 accountList

```
司机账户列表
```

##### Url
```
/api/v1/platform/account/accountList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述          |
| ----------- | ------ | -------- | ------------- |
| platform_id | int    | 是       | 出行平台id    |
| driver_id   | long   | 否       | 司机id        |
| cell        | string | 否       | 司机手机号    |
| page_no     | int    | 是       | 页码，从1开始 |
| page_size   | int    | 是       | 每页记录数    |
示例:
```json
{
    "platform_id":1101,
    "driver_id":0,
    "cell":"",
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                     | 类型   | 是否必填 | 描述                         |
| -------------------------- | ------ | -------- | ---------------------------- |
| total_count                | int    | 是       | 总记录数，用于前端分页       |
| account_list               | array  | 是       | 账户列表                     |
| account_list.driver_id     | long   | 是       | 司机id                       |
| account_list.cell          | string | 是       | 司机手机号                   |
| account_list.name          | string | 是       | 司机姓名                     |
| account_list.status        | int    | 是       | 司机状态：1（正常）2（冻结） |
| account_list.real_balance  | int    | 是       | 账户余额，单位：分           |
| account_list.avail_balance | int    | 是       | 可提现余额，单位：分         |
| page_index                 | int    | 是       | 当前页码                     |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "account_list": [
            {
                "driver_id": 4295067297,
                "cell": "10010001111",
                "name": "张三",
                "status": 1,
                "real_balance": 15760,
                "avail_balance": 10660
            }
        ],
        "page_index": 1
    }
}
```

#### 2.2 changeStatus

```
修改账户状态
```

##### Url
```
/api/v1/platform/account/changeStatus
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                        |
| ----------- | ------ | -------- | --------------------------- |
| platform_id | int    | 是       | 出行平台id                  |
| driver_id   | long   | 是       | 司机id                      |
| op_code     | int    | 是       | 操作类型 1（解冻）2（冻结） |
| remarks     | string | 是       | 操作备注                    |
示例:
```json
{
    "platform_id":1101,
    "driver_id":0,
    "op_code":1,
    "remarks":"remarks....",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 2.3 increase

```
账户奖励
```

##### Url
```
/api/v1/platform/account/increase
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                                  |
| ----------- | ------ | -------- | ------------------------------------- |
| platform_id | int    | 是       | 出行平台id                            |
| driver_id   | long   | 是       | 司机id                                |
| cost        | int    | 是       | 奖励金额，单位：分；min=1,max=1000000 |
| remarks     | string | 是       | 操作备注                              |
示例:
```json
{
    "platform_id":1101,
    "driver_id":0,
    "cost":1000,
    "remarks":"remarks....",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 2.4 punish

```
账户惩罚
```

##### Url
```
/api/v1/platform/account/punish
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                                  |
| ----------- | ------ | -------- | ------------------------------------- |
| platform_id | int    | 是       | 出行平台id                            |
| driver_id   | long   | 是       | 司机id                                |
| cost        | int    | 是       | 惩罚金额，单位：分；min=1,max=1000000 |
| remarks     | string | 是       | 操作备注                              |
示例:
```json
{
    "platform_id":1101,
    "driver_id":0,
    "cost":1000,
    "remarks":"remarks....",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 2.5 showRefund

```
查看账户扣款信息
```

##### Url
```
/api/v1/platform/account/showRefund
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                          |
| ----------- | ------ | -------- | ----------------------------- |
| platform_id | int    | 是       | 出行平台id                    |
| driver_id   | long   | 是       | 司机id                        |
| start       | string | 是       | 开始时间：YYYY-mm-dd HH:mm:ss |
| end         | string | 是       | 结束时间：YYYY-mm-dd HH:mm:ss |
示例:
```json
{
    "platform_id":1101,
    "driver_id":4295067297,
    "start":"2021-09-01 00:00:00",
    "end":"2021-09-30 23:59:59",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                       | 类型   | 是否必填 | 描述                                                     |
| ---------------------------- | ------ | -------- | -------------------------------------------------------- |
| total_count                  | int    | 是       | 总记录数，用于前端分页                                   |
| refund_list                  | array  | 是       | 扣款列表                                                 |
| refund_list.transaction_id   | string | 是       | 交易流水id                                               |
| refund_list.transaction_type | string | 是       | 交易类型<br />1:收到车费;2:退还车费;3:奖励;4:惩罚;5:提现 |
| refund_list.amount           | int    | 是       | 交易金额，单位：分                                       |
| refund_list.after_balance    | int    | 是       | 交易后账户余额                                           |
| refund_list.create_time      | string | 是       | 交易时间                                                 |
| refund_list.order_id         | long   | 是       | 扣款所属order_id                                         |
| page_index                   | int    | 是       | 当前页码                                                 |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "account_list": [
            {
                "transaction_id": "11111111111",
                "transaction_type": "退还车费",
                "amount": 1000,
                "after_balance": 1870,
                "create_time": "2021-09-01 14:28:46",
                "order_id": 11010000010001
            }
        ],
        "page_index": 1
    }
}
```

#### 2.6 trans

```
流水下载
```

##### Url
```
/api/v1/platform/account/trans
```

##### Method

```
Http Get
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                          |
| ----------- | ------ | -------- | ----------------------------- |
| platform_id | int    | 是       | 出行平台id                    |
| driver_id   | long   | 是       | 司机id                        |
| start       | string | 是       | 开始时间：YYYY-mm-dd HH:mm:ss |
| end         | string | 是       | 结束时间：YYYY-mm-dd HH:mm:ss |
示例:
```json
?platform_id=1101&driver_id=4295067297&start=2021-09-01 00:00:00&end=2021-09-30 23:59:59&user_id=8589934595&token=vxJcsr6hAW0PEbcUEMR3Xdx
```

##### Response

```
text/csv 流水excel下载
```


### 3 area 开城计划

```
开城计划模块
```
#### 3.1 areaPlanList

```
开城计划列表
```

##### Url
```
/api/v1/platform/area/areaPlanList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名                | 类型 | 是否必填 | 描述                                        |
| --------------------- | ---- | -------- | ------------------------------------------- |
| platform_id           | int  | 是       | 出行平台id                                  |
| city_id               | int  | 否       | 城市编码                                    |
| county_id             | int  | 否       | 区县编码                                    |
| driver_recruit_status | int  | 否       | 招募开通状态（0：全部；1：已开通，2：关闭） |
| page_no               | int  | 是       | 页码，从1开始                               |
| page_size             | int  | 是       | 每页记录数                                  |
示例:
```json
{
    "platform_id":1101,
    "city_code":0,
    "county_code":0,
    "driver_recruit_status":0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                               | 类型   | 是否必填 | 描述                                             |
| ------------------------------------ | ------ | -------- | ------------------------------------------------ |
| total_count                          | int    | 是       | 总记录数，用于前端分页                           |
| area_plan_list                       | array  | 是       | 开城计划列表                                     |
| area_plan_list.id                    | long   | 是       | 记录唯一id                                       |
| area_plan_list.platform_id           | int    | 是       | 出行平台id                                       |
| area_plan_list.city_code             | int    | 是       | 城市编码                                         |
| area_plan_list.county_code           | int    | 是       | 区县编码                                         |
| account_list.public_id               | int    | 是       | 产品id                                           |
| area_plan_list.target_driver_num     | int    | 是       | 目标司机数                                       |
| area_plan_list.remark                | string | 是       | 文案                                             |
| area_plan_list.must_dodl             | int    | 是       | 网约车运输资格证是否必填。<br />0-非必填，1-必填 |
| area_plan_list.must_dol              | int    | 是       | 网约车从业资格证是否必填。<br />0-非必填，1-必填 |
| area_plan_list.city_open_status      | int    | 是       | 城市开通状态(1为已开通，2为关闭)                 |
| area_plan_list.driver_recruit_status | int    | 是       | 招募开通状态(1为已开通，2为关闭)                 |
| area_plan_list.create_time           | string | 是       | 创建时间                                         |
| area_plan_list.update_time           | string | 是       | 更新时间                                         |
| page_index                           | int    | 是       | 当前页码                                         |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "area_plan_list": [
            {
                "id": 11,
                "platform_id": 1101,
                "city_code": 440300,
                "county_code": 440304,
                "public_id": "",
                "target_driver_num": 10000,
                "remark":"深圳市开城，招募10000司机",
                "must_dodl":1,
                "must_dol":1,
                "city_open_status":1,
                "driver_recruit_status":1,
                "create_time":"2021-09-16 14:00:00",
                "update_time":"2021-09-16 14:00:00",
            }
        ],
        "page_index": 1
    }
}
```

#### 3.2 addAreaPlan

```
添加开城计划
```

##### Url
```
/api/v1/platform/area/addAreaPlan
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名            | 类型   | 是否必填 | 描述                                         |
| ----------------- | ------ | -------- | -------------------------------------------- |
| platform_id       | int    | 是       | 出行平台id                                   |
| city_code         | array    | 是       | 城市编码                                     |
| county_code       | int    | 是       | 区县编码                                     |
| target_driver_num | int    | 是       | 目标司机数                                   |
| remark            | string | 是       | 文案                                         |
| must_dodl         | int    | 是       | //网约车运输资格证是否必填。0-非必填，1-必填 |
| must_dol          | int    | 是       | //网约车从业资格证是否必填。0-非必填，1-必填 |
示例:
```json
{
    "platform_id":1101,
    "city_code":440300,
    "county_code":[440306,440307],
    "target_driver_num":10000,
    "remark":"remark....",
    "must_dodl":1,
    "must_dol":1,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 3.3 editAreaPlan

```
修改开城计划
```

##### Url
```
/api/v1/platform/area/editAreaPlan
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名            | 类型   | 是否必填 | 描述                                         |
| ----------------- | ------ | -------- | -------------------------------------------- |
| platform_id       | int    | 是       | 出行平台id                                   |
| id                | int    | 是       | 开城计划id                                   |
| target_driver_num | int    | 是       | 目标司机数                                   |
| remark            | string | 是       | 文案                                         |
| must_dodl         | int    | 是       | //网约车运输资格证是否必填。0-非必填，1-必填 |
| must_dol          | int    | 是       | //网约车从业资格证是否必填。0-非必填，1-必填 |
示例:
```json
{
    "platform_id":1101,
    "id":110,
    "target_driver_num":10000,
    "remark":"remark....",
    "must_dodl":1,
    "must_dol":1,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 3.4 setAreaPlanStatus

```
修改开城计划
```

##### Url
```
/api/v1/platform/area/setAreaPlanStatus
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名                | 类型 | 是否必填 | 描述                                        |
| --------------------- | ---- | -------- | ------------------------------------------- |
| platform_id           | int  | 是       | 出行平台id                                  |
| id                    | int  | 是       | 开城计划id                                  |
| driver_recruit_status | int  | 是       | 招募开通状态（0：全部；1：已开通，2：关闭） |
示例:
```json
{
    "platform_id":1101,
    "id":110,
    "driver_recruit_status":1,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

示例:
```json
{
    "code": 0,
    "message": "Success"
}
```



### 4 driver 司机

```
司机模块
```
#### 4.1 driverList

```
司机列表
```

##### Url
```
/api/v1/platform/driver/driverList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名         | 类型   | 是否必填 | 描述                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------ |
| platform_id    | int    | 是       | 出行平台id                                                   |
| driver_id      | long   | 否       | 司机id                                                       |
| phone          | string | 否       | 司机手机号                                                   |
| id_card        | string | 否       | 身份证号码                                                   |
| plate_no       | string | 否       | 车牌号                                                       |
| account_status | int    | 否       | 司机账号状态<br />1:全部; 1:正常;2:冻结;3:封禁;4:永久封禁;5:证件过期 |
| audit_status   | int    | 否       | 审核状态<br />-1:全部, <br />0:待审查;<br />2:初审不通过;<br />3:非营运车辆;<br />5:审核通过 |
| license_auth   | int    | 否       | 认证状态<br />-1:全部, <br />0:未认证;<br />1:仅人证;<br />2:仅车证;<br />3:双证齐全;<br />4:双证缺失 |
| city           | int    | 否       | 城市编码                                                     |
| county         | int    | 否       | 区县编码                                                     |
| start_time     | string | 否       | 注册开始时间                                                 |
| end_time       | string | 否       | 注册结束时间                                                 |
| page_no        | int    | 是       | 页码，从1开始                                                |
| page_size      | int    | 是       | 每页记录数                                                   |
|示例:||||
```json
{
    "platform_id":1101,
    "phone":"10010001111",
    "account_status":-1,
    "audit_status":-1,
    "license_auth":-1,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                                  | 类型   | 是否必填 | 描述                                                         |
| --------------------------------------- | ------ | -------- | ------------------------------------------------------------ |
| total_count                             | int    | 是       | 总记录数，用于前端分页                                       |
| driver_list                             | array  | 是       | 账户列表                                                     |
| driver_list.phone | string | 是 | 手机号 |
| driver_list.platform_id                 | int    | 是       | 出行平台id                                                   |
| driver_list.driver_id                   | long   | 是       | 司机id                                                       |
| driver_list.id_no                       | string | 是       | 身份证号码                                                   |
| driver_list.id_valid_date               | string | 是       | 身份证有效期结束日期                                         |
| driver_list.native_place                | string | 是       | 籍贯                                                         |
| driver_list.census_place                | string | 是       | 户籍所在地                                                   |
| driver_list.birthday                    | string | 是       | 出生日期                                                     |
| driver_list.nationality                 | string | 是       | 民族                                                         |
| driver_list.address                     | string | 是       | 住址                                                         |
| driver_list.sex                         | int    | 是       | 性别，1:男，2:女                                             |
| driver_list.lic_no                      | string | 是       | 驾驶证号                                                     |
| driver_list.lic_issue_date              | string | 是       | 驾照发证日期                                                 |
| driver_list.lic_valid_date              | string | 是       | 驾照有效期结束日期                                           |
| driver_list.lic_class                   | string | 是       | 驾照类别                                                     |
| driver_list.lic_audit_status            | int    | 是       | 驾驶证审核状态                                               |
| driver_list.lic_audit_failed_reason     | string | 是       | 驾照审核失败原因                                             |
| driver_list.qualification_id            | string | 是       | 从业资格证（网约车驾驶证）                                   |
| driver_list.qualification_id_valid_date | string | 是       | 从业资格证有效期                                             |
| driver_list.qualification_issue_date    | string | 是       | 网约车驾驶证发证日期                                         |
| driver_list.qualification_area_id       | int    | 是       | 网约车驾驶员证所在地ID                                       |
| driver_list.head_url                    | string | 是       | 司机头像                                                     |
| driver_list.extra_info                  | string | 是       | 扩展信息；json格式                                           |
| driver_list.id_front_photo              | string | 是       | 身份证正面                                                   |
| driver_list.id_backend_photo            | string | 是       | 身份证背面                                                   |
| driver_list.lic_left_photo              | string | 是       | 驾驶证左侧图片                                               |
| driver_list.lic_right_photo             | string | 是       | 驾驶证右侧图片                                               |
| driver_list.qualification_photo         | string | 是       | 网约车驾驶员照片                                             |
| driver_list.license_auth                | int    | 是       | 证件认证<br />0未认证、<br />1仅人证、<br />2仅车证、<br />3双证齐全、<br />4双证缺失 |
| driver_list.idcard_front_photo          | string | 是       | 手持身份证照片                                               |
| driver_list.license_status              | int    | 是       | 证件状态: 0未过期，1已过期                                   |
| driver_list.license_expired_json        | string | 是       | 过期证件列表，json格式。<br />示例:[{"license_expired_code":2,"license_expired_date":"2020-11-26 00:00:00"}] <br />license_expired_code:1身份证,2驾驶证,3行驶证,4网约车人证,5网约车车证 |
| driver_list.license_will_expire         | int    | 是       | 证件将过期状态:0未过期，1即将到期                            |
| driver_list.license_will_expire_json    | string | 是       | 即将到期证件列表，json格式。<br />示例:[{"license_expired_code":2,"license_expired_date":"2020-11-26 00:00:00"}]<br />license_expired_code:1身份证,2驾驶证,3行驶证,4网约车人证,5网约车车证 |
| driver_list.area_id                     | int    | 是       | 司机所属城市id                                               |
| driver_list.work_time                   | string | 是       | 激活时间                                                     |
| driver_list.channel                     | int    | 是       | 渠道来源,1-测试号                                            |
| driver_list.biz_status                  | int    | 是       | 司机在该业务线中的状态,比如临时封禁等                        |
| driver_list.ban_status                  | int    | 是       | 司机封禁状态                                                 |
| driver_list.ban_time                    | string | 是       | 司机封禁操作时间                                             |
| driver_list.ban_end_time                | string | 是       | 司机封禁结束时间                                             |
| driver_list.reg_time                    | string | 是       | 注册时间                                                     |
| driver_list.reg_source                  | int    | 是       | 注册来源,0:离线导入                                          |
| driver_list.biz_source                  | int    | 是       | 司机加入来源，0-直营，1-个人加盟，2-租赁公司                 |
| driver_list.car_level                   | string | 是       | 司机运力                                                     |
| driver_list.is_online                   | int    | 是       | 是否出车,0:收车,1:出车                                       |
| driver_list.is_busy                     | int    | 是       | 是否忙碌,0:空闲,1:忙碌                                       |
| driver_list.online_area_id              | int    | 是       | 出车城市id                                                   |
| driver_list.online_gvid                 | long   | 是       | 出车车辆id                                                   |
| driver_list.receive_level               | string | 是       | 可听单车型，例如 [1,2]                                       |
| driver_list.online_time                 | string | 是       | 最近一次出车时间                                             |
| driver_list.driver_is_assign            | int    | 是       | 1表示指派模式                                                |
| driver_list.listen_mode                 | int    | 是       | 1只听实时单，2只听预约单，0听全部订单(实时单+预约单)         |
| driver_list.order_list                  | string | 是       | 分配给该司机的未服务的订单列表，例如 [{ "order_id": "1", "type": 1, "setup_time": 123234121, "start_dest_time": 1200, "start_dest_distance": 50 }, { "order_id": "123", "type": 0, "setup_time": 1232224121, "start_dest_time": 1300, "start_dest_distance": 55 }] |
| driver_list.passenger_cancel_list       | string | 是       | 取消了该司机订单的乘客列表，time为取消时间，例如 [{ "passenger_id": 143234, "time": 13434889833 }] |
| driver_list.company_id                  | int    | 是       | 公司ID，分单用                                               |
| driver_list.is_inviter                  | int    | 是       | 是否为邀请人。0：不是邀请人，1：是邀请人                     |
| driver_list.inviter_history_amount      | int    | 是       | 历史邀请总奖励金额，单位：分                                 |
| driver_list.first_order_finished        | int    | 是       | 司机是否已完单。0：未完单，1：已完单                         |
| driver_list.be_inviter_time             | string | 是       | 成为邀请者时间                                               |
| driver_list.app_version                 | string | 是       | 司机登录app版本                                              |
| driver_list.device_id                   | string | 是       | 司机登录设备号                                               |
| driver_list.county_id                   | int    | 是       | 司机所属区县                                                 |
| driver_list.verify_status               | int    | 是       | 认证状态                                                     |
| driver_list.is_security_access          | int    | 是       | 安全标记                                                     |
| driver_list.net_carissue_organization   | string | 是       | 网络预约出租汽车驾驶员证发证机构                             |
| driver_list.net_carproof_date           | string | 是       | 初次领取资格证日期                                           |
| driver_list.register_date               | string | 是       | 报备日期                                                     |
| driver_list.contract_on                 | string | 是       | 合同（或协议）有效期起                                       |
| driver_list.contract_off                | string | 是       | 合同（或协议）有效期止                                       |
| driver_list.qualification_verify_status | int    | 是       | 人证审核状态                                                 |
| driver_list.audit_status                | int    | 是       | 审核状态：<br />0待审查,<br />1复审通过(未加复审流程时，此状态为审核通过),<br />2初审不通过,<br />3非营运车辆<br />4审核不通过(用于证件过期重申),<br />5初审通过,<br />6复审不通过 |
| driver_list.audit_msg                   | string | 是       | 审核不通过原因简述                                           |
| driver_list.audit_msg_json              | string | 是       | 审核不通过选项,json格式                                      |
| driver_list.account_status              | int    | 是       | 司机账号状态：1正常、2冻结、3封禁、4永久封禁、5证件过期      |
| driver_list.channel_source              | int    | 是       | 渠道来源                                                     |
| driver_list.bind_gvid                   | long   | 是       | 司机注册绑定车辆唯一id标识                                   |
| driver_list.first_company_id            | long   | 是       | 首次加入公司ID                                               |
| driver_list.first_company_name          | string | 是       | 首次加入公司名称                                             |
| driver_list.work_type                   | int    | 是       | 司机类型 1:兼职; 2:全职，属性只适用于司机                    |
| driver_list.cancel_judge_type           | int    | 是       | 取消管控类型                                                 |
| driver_list.old_plate_no                | string | 是       | 变更前车牌号                                                 |
| driver_list.finished_count              | int    | 是       | 完单量                                                       |
| page_index                              | int    | 是       | 当前页码                                                     |
|示例:||||
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "driver_list": [
            {
            	"phone":"13788888888",
                "platform_id": 1101,
                "driver_id": 4295067297,
                "product_id": 1,
                "id_no": "440405198512073387",
                "name": "张三",
                "id_valid_date": "2025-10-18 00:00:00",
                "native_place": "广东",
                "census_place": "广东省深圳市福田区",
                "birthday": "1985-12-07 00:00:00",
                "nationality": "汉",
                "address": "",
                "sex": 1,
                "lic_no": "",
                "lic_issue_date": "1996-03-21 00:00:00",
                "lic_valid_date": "2025-03-21 00:00:00",
                "lic_class": "A2D",
                "lic_audit_status": 0,
                "lic_audit_failed_reason": "",
                "qualification_id": "510212197401196453",
                "qualification_id_valid_date": "2025-05-21 00:00:00",
                "qualification_issue_date": "2025-05-27 00:00:00",
                "qualification_area_id": 0,
                "head_url": "",
                "extra_info": "",
                "id_front_photo": "16080811474567",
                "id_backend_photo": "16080811473669",
                "lic_left_photo": "16080811477920",
                "lic_right_photo": "",
                "qualification_photo": "16080811486760",
                "license_auth": 3,
                "idcard_front_photo": "",
                "license_status": 0,
                "license_expired_json": "",
                "license_will_expire": 0,
                "license_will_expire_json": "",
                "area_id": 440300,
                "work_time": "2020-12-16 10:07:59",
                "channel": 0,
                "biz_status": 1,
                "ban_status": 0,
                "ban_time": "1971-01-01 00:00:00",
                "ban_end_time": "1971-01-01 00:00:00",
                "reg_time": "2020-12-16 09:12:29",
                "reg_source": 0,
                "biz_source": 1,
                "car_level": "100",
                "is_online": 0,
                "is_busy": 0,
                "online_area_id": 440300,
                "online_gvid": 57765,
                "receive_level": "[100]",
                "online_time": "2021-07-04 08:57:30",
                "driver_is_assign": 1,
                "listen_mode": 0,
                "order_list": "[]",
                "passenger_cancel_list": "[]",
                "company_id": 1,
                "is_inviter": 0,
                "inviter_history_amount": 0,
                "first_order_finished": 1,
                "be_inviter_time": "2021-06-30 20:38:46",
                "app_version": "1.3.4",
                "device_id": "435a62e181e64bb9",
                "county_id": 440304,
                "status": 1,
                "verify_status": 0,
                "is_security_access": 0,
                "net_carissue_organization": "",
                "net_carproof_date": "1971-01-01 00:00:00",
                "register_date": "2021-06-25 00:00:00",
                "contract_on": "1971-01-01 00:00:00",
                "contract_off": "1971-01-01 00:00:00",
                "qualification_verify_status": 0,
                "audit_status": 1,
                "audit_msg": "",
                "audit_msg_json": "",
                "account_status": 1,
                "channel_source": 0,
                "bind_gvid": 57765,
                "first_company_id": 0,
                "first_company_name": "",
                "join_company_id": 1,
                "join_company_name": "长沙嘟嘟出行科技有限公司",
                "remark": "1111",
                "work_type": 2,
                "cancel_judge_type": 2,
                "old_plate_no": "",
                "finished_count": 1
            }
        ],
        "page_index": 1
    }
}
```
#### 4.2 driverDetail

```
司机证件信息
```

##### Url
```
/api/v1/platform/driver/driverDetail
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| driver_id   | long | 是       | 司机id     |
示例:
```json
{
    "platform_id":1101,
    "driver_id":4295067297
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                                                    | 类型   | 是否必填 | 描述                                                         |
| --------------------------------------------------------- | ------ | -------- | ------------------------------------------------------------ |
| base_info                                                 | object | 是       | 基础信息                                                     |
| base_info.platform_id                                     | int    | 是       | 出行平台id                                                   |
| base_info.driver_id                                       | long   | 是       | 司机id                                                       |
| base_info.cell                                            | string | 是       | 司机手机号                                                   |
| base_info.account_status                                  | int    | 是       | 账户状态 1:正常; 2:冻结                                      |
| base_info.audit_status                                    | int    | 是       | 审核状态 0待审核、1审核通过、2审核不通过                     |
| base_info.audit_msg                                       | string | 是       | 审核不通过原因简述                                           |
| base_info.audit_msg_json                                  | string | 是       | 审核不通过选项 json格式                                      |
| base_info.license_auth                                    | int    | 是       | 证件认证：<br />0未认证、1仅人证、2仅车证、3双证齐全、4双证缺失 |
| base_info.license_expired_date                            | string | 是       | 过期时间                                                     |
| base_info.license_expired_status                          | int    | 是       | 证件状态 0未过期，1已过期                                    |
| base_info.gvid                                            | long   | 是       | 车辆id                                                       |
| driver_apply                                              | object | 是       | 申请信息                                                     |
| driver_apply.driver_id                                    | long   | 是       | 司机id                                                       |
| driver_apply.cell                                         | int    | 是       | 司机手机号                                                   |
| driver_apply.biz_source                                   | int    | 是       | 司机加入来源<br />0-直营，1-个人加盟，2-租赁公司             |
| driver_apply.company_id                                   | long   | 是       | 公司id                                                       |
| driver_apply.area_id                                      | int    | 是       | 司机所属城市编码                                             |
| driver_apply.county_id                                    | int    | 是       | 司机所属区县编码                                             |
| driver_apply.channel_source                               | int    | 是       | 渠道来源                                                     |
| driver_idcard                                             | object | 是       | 身份信息                                                     |
| driver_idcard.id_no                                       | string | 是       | 身份证号码                                                   |
| driver_idcard.name                                        | string | 是       | 司机姓名                                                     |
| driver_idcard.id_front_photo                              | string | 是       | 身份证正面                                                   |
| driver_idcard.id_backend_photo                            | string | 是       | 身份证背面                                                   |
| driver_idcard.id_valid_date                               | string | 是       | 身份证有效期结束日期                                         |
| driver_idcard.sex                                         | int    | 是       | 性别，1:男，2:女                                             |
| driver_idcard.census_place                                | string | 是       | 户籍所在地                                                   |
| driver_idcard.address                                     | string | 是       | 住址                                                         |
| driver_idcard.idcard_front_photo                          | string | 是       | 手持身份证照片                                               |
| driver_license                                            | object | 是       | 驾照信息                                                     |
| driver_license.lic_no                                     | string | 是       | 驾驶证号                                                     |
| driver_license.lic_left_photo                             | string | 是       | 驾驶证左侧图片                                               |
| driver_license.lic_right_photo                            | string | 是       | 驾驶证右侧图片                                               |
| driver_license.lic_issue_date                             | string | 是       | 驾照发证日期                                                 |
| driver_license.lic_valid_date                             | string | 是       | 驾照有效期结束日期                                           |
| driver_license.lic_class                                  | string | 是       | 驾照类别                                                     |
| driver_online_license                                     | object | 是       | 人证信息                                                     |
| driver_online_license.qualification_id                    | string | 是       | 从业资格证（网约车驾驶证）                                   |
| driver_online_license.qualification_photo                 | string | 是       | 网约车驾驶员照片                                             |
| driver_online_license.qualification_issue_date            | string | 是       | 网约车驾驶证发证日期                                         |
| driver_online_license.qualification_id_valid_date         | string | 是       | 从业资格证有效期                                             |
| driver_driving_license                                    | object | 是       | 行驶证信息                                                   |
| driver_driving_license.driving_license_photo              | string | 是       | 行驶证图片                                                   |
| driver_driving_license.driving_check_photo                | string | 是       | 行驶证年检图片                                               |
| driver_driving_license.reg_date                           | string | 是       | 行驶证注册日期                                               |
| driver_driving_license.issue_date                         | string | 是       | 行驶证发证日期                                               |
| driver_driving_license.driving_valid_date                 | string | 是       | 行驶证年检有效时间                                           |
| driver_car                                                | object | 是       | 车辆信息                                                     |
| driver_car.plate_no                                       | string | 是       | 车牌号码                                                     |
| driver_car.owner                                          | string | 是       | 车辆所有人                                                   |
| driver_car.brand_name                                     | string | 是       | 车辆品牌                                                     |
| driver_car.brand_id                                       | int    | 是       | 车辆品牌id                                                   |
| driver_car.series_name                                    | string | 是       | 车系                                                         |
| driver_car.series_id                                      | int    | 是       | 车系id                                                       |
| driver_car.color                                          | string | 是       | 车辆颜色                                                     |
| driver_car.seat_num                                       | int    | 是       | 座位数                                                       |
| driver_car.driver_distance                                | float  | 是       | 行驶里程：公里                                               |
| driver_car.fuel_id                                        | int    | 是       | 燃料类型                                                     |
| driver_car.owner_address                                  | string | 是       | 车辆所有人住址                                               |
| driver_car.ins_valid_date                                 | string | 是       | 保险有效期                                                   |
| driver_car.annual_check_date                              | string | 是       | 下次年检日期                                                 |
| driver_car.vin                                            | string | 是       | 车辆识别码                                                   |
| driver_car.car_photo                                      | string | 是       | 行驶车辆图片                                                 |
| driver_car.length                                         | int    | 是       | 长度                                                         |
| driver_car.width                                          | int    | 是       | 宽度                                                         |
| driver_car.height                                         | int    | 是       | 高度                                                         |
| driver_car.wheelbases                                     | int    | 是       | 轴距                                                         |
| driver_car.delivery                                       | float  | 是       | 排量                                                         |
| driver_car.init_style_price                               | float  | 是       | 出厂指导价：元                                               |
| driver_car.engine_no                                      | string | 是       | 发动机号                                                     |
| driver_car.area_id                                        | int    | 是       | 所在城市，注册城市                                           |
| driver_car.property                                       | int    | 是       | 车辆性质<br />0:本人车辆; <br />1:租赁车辆; <br />2:政府共用车; <br />3:出租车; <br />4:共享汽车; <br />5:网络预约客车 |
| driver_car.register_date                                  | string | 是       | 报备日期                                                     |
| driver_online_driving_license                             | object | 是       | 车证信息                                                     |
| driver_online_driving_license.net_trans_permit_id         | string | 是       | 网约车运输证号                                               |
| driver_online_driving_license.net_trans_permit_photo      | string | 是       | 网约车运输证图片                                             |
| driver_online_driving_license.net_trans_permit_issue_date | string | 是       | 网约车运输证发证日期                                         |
| driver_online_driving_license.net_trans_permit_valid_date | string | 是       | 网约车运输证有效期                                           |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "base_info": {
            "platform_id": 1101,
            "driver_id": 4295067297,
            "cell": "10010001111",
            "account_status": 1,
            "audit_status": 1,
            "audit_msg": "",
            "audit_msg_json": "",
            "license_auth": 3,
            "license_expired_date": "",
            "license_expired_status": 0,
            "gvid": 57765
        },
        "driver_apply": {
            "driver_id": 4295067297,
            "cell": "10010001111",
            "biz_source": 1,
            "company_id": 1,
            "area_id": 440300,
            "county_id": 440304,
            "channel_source": 0
        },
        "driver_idcard": {
            "id_no": "440405198512073387",
            "name": "张三",
            "id_front_photo": "16080811474567",
            "id_backend_photo": "16080811473669",
            "id_valid_date": "2025-10-18 00:00:00",
            "sex": 1,
            "census_place": "广东省深圳市福田区",
            "address": "",
            "idcard_front_photo": ""
        },
        "driver_license": {
            "lic_no": "1101114449882387",
            "lic_left_photo": "16080811477920",
            "lic_right_photo": "",
            "lic_issue_date": "1996-03-21 00:00:00",
            "lic_valid_date": "2025-03-21 00:00:00",
            "lic_class": "A2D"
        },
        "driver_online_license": {
            "qualification_id": "510212197401196453",
            "qualification_photo": "16080811486760",
            "qualification_issue_date": "2025-05-27 00:00:00",
            "qualification_id_valid_date": "2025-05-21 00:00:00"
        },
        "driving_license": {
            "driving_license_photo": "16080811492641",
            "driving_check_photo": "16080811499054",
            "reg_date": "2019-04-16 00:00:00",
            "issue_date": "2019-05-07 00:00:00",
            "driving_valid_date": "1971-01-01 00:00:00"
        },
        "driver_car": {
            "plate_no": "粤B700UA",
            "owner": "深圳跑跑租赁有限公司",
            "brand_name": "本田",
            "brand_id": 0,
            "series_name": "凌派",
            "series_id": 0,
            "color": "白色",
            "seat_num": 5,
            "drive_distance": 0,
            "fuel_id": 0,
            "owner_address": "深圳市福田区农林路44号附10号",
            "ins_valid_date": "2021-04-05 00:00:00",
            "annual_check_date": "1970-01-01 00:00:00",
            "vin": "LHGGJ7643J8032237",
            "car_photo": "16080811503333",
            "length": 0,
            "width": 0,
            "height": 0,
            "wheelbases": 0,
            "delivery": "",
            "init_style_price": 0,
            "engine_no": "",
            "area_id": 440300,
            "property": 0,
            "register_date": "1971-01-01 00:00:00"
        },
        "driver_online_driving_license": {
            "net_trans_permit_id": "500107051673",
            "net_trans_permit_photo": "16080811508626",
            "net_trans_permit_issue_date": "1970-01-01 00:00:00",
            "net_trans_permit_valid_date": "2027-04-16 00:00:00"
        }
    }
}
```
#### 4.3 driverBizInfo

```
司机业务属性
```

##### Url
```
/api/v1/platform/driver/driverBizInfo
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| driver_id   | long | 是       | 司机id     |
示例:
```json
{
    "platform_id":1101,
    "driver_id":4295067297
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                 | 类型   | 是否必填 | 描述                                                        |
| ---------------------- | ------ | -------- | ----------------------------------------------------------- |
| driver_id              | long   | 是       | 司机id                                                      |
| name                   | string | 是       | 司机姓名                                                    |
| cell                   | string | 是       | 司机手机号                                                  |
| area_id                | int    | 是       | 司机所属城市编码                                            |
| county_id              | int    | 是       | 司机所属区县编码                                            |
| account_status         | int    | 是       | 司机账号状态<br />1正常、2冻结、3封禁、4永久封禁、5证件过期 |
| account_status_name    | string | 是       | 司机账号状态 名称                                           |
| ban_status             | int    | 是       | 司机封禁状态 0正常 1封禁                                    |
| ban_time               | string | 是       | 封禁时间                                                    |
| ban_end_time           | string | 是       | 解禁时间                                                    |
| verify_status          | int    | 是       | 认证状态 0失败 1成功                                        |
| is_security_access     | int    | 是       | 安全标记                                                    |
| company_id             | long   | 是       | 公司id                                                      |
| company_name           | string | 是       | 公司名称                                                    |
| inviter_driver_id      | long   | 是       | 邀请人司机id                                                |
| inviter_driver_cell    | string | 是       | 邀请人司机手机号                                            |
| inviter_history_amount | float  | 是       | 历史邀请总奖励金额：元                                      |
| create_time            | string | 是       | 创建时间                                                    |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "driver_id": 4295067297,
        "name": "张三",
        "cell": "10010001111",
        "area_id": 440300,
        "county_id": 440304,
        "account_status": 1,
        "account_status_name": "正常",
        "ban_status": 0,
        "ban_time": "1971-01-01 00:00:00",
        "ban_end_time": "1971-01-01 00:00:00",
        "verify_status": 0,
        "is_security_access": 0,
        "company_id": 1,
        "company_name": "长沙嘟嘟出行科技有限公司",
        "inviter_driver_id": 0,
        "inviter_driver_cell": "",
        "inviter_history_amount": 0,
        "create_time": "2020-12-16 09:12:29"
    }
}
```
#### 4.4 licConfig

```
双证配置信息
```

##### Url
```
/api/v1/platform/driver/licConfig
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| city_code   | int  | 是       | 城市编码   |
| county_code | int  | 是       | 区县编码   |
示例:
```json
{
    "platform_id":1101,
    "city_code":440300,
    "county_code":440304,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名    | 类型 | 是否必填 | 描述                                       |
| --------- | ---- | -------- | ------------------------------------------ |
| must_dodl | int  | 是       | 网约车运输资格证是否必填。0-非必填，1-必填 |
| must_dol  | int  | 是       | 网约车从业资格证是否必填。0-非必填，1-必填 |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "must_dodl": 0,
        "must_dol": 0
    }
}
```
#### 4.5 audit

```
司机审核
```

##### Url
```
/api/v1/platform/driver/audit
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名         | 类型   | 是否必填 | 描述                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------ |
| platform_id    | int    | 是       | 出行平台id                                                   |
| driver_id      | long   | 是       | 司机id                                                       |
| audit_status   | int    | 是       | 审核状态<br />2 初审不通过<br/>3 非运营车辆<br/>4 重申不通过<br/>5 初审通过<br/> |
| audit_msg_json | string | 否       | audit_status为2时，必传，json格式，见下表定义                |
```json
{
	//车辆信息
    "driver_car":[
        "main_img_reflective",			//车辆照片反光
        "main_img_blur",				//车辆照片模糊
        "main_img_mismatch"				//车辆照片不符
    ],
    //身份证
    "driver_idcard":[
        "front_img_reflective",			//身份证（头像页）反光	
        "backend_img_reflective",		//身份证（国徽页）反光
        "front_in_hand_reflective",		//手持身份证反光
        "front_img_blur",				//身份证（头像页）模糊
        "backend_img_blur",				//身份证（国徽页）模糊
        "front_in_hand_blur",			//手持身份证模糊
        "front_img_mismatch",			//身份证（头像页）不符
        "backend_img_mismatch",			//身份证（国徽页）不符
        "front_in_hand_mismatch"		//手持身份证不符
    ],
    //行驶证
    "driver_driving_license":[
        "front_img_reflective",			//行驶证正面反光
        "backend_img_reflective",		//行驶证反面反光
        "front_img_blur",				//行驶证正面模糊
        "backend_img_blur",				//行驶证反面模糊
        "front_img_mismatch",			//行驶证正面不符
        "backend_img_mismatch"			//行驶证反面不符
    ],
    //驾驶证
    "driver_license":[
        "front_img_reflective",			//驾驶证正面反光
        "front_img_blur",				//驾驶证正面模糊
        "front_img_mismatch"			//驾驶证正面不符
    ],
    //网约车车证
    "driver_online_driving_license":[
        "front_img_mismatch"			//网约车车证不符
    ],
    //网约车人证
    "driver_online_license":[
        "front_img_mismatch"			//网约车人证不符
    ]
}
```

示例:

```json
{
    "platform_id":1101,
    "driver_id":499772323,
    "audit_status":2,
    "audit_msg_json":"",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 4.6 setBanStatus

```
司机封禁/解封
```

##### Url
```
/api/v1/platform/driver/setBanStatus
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名       | 类型   | 是否必填 | 描述                                  |
| ------------ | ------ | -------- | ------------------------------------- |
| platform_id  | int    | 是       | 出行平台id                            |
| driver_id    | long   | 是       | 司机id                                |
| ban_code     | int    | 是       | 状态码<br />0解禁，1封禁，2永久封禁   |
| ban_time     | string | 否       | 当ban_code为1,2时，必传，封禁开始时间 |
| ban_end_time | string | 否       | 封禁结束时间                          |
| reason       | string | 否       | 封禁/解封 原因                        |

示例:

```json
{
    "platform_id":1101,
    "driver_id": 4294967297,
    "ban_code":1,
    "ban_time":"2021-09-17 15:00:00",
    "ban_end_time":"2021-09-18 15:00:00",
    "reason":"司机恶意不接单，封禁1天",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
示例:
```json
{
    "code": 0,
    "message": "Success"
}
```
#### 4.7 sendMsg

```
消息推送
```

##### Url
```
/api/v1/platform/driver/sendMsg
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述       |
| ----------- | ------ | -------- | ---------- |
| platform_id | int    | 是       | 出行平台id |
| driver_id   | long   | 是       | 司机id     |
| title       | string | 是       | 消息抬头   |
| message     | string | 是       | 消息内容   |

示例:

```json
{
    "platform_id":1101,
    "ban_code":1,
    "title":"this is title",
    "message":"this is message content",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 4.8 edit

```
司机编辑
```

##### Url
```
/api/v1/platform/driver/edit
```

##### Method

```
Http Post application/json
```

##### Param

| 一级参数名                      | 二级参数名                   | 类型    | 是否必填 | 描述                            |
| ----------------------------- | --------------------------- | ------ | ------- | ------------------------------ |
| driver_apply                  |                             | obj    | 是      | 申请基本信息                     |
|                               | driver_id                   | string | 是      | 司机ID                          |
|                               | cell                        | string | 是      | 手机号                          |
|                               | biz_source                  | int    | 是      | 司机加入来源，0-直营，1-个人加盟，2-租赁公司(现在先默认填0)|
|                               | platform_id                 | int    | 是      | 平台ID                          |
|                               | company_id                  | int    | 是      | 公司ID                          |
|                               | area_id                     | int    | 是      | 城市ID                          |
|                               | county_id                   | int    | 是      | 区县ID                          |
|                               | channel_source              | int    | 是      | 渠道来源ID，1-平台直营（现在先默认1）|
|                               | inviter_driver_id           | string | 否      | 邀请者司机ID（没有的话，填0）       |
| driver_idcard                 |                             | obj    | 是      | 身份信息                         |
|                               | id_no                       | string | 是      | 身份证号码                       |
|                               | name                        | string | 是      | 姓名                            |
|                               | id_front_photo              | string | 是      | 身份证正面照片                    |
|                               | id_backend_photo            | string | 是      | 身份证背面照片                    |
|                               | id_card_hand_photo          | string | 是      | 手持身份证照片                    |
|                               | id_valid_date               | string | 是      | 身份证有效日期 YYYY-MM-DD         |
|                               | sex                         | int    | 是      | 性别                            |
|                               | census_place                | string | 否      | 户籍所在地                       |
|                               | address                     | string | 否      | 当前地址                         |
| driver_license                |                             | obj    | 是      | 驾照信息                         |
|                               | lic_no                      | string | 是      | 驾驶证号                         |
|                               | lic_left_photo              | string | 是      | 驾驶证左侧图片                    |
|                               | lic_issue_date              | string | 是      | 驾驶证发证日期 YYYY-MM-DD         |
|                               | lic_valid_date              | string | 是      | 驾驶证有效期结束日期 YYYY-MM-DD    |
|                               | lic_class                   | string | 是      | 驾驶证类型                       |
|                               | lic_right_photo             | string | 否      | 驾驶证右侧图片                    |
| driver_driving_license        |                             | obj    | 是      | 行驶证信息                       |
|                               | driving_license_photo       | string | 是      | 行驶证正本图片                    |
|                               | driving_check_photo         | string | 是      | 行驶证副本图片                    |
|                               | reg_date                    | string | 否      | 行驶证注册日期                    |
|                               | issue_date                  | string | 否      | 行驶证发证日期                    |
|                               | driving_valid_date          | string | 否      | 行驶证年检有效时间                 |
| driver_car                    |                             | obj    | 是      | 车辆信息                         |
|                               | plate_no                    | string | 是      | 车牌号                           |
|                               | brand_name                  | string | 是      | 品牌名字                         |
|                               | brand_id                    | int    | 是      | 品牌ID                          |
|                               | series_name                 | string | 是      | 车系名字                         |
|                               | series_id                   | int    | 是      | 车系ID                          |
|                               | color                       | string | 是      | 车辆颜色                         |
|                               | car_photo                   | string | 是      | 行驶车辆照片                      |
|                               | property                    | int    | 是      | 车辆性质 0-本人车辆，1-租赁车辆     |
|                               | owner                       | string | 是      | 车辆所有人                       |
|                               | seat_num                    | int    | 是      | 车辆座位数                       |
|                               | driver_distance             | float  | 是      | 行驶里程                         |
|                               | fuel_id                     | int    | 是      | 能源类型 0-其他1-油,2-电,3-油电混合,4-油电混合插电式,5-油电混合非插电式 |
|                               | owner_address               | string | 是      | 车辆所有人住址                    |
|                               | ins_valid_date              | string | 否      | 保险有效期 YYYY-MM-DD            |
|                               | annual_check_date           | string | 否      | 下次年检日期 YYYY-MM-DD           |
|                               | vin                         | string | 否      | 车辆识别码                       |
|                               | length                      | int    | 否      | 长度                            |
|                               | width                       | int    | 否      | 宽度                            |
|                               | height                      | int    | 否      | 高度                            |
|                               | wheelbases                  | int    | 否      | 轴距                            |
|                               | delivery                    | float  | 否      | 排量                            |
|                               | init_style_price            | float  | 否      | 出场指导价格                      |
|                               | engine_no                   | string | 否      | 发动机号                         |
|                               | area_id                     | int    | 是      | 运营城市                         |
|                               | register_date               | string | 否      | 车辆注册日期 YYYY-MM-DD           |
| driver_online_license         |                             | obj    | 否      | 网约车驾驶证信息                   |
|                               | qualification_id            | string | 是      | 网约车驾驶证号码                   |
|                               | qualification_id_valid_date | string | 是      | 网约车驾驶证有效期 YYYY-MM-DD      |
|                               | qualification_photo         | string | 是      | 网约车驾驶证照片                   |
|                               | qualification_issue_date    | string | 否      | 网约车驾驶证发证日期 YYYY-MM-DD    |
| driver_online_driving_license |                             | obj    | 否      | 网约车运输资格证信息               |
|                               | net_trans_permit_photo      | string | 是      | 网约车运输资格证照片               |
|                               | net_trans_permit_id         | string | 是      | 网约车运输资格证号码               |
|                               | net_trans_permit_valid_date | string | 是      | 网约车运输资格证有效期 YYYY-MM-DD   |
|                               | net_trans_permit_issue_date | string | 否      | 网约车运输资格证发证日期 YYYY-MM-DD |

示例:

```json
{
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx.............",
    "driver_apply": {
        "driver_id": "43243242342342",
        "cell": "+8615110099987",
        "biz_source": 1,
        "platform_id": 1011,
        "company_id": 1,
        "area_id": 500100,
        "county_id": 500101,
        "channel_source": 101,
        "inviter_driver_id": "0"
    },
    "driver_idcard": {
        "id_no": "110101195503070888",
        "name": "苏三",
        "id_front_photo": "23452354.jpg",
        "id_backend_photo": "23432234.jpg",
        "id_card_hand_photo": "123332.jpg",
        "id_valid_date": "2027-10-01",
        "sex": 1,
        "census_place": "111",
        "address": "111"
    },
    "driver_license": {
        "lic_no": "2342323423",
        "lic_issue_date": "2020-10-01",
        "lic_valid_date": "2025-10-01",
        "lic_class": "C1",
        "lic_left_photo": "12313.jpg",
        "lic_right_photo": "243524353.jpg"
    },
    "driver_driving_license": {
        "driving_license_photo": "32523452.jpg",
        "driving_check_photo": "2342340986.jpg",
        "reg_date": "2020-01-01",
        "issue_date": "2020-09-01",
        "driving_valid_date": "2022-10-01"
    },
    "driver_car": {
        "plate_no": "粤B00000",
        "brand_name": "宝马",
        "brand_id": 1111,
        "series_name": "5系",
        "series_id": 2222,
        "owner": "李四",
        "color": "黑色",
        "seat_num": 5,
        "driver_distance": 11.2,
        "fuel_id": 1,
        "owner_address": "所在地址",
        "ins_valid_date": "2024-01-01",
        "annual_check_date": "2022-05-01",
        "vin": "123412",
        "car_photo": "321423.jpg",
        "length": 1111,
        "width": 888,
        "height": 666,
        "wheelbases": 666,
        "delivery": 11,
        "init_style_price": 43.5,
        "engine_no": "312423423",
        "area_id": 500100,
        "property": 1,
        "register_date": "2019-08-01"
    },
    "driver_online_license": {
        "qualification_id": "4123423432",
        "qualification_issue_date": "2021-01-01",
        "qualification_id_valid_date": "2026-01-01",
        "qualification_photo": "efsd432423.jpg"
    },
    "driver_online_driving_license": {
        "net_trans_permit_photo": "23524352.jpg",
        "net_trans_permit_id": "346453634565",
        "net_trans_permit_valid_date": "2024-10-09",
        "net_trans_permit_issue_date": "2019-01-01"
    }
}
```

##### Response

```
当code为0，说明申请司机成功。反之失败，具体失败原因看返回的message。
```

示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 4.9 transferChannel

```
变更司机归属渠道商
```

##### Url

```
/api/v1/platform/driver/transferChannel
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名       | 类型   | 是否必填 | 描述                                                         |
| ------------ | ------ | -------- | ------------------------------------------------------------ |
| platform_id  | int    | 是       | 出行平台id                                                   |
| driver_id    | long   | 是       | 司机id                                                       |
| channel_id   | int    | 是       | 渠道商id，如果是变更公海，则传1，否则传channel_id            |
| channel_name | string | 是       | 渠道商名称，如果是变更公海，则传相应的  “平台名称”，否则传渠道商名称 |

示例:

```json
{
    "platform_id":1101,
    "driver_id":4294967297,
    "channel_id":"1",
    "channel_name":"长沙嘟嘟出行科技有限公司",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
| 示例:  |      |          |      |

```json
{
    "code": 0,
    "message": "Success"
}
```

### 5 car 车辆

```
车辆模块
```

#### 5.1 carList

```
车辆列表
```

##### Url
```
/api/v1/platform/car/carList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名       | 类型   | 是否必填 | 描述                                                    |
| ------------ | ------ | -------- | ------------------------------------------------------- |
| platform_id  | int    | 是       | 出行平台id                                              |
| plate_no     | string | 否       | 车牌号码                                                |
| city_id      | int    | 否       | 城市编码（0：全部）                                     |
| bind_status  | int    | 否       | 绑定状态（-1:全部; 0:未绑定; 1:已绑定）                 |
| audit_status | int    | 否       | 审核状态（-1:全部; 0:待审核; 1:审核通过; 2:审核不通过） |
| company_id   | long   | 否       | 公司id                                                  |
| page_no      | int    | 是       | 页码，从1开始                                           |
| page_size    | int    | 是       | 每页记录数                                              |
示例:
```json
{
    "platform_id":1101,
    "plate_no":"",
    "city_id":0,
    "bind_status":-1,
    "audit_status":-1,
    "company_id":0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                               | 类型   | 是否必填 | 描述                                                         |
| ------------------------------------ | ------ | -------- | ------------------------------------------------------------ |
| total_count                          | int    | 是       | 总记录数，用于前端分页                                       |
| car_list                             | array  | 是       | 车辆列表                                                     |
| car_list.platform_id                 | int    | 是       | 出行平台id                                                   |
| car_list.gvid                        | long   | 是       | 车辆id                                                       |
| car_list.plate_no                    | string | 是       | 车牌号码                                                     |
| car_list.vin                         | string | 是       | 车辆识别码                                                   |
| car_list.engine_no                   | string | 是       | 发动机号                                                     |
| car_list.reg_date                    | string | 是       | 行驶证注册日期                                               |
| car_list.issue_date                  | string | 是       | 行驶证发证日期                                               |
| car_list.ins_valid_date              | string | 是       | 保险有效期                                                   |
| car_list.annual_check_date           | string | 是       | 下次年检日期                                                 |
| car_list.net_trans_permit_location   | int    | 是       | 网约车行驶证所在地ID                                         |
| car_list.net_trans_permit_id         | string | 是       | 网约车运输证号                                               |
| car_list.net_trans_permit_valid_date | string | 是       | 网约车运输证有效期                                           |
| car_list.net_trans_permit_issue_date | string | 是       | 网约车运输证发证日期                                         |
| car_list.owner                       | string | 是       | 车辆所有人                                                   |
| car_list.owner_address               | string | 是       | 车辆所有人住址                                               |
| car_list.brand_name                  | string | 是       | 车辆品牌                                                     |
| car_list.series_name                 | string | 是       | 车系                                                         |
| car_list.delivery                    | string | 是       | 排量                                                         |
| car_list.color                       | string | 是       | 车辆颜色                                                     |
| car_list.seat_num                    | int    | 是       | 座位数                                                       |
| car_list.extra_info                  | string | 是       | 扩展信息；json格式                                           |
| car_list.init_style_price            | float  | 是       | 出厂指导价                                                   |
| car_list.length                      | int    | 是       | 长度                                                         |
| car_list.width                       | int    | 是       | 宽度                                                         |
| car_list.height                      | int    | 是       | 高度                                                         |
| car_list.wheelbases                  | int    | 是       | 轴距                                                         |
| car_list.fuel_id                     | int    | 是       | 燃料类型                                                     |
| car_list.drive_distance              | float  | 是       | 行驶里程，公里                                               |
| car_list.car_outlook_url             | string | 是       | 车辆展示图片                                                 |
| car_list.status                      | int    | 是       | 记录状态；0：无效，1：有效                                   |
| car_list.driving_license_photo       | string | 是       | 行驶证图片                                                   |
| car_list.driving_check_photo         | string | 是       | 行驶证年检图片                                               |
| car_list.car_photo                   | string | 是       | 行驶车辆图片                                                 |
| car_list.net_trans_permit_photo      | string | 是       | 网约车运输证图片                                             |
| car_list.driving_valid_date          | string | 是       | 行驶证年检有效时间                                           |
| car_list.series_id                   | int    | 是       | 车系id                                                       |
| car_list.brand_id                    | int    | 是       | 车辆品牌id                                                   |
| car_list.area_id                     | int    | 是       | 所在城市，注册城市                                           |
| car_list.channel                     | int    | 是       | 来源渠道                                                     |
| car_list.property                    | int    | 是       | 车辆性质 <br />0:本人车辆; <br />1:租赁车辆; <br />2:政府共用车; <br />3:出租车; <br />4:共享汽车; <br />5:网络预约客车 |
| car_list.extra_biz                   | string | 是       | 车辆扩展信息                                                 |
| car_list.verify_status               | int    | 是       | 车辆审核状态：0-未审核，1-已审核                             |
| car_list.is_security_access          | int    | 是       | 安全标记                                                     |
| car_list.security_uid                | int    | 是       | 安全uid                                                      |
| car_list.vehicle_type                | string | 是       | 车辆类型                                                     |
| car_list.trans_agency                | string | 是       | 车辆运输证发证机构                                           |
| car_list.trans_area                  | string | 是       | 车辆经营区域                                                 |
| car_list.certify_date_b              | string | 是       | 车辆初次登记日期                                             |
| car_list.register_date               | string | 是       | 报备日期                                                     |
| car_list.plate_color                 | string | 是       | 车牌颜色                                                     |
| car_list.fix_state                   | string | 是       | 车辆检修状态                                                 |
| car_list.check_state                 | string | 是       | 车辆年度审验状态                                             |
| car_list.source                      | int    | 是       | 来源：<br />1注册带入、2后台新增、3端内换车、4被替换车       |
| car_list.audit_status                | int    | 是       | 审核状态：0待审核、1审核通过、2审核不通过                    |
| car_list.bind_status                 | int    | 是       | 绑定状态：0未绑定，1已绑定                                   |
| car_list.first_company_id            | long   | 是       | 首次加入公司ID                                               |
| car_list.first_company_name          | string | 是       | 首次加入公司名称                                             |
| car_list.join_company_id             | long   | 是       | 公司ID                                                       |
| car_list.join_company_name           | string | 是       | 公司名称                                                     |
| car_list.audit_msg                   | string | 是       | 审核不通过原因简述                                           |
| car_list.audit_msg_json              | string | 是       | 审核不通过选项,json格式                                      |
| car_list.biz_source                  | int    | 是       | 加入来源，0-直营，1-个人加盟，2-租赁公司                     |
| car_list.apply_driver_id             | string | 是       | 申请司机id                                                   |
| page_index                           | int    | 是       | 当前页码                                                     |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "car_list": [
            {
                "platform_id": 1101,
                "gvid": 57765,
                "plate_no": "粤B700UA",
                "product_id": 1,
                "vin": "LHGGJ7643J8032237",
                "engine_no": "",
                "reg_date": "2019-04-16 00:00:00",
                "issue_date": "2019-05-07 00:00:00",
                "ins_valid_date": "2021-04-05 00:00:00",
                "annual_check_date": "1970-01-01 00:00:00",
                "net_trans_permit_location": 0,
                "net_trans_permit_id": "500107051673",
                "net_trans_permit_valid_date": "2027-04-16 00:00:00",
                "net_trans_permit_issue_date": "1970-01-01 00:00:00",
                "owner": "深圳跑跑租赁有限公司",
                "owner_address": "深圳市福田区农林路44号附10号",
                "brand_name": "本田",
                "series_name": "凌派",
                "delivery": "",
                "color": "白色",
                "seat_num": 5,
                "extra_info": "",
                "init_style_price": 0,
                "length": 0,
                "width": 0,
                "height": 0,
                "wheelbases": 0,
                "fuel_id": 0,
                "drive_distance": 0,
                "car_outlook_url": "",
                "status": 1,
                "driving_license_photo": "16080811492641",
                "driving_check_photo": "16080811499054",
                "car_photo": "16080811503333",
                "net_trans_permit_photo": "16080811508626",
                "driving_valid_date": "1971-01-01 00:00:00",
                "series_id": 0,
                "brand_id": 0,
                "area_id": 440300,
                "channel": 0,
                "property": 0,
                "extra_biz": "",
                "verify_status": 1,
                "is_security_access": 0,
                "security_uid": 0,
                "vehicle_type": "",
                "trans_agency": "",
                "trans_area": "",
                "certify_date_b": "1971-01-01 00:00:00",
                "register_date": "1971-01-01 00:00:00",
                "plate_color": "",
                "fix_state": "",
                "check_state": "",
                "source": 1,
                "audit_status": 1,
                "bind_status": 0,
                "first_company_id": 1,
                "first_company_name": "长沙嘟嘟出行科技有限公司",
                "join_company_id": 1,
                "join_company_name": "长沙嘟嘟出行科技有限公司",
                "audit_msg": "",
                "audit_msg_json": "",
                "biz_source": 1,
                "apply_driver_id": 0
            }
        ],
        "page_index": 1
    }
}
```
#### 5.2 getCar

```
获取车辆
```

##### Url
```
/api/v1/platform/car/getCar
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| gvid        | long | 是       | 车辆id     |
示例:
```json
{
    "platform_id":1101,
    "gvid":57765,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                                | 类型   | 是否必填 | 描述                                                         |
| ------------------------------------- | ------ | -------- | ------------------------------------------------------------ |
| car_basic                             | object | 是       | 车辆基础信息                                                 |
| car_basic.platform_id                 | int    | 是       | 出行平台id                                                   |
| car_basic.gvid                        | long   | 是       | 车辆id                                                       |
| car_basic.plate_no                    | string | 是       | 车牌号码                                                     |
| car_basic.product_id                  | int    | 是       | 产品id                                                       |
| car_basic.vin                         | string | 是       | 车辆识别码                                                   |
| car_basic.engine_no                   | string | 是       | 发动机号                                                     |
| car_basic.reg_date                    | string | 是       | 行驶证注册日期                                               |
| car_basic.issue_date                  | string | 是       | 行驶证发证日期                                               |
| car_basic.ins_valid_date              | string | 是       | 保险有效期                                                   |
| car_basic.annual_check_date           | string | 是       | 下次年检日期                                                 |
| car_basic.net_trans_permit_location   | int    | 是       | 网约车行驶证所在地ID                                         |
| car_basic.net_trans_permit_id         | string | 是       | 网约车运输证号                                               |
| car_basic.net_trans_permit_valid_date | string | 是       | 网约车运输证有效期                                           |
| car_basic.net_trans_permit_issue_date | string | 是       | 网约车运输证发证日期                                         |
| car_basic.owner                       | string | 是       | 车辆所有人                                                   |
| car_basic.owner_address               | string | 是       | 车辆所有人住址                                               |
| car_basic.brand_name                  | string | 是       | 车辆品牌                                                     |
| car_basic.series_name                 | string | 是       | 车系                                                         |
| car_basic.delivery                    | string | 是       | 排量                                                         |
| car_basic.color                       | string | 是       | 车辆颜色                                                     |
| car_basic.seat_num                    | int    | 是       | 座位数                                                       |
| car_basic.extra_info                  | string | 是       | 扩展信息；json格式                                           |
| car_basic.init_style_price            | float  | 是       | 出厂指导价                                                   |
| car_basic.length                      | int    | 是       | 长度                                                         |
| car_basic.width                       | int    | 是       | 宽度                                                         |
| car_basic.height                      | int    | 是       | 高度                                                         |
| car_basic.wheelbases                  | int    | 是       | 轴距                                                         |
| car_basic.fuel_id                     | int    | 是       | 燃料类型                                                     |
| car_basic.drive_distance              | float  | 是       | 行驶里程                                                     |
| car_basic.car_outlook_url             | string | 是       | 车辆展示图片                                                 |
| car_basic.status                      | int    | 是       | 记录状态；0：无效，1：有效                                   |
| car_basic.driving_license_photo       | string | 是       | 行驶证图片                                                   |
| car_basic.driving_check_photo         | string | 是       | 行驶证年检图片                                               |
| car_basic.car_photo                   | string | 是       | 行驶车辆图片                                                 |
| car_basic.net_trans_permit_photo      | string | 是       | 网约车运输证图片                                             |
| car_basic.driving_valid_date          | string | 是       | 行驶证年检有效时间                                           |
| car_basic.series_id                   | int    | 是       | 车系id                                                       |
| car_basic.brand_id                    | int    | 是       | 车辆品牌id                                                   |
| car_basic.create_time                 | string | 是       | 创建时间                                                     |
| car_basic.update_time                 | string | 是       | 修改时间                                                     |
| car_biz                               | object | 是       | 车辆业务属性                                                 |
| car_biz.platform_id                   | int    | 是       | 出行平台id                                                   |
| car_biz.gvid                          | long   | 是       | 车辆id                                                       |
| car_biz.product_id                    | int    | 是       | 产品线ID                                                     |
| car_biz.area_id                       | int    | 是       | 所在城市，注册城市                                           |
| car_biz.channel                       | int    | 是       | 来源渠道                                                     |
| car_biz.property                      | int    | 是       | 车辆性质 <br />0:本人车辆; <br />1:租赁车辆; <br />2:政府共用车; <br />3:出租车; <br />4:共享汽车; <br />5:网络预约客车 |
| car_biz.extra_biz                     | string | 是       | 车辆扩展信息                                                 |
| car_biz.verify_status                 | int    | 是       | 车辆审核状态：0-未审核，1-已审核                             |
| car_biz.is_security_access            | int    | 是       | 安全标记                                                     |
| car_biz.security_uid                  | int    | 是       | 安全uid                                                      |
| car_biz.vehicle_type                  | string | 是       | 车辆类型                                                     |
| car_biz.trans_agency                  | string | 是       | 车辆运输证发证机构                                           |
| car_biz.trans_area                    | string | 是       | 车辆经营区域                                                 |
| car_biz.certify_date_b                | string | 是       | 车辆初次登记日期                                             |
| car_biz.register_date                 | string | 是       | 报备日期                                                     |
| car_biz.plate_color                   | string | 是       | 车牌颜色                                                     |
| car_biz.fix_state                     | string | 是       | 车辆检修状态                                                 |
| car_biz.check_state                   | string | 是       | 车辆年度审验状态                                             |
| car_biz.source                        | int    | 是       | 来源：1注册带入、2后台新增、3端内换车、4被替换车             |
| car_biz.audit_status                  | int    | 是       | 审核状态：0待审核、1审核通过、2审核不通过                    |
| car_biz.bind_status                   | int    | 是       | 绑定状态：0未绑定，1已绑定                                   |
| car_biz.first_company_id              | long   | 是       | 首次加入公司ID                                               |
| car_biz.first_company_name            | string | 是       | 首次加入公司名称                                             |
| car_biz.join_company_id               | long   | 是       | 公司ID                                                       |
| car_biz.join_company_name             | string | 是       | 公司名称                                                     |
| car_biz.audit_msg                     | string | 是       | 审核不通过原因简述                                           |
| car_biz.audit_msg_json                | string | 是       | 审核不通过选项,json格式                                      |
| car_biz.biz_source                    | int    | 是       | 加入来源，0-直营，1-个人加盟，2-租赁公司                     |
| car_biz.apply_driver_id               | long   | 是       | 申请司机id                                                   |
| car_biz.status                        | int    | 是       | 状态1有效，0无效                                             |
| car_biz.create_time                   | string | 是       | 创建时间                                                     |
| car_biz.update_time                   | string | 是       | 修改时间                                                     |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "car_basic": {
            "platform_id": 1101,
            "gvid": 57765,
            "plate_no": "粤B700UA",
            "product_id": 1,
            "vin": "LHGGJ7643J8032237",
            "engine_no": "",
            "reg_date": "2019-04-16 00:00:00",
            "issue_date": "2019-05-07 00:00:00",
            "ins_valid_date": "2021-04-05 00:00:00",
            "annual_check_date": "1970-01-01 00:00:00",
            "net_trans_permit_location": 0,
            "net_trans_permit_id": "500107051673",
            "net_trans_permit_valid_date": "2027-04-16 00:00:00",
            "net_trans_permit_issue_date": "1970-01-01 00:00:00",
            "owner": "深圳跑跑租赁有限公司",
            "owner_address": "深圳市福田区农林路44号附10号",
            "brand_name": "本田",
            "series_name": "凌派",
            "delivery": "",
            "color": "白色",
            "seat_num": 5,
            "extra_info": "",
            "init_style_price": 0,
            "length": 0,
            "width": 0,
            "height": 0,
            "wheelbases": 0,
            "fuel_id": 0,
            "drive_distance": 0,
            "car_outlook_url": "",
            "status": 1,
            "driving_license_photo": "16080811492641",
            "driving_check_photo": "16080811499054",
            "car_photo": "16080811503333",
            "net_trans_permit_photo": "16080811508626",
            "driving_valid_date": "1971-01-01 00:00:00",
            "series_id": 0,
            "brand_id": 0,
            "create_time": "2020-12-16 09:12:30",
            "update_time": "2021-09-07 14:57:23"
        },
        "car_biz": {
            "platform_id": 1101,
            "gvid": 57765,
            "product_id": 1,
            "area_id": 440300,
            "channel": 0,
            "property": 0,
            "extra_biz": "",
            "verify_status": 1,
            "is_security_access": 0,
            "security_uid": 0,
            "vehicle_type": "",
            "trans_agency": "",
            "trans_area": "",
            "certify_date_b": "1971-01-01 00:00:00",
            "register_date": "1971-01-01 00:00:00",
            "plate_color": "",
            "fix_state": "",
            "check_state": "",
            "source": 1,
            "audit_status": 1,
            "bind_status": 0,
            "first_company_id": 1,
            "first_company_name": "长沙嘟嘟出行科技有限公司",
            "join_company_id": 1,
            "join_company_name": "长沙嘟嘟出行科技有限公司",
            "audit_msg": "",
            "audit_msg_json": "",
            "biz_source": 1,
            "apply_driver_id": 0,
            "status": 1,
            "create_time": "2020-12-16 09:12:30",
            "update_time": "2021-07-04 16:36:06"
        }
    }
}
```
#### 5.3 audit

```
车辆审核
```

##### Url

```
/api/v1/platform/car/audit
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名         | 类型   | 是否必填 | 描述                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------ |
| platform_id    | int    | 是       | 出行平台id                                                   |
| gvid           | long   | 是       | 车辆id                                                       |
| audit_status   | int    | 是       | 审核状态<br />1 复审通过<br />2 初审不通过<br/>3 非运营车辆<br/> |
| audit_msg_json | string | 否       | audit_status为2,3时，必传，json格式，见下表定义              |
```json
{
	//行驶证
    "driver_driving_license":[
        "front_img_mismatch",			//行驶证正面不符
        "backend_img_mismatch"			//行驶证反面不符
    ],
    //车辆
    "driver_car":[
        "main_img_mismatch"				//车辆照片不符
    ],
    //网约车车证
    "driver_online_driving_license":[
        "front_img_mismatch",			//网约车车证不符
    ]
}
```

示例:

```json
{
    "platform_id":1101,
    "gvid":1111111,
    "audit_status":2,
    "audit_msg_json":"",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
示例:
```json
{
    "code": 0,
    "message": "Success"
}
```
#### 5.4 branchList

```
车辆品牌列表
```

##### Url
```
/api/v1/platform/car/branchList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
示例:
```

```

##### Response

| 参数名     | 类型   | 是否必填 | 描述     |
| ---------- | ------ | -------- | -------- |
| brand_name | string | 是       | 品牌名称 |
| brand_id   | int    | 是       | 品牌id   |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": [
        {
            "brand_name": "丰田",
            "brand_id": 11189
        },
        {
            "brand_name": "日产",
            "brand_id": 11115
        }
    ]
}
```

#### 5.5 seriesListList

```
车辆品牌车系列表
```

##### Url
```
/api/v1/platform/car/seriesListList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名   | 类型 | 是否必填 | 描述   |
| -------- | ---- | -------- | ------ |
| brand_id | int  | 是       | 品牌id |
示例:
```json
{
	"brand_id":11189
}
```

##### Response

| 参数名      | 类型   | 是否必填 | 描述     |
| ----------- | ------ | -------- | -------- |
| 品牌id      | string | 是       | 品牌id   |
| series_name | string | 是       | 车系名称 |
| series_id   | int    | 是       | 车系id   |
| brand_id    | int    | 是       | 品牌id   |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "11189": [
            {
                "series_name": "亚洲龙",
                "series_id": 1114426,
                "brand_id": 11189
            },
            {
                "series_name": "广汽ix4",
                "series_id": 1114167,
                "brand_id": 11189
            }
        ]
    }
}
```



### 6 invoice 发票

```
发票模块
```
#### 6.1 invoiceList

```
发票列表
```

##### Url
```
/api/v1/platform/invoice/invoiceList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                                                        |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| platform_id | int    | 是       | 出行平台id                                                  |
| invoice_id  | string | 否       | 发票id                                                      |
| order_id    | long   | 否       | 订单号                                                      |
| status      | int    | 否       | 状态<br />1 开票中<br/>2 已开票<br/>3 红冲中<br/>4 发票作废 |
| start_time  | string | 是       | 开始时间                                                    |
| end_time    | string | 是       | 结束时间                                                    |
| page_no     | int    | 是       | 页码，从1开始                                               |
| page_size   | int    | 是       | 每页记录数                                                  |
示例:
```json
{
    "platform_id":1101,
    "invoice_id":"",
    "order_id":0,
    "status":0,
    "start_time":"2021-08-01 00:00:00",
    "end_time":"2021_08-31 23:59:59",
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                       | 类型   | 是否必填 | 描述                                                        |
| ---------------------------- | ------ | -------- | ----------------------------------------------------------- |
| total_count                  | int    | 是       | 总记录数，用于前端分页                                      |
| invoice_list                 | array  | 是       | 发票列表                                                    |
| invoice_list.invoice_id      | string | 是       | 发票id                                                      |
| invoice_list.apply_time      | string | 是       | 申请时间                                                    |
| invoice_list.apply_amount    | int    | 是       | 开票金额：分                                                |
| invoice_list.invoice_title   | string | 是       | 发票抬头                                                    |
| invoice_list.status          | int    | 是       | 状态<br />1 开票中<br/>2 已开票<br/>3 红冲中<br/>4 发票作废 |
| invoice_list.orders          | array  | 是       | 发票行程                                                    |
| invoice_list.orders.order_id | int    | 是       | 订单号                                                      |
| invoice_list.orders.city     | string | 是       | 订单所属城市                                                |
| invoice_list.orders.amount   | int    | 是       | 订单金额：分                                                |
| invoice_list.order_ids       | string | 是       | 行程订单号                                                  |
| page_index                   | int    | 是       | 当前页码                                                    |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "invoice_list": [
            {
                "invoice_id": "1SqQek6jZB1mctuM9fm",
                "product_id": 0,
                "apply_time": "2021-08-23 14:07:00",
                "apply_amount": 2500,
                "invoice_title": "重庆巨蟹数码影像有限公司",
                "status": 4,
                "orders": [
                    {
                        "order_id": 11010000010001,
                        "city": "苏州",
                        "amount": 1000
                    },
                    {
                        "order_id": 11010000010005,
                        "city": "苏州",
                        "amount": 1500
                    }
                ],
                "order_ids": "11010000010001,11010000010005"
            }
        ],
        "page_index": 1
    }
}
```
#### 6.2 getInvoice

```
发票详情
```

##### Url
```
/api/v1/platform/invoice/getInvoice
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述       |
| ----------- | ------ | -------- | ---------- |
| platform_id | int    | 是       | 出行平台id |
| invoice_id  | string | 是       | 发票id     |
示例:
```json
{
    "platform_id": 1101,
    "invoice_id": "1SqQek6jZB1mctuM9fm",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                   | 类型   | 是否必填 | 描述                                                        |
| ------------------------ | ------ | -------- | ----------------------------------------------------------- |
| invoice_id               | string | 是       | 发票申请id                                                  |
| invoice_title            | string | 是       | 发票抬头                                                    |
| invoice_type             | int    | 是       | 开发类型：<br />1、个人；2、单位                            |
| invoice_amount           | int    | 是       | 开票金额，分                                                |
| email                    | string | 是       | 邮箱                                                        |
| customer_identifier      | string | 是       | 纳税人识别号                                                |
| bank_name                | string | 是       | 开票银行                                                    |
| bank_account             | string | 是       | 开票银行账号                                                |
| register_address         | string | 是       | 注册地址                                                    |
| register_phone           | string | 是       | 注册手机号                                                  |
| remarks                  | string | 是       | 备注                                                        |
| apply_time               | string | 是       | 申请时间                                                    |
| status                   | int    | 是       | 状态<br />1 开票中<br/>2 已开票<br/>3 红冲中<br/>4 发票作废 |
| supplier                 | int    | 是       | 供应商：<br />1、百望云                                     |
| orders                   | string | 是       | 行程订单号                                                  |
| issue_time               | string | 是       | 开票时间                                                    |
| issue_invoice_id         | string | 是       | 供应商唯一发票id                                            |
| invoice_url              | string | 是       | 发票地址                                                    |
| red_invoice_id           | string | 是       | 红票id                                                      |
| red_invoice_archive_url  | string | 是       | 红票地址                                                    |
| invoice_code             | string | 是       | 发票代码                                                    |
| invoice_number           | string | 是       | 发票号码                                                    |
| invoice_checkcode        | string | 是       | 发票校验码                                                  |
| tax_rate                 | int    | 是       | 税率，百分之X，如3（代表3%）                                |
| tax_amount               | int    | 是       | 税额，单位：分                                              |
| price_amount             | int    | 是       | 商品金额，单位：分                                          |
| total_amount             | int    | 是       | 价税总计，单位：分                                          |
| invoice_order            | array  |          | 行程订单集合                                                |
| invoice_order.order_id   | long   | 是       | 订单id                                                      |
| invoice_order.city       | string | 是       | 城市                                                        |
| invoice_order.amount     | int    | 是       | 行程金额                                                    |
| invoice_order.car_level  | string | 是       | 车型                                                        |
| invoice_order.start_name | string | 是       | 出发地                                                      |
| invoice_order.dest_name  | string | 是       | 目的地                                                      |
| invoice_order.start_time | string | 是       | 上车时间                                                    |
| invoice_order.end_time   | string | 是       | 下车时间                                                    |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "invoice_id": "1SqQek6jZB1mctuM9fm",
        "invoice_title": "重庆巨蟹数码影像有限公司",
        "invoice_type": 2,
        "invoice_amount": 2500,
        "email": "46387249@qq.com",
        "customer_identifier": "91500112709408839E",
        "bank_name": "招行银行",
        "bank_account": "6225887810994427",
        "register_address": "深圳市宝安区石岩街道龙腾社区添好工业区厂房1栋四五层0755-29816858",
        "register_phone": "13812345678",
        "remarks": "因公出差报销",
        "apply_time": "2021-08-23 14:07:00",
        "status": 4,
        "supplier": 1,
        "orders": "11010000010001,11010000010005",
        "issue_time": "2021-08-23 14:07:04",
        "issue_invoice_id": "c0a8017861233b05da871f62e34f19b0",
        "invoice_url": "20210823/b00b4945-7a39-2463-e877-af24336d83d5_1SqQek6jZB1mctuM9fm",
        "red_invoice_id": "mSqk16jufMc9tB1mQZe",
        "red_invoice_archive_url": "20210823/21d94ecb-ae99-bc95-7ba2-b299f9fee486_1SqQek6jZB1mctuM9fm",
        "invoice_code": "050000000016",
        "invoice_number": "67442866",
        "invoice_checkcode": "05357444473934092822",
        "tax_rate": 3,
        "tax_amount": 75,
        "price_amount": 2500,
        "total_amount": 2575,
        "invoice_order": [
            {
                "order_id": 11010000010001,
                "city": "苏州",
                "amount": 1000,
                "car_level": "快车",
                "start_name": "常熟江南世纪大酒店(淮河路南)",
                "dest_name": "联丰路58号",
                "start_time": "2021-07-25 01:04:45",
                "end_time": "2021-07-25 01:21:24"
            },
            {
                "order_id": 11010000010005,
                "city": "苏州",
                "amount": 1500,
                "car_level": "快车",
                "start_name": "常熟江南世纪大酒店(淮河路南)",
                "dest_name": "联丰路58号",
                "start_time": "2021-07-25 08:04:45",
                "end_time": "2021-07-25 08:04:45"
            }
        ],
        "invoice_discard": {
            "discard_type": 0,
            "discard_time": "",
            "invoice_invalid_operator": ""
        }
    }
}
```

#### 6.3 invoiceCancel

```
发票红冲
```

##### Url
```
/api/v1/platform/invoice/invoiceCancel
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名          | 类型   | 是否必填 | 描述       |
| --------------- | ------ | -------- | ---------- |
| platform_id     | int    | 是       | 出行平台id |
| blue_invoice_id | string | 是       | 蓝票id     |
示例:
```json
{
    "platform_id": 1101,
    "blue_invoice_id": "1SqQek6jZB1mctuM9fm",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                   | 类型   | 是否必填 | 描述                                                        |
| ------------------------ | ------ | -------- | ----------------------------------------------------------- |
示例:
```json
{
    "code": 0,
    "message": "Success"
}
```

#### 6.4 reSendEmail

```
重发邮件
```

##### Url

```
/api/v1/platform/invoice/reSendEmail
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述       |
| ----------- | ------ | -------- | ---------- |
| platform_id | int    | 是       | 出行平台id |
| invoice_id  | string | 是       | 发票id     |
| email       | string | 是       | 邮箱       |

示例:

```json
{
    "platform_id": 1101,
    "invoice_id": "1SqQek6jZB1mctuM9fm",
    "email":"abcde@163.com",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```



### 7 order 订单

```
订单模块
```
#### 7.1 orderList

```
用户列表
```

##### Url
```
/api/v1/platform/order/orderList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名           | 类型   | 是否必填 | 描述                                                         |
| ---------------- | ------ | -------- | ------------------------------------------------------------ |
| platform_id      | int    | 是       | 出行平台id                                                   |
| driver_phone | string | 否       | 司机手机号                                                   |
| order_id         | long   | 否       | 订单号，司机手机号与订单号至少要传一个                       |
| order_status     | int    | 是    | 订单状态：<br />全部:-1 <br />已抢单:1; <br />到达上车点:2; <br />行程中:4; <br />已完成:5; <br />乘客取消行程:7; <br />司机取消:12 |
| is_pay           | int    | 是    | 支付状态：<br />全部:-1 <br />未支付:0; <br />已支付:1       |
| is_platform_paid | int    | 是      | 垫付状态：<br />全部:-1 <br />未垫付:0; <br />平台垫付:1     |
| start_time       | string | 是       | 开始时间                                                     |
| end_time         | string | 是       | 结束时间                                                     |
| page_no          | int    | 是       | 页码，从1开始                                                |
| page_size        | int    | 是       | 每页记录数                                                   |
|示例:||||
```json
{
    "platform_id":1101,
    "phone":"10010000001",
    "order_id":0,
    "order_status":-1,
    "is_pay":-1,
    "is_platform_paid":-1,
    "start_time":"2021-08-01 00:00:00",
    "end_time":"2021_08-31 23:59:59",
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                           | 类型   | 是否必填 | 描述                                                         |
| -------------------------------- | ------ | -------- | ------------------------------------------------------------ |
| total_count                      | int    | 是       | 总记录数，用于前端分页                                       |
| order_list                       | array  | 是       | 订单列表                                                     |
| order_list.order_id              | long   | 是       | 订单号                                                       |
| order_list.platform_id           | int    | 是       | 出行平台id                                                   |
| order_list.open_oid              | string | 是       | 第三方订单号                                                 |
| order_list.passenger_phone       | string | 是       | 乘客手机号                                                   |
| order_list.departure_time        | string | 是       | 发单时间                                                     |
| order_list.area                  | int    | 是       | 出发地城市                                                   |
| order_list.to_area               | int    | 是       | 目的地城市                                                   |
| order_list.county                | int    | 是       | 出发地区县                                                   |
| order_list.to_county             | int    | 是       | 目的地区县                                                   |
| order_list.starting_name         | string | 是       | 出发地地址                                                   |
| order_list.dest_name             | string | 是       | 目的地地址                                                   |
| order_list.start_dest_distance   | int    | 是       | 起点到终点距离，米                                           |
| order_list.channel               | int    | 是       | 订单渠道号<br />10000：滴滴特惠<br />10100：百度地图<br />10200：腾讯地图<br />10500：花小猪 |
| order_list.pre_total_fee         | float  | 是       | 预估费用，元                                                 |
| order_list.is_pay                | int    | 是       | 是否支付 0（未支付）；1（已支付）                            |
| order_list.type                  | int    | 是       | 订单类型<br />0：非精准； 1：精准                            |
| order_list.extra_info            | string | 是       | 扩展信息                                                     |
| order_list.estimate_time         | int    | 是       | 预估时长，分钟                                               |
| order_list.order_status          | int    | 是       | 订单状态<br />0 未抢单<br/>1 已抢单<br/>2 已到达接乘客<br/>3 乘客上车<br/>4 开始计费<br/>5 订单完成<br/>6 抢单前取消（乘客）<br/>7 抢单后取消（乘客）<br/>8 已改派<br/>9 已改派失败<br/>10 司机和乘客协商时间，司机超时<br/>11 客服关闭<br/>12 未能完成服务状态<br/>13 支付完成状态 |
| order_list.driver_start_distance | int    | 是       | 接驾距离，米                                                 |
| order_list.distance              | int    | 是       | 行程里程，公里                                               |
| order_list.strategy_token        | string | 是       | 计价规则                                                     |
| order_list.new_time              | string | 是       | 发单时间                                                     |
| order_list.assigned_time         | string | 是       | 抢单时间                                                     |
| order_list.prepared_time         | string | 是       | 到达上车点时间                                               |
| order_list.begun_time            | string | 是       | 开始计费时间                                                 |
| order_list.finished_time         | string | 是       | 结束计费时间                                                 |
| order_list.completed_time        | string | 是       | 完成支付时间                                                 |
| order_list.cancelled_time        | string | 是       | 取消订单时间                                                 |
| order_list.is_platform_paid      | int    | 是       | 是否平台垫付<br />0：否；1：是                               |
| order_list.advance_pay_status    | int    | 是       | 垫付状态<br />0-未垫付，<br />1-待审核，<br />2-已驳回；<br />3-已垫付，<br />4-乘客已支付（在申请垫付的过程中，乘客自己支付了）<br />5-平台自动垫付 |
| order_list.estimate_id           | string | 是       | 预估冒泡id                                                   |
| order_list.pre_map_type          | int    | 是       | 预估地图类型                                                 |
| order_list.begun_map_type        | int    | 是       | 行程地图类型                                                 |
| order_list._birth_time           | string | 是       | 创建时间                                                     |
| page_index                       | int    | 是       | 当前页码                                                     |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "order_list": [
            {
                "order_id": 11010000010009,
                "platform_id": 1101,
                "open_oid": "d2_N2PTgJhKNLcJhdt8ngHmofLFxfew53455",
                "passenger_phone": "18423774257",
                "departure_time": "2021-08-12 01:02:25",
                "area": 320500,
                "to_area": 0,
                "county": 320581,
                "to_county": 0,
                "starting_name": "常熟江南世纪大酒店(淮河路南)",
                "dest_name": "联丰路58号",
                "start_dest_distance": 7154,
                "channel": 10000,
                "pre_total_fee": 16.69,
                "is_pay": 0,
                "type": 2,
                "extra_info": "{\"is_no_commission\":0,\"passenger_phone_suffix\":\"6967\"}",
                "estimate_time": 13,
                "order_status": 5,
                "driver_start_distance": 192,
                "distance": 0,
                "strategy_token": "5b8563f74ba0bc74294117436d3b5416:57884064ef67321dcf7e8ad63dfa2ce8",
                "new_time": "2021-08-11 01:02:25",
                "assigned_time": "2021-08-11 01:02:27",
                "prepared_time": "2021-08-11 01:02:54",
                "begun_time": "2021-07-25 01:04:58",
                "finished_time": "2021-07-25 01:21:24",
                "completed_time": "0001-01-01 00:00:00",
                "cancelled_time": "2021-06-26 01:53:22",
                "is_platform_paid": 0,
                "advance_pay_status": 0,
                "estimate_id": "0b40376340935a65f818464e87a9f041",
                "pre_map_type": 1,
                "begun_map_type": 0,
                "_birth_time": "2021-08-11 01:02:25"
            }
        ],
        "page_index": 1
    }
}
```

#### 7.2 getOrderInfo

```
订单详情
```

##### Url

```
/api/v1/platform/order/getOrderInfo
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| order_id    | long | 是       | 订单号     |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名                       | 类型   | 是否必填 | 描述                                                         |
| ---------------------------- | ------ | -------- | ------------------------------------------------------------ |
| order_id                     | long   | 是       | 订单id                                                       |
| open_oid                     | string | 是       | 第三方id                                                     |
| order_status                 | int    | 是       | 订单状态<br />0 未抢单<br/>1 已抢单<br/>2 已到达接乘客<br/>3 乘客上车<br/>4 开始计费<br/>5 订单完成<br/>6 抢单前取消（乘客）<br/>7 抢单后取消（乘客）<br/>8 已改派<br/>9 已改派失败<br/>10 司机和乘客协商时间，司机超时<br/>11 客服关闭<br/>12 未能完成服务状态<br/>13 支付完成状态 |
| order_status_name            | string | 是       | 订单状态描述                                                 |
| channel                      | int    | 是       | 订单渠道号                                                   |
| channel_name                 | string | 是       | 订单渠道号描述                                               |
| driver_phone                 | string | 是       | 司机手机号                                                   |
| city                         | string | 是       | 城市区县名称                                                 |
| passenger_phone              | string | 是       | 乘客手机号                                                   |
| is_pay                       | int    | 是       | 是否支付 0：未支付；1：已支付                                |
| advance                      | int    | 是       | 垫付状态 0：未垫付；1：已垫付                                |
| pre_map_type                 | int    | 是       | 预估地图类型                                                 |
| begun_map_type               | int    | 是       | 送驾地图类型                                                 |
| price_mode                   | int    | 是       | 计费模式 0：起步价；1：一口价                                |
| judge_status                 | int    | 是       | ?                                                            |
| judge_exemption_count        | int    | 是       | ?                                                            |
| judge_count                  | int    | 是       | ?                                                            |
| order_detail                 | object | 是       | 订单明细                                                     |
| order_detail.乘客发单        | object | 是       | 发单明细                                                     |
| 乘客发单.new_time            | string | 是       | 发单时间                                                     |
| 乘客发单.start_dest_distance | float  | 是       | 起始到目的地里程，公里                                       |
| 乘客发单.pre_total_fee       | float  | 是       | 预估费用，元                                                 |
| 乘客发单.new_lat             | float  | 是       | 发单纬度                                                     |
| 乘客发单.new_lng             | float  | 是       | 发单经度                                                     |
| order_detail.司机接单        |        |          |                                                              |
| 司机接单.assigned_time       | string | 是       | 抢单时间                                                     |
| 司机接单.assigned_lat        | float  | 是       | 抢单纬度                                                     |
| 司机接单.assigned_lng        | float  | 是       | 抢单经度                                                     |
| 司机接单.driver_phone        | string | 是       | 司机手机号                                                   |
| 司机接单.driver_name         | string | 是       | 司机姓名                                                     |
| 司机接单.plate_no            | string | 是       | 车牌号                                                       |
| 司机接单.brand_name          | string | 是       | 车辆品牌名称                                                 |
| order_detail.司机到达        |        |          |                                                              |
| 司机到达.prepared_time       | string | 是       | 到时时间                                                     |
| 司机到达.prepared_lng        | float  | 是       | 到达纬度                                                     |
| 司机到达.prepared_lat        | float  | 是       | 到达经度                                                     |
| order_detail.服务开始        |        |          |                                                              |
| 服务开始.begun_time          | string | 是       | 开始计费时间                                                 |
| 服务开始.driver_phone        | string | 是       | 司机手机号                                                   |
| 服务开始.brand_name          | string | 是       | 车辆品牌名称                                                 |
| 服务开始.begun_lng           | float  | 是       | 开始计费经度                                                 |
| 服务开始.begun_lat           | float  | 是       | 开始计费纬度                                                 |
| 服务结束                     |        |          |                                                              |
| 服务结束.distance            |        |          | 里程，公里                                                   |
| 服务结束.total_fee           |        |          | 总费用，元                                                   |
| 服务结束.normal_time         |        |          | 时长，分钟                                                   |
| 服务结束.is_pay              |        |          | 是否支付                                                     |
| 服务结束.finished_time       | string | 是       | 结束计费时间                                                 |
| 服务结束.finished_lat        | float  | 是       | 结束计费纬度                                                 |
| 服务结束.finished_lng        | float  | 是       | 结束计费经度                                                 |
| order_detail.starting_name   | string | 是       | 出发地地址                                                   |
| order_detail.starting_lat    | float  | 是       | 出发地纬度                                                   |
| order_detail.starting_lng    | float  | 是       | 出发地经度                                                   |
| order_detail.dest_name       | string | 是       | 目的地地址                                                   |
| order_detail.dest_lat        | float  | 是       | 目的地经度                                                   |
| order_detail.dest_lng        | float  | 是       | 目的地纬度                                                   |
| order_detail.cancel_time     | string | 是       | 取消时间                                                     |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "order_id": 11010000010001,
        "open_oid": "d2_N2PTgJhKNLcJhdt8ngHmofLFxV233143",
        "order_status": 5,
        "order_status_name": "订单完成",
        "channel": 10000,
        "channel_name": "滴滴",
        "driver_phone": "10010001111",
        "city": "苏州市常熟市",
        "passenger_phone": "18423774257",
        "is_pay": 1,
        "advance": 0,
        "pre_map_type": 1,
        "begun_map_type": 0,
        "price_mode": 0,
        "judge_status": 0,
        "judge_exemption_count": 0,
        "judge_count": 0,
        "order_detail": {
            "乘客发单": {
                "new_time": "2021-07-25 01:02:25",
                "start_dest_distance": 7.154,
                "pre_total_fee": 16.69,
                "new_lat": 31.67253,
                "new_lng": 120.76996
            },
            "司机接单": {
                "assigned_time": "2021-07-25 01:02:29",
                "assigned_lat": 29.612959,
                "assigned_lng": 106.54995,
                "driver_phone": "10010001111",
                "driver_name": "飞天猪猪",
                "plate_no": "粤B700UA",
                "brand_name": "本田"
            },
            "司机到达": {
                "prepared_time": "2021-07-25 01:04:45",
                "prepared_lng": 110.329959,
                "prepared_lat": 20.064047
            },
            "服务开始": {
                "begun_time": "2021-07-25 01:04:58",
                "driver_phone": "10010001111",
                "brand_name": "本田",
                "begun_lng": 106.541362,
                "begun_lat": 29.579653
            },
            "服务结束": {
                "distance": 80.8,
                "total_fee": 246.46,
                "normal_time": 61,
                "is_pay": 1,
                "finished_time": "2021-07-25 01:21:24",
                "finished_lat": 22.703988,
                "finished_lng": 114.367411
            },
            "starting_name": "常熟江南世纪大酒店(淮河路南)",
            "starting_lat": 31.67253,
            "starting_lng": 120.76996,
            "dest_name": "联丰路58号",
            "dest_lat": 31.68944,
            "dest_lng": 120.71334,
            "cancel_time": ""
        }
    }
}
```
#### 7.3 getBillDetail

```
订单详情
```

##### Url

```
/api/v1/platform/order/getBillDetail
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| order_id    | long | 是       | 订单号     |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名                           | 类型   | 是否必填 | 描述                                   |
| -------------------------------- | ------ | -------- | -------------------------------------- |
| order_detail                     | object | 是       | 订单明细                               |
| order_detail.area                | string | 是       | 订单城市区县                           |
| order_detail.order_id            | long   | 是       | 订单号                                 |
| order_detail.start_dest_distance | float  | 是       | 预估里程，公里                         |
| order_detail.estimate_time       | int    | 是       | 预估时长，分钟                         |
| order_detail.pre_total_fee       | float  | 是       | 预估费用，元                           |
| order_detail.total_distance      | float  | 是       | 实际里程，公里                         |
| order_detail.total_time          | float  | 是       | 实时时长，分钟                         |
| order_detail.begun_time          | string | 是       | 开始计费时间                           |
| order_detail.finished_time       | string | 是       | 结束计费时间                           |
| order_detail.price_mode          | int    | 是       | 计费模式<br />0：起步价<br />1：一口价 |
| passenger_bill                   |        |          |                                        |
| passenger_bill.start_price       | float  | 是       | 起步价，元                             |
| passenger_bill.normal_time_fee   | float  | 是       | 时长费，元                             |
| passenger_bill.normal_fee        | float  | 是       | 里程费，元                             |
| passenger_bill.total_fee         | float  | 是       | 总费用，元                             |
| passenger_bill.limit_fee         | float  | 是       | 最低消费，元                           |
| passenger_bill.limit_pay         | float  | 是       | 为了补足最低消费，需要补足的钱         |
| passenger_bill.pre_total_fee     | float  | 是       | 预估费用，元                           |
| passenger_bill.channel_name      | string | 是       | 渠道名称                               |
| passenger_bill.pay_time          | string | 是       | 支付时间                               |
| passenger_bill.is_pay            | int    | 是       | 是否支付 0：未支付；1：已支付          |
| passenger_bill.pre_cost          | float  | 是       | 预付费，元                             |
| passenger_bill.pre_pay_time      | string | 是       | 预付时间                               |
| passenger_bill.pre_pay_status    | int    | 是       | 预付状态<br />0：未预付；1：已预付     |
| passenger_bill.invoice           | int    | 是       | 是否开票                               |
| passenger_bill.refund_fee        | float  | 是       | 退款费用，元                           |
| passenger_bill.p_start_price     | float  | 是       | 起步价，元                             |
| passenger_bill.p_normal_time_fee | float  | 是       | 时长费，元                             |
| passenger_bill.p_normal_fee      | float  | 是       | 里程费，元                             |
| passenger_bill.p_empty_fee       | float  | 是       | 远程费，元                             |
| passenger_bill.p_highway_fee     | float  | 是       | 高速费，元                             |
| passenger_bill.p_bridge_fee      | float  | 是       | 过桥费，元                             |
| passenger_bill.p_park_fee        | float  | 是       | 停车费，元                             |
| passenger_bill.p_other_fee       | float  | 是       | 其他费用，元                           |
| passenger_bill.p_normal_distance | float  | 是       | 里程，公里                             |
| passenger_bill.p_normal_time     | float  | 是       | 时长，分钟                             |
| passenger_bill.p_empty_distance  | float  | 是       | 远程里程，公里                         |
| passenger_bill.p_coupon_fee      | float  | 是       | 优惠券，元                             |
| passenger_bill.p_cancel_fee      | float  | 是       | 取消费，元                             |
| driver_bill                      |        |          |                                        |
| driver_bill.start_price          | float  | 是       | 起步价                                 |
| driver_bill.normal_fee           | float  | 是       | 里程费，元                             |
| driver_bill.total_fee            | float  | 是       | 总费用，元                             |
| driver_bill.limit_fee            | float  | 是       | 最低消费，元                           |
| driver_bill.limit_pay            | float  | 是       | 为了补足最低消费，需要补足的钱         |
| driver_bill.net_income           | float  | 是       | 司机收入，元                           |
| driver_bill.d_start_price        | float  | 是       | 起步价                                 |
| driver_bill.d_normal_time_fee    | float  | 是       | 时长费，元                             |
| driver_bill.d_normal_fee         | float  | 是       | 里程费，元                             |
| driver_bill.d_empty_fee          | float  | 是       | 远程费，元                             |
| driver_bill.d_highway_fee        | float  | 是       | 高速费，元                             |
| driver_bill.d_bridge_fee         | float  | 是       | 过桥费，元                             |
| driver_bill.d_park_fee           | float  | 是       | 停车费，元                             |
| driver_bill.d_other_fee          | float  | 是       | 其他费，元                             |
| driver_bill.d_normal_distance    | float  | 是       | 里程，公里                             |
| driver_bill.d_normal_time        | float  | 是       | 时长，分钟                             |
| driver_bill.d_empty_distance     | float  | 是       | 远程里程，公里                         |
| driver_bill.info_fee             | float  | 是       | 信息服务费，元                         |
| driver_bill.rewards_fee          | float  | 是       | 奖励费，元                             |
| driver_bill.cancel_fee           | float  | 是       | 取消费，元                             |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "order_detail": {
            "area": "苏州市常熟市",
            "order_id": 11010000010001,
            "start_dest_distance": 7.154,
            "estimate_time": 13,
            "pre_total_fee": 16.69,
            "total_distance": 80.8,
            "total_time": 61,
            "begun_time": "2021-07-25 01:04:58",
            "finished_time": "2021-07-25 01:21:24",
            "price_mode": 0
        },
        "passenger_bill": {
            "start_price": 10.45,
            "normal_time_fee": 20.14,
            "normal_fee": 146.87,
            "total_fee": 246.46,
            "limit_fee": 0,
            "limit_pay": 0,
            "pre_total_fee": 16.69,
            "cost": 0,
            "channel_name": "",
            "pay_time": "",
            "is_pay": 1,
            "pre_cost": 0,
            "pre_pay_time": "",
            "pre_pay_status": 0,
            "invoice": 0,
            "refund_fee": 0,
            "p_start_price": 10.45,
            "p_normal_time_fee": 20.14,
            "p_normal_fee": 146.87,
            "p_empty_fee": 69,
            "p_highway_fee": 0,
            "p_bridge_fee": 0,
            "p_park_fee": 0,
            "p_other_fee": 0,
            "p_normal_distance": 80.8,
            "p_normal_time": 61,
            "p_empty_distance": 60.8,
            "p_coupon_fee": 0,
            "p_cancel_fee": 0
        },
        "driver_bill": {
            "start_price": 10.45,
            "normal_fee": 146.87,
            "total_fee": 256.36,
            "limit_fee": 0,
            "limit_pay": 0,
            "net_income": 256.36,
            "d_start_price": 10.45,
            "d_normal_time_fee": 20.14,
            "d_normal_fee": 146.87,
            "d_empty_fee": 69,
            "d_highway_fee": 10,
            "d_bridge_fee": 0,
            "d_park_fee": 0,
            "d_other_fee": 0,
            "d_normal_distance": 80.8,
            "d_normal_time": 61,
            "d_empty_distance": 60.8,
            "info_fee": 0.1,
            "rewards_fee": 0,
            "cancel_fee": 0
        }
    }
}
```

#### 7.4 getOrderTrack

```
订单轨迹
```

##### Url

```
/api/v1/platform/order/getOrderTrack
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| order_id    | long | 是       | 订单号     |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名                 | 类型  | 是否必填 | 描述           |
| ---------------------- | ----- | -------- | -------------- |
| track_points           | array | 是       | 轨迹点数组     |
| track_points.lng       | float | 是       | 经度           |
| track_points.lat       | float | 是       | 纬度           |
| track_points.timestamp | long  | 是       | 预估里程，公里 |

示例:

```json
{
	"code": 0,
	"message": "Success",
	"data": {
		"track_points": [{
				"lng": 120.334543,
				"lat": 30.112344,
				"timestamp": 1631876488
			},
			{
				"lng": 120.334643,
				"lat": 30.112544,
				"timestamp": 1631876491
			}
		]
	}
}
```

#### 7.5 getPassengerPhone

```
获取乘客手机号
```

##### Url

```
/api/v1/platform/order/getPassengerPhone
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述       |
| ----------- | ------ | -------- | ---------- |
| platform_id | int    | 是       | 出行平台id |
| order_id    | long   | 是       | 订单号     |
| phone       | string | 是       | 客服坐席号 |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "phone":"075582205950",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名  | 类型   | 是否必填 | 描述     |
| ------- | ------ | -------- | -------- |
| bind_id | string | 是       | 绑定id   |
| v_phone | string | 是       | 虚拟号码 |

示例:

```json
{
	"code": 0,
	"message": "Success",
	"data": {
		"bind_id": "72067745850382771",
		"v_phone": "15702001582"
	}
}
```

#### 7.6 changeBill

```
订单改价
```

##### Url

```
/api/v1/platform/order/changeBill
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名         | 类型   | 是否必填 | 描述              |
| -------------- | ------ | -------- | ----------------- |
| platform_id    | int    | 是       | 出行平台id        |
| order_id       | long   | 是       | 订单号            |
| passenger_bill | string | 是       | 乘客账单 json格式 |
| driver_bill    | string | 是       | 司机账单 json格式 |
| reason         | string | 是       | 改价原因          |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "passenger_bill":"{\"start_price\":10.45,\"normal_fee\":33.41,\"normal_time_fee\":6.12,\"empty_fee\":0.34,\"highway_fee\":0,\"bridge_fee\":0,\"park_fee\":0,\"other_fee\":0,\"coupon_fee\":0}",
    "driver_bill":"{\"start_price\":10.45,\"normal_fee\":26.85,\"normal_time_fee\":6.12,\"empty_fee\":0.34,\"highway_fee\":0,\"bridge_fee\":0,\"park_fee\":0,\"other_fee\":0,\"info_fee\":0.1}",
    "reason":"订单号：11010000010001\n司机说：隧道丢失里程\n乘客说：\n结果：司机补回预估价",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
	"code": 0,
	"message": "Success"
}
```

#### 7.7 closeOrder

```
客服关单
```

##### Url

```
/api/v1/platform/order/closeOrder
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名         | 类型   | 是否必填 | 描述       |
| -------------- | ------ | -------- | ---------- |
| platform_id    | int    | 是       | 出行平台id |
| order_id       | long   | 是       | 订单号     |
| detail_content | string | 是       | 关单原因   |
| remarks        | string | 是       | 备注       |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "detail_content":"司机停机无法联系上",
    "remarks":"操作关单",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
	"code": 0,
	"message": "Success"
}
```

#### 7.8 freeCharge

```
客服免单
```

##### Url

```
/api/v1/platform/order/freeCharge
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名         | 类型   | 是否必填 | 描述       |
| -------------- | ------ | -------- | ---------- |
| platform_id    | int    | 是       | 出行平台id |
| order_id       | long   | 是       | 订单号     |
| detail_content | string | 是       | 免单原因   |
| remarks        | string | 是       | 备注       |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "detail_content":"系统故障，免除乘客费用",
    "remarks":"操作免单",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
	"code": 0,
	"message": "Success"
}
```

#### 7.9 getRefundInfo

```
获取退款信息
```

##### Url

```
/api/v1/platform/order/getRefundInfo
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| order_id    | long | 是       | 订单号     |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名               | 类型  | 是否必填 | 描述               |
| -------------------- | ----- | -------- | ------------------ |
| p_total_fee          | float | 是       | 乘客已退款费用，元 |
| d_total_fee          | float | 是       | 司机已退款费用，元 |
| p_remain_refund_cost | float | 是       | 乘客可退款费用，元 |
| d_remain_refund_cost | float | 是       | 司机可退款费用，元 |

示例:

```json
{
	"code": 0,
	"message": "Success",
	"data": {
		"p_total_fee":0,
		"d_total_fee":0,
		"p_remain_refund_cost":10.00,
		"d_remain_refund_cost":8.50
	}
}
```

#### 7.10 refundOrder

```
退款
```

##### Url

```
/api/v1/platform/order/refundOrder
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名          | 类型   | 是否必填 | 描述                             |
| --------------- | ------ | -------- | -------------------------------- |
| platform_id     | int    | 是       | 出行平台id                       |
| order_id        | long   | 是       | 订单号                           |
| p_refund_cost   | float  | 是       | 乘客退款费用，元                 |
| d_refund_cost   | float  | 是       | 司机退款费用，元                 |
| refund_fee_type | int    | 是       | 费用类型<br />0：车费；1：附加费 |
| detail_content  | string | 是       | 退款说明                         |
| remarks         | string | 是       | 备注                             |

示例:

```json
{
    "platform_id":1101,
    "order_id":11010000010001,
    "detail_content":"系统故障，免除乘客费用",
    "remarks":"操作免单",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xd...."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
	"code": 0,
	"message": "Success"
}
```

### 8 price 计价配置

```
计价模块
```

#### 8.1 productList

```
获取产品列表
```

##### Url

```
/api/v1/platform/price/productList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |

示例:

```json
{
    "platform_id":1101,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                    | 类型   | 是否必填 | 描述                   |
| ------------------------- | ------ | -------- | ---------------------- |
| total_count               | int    | 是       | 总记录数，用于前端分页 |
| product_list              | array  | 是       | 产品列表               |
| product_list.product_id   | int    | 是       | 产品id                 |
| product_list.product_name | string | 是       | 产品名称               |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 2,
        "product_list": [
            {
                "product_id": 1101,
                "product_name": "滴滴特惠"
            },
            {
                "product_id": 1301,
                "product_name": "花小猪"
            }
        ]
    }
}
```

#### 8.2 channelList

```
获取产品线下的渠道列表
```

##### Url

```
/api/v1/platform/price/channelList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名     | 类型 | 是否必填 | 描述                              |
| ---------- | ---- | -------- | --------------------------------- |
| partner_id | int  | 是       | 合作方id<br />滴滴：1000          |
| product_id | int  | 是       | 产品线id，通过productList接口获取 |

示例:

```json
{
    "partner_id":1000,
    "product_id":1101,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                    | 类型   | 是否必填 | 描述                   |
| ------------------------- | ------ | -------- | ---------------------- |
| total_count               | int    | 是       | 总记录数，用于前端分页 |
| channel_list              | array  | 是       | 产品列表               |
| channel_list.channel      | int    | 是       | 渠道编号               |
| channel_list.channel_name | string | 是       | 渠道名称               |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 3,
        "channel_list": [
            {
                "channel": 10000,
                "channel_name": "滴滴"
            },
            {
                "channel": 10100,
                "channel_name": "百度地图"
            },
            {
                "channel": 10200,
                "channel_name": "腾讯地图"
            }
        ]
    }
}
```

#### 

#### 8.3 priceRuleList

```
计价规则列表
```

##### Url

```
/api/v1/platform/price/priceRuleList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述                                                         |
| ----------- | ---- | -------- | ------------------------------------------------------------ |
| platform_id | int  | 是       | 出行平台id                                                   |
| channel     | int  | 否       | 订单渠道<br />10000：滴滴特惠<br />10100：百度地图<br />10200：腾讯地图<br />10500：花小猪 |
| area_id     | int  | 否       | 城市编码                                                     |
| district    | int  | 否       | 状态：<br />1：待审核<br />2：审核通过<br />3：审核不通过<br />4：终止 |
| status      | int  | 否       | 用户状态 0全部; 1正常; 2禁用                                 |
| page_no     | int  | 是       | 页码，从1开始                                                |
| page_size   | int  | 是       | 每页记录数                                                   |

示例:

```json
{
    "platform_id":1101,
    "channel":0,
    "area_id":0,
    "district":0,
    "status":0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                            | 类型   | 是否必填 | 描述                                                         |
| --------------------------------- | ------ | -------- | ------------------------------------------------------------ |
| total_count                       | int    | 是       | 总记录数，用于前端分页                                       |
| price_rule_list                   | array  | 是       | 计价列表                                                     |
| price_rule_list.id                | int    | 是       | 计价id                                                       |
| price_rule_list.platform_id       | long   | 是       | 出行平台id                                                   |
| price_rule_list.product_id        | string | 是       | 产品id                                                       |
| price_rule_list.car_level         | string | 是       | 车型                                                         |
| price_rule_list.area              | string | 是       | 城市编码                                                     |
| price_rule_list.district          | int    | 是       | 区县编码                                                     |
| price_rule_list.abstract_district | string | 是       | 区号+区县，如："0755,440304"                                 |
| price_rule_list.channel           | int    | 是       | 流量渠道号：<br />10000：滴滴特惠<br />10100：百度地图<br />10200：腾讯地图<br />10500：花小猪 |
| price_rule_list.prepay_rule       | string | 是       | 预付费规则                                                   |
| price_rule_list.operator          | string | 是       | 操作人                                                       |
| price_rule_list.d_rule            | string | 是       | 司机计价规则                                                 |
| price_rule_list.p_rule            | string | 是       | 乘客计价规则                                                 |
| price_rule_list.status            | int    | 是       | 状态：<br />1：待审核<br />2：审核通过<br />3：审核不通过<br />4：终止 |
| price_rule_list.start_time        | string | 是       | 开始时间                                                     |
| price_rule_list.end_time          | string | 是       | 结束时间                                                     |
| price_rule_list.created_at        | string | 是       | 创建时间                                                     |
| price_rule_list.updated_at        | string | 是       | 更新时间                                                     |
| price_rule_list.day_type          | int    | 是       | 计价日期类型 <br />1:常规;2:节假日                           |
| price_rule_list.info_fee          | float  | 是       | 信息服务费，元                                               |
| price_rule_list.price_mode        | int    | 是       | 计价模式：<br />0：起步价；1：一口价                         |
| page_index                        | int    | 是       | 当前页码                                                     |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 2,
        "price_rule_list": [
            {
                "id": 1,
                "platform_id": 1101,
                "product_id": 1101,
                "car_level": 100,
                "area": 440300,
                "district": "0755",
                "abstract_district": "0755,440304",
                "channel": 10000,
                "prepay_rule": "{\"prepay_type\":1,\"gt_money\":0}",
                "operator": "admin",
                "d_rule": "{\"distance_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"07:00\\\",\\\"price\\\":2.95},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":2.95}]}\",\"empty_by_distance_serial_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":22,\\\"price\\\":0.5}]}\",\"start_price_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"06:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":13}]}\",\"time_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":0.7}]}\",\"normal_unit_price\":2.05,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":9.5,\"time_unit_price\":0.6}",
                "p_rule": "{\"distance_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"07:00\\\",\\\"price\\\":3.68},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":3.68}]}\",\"empty_by_distance_serial_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":22,\\\"price\\\":0.62}]}\",\"start_price_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"06:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":16.2},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":16.2}]}\",\"time_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":0.87}]}\",\"normal_unit_price\":3.05,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":12.5,\"time_unit_price\":0.8}",
                "status": 2,
                "start_time": "2021-06-03 11:52:41",
                "end_time": "2025-06-03 11:52:41",
                "created_at": "2021-06-03 19:52:41",
                "updated_at": "2021-09-06 16:10:00",
                "day_type": 1,
                "info_fee": 0.01,
                "price_mode": 0
            },
            {
                "id": 2,
                "platform_id": 1101,
                "product_id": 1101,
                "car_level": 100,
                "area": 440300,
                "district": "0755",
                "abstract_district": "0755,440304",
                "channel": 10000,
                "prepay_rule": "{\"prepay_type\":1,\"gt_money\":0}",
                "operator": "admin",
                "d_rule": "{\"distance_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"07:00\\\",\\\"price\\\":2.95},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":2.95}]}\",\"empty_by_distance_serial_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":22,\\\"price\\\":0.5}]}\",\"start_price_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"06:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":13}]}\",\"time_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":0.7}]}\",\"normal_unit_price\":2.05,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":9.5,\"time_unit_price\":0.6}",
                "p_rule": "{\"distance_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"07:00\\\",\\\"price\\\":3.68},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":3.68}]}\",\"empty_by_distance_serial_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":22,\\\"price\\\":0.62}]}\",\"start_price_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"06:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":16.2},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":16.2}]}\",\"time_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":0.87}]}\",\"normal_unit_price\":3.05,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":12.5,\"time_unit_price\":0.8}",
                "status": 2,
                "start_time": "2021-06-03 11:52:41",
                "end_time": "2025-06-03 11:52:41",
                "created_at": "2021-06-03 19:52:41",
                "updated_at": "2021-09-06 16:10:00",
                "day_type": 2,
                "info_fee": 0.01,
                "price_mode": 0
            }
        ],
        "page_index": 1
    }
}
```

#### 8.4 getPriceRule

```
计价规则详情
```

##### Url

```
/api/v1/platform/price/getPriceRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | int  | 是       | 计价id     |

示例:

```json
{
    "platform_id":1101,
    "id":2,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名            | 类型   | 是否必填 | 描述                                                         |
| ----------------- | ------ | -------- | ------------------------------------------------------------ |
| id                | int    | 是       | 计价id                                                       |
| platform_id       | long   | 是       | 出行平台id                                                   |
| product_id        | string | 是       | 产品id                                                       |
| car_level         | string | 是       | 车型                                                         |
| area              | string | 是       | 城市编码                                                     |
| district          | int    | 是       | 区县编码                                                     |
| abstract_district | string | 是       | 区号+区县编码                                                |
| channel           | int    | 是       | 流量渠道号：<br />10000：滴滴特惠<br />10100：百度地图<br />10200：腾讯地图<br />10500：花小猪 |
| prepay_rule       | string | 是       | 预付费规则                                                   |
| operator          | string | 是       | 操作人                                                       |
| d_rule            | string | 是       | 司机计价规则                                                 |
| p_rule            | string | 是       | 乘客计价规则                                                 |
| status            | int    | 是       | 状态：<br />1：待审核<br />2：审核通过<br />3：审核不通过<br />4：终止 |
| start_time        | string | 是       | 开始时间                                                     |
| end_time          | string | 是       | 结束时间                                                     |
| created_at        | string | 是       | 创建时间                                                     |
| updated_at        | string | 是       | 更新时间                                                     |
| day_type          | int    | 是       | 计价日期类型 <br />1:常规;2:节假日                           |
| info_fee          | float  | 是       | 信息服务费，元                                               |
| price_mode        | int    | 是       | 计价模式：<br />1：起步价；2：一口价                         |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "id": 2,
        "platform_id": 1101,
        "product_id": 1101,
        "car_level": 100,
        "area": 440300,
        "district": "0755",
        "abstract_district": "0755,440304",
        "channel": 10000,
        "prepay_rule": "{\"prepay_type\":1,\"gt_money\":0}",
        "operator": "admin",
        "d_rule": "{\"distance_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"07:00\\\",\\\"price\\\":2.95},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":2.95}]}\",\"empty_by_distance_serial_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":22,\\\"price\\\":0.5}]}\",\"start_price_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"06:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":13}]}\",\"time_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":0.7}]}\",\"normal_unit_price\":2.05,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":9.5,\"time_unit_price\":0.6}",
        "p_rule": "{\"distance_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"07:00\\\",\\\"price\\\":3.68},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":3.68}]}\",\"empty_by_distance_serial_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":22,\\\"price\\\":0.62}]}\",\"start_price_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"00:00\\\",\\\"end\\\":\\\"06:00\\\",\\\"price\\\":13},{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":16.2},{\\\"begin\\\":\\\"22:00\\\",\\\"end\\\":\\\"00:00\\\",\\\"price\\\":16.2}]}\",\"time_by_time_interval\":\"{\\\"intervals\\\":[{\\\"begin\\\":\\\"17:00\\\",\\\"end\\\":\\\"19:00\\\",\\\"price\\\":0.87}]}\",\"normal_unit_price\":3.05,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":12.5,\"time_unit_price\":0.8}",
        "status": 2,
        "start_time": "2021-06-03 11:52:41",
        "end_time": "2025-06-03 11:52:41",
        "created_at": "2021-06-03 19:52:41",
        "updated_at": "2021-09-06 16:10:00",
        "day_type": 2,
        "info_fee": 0.01,
        "price_mode": 0
    }
}
```

#### 8.5 addPriceRule

```
添加计价规则
```

##### Url

```
/api/v1/platform/price/addPriceRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名            | 类型   | 是否必填 | 描述                                                 |
| ----------------- | ------ | -------- | ---------------------------------------------------- |
| platform_id       | int    | 是       | 出行平台id                                           |
| product_id        | int    | 是       | 产品id，具体product_id通过接口获取（productList）    |
| area              | int    | 是       | 城市编码                                             |
| district          | string | 是       | 区号                                                 |
| abstract_district | string | 是       | 区号+区县编码，如：“0756,440401”                     |
| channel           | int    | 是       | 流量渠道编号，具体channel通过接口获取（channelList） |
| prepay_rule       | string | 否       | 预付费规则                                           |
| start_time        | string | 是       | 开始时间                                             |
| end_time          | string | 是       | 结束时间                                             |
| day_type          | int    | 是       | 计价日期类型 <br />1:常规;2:节假日                   |
| info_fee          | float  | 是       | 信息基础费，元                                       |
| price_mode        | int    | 是       | 计价模式：<br />1：起步价；2：一口价                 |
| d_rule            | string | 是       | 司机计价规则                                         |
| p_rule            | string | 是       | 乘客计价规则                                         |

示例:

```json
{
    "platform_id":1101,
    "product_id":1101,
    "area":440400,
    "district":"0756",
    "abstract_district": "0756,440401",
    "channel":10000,
    "prepay_rule":"{\"prepay_type\":1,\"gt_money\":0}",
    "start_time":"2021-08-26 16:00:00",
    "end_time":"2022-08-26 16:00:00",
    "day_type":1,
    "info_fee":0.01,
    "price_mode":0,
    "d_rule":"{\"distance_by_time_interval\":\"{\"intervals\":[{\"begin\":\"00:00\",\"end\":\"07:00\",\"price\":2.4},{\"begin\":\"22:00\",\"end\":\"00:00\",\"price\":2.4}]}\",\"empty_by_distance_serial_interval\":\"{\"intervals\":[{\"begin\":22,\"price\":0.4}]}\",\"start_price_by_time_interval\":\"{\"intervals\":[{\"begin\":\"00:00\",\"end\":\"06:00\",\"price\":10.5},{\"begin\":\"17:00\",\"end\":\"19:00\",\"price\":10.5},{\"begin\":\"22:00\",\"end\":\"00:00\",\"price\":10.5}]}\",\"time_by_time_interval\":\"{\"intervals\":[{\"begin\":\"17:00\",\"end\":\"19:00\",\"price\":0.56}]}\",\"normal_unit_price\":1.6,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":7.5,\"time_unit_price\":0.48}",
    "p_rule":"{\"distance_by_time_interval\":\"{\"intervals\":[{\"begin\":\"00:00\",\"end\":\"07:00\",\"price\":2.95},{\"begin\":\"22:00\",\"end\":\"00:00\",\"price\":2.95}]}\",\"empty_by_distance_serial_interval\":\"{\"intervals\":[{\"begin\":22,\"price\":0.5}]}\",\"start_price_by_time_interval\":\"{\"intervals\":[{\"begin\":\"00:00\",\"end\":\"06:00\",\"price\":13},{\"begin\":\"17:00\",\"end\":\"19:00\",\"price\":13},{\"begin\":\"22:00\",\"end\":\"00:00\",\"price\":13}]}\",\"time_by_time_interval\":\"{\"intervals\":[{\"begin\":\"17:00\",\"end\":\"19:00\",\"price\":0.7}]}\",\"normal_unit_price\":2.05,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":9.5,\"time_unit_price\":0.6}",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3XdS9zS......"
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |
示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 8.6 editPriceRule

```
编辑计价规则
```

##### Url

```
/api/v1/platform/price/editPriceRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名            | 类型   | 是否必填 | 描述                                                 |
| ----------------- | ------ | -------- | ---------------------------------------------------- |
| platform_id       | int    | 是       | 出行平台id                                           |
| id                | int    | 是       | 计价id                                               |
| area              | int    | 是       | 城市编码                                             |
| district          | string | 是       | 区号                                                 |
| abstract_district | string | 是       | 区号+区县编码，如：“0756,440401”                     |
| channel           | int    | 是       | 流量渠道编号，具体channel通过接口获取（channelList） |
| prepay_rule       | string | 否       | 预付费规则                                           |
| start_time        | string | 是       | 开始时间                                             |
| end_time          | string | 是       | 结束时间                                             |
| day_type          | int    | 是       | 计价日期类型 <br />1:常规;2:节假日                   |
| info_fee          | float  | 是       | 信息基础费，元                                       |
| price_mode        | int    | 是       | 计价模式：<br />1：起步价；2：一口价                 |
| d_rule            | string | 是       | 司机计价规则                                         |
| p_rule            | string | 是       | 乘客计价规则                                         |

示例:

```json
{
    "platform_id":1101,
    "id":4,
    "area":440100,
    "district":"020",
    "abstract_district": "020,440104",
    "channel":10000,
    "prepay_rule":"{\"prepay_type\":1,\"gt_money\":0}",
    "start_time":"2021-08-26 16:10:00",
    "end_time":"2022-08-26 16:00:00",
    "day_type":1,
    "info_fee":0.01,
    "price_mode":0,
    "d_rule":"{\"distance_by_time_interval\":\"{\"intervals\":[{\"begin\":\"00:00\",\"end\":\"07:00\",\"price\":2.4},{\"begin\":\"22:00\",\"end\":\"00:00\",\"price\":2.4}]}\",\"empty_by_distance_serial_interval\":\"{\"intervals\":[{\"begin\":22,\"price\":0.4}]}\",\"start_price_by_time_interval\":\"{\"intervals\":[{\"begin\":\"00:00\",\"end\":\"06:00\",\"price\":10.5},{\"begin\":\"17:00\",\"end\":\"19:00\",\"price\":10.5},{\"begin\":\"22:00\",\"end\":\"00:00\",\"price\":10.5}]}\",\"time_by_time_interval\":\"{\"intervals\":[{\"begin\":\"17:00\",\"end\":\"19:00\",\"price\":0.56}]}\",\"normal_unit_price\":1.6,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":7.5,\"time_unit_price\":0.48}",
    "p_rule":"{\"distance_by_time_interval\":\"{\"intervals\":[{\"begin\":\"00:00\",\"end\":\"07:00\",\"price\":2.95},{\"begin\":\"22:00\",\"end\":\"00:00\",\"price\":2.95}]}\",\"empty_by_distance_serial_interval\":\"{\"intervals\":[{\"begin\":22,\"price\":0.5}]}\",\"start_price_by_time_interval\":\"{\"intervals\":[{\"begin\":\"00:00\",\"end\":\"06:00\",\"price\":13},{\"begin\":\"17:00\",\"end\":\"19:00\",\"price\":13},{\"begin\":\"22:00\",\"end\":\"00:00\",\"price\":13}]}\",\"time_by_time_interval\":\"{\"intervals\":[{\"begin\":\"17:00\",\"end\":\"19:00\",\"price\":0.7}]}\",\"normal_unit_price\":2.05,\"start_distance\":3.5,\"start_package_time\":9,\"start_price\":9.5,\"time_unit_price\":0.6}",
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3XdS9......."
}
```

##### Response

| 参数名            | 类型   | 是否必填 | 描述                                                         |
| ----------------- | ------ | -------- | ------------------------------------------------------------ |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 8.7 reviewPriceRule

```
审核计价规则
```

##### Url

```
/api/v1/platform/price/reviewPriceRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述                                           |
| ----------- | ---- | -------- | ---------------------------------------------- |
| platform_id | int  | 是       | 出行平台id                                     |
| id          | int  | 是       | 计价id                                         |
| status      | int  | 是       | 状态<br />2：审核通过<br />3：审核不通过<br /> |

示例:

```json
{
    "platform_id":1101,
    "id":4,
    "status":2,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3XdS9......."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 8.8 areaList

```
获取出行平台已经开通的城市列表，计价规则只能在已开城的城市中配置
```

##### Url

```
/api/v1/platform/price/areaList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |

示例:

```json
{
    "platform_id":1101,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3XdS9......."
}
```

##### Response

| 参数名              | 类型          | 是否必填 | 描述     |
| ------------------- | ------------- | -------- | -------- |
| total_count         | int           | 是       | 城市总数 |
| area_list           | array[object] | 是       | 城市数组 |
| area_list.city_code | int           | 是       | 城市编码 |
| area_list.city_name | string        | 是       | 城市名称 |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 2,
        "area_list": [
            {
                "city_code": 440100,
                "city_name": "广州市"
            },
            {
                "city_code": 440300,
                "city_name": "深圳市"
            }
        ]
    }
}
```

### 9 epidemic 疫情打卡

#### 9.1 epidemicSignList

```
疫情打卡列表
```

##### Url

```
/api/v1/platform/epidemic/epidemicSignList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名             | 类型   | 是否必填 | 描述                                                         |
| ------------------ | ------ | -------- | ------------------------------------------------------------ |
| platform_id        | int    | 是       | 出行平台id                                                   |
| cell               | string | 否       | 司机手机号                                                   |
| city_id            | int    | 否       | 城市编码                                                     |
| temperature_status | int    | 否       | 体温状态<br />0:全部;1:正常;2:异常                           |
| health_code_status | int    | 否       | 健康码状态<br />0:全部;<br />1:求购异常-绿码;<br />2:居家观察-橙码;<br />3:集中隔离-红码； |
| start              | string | 是       | 开始时间                                                     |
| end                | string | 是       | 结束时间                                                     |
| page_no            | int    | 是       | 页码，从1开始                                                |
| page_size          | int    | 是       | 每页记录数                                                   |

示例:

```json
{
    "platform_id":1101,
    "cell":"",
    "city_id":0,
    "temperature_status":0,
    "health_code_status":0,
    "start":"2021-08-01 00:00:00",
    "end":"2021-08-31 23:59:59",
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                                | 类型   | 是否必填 | 描述                                                         |
| ------------------------------------- | ------ | -------- | ------------------------------------------------------------ |
| total_count                           | int    | 是       | 总记录数，用于前端分页                                       |
| epidemic_sign_list                    | array  | 是       | 打卡列表                                                     |
| epidemic_sign_list.id                 | long   | 是       | 记录id                                                       |
| epidemic_sign_list.platform_id        | int    | 是       | 出行平台id                                                   |
| epidemic_sign_list.driver_id          | long   | 是       | 司机id                                                       |
| epidemic_sign_list.driver_name        | string | 是       | 司机姓名                                                     |
| epidemic_sign_list.temperature        | float  | 是       | 体温                                                         |
| epidemic_sign_list.health_code_pic    | string | 是       | 健康码url                                                    |
| epidemic_sign_list.mask_pic           | string | 是       | 口罩url                                                      |
| epidemic_sign_list.vaccine_pic        | string | 是       | 疫苗url                                                      |
| epidemic_sign_list.health_code_status | int    | 是       | 健康码状态<br />1:求购异常-绿码;<br />2:居家观察-橙码;<br />3:集中隔离-红码； |
| epidemic_sign_list.vaccine_status     | int    | 是       | 疫苗状态<br />1：未开始<br />2：进行中<br />3：已完成        |
| epidemic_sign_list.area_id            | int    | 是       | 城市编码                                                     |
| epidemic_sign_list.sign_status        | int    | 是       | 打卡状态 <br />1：打卡成功 2：打卡失败                       |
| epidemic_sign_list.sign_time          | string | 是       | 打卡时间                                                     |
| epidemic_sign_list.company_id         | int    | 是       | 公司id                                                       |
| epidemic_sign_list.create_time        | string | 是       | 创建时间                                                     |
| page_index                            | int    | 是       | 当前页码                                                     |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "epidemic_sign_list": [
            {
                "id": 1,
                "platform_id":1101,
                "driver_id": 429887145,
                "driver_name":"张三",
                "temperature":35.6,
                "health_code_pic":"3f7c529083d51b6501173128717a3947",
                "mask_pic":"083d51f8717a3117329947c5b6501327",
                "vaccine_pic":"281736c5b08717a31501329947f13d57",
                "health_code_status":1,
                "vaccine_status":2,
                "area_id":440300,
                "sign_time":"2021-08-09 10:09:34",
                "company_id":1102,
                "create_time":"2021-08-09 10:09:34"
            }
        ],
        "page_index":1
    }
}
```

#### 9.2 underTaking

```
疫情承诺书详情
```

##### Url

```
/api/v1/platform/epidemic/underTaking
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | long | 是       | 打卡记录id |

示例:

```json
{
    "platform_id":1101,
    "id":1111,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名    | 类型   | 是否必填 | 描述     |
| --------- | ------ | -------- | -------- |
| name      | string | 是       | 司机姓名 |
| id_no     | string | 是       | 身份证号 |
| plate_no  | string | 是       | 车牌号码 |
| sign_date | string | 是       | 打卡日期 |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "name": "张三",
        "id_no":"44030484199397232876",
        "plate_no":"粤B 98N95",
        "sign_date":"2021-08-10"
    }
}
```

### 10 withdraw 提现

#### 10.1 getWithdrawRule

```
获取提现规则
```

##### Url

```
/api/v1/platform/withdraw/getWithdrawRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |

示例:

```json
{
    "platform_id":1101,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名        | 类型   | 是否必填 | 描述                              |
| ------------- | ------ | -------- | --------------------------------- |
| platform_id   | int    | 是       | 出行平台id                        |
| max_amount    | int    | 是       | 日提现最高总金额                  |
| unit_amount   | int    | 是       | 日单次提现最大金额                |
| times         | int    | 是       | 日提现次数                        |
| freeze_day    | int    | 是       | 流水冻结天数                      |
| withdraw_day  | string | 是       | 周每提现日，“2,5”表示“周二，周五” |
| withdraw_hour | string | 是       | 日提现时间，"9,22"表示“09点-22点” |
| private_key   | string | 是       | 交易密钥，数据经过加密处理        |
| public_key    | string | 是       | 交易公钥，数据经过加密处理        |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "platform_id": 1101,
        "max_amount": 45000,
        "unit_amount": 15000,
        "times": 3,
        "freeze_day": 7,
        "withdraw_day": "2,5",
        "withdraw_hour": "9,22",
        "private_key": "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ,
        "public_key": "MIICXgIBAAKBgQDHCprZUGVlmlA2C/lfE"
    }
}
```

#### 10.2 setWithdrawRule

```
设置提现规则
```

##### Url

```
/api/v1/platform/withdraw/setWithdrawRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名        | 类型   | 是否必填 | 描述                              |
| ------------- | ------ | -------- | --------------------------------- |
| platform_id   | int    | 是       | 出行平台id                        |
| max_amount    | int    | 是       | 日提现最高总金额                  |
| unit_amount   | int    | 是       | 日单次提现最大金额                |
| times         | int    | 是       | 日提现次数                        |
| freeze_day    | int    | 是       | 流水冻结天数                      |
| withdraw_day  | string | 是       | 周每提现日，“2,5”表示“周二，周五” |
| withdraw_hour | string | 是       | 日提现时间，"9,22"表示“09点-22点” |
| private_key   | string | 是       | 交易密钥，原始密钥数据，不加密    |
| public_key    | string | 是       | 交易公钥，原始密钥数据，不加密    |

示例:

```json
{
    "platform_id": 1101,
    "max_amount": 45000,
    "unit_amount": 15000,
    "times": 3,
    "freeze_day": 7,
    "withdraw_day": "2,5",
    "withdraw_hour": "9,22",
    "private_key": "AQUAA4GNADCBMIGfMA0GCSqGSIb3DQEBiQ",
    "public_key": "HCprZUGVlmlA2C/lfEMIICXgIBAAKBgQD"
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名        | 类型   | 是否必填 | 描述                              |
| ------------- | ------ | -------- | --------------------------------- |
| platform_id   | int    | 是       | 出行平台id                        |
| max_amount    | int    | 是       | 日提现最高总金额                  |
| unit_amount   | int    | 是       | 日单次提现最大金额                |
| times         | int    | 是       | 日提现次数                        |
| freeze_day    | int    | 是       | 流水冻结天数                      |
| withdraw_day  | string | 是       | 周每提现日，“2,5”表示“周二，周五” |
| withdraw_hour | string | 是       | 日提现时间，"9,22"表示“09点-22点” |
| private_key   | string | 是       | 交易密钥，数据经过加密处理        |
| public_key    | string | 是       | 交易公钥，数据经过加密处理        |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

### 11 log 操作日志

#### 11.1 showLog

```
疫情打卡列表
```

##### Url

```
/api/v1/platform/log/showLog
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型   | 是否必填 | 描述                                 |
| ----------- | ------ | -------- | ------------------------------------ |
| platform_id | int    | 是       | 出行平台id                           |
| res_id      | string | 是       | 操作对象，如：订单号，司机id等       |
| res_type    | int    | 是       | 操作类型，具体见附录中操作类型码定义 |

示例:

```json
{
    "platform_id":1101,
    "res_id":"4295067297",
    "res_type":8,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名               | 类型   | 是否必填 | 描述                              |
| -------------------- | ------ | -------- | --------------------------------- |
| log_list             | array  | 是       | 打卡列表                          |
| log_list.id          | long   | 是       | 记录id                            |
| log_list.platform_id | int    | 是       | 出行平台id                        |
| log_list.work_id     | long   | 是       | 工单号                            |
| log_list.res_id      | string | 是       | 操作对象id                        |
| log_list.res_type    | float  | 是       | 操作对象类型                      |
| log_list.type        | string | 是       | 操作动作                          |
| log_list.before      | string | 是       | 修改前内容                        |
| log_list.reasons     | string | 是       | 修改原因                          |
| log_list.remarks     | int    | 是       | 修改备注                          |
| log_list.submit      | int    | 是       | submit 信息                       |
| log_list.result      | int    | 是       | result 信息                       |
| log_list.user_id     | int    | 是       | 操作人id                          |
| log_list.user_name   | string | 是       | 操作人姓名                        |
| log_list.create_time | int    | 是       | 记录创建时间                      |
| log_list.status      | string | 是       | 操作结果标识<br />1:成功，2：失败 |
| page_index           | int    | 是       | 当前页码                          |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "log_list": [
            {
                "id": 6,
                "platform_id": 1101,
                "work_id": "123456",
                "res_id": "4295067297",
                "res_type": 8,
                "type": 8001,
                "before": "",
                "reasons": "账户奖励20.00元",
                "remarks": "让你开心一下...",
                "submit": "{\"platform_id\":1101,\"driver_id\":4295067297,\"cost\":2000,\"remarks\":\"让你开心一下...\",\"work_id\":123456}",
                "result": "{\"code\":0,\"message\":\"Success\"}",
                "user_id": "123456",
                "user_name": "admin",
                "create_time": "2021-09-10 10:26:20",
                "status": 1
            }
        ]
    }
}
```

### 12 system 系统设置

#### 12.1 dCancelRuleList

```
司机取消规则列表
```

##### Url

```
/api/v1/platform/system/dCancelRuleList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述          |
| ----------- | ---- | -------- | ------------- |
| platform_id | int  | 是       | 出行平台id    |
| city        | int  | 否       | 城市编码      |
| page_no     | int  | 是       | 页码，从1开始 |
| page_size   | int  | 是       | 每页记录数    |

示例:

```json
{
    "platform_id":1101,
    "city":"0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                | 类型   | 是否必填 | 描述                       |
| --------------------- | ------ | -------- | -------------------------- |
| total_count           | int    | 是       | 总记录数，用于分页         |
| rule_list             | array  | 是       | 取消规则                   |
| rule_list.id          | long   | 是       | 记录id                     |
| rule_list.platform_id | int    | 是       | 出行平台id                 |
| rule_list.city        | long   | 是       | 城市编码                   |
| rule_list.count       | string | 是       | 取消次数                   |
| rule_list.status      | float  | 是       | 状态<br />0：无效；1：有效 |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "rule_list": [
            {
                "id": 1,
                "platform_id":1101,
                "city": 440300,
                "count":2,
                "status":1
            }
        ],
        "page_index":1
    }
}
```

#### 12.2 dAddCancelRule

```
添加司机取消规则
```

##### Url

```
/api/v1/platform/system/dAddCancelRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| city        | int  | 是       | 城市编码   |
| count       | int  | 是       | 取消次数   |

示例:

```json
{
    "platform_id":1101,
    "city":"440300,
    "count":2,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 12.3 dEditCancelRule

```
编辑取消规则
```

##### Url

```
/api/v1/platform/system/dEditCancelRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | int  | 是       | 记录id     |
| count       | int  | 是       | 取消次数   |

示例:

```json
{
    "platform_id":1101,
    "id":"12,
    "count":2,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 12.4 dGetCancelRule

```
获取司机取消规则
```

##### Url

```
/api/v1/platform/system/dGetCancelRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | int  | 是       | 记录id     |

示例:

```json
{
    "platform_id":1101,
    "id":"12,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
    	"id": 1,
        "platform_id":1101,
        "city": 440300,
        "count":2,
        "status":1
    }
}
```

#### 12.4 dSetCancelRuleStatus

```
设置司机取消规则状态
```

##### Url

```
/api/v1/platform/system/dSetCancelRuleStatus
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述                         |
| ----------- | ---- | -------- | ---------------------------- |
| platform_id | int  | 是       | 出行平台id                   |
| id          | int  | 是       | 记录id                       |
| status      | int  | 是       | 状态：<br />0：无效；1：有效 |

示例:

```json
{
    "platform_id":1101,
    "id":"12,
    "status":1,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
    	"id": 1,
        "platform_id":1101,
        "city": 440300,
        "count":2,
        "status":1
    }
}
```

#### 12.6 pCancelRuleList

```
乘客取消规则列表
```

##### Url

```
/api/v1/platform/system/pCancelRuleList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述          |
| ----------- | ---- | -------- | ------------- |
| platform_id | int  | 是       | 出行平台id    |
| channel     | int  | 否       | 订单渠道号    |
| city        | int  | 否       | 城市编码      |
| page_no     | int  | 是       | 页码，从1开始 |
| page_size   | int  | 是       | 每页记录数    |

示例:

```json
{
    "platform_id":1101,
    "channel":0,
    "city":"0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                     | 类型   | 是否必填 | 描述                       |
| -------------------------- | ------ | -------- | -------------------------- |
| total_count                | int    | 是       | 总记录数，用于分页         |
| rule_list                  | array  | 是       | 取消规则                   |
| rule_list.id               | long   | 是       | 记录id                     |
| rule_list.platform_id      | int    | 是       | 出行平台id                 |
| rule_list.channel          | int    | 是       | 订单渠道号                 |
| rule_list.city             | long   | 是       | 城市编码                   |
| rule_list.district         | string | 是       | 区号                       |
| rule_list.strived_duration | int    | 是       | 抢单时长，秒               |
| rule_list.arrived_duration | int    | 是       | 到达时长，秒               |
| rule_list.strived_fee      | int    | 是       | 抢单后取消费，单位分       |
| rule_list.arrived_fee      | int    | 是       | 到达后取消费，单位分       |
| rule_list.status           | float  | 是       | 状态<br />0：无效；1：有效 |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "rule_list": [
            {
                "id": 1,
                "platform_id":1101,
                "channel":10000,
                "city": 440300,
                "district":"0755",
                "strived_duration":180,
                "arrived_duration":180,
                "strived_fee":300,
                "arrived_fee":300,
                "status":1
            }
        ],
        "page_index":1
    }
}
```

#### 12.7 pAddCancelRule

```
添加乘客取消规则
```

##### Url

```
/api/v1/platform/system/pAddCancelRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名           | 类型   | 是否必填 | 描述                 |
| ---------------- | ------ | -------- | -------------------- |
| platform_id      | int    | 是       | 出行平台id           |
| channel          | int    | 是       | 订单渠道号           |
| city             | long   | 是       | 城市编码             |
| district         | string | 是       | 区号                 |
| strived_duration | int    | 是       | 抢单时长，秒         |
| arrived_duration | int    | 是       | 到达时长，秒         |
| strived_fee      | int    | 是       | 抢单后取消费，单位分 |
| arrived_fee      | int    | 是       | 到达后取消费，单位分 |

示例:

```json
{
    "platform_id":1101,
    "channel":10000,
    "city": 440300,
    "district":"0755",
    "strived_duration":180,
    "arrived_duration":180,
    "strived_fee":300,
    "arrived_fee":300,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

####  12.8 pEditCancelRule

```
编辑乘客取消规则
```

##### Url

```
/api/v1/platform/system/pEditCancelRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名           | 类型 | 是否必填 | 描述                 |
| ---------------- | ---- | -------- | -------------------- |
| platform_id      | int  | 是       | 出行平台id           |
| id               | long | 是       | 记录id               |
| strived_duration | int  | 是       | 抢单时长，秒         |
| arrived_duration | int  | 是       | 到达时长，秒         |
| strived_fee      | int  | 是       | 抢单后取消费，单位分 |
| arrived_fee      | int  | 是       | 到达后取消费，单位分 |

示例:

```json
{
    "platform_id":1101,
    "id":111,
    "strived_duration":180,
    "arrived_duration":180,
    "strived_fee":300,
    "arrived_fee":300,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 12.9 pGetCancelRule

```
获取乘客取消规则
```

##### Url

```
/api/v1/platform/system/pGetCancelRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | long | 是       | 记录id     |

示例:

```json
{
    "platform_id":1101,
    "id":111,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
    	"id": 1,
        "platform_id":1101,
        "channel":10000,
        "city": 440300,
        "district":"0755",
        "strived_duration":180,
        "arrived_duration":180,
        "strived_fee":300,
        "arrived_fee":300,
        "status":1
    }
}
```

#### 12.10 pGetCancelRule

```
获取乘客取消规则
```

##### Url

```
/api/v1/platform/system/pGetCancelRule
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述                       |
| ----------- | ---- | -------- | -------------------------- |
| platform_id | int  | 是       | 出行平台id                 |
| id          | long | 是       | 记录id                     |
| status      | int  | 是       | 状态<br />0：无效；1：有效 |

示例:

```json
{
    "platform_id":1101,
    "id":111,
    "status":1
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

### 13 advance 垫付

#### 13.1 advanceConfigList

```
垫付规则列表
```

##### Url

```
/api/v1/platform/advance/advanceConfigList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述                                              |
| ----------- | ---- | -------- | ------------------------------------------------- |
| platform_id | int  | 是       | 出行平台id                                        |
| channel     | int  | 否       | 订单渠道号                                        |
| city        | int  | 否       | 城市编码                                          |
| status      | int  | 否       | 状态<br />0：全部；<br />1：有效；<br />2：无效； |
| page_no     | int  | 是       | 页码，从1开始                                     |
| page_size   | int  | 是       | 每页记录数                                        |

示例:

```json
{
    "platform_id":1101,
    "channel":0,
    "city":"0,
    "status":0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                    | 类型  | 是否必填 | 描述                       |
| ------------------------- | ----- | -------- | -------------------------- |
| total_count               | int   | 是       | 总记录数，用于分页         |
| advance_list              | array | 是       | 垫付规则                   |
| rule_list.id              | long  | 是       | 记录id                     |
| rule_list.platform_id     | int   | 是       | 出行平台id                 |
| rule_list.channel         | int   | 是       | 订单渠道号                 |
| rule_list.city            | long  | 是       | 城市编码                   |
| rule_list.order_min_fee   | int   | 是       | 垫付金额最低值(分)         |
| rule_list.advance_max_fee | int   | 是       | 累计当日封顶值(分)         |
| rule_list.status          | float | 是       | 状态<br />1：无效；2：有效 |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "rule_list": [
            {
                "id": 1,
                "platform_id":1101,
                "channel":10000,
                "city": 440300,
                "order_min_fee":5000,
                "advance_max_fee":30000,
                "status":1
            }
        ],
        "page_index":1
    }
}
```

#### 13.2 addAdvanceConfig

```
添加垫付规则
```

##### Url

```
/api/v1/platform/advance/addAdvanceConfig
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名          | 类型 | 是否必填 | 描述               |
| --------------- | ---- | -------- | ------------------ |
| platform_id     | int  | 是       | 出行平台id         |
| channel         | int  | 是       | 订单渠道号         |
| city            | long | 是       | 城市编码           |
| order_min_fee   | int  | 是       | 垫付金额最低值(分) |
| advance_max_fee | int  | 是       | 累计当日封顶值(分) |

示例:

```json
{
    "platform_id":1101,
    "channel":10000,
    "city": 440300,
    "order_min_fee":5000,
    "advance_max_fee":30000,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 13.3 editAdvanceConfig

```
编辑垫付规则
```

##### Url

```
/api/v1/platform/advance/editAdvanceConfig
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名          | 类型 | 是否必填 | 描述               |
| --------------- | ---- | -------- | ------------------ |
| platform_id     | int  | 是       | 出行平台id         |
| id              | long | 是       | 记录id             |
| order_min_fee   | int  | 是       | 垫付金额最低值(分) |
| advance_max_fee | int  | 是       | 累计当日封顶值(分) |

示例:

```json
{
    "platform_id":1101,
    "id":123,
    "order_min_fee":5000,
    "advance_max_fee":30000,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 13.4 getAdvanceConfig

```
获取垫付规则
```

##### Url

```
/api/v1/platform/advance/getAdvanceConfig
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | long | 是       | 记录id     |

示例:

```json
{
    "platform_id":1101,
    "id":123,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名          | 类型  | 是否必填 | 描述                       |
| --------------- | ----- | -------- | -------------------------- |
| id              | long  | 是       | 记录id                     |
| platform_id     | int   | 是       | 出行平台id                 |
| channel         | int   | 是       | 订单渠道号                 |
| city            | long  | 是       | 城市编码                   |
| order_min_fee   | int   | 是       | 垫付金额最低值(分)         |
| advance_max_fee | int   | 是       | 累计当日封顶值(分)         |
| status          | float | 是       | 状态<br />1：无效；2：有效 |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data":{
    	"id": 1,
        "platform_id":1101,
        "channel":10000,
        "city": 440300,
        "order_min_fee":5000,
        "advance_max_fee":30000,
        "status":1
    }
}
```

#### 13.5 setAdvanceConfigStatus

```
设置垫付规则状态
```

##### Url

```
/api/v1/platform/advance/setAdvanceConfigStatus
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | long | 是       | 记录id     |
| status      | int  | 是       | 状态<br /> |

示例:

```json
{
    "platform_id":1101,
    "id":123,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

### 14 common 公共接口

```
公共模块
```
#### 14.1 uoloadFile

```
上传文件接口
```

##### Url
```
/api/v1/common/uploadFile
```

##### Method

```
Http Post multipart/form-data
```

##### Param

| 参数名    | 类型   | 是否必填 | 描述   |
| --------- | ------ | -------- | ------ |
| file | file | 是       | 上传文件 |

##### Response

| 参数名      | 类型   | 是否必填 | 描述          |
| ----------- | ------ | -------- | ------------- |
| key | string    | 是       | 上传文件的可查看key值    |
示例:
```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "key": "2fec45ac6357ce960141eaee1da6d7e9.gif"
    }
}
```

#### 14.2 showFile

```
显示图片接口(注：不需要公共参数)
```

##### Url
```
/api/v1/common/showFile
```

##### Method

```
Http Get 
```

##### Param

| 参数名    | 类型   | 是否必填 | 描述   |
| --------- | ------ | -------- | ------ |
| key | string | 是       | 文件的可查看key值 |

示例:

```
http://1.14.246.194:8200/api/v1/common/showFile?key=2fec45ac6357ce960141eaee1da6d7e9.gif
```

##### Response

| 参数名      | 类型   | 是否必填 | 描述          |
| ----------- | ------ | -------- | ------------- |
| key | string    | 是       | 上传文件的可查看key值    |

<br />
示例:

![pic](http://1.14.246.194:8200/api/v1/common/showFile?key=2fec45ac6357ce960141eaee1da6d7e9.gif)

<br />

### 15 channel 平台渠道商

#### 15.1 platformChannelList

```
平台渠道商列表
```

##### Url

```
/api/v1/platform/channel/platformChannelList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名         | 类型   | 是否必填 | 描述                                                         |
| -------------- | ------ | -------- | ------------------------------------------------------------ |
| platform_id    | int    | 是       | 出行平台id                                                   |
| org_code       | string | 否       | 机构编码                                                     |
| org_name       | string | 否       | 机构全称                                                     |
| org_short_name | string | 否       | 机构简称                                                     |
| status         | int    | 否       | 状态<br />0：全部；<br />1：有效；<br />2：无效；            |
| biz_status     | int    | 否       | 状态<br />0：全部；<br />1：合作中；<br />2：冻结中；<br />3：已终止 |
| page_no        | int    | 是       | 页码，从1开始                                                |
| page_size      | int    | 是       | 每页记录数                                                   |

示例:

```json
{
    "platform_id":1101,
    "org_code":"",
    "org_name":"",
    "org_short_name":"",
    "status":0,
    "biz_status":0,
    "page_no":1,
    "page_size":10,
    "user_id":8589934595,
    "token":"vxJcsr6hAW0PEbcUEMR3Xdx............."
}
```

##### Response

| 参数名                            | 类型   | 是否必填 | 描述                                      |
| --------------------------------- | ------ | -------- | ----------------------------------------- |
| total_count                       | int    | 是       | 总记录数，用于分页                        |
| channel_list                      | array  | 是       | 渠道合作商列表                            |
| channel_list.id                   | long   | 是       | 渠道合作商id                              |
| channel_list.platform_id          | int    | 是       | 出行平台id                                |
| channel_list.org_code             | string | 是       | 机构编码                                  |
| channel_list.org_name             | string | 是       | 机构全称                                  |
| channel_list.operator_id          | string | 是       | 营业执照唯一简码9位                       |
| channel_list.org_credit_code      | string | 是       | 统一信用代码                              |
| channel_list.org_short_name       | string | 是       | 机构简称                                  |
| channel_list.legal_name           | string | 是       | 法人姓名                                  |
| channel_list.legal_phone          | string | 是       | 法人手机号码                              |
| channel_list.legal_id_card        | string | 是       | 法人身份证号码                            |
| channel_list.contact_name         | string | 是       | 联系人姓名                                |
| channel_list.contact_phone        | string | 是       | 联系人手机号码                            |
| channel_list.org_register_address | string | 是       | 机构注册地址                              |
| channel_list.org_office_address   | string | 是       | 机构办公地址                              |
| channel_list.status               | int    | 是       | 状态：<br />1:无效；2:有效                |
| channel_list.biz_status           | int    | 是       | 合作状态：<br />1:合作中;2:冻结中；3:终止 |
| channel_list.remarks              | string | 是       | 备注信息                                  |
| channel_list.create_time          | string | 是       | 创建时间                                  |
| channel_list.update_time          | string | 是       | 更新时间                                  |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "channel_list": [
            {
                "id": 100001,
                "platform_id":1101,
                "org_code":"123",
                "org_name":"渠道合作商全称",
                "operator_id":"12345",
                "org_credit_code":"12345",
                "org_short_name":"XX合作商",
                "legal_name":"张三",
                "legal_phone":"13900992203",
                "legal_id_card":"440585198312082876",
                "contact_name":"李四",
                "contact_phone":"13622834958",
                "org_register_address":"xxxxxxxxxxx",
                "org_office_address":"xxxxxxxxx",
                "status":1,
                "biz_status":1,
                "remarks":"xxxxxx",
                "create_time":"2021-90-1314:51:23",
                "update_time":"2021-90-1314:51:23"
            }
        ],
        "page_index":1
    }
}
```

#### 15.2 addPlatformChannel

```
添加平台渠道商
```

##### Url

```
/api/v1/platform/channel/addPlatformChannel
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名               | 类型   | 是否必填 | 描述                |
| -------------------- | ------ | -------- | ------------------- |
| platform_id          | int    | 是       | 出行平台id          |
| org_code             | string | 否       | 机构编码            |
| org_name             | string | 是       | 机构全称            |
| operator_id          | string | 否       | 营业执照唯一简码9位 |
| org_credit_code      | string | 否       | 统一信用代码        |
| org_short_name       | string | 是       | 机构简称            |
| legal_name           | string | 否       | 法人姓名            |
| legal_phone          | string | 否       | 法人手机号码        |
| legal_id_card        | string | 否       | 法人身份证号码      |
| contact_name         | string | 否       | 联系人姓名          |
| contact_phone        | string | 否       | 联系人手机号码      |
| org_register_address | string | 否       | 机构注册地址        |
| org_office_address   | string | 否       | 机构办公地址        |
| remarks              | string | 否       | 备注信息            |

示例:

```json
{
    "platform_id":1101,
    "org_code":"123",
    "org_name":"渠道合作商全称",
    "operator_id":"12345",
    "org_credit_code":"12345",
    "org_short_name":"XX合作商",
    "legal_name":"张三",
    "legal_phone":"13900992203",
    "legal_id_card":"440585198312082876",
    "contact_name":"李四",
    "contact_phone":"13622834958",
    "org_register_address":"xxxxxxxxxxx",
    "org_office_address":"xxxxxxx",
    "remarks":"xxxxxx"
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 15.3 editPlatformChannel

```
编辑平台渠道商
```

##### Url

```
/api/v1/platform/channel/editPlatformChannel
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名               | 类型   | 是否必填 | 描述                |
| -------------------- | ------ | -------- | ------------------- |
| platform_id          | int    | 是       | 出行平台id          |
| id                   | long   | 是       | 渠道合作商id        |
| org_code             | string | 否       | 机构编码            |
| org_name             | string | 是       | 机构全称            |
| operator_id          | string | 否       | 营业执照唯一简码9位 |
| org_credit_code      | string | 否       | 统一信用代码        |
| org_short_name       | string | 是       | 机构简称            |
| legal_name           | string | 否       | 法人姓名            |
| legal_phone          | string | 否       | 法人手机号码        |
| legal_id_card        | string | 否       | 法人身份证号码      |
| contact_name         | string | 否       | 联系人姓名          |
| contact_phone        | string | 否       | 联系人手机号码      |
| org_register_address | string | 否       | 机构注册地址        |
| org_office_address   | string | 否       | 机构办公地址        |
| remarks              | string | 否       | 备注信息            |

示例:

```json
{
	"platform_id":1101,
    "id":100001,
    "org_code":"123",
    "org_name":"渠道合作商全称",
    "operator_id":"12345",
    "org_credit_code":"12345",
    "org_short_name":"XX合作商",
    "legal_name":"张三",
    "legal_phone":"13900992203",
    "legal_id_card":"440585198312082876",
    "contact_name":"李四",
    "contact_phone":"13622834958",
    "org_register_address":"xxxxxxxxxxx",
    "org_office_address":"xxxxxxx",
    "remarks":"xxxxxx"
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 15.4 setPlatformChannelStatus

```
设置平台渠道商状态
```

##### Url

```
/api/v1/platform/channel/setPlatformChannelStatus
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述                       |
| ----------- | ---- | -------- | -------------------------- |
| platform_id | int  | 是       | 出行平台id                 |
| id          | long | 是       | 渠道合作商id               |
| status      | int  | 是       | 状态：<br />1:无效；2:有效 |

示例:

```json
{
	"platform_id":1101,
    "id":100001,
    "status":1
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 15.5 setPlatformChannelBizStatus

```
设置平台渠道商状态
```

##### Url

```
/api/v1/platform/channel/setPlatformChannelBizStatus
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述                                      |
| ----------- | ---- | -------- | ----------------------------------------- |
| platform_id | int  | 是       | 出行平台id                                |
| id          | long | 是       | 渠道合作商id                              |
| biz_status  | int  | 是       | 合作状态：<br />1:合作中;2:冻结中；3:终止 |

示例:

```json
{
	"platform_id":1101,
    "id":100001,
    "biz_status":1
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 15.6 getPlatformChannel

```
获取平台渠道商详情
```

##### Url

```
/api/v1/platform/channel/getPlatformChannel
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述         |
| ----------- | ---- | -------- | ------------ |
| platform_id | int  | 是       | 出行平台id   |
| id          | long | 是       | 渠道合作商id |

示例:

```json
{
	"platform_id":1101,
    "id":100001
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "id": 100001,
        "platform_id": 1101,
        "org_code": "123",
        "org_name": "渠道合作商全称",
        "operator_id": "12345",
        "org_credit_code": "12345",
        "org_short_name": "XX合作商",
        "legal_name": "张三",
        "legal_phone": "13900992203",
        "legal_id_card": "440585198312082876",
        "contact_name": "李四",
        "contact_phone": "13622834958",
        "org_register_address": "xxxxxxxxxxx",
        "org_office_address": "xxxxxxx",
        "status": 1,
        "biz_status": 1,
        "remarks": "xxxxxx",
        "create_time": "2021-10-21 15:20:17",
        "update_time": "2021-10-21 07:30:03"
    }
}
```

### 16 message 消息推送

#### 16.1 addMessage

```
添加消息推送
```

##### Url

```
/api/v1/platform/message/addMessage
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名          | 类型   | 是否必填 | 描述                                                         |
| --------------- | ------ | -------- | ------------------------------------------------------------ |
| platform_id     | int    | 是       | 出行平台id                                                   |
| type            | int    | 是       | 消息类型：<br />1:安全消息;2:活动消息3:其他消息              |
| city_id         | int    | 是       | 城市编码                                                     |
| range_person    | int    | 是       | 发送范围 <br />0：全部司机；1：指定司机；2:IOS，3：安卓      |
| content_title   | string | 是       | 消息标题                                                     |
| content         | string | 是       | 消息内容                                                     |
| content_url     | string | 否       | 消息链接                                                     |
| content_summary | string | 否       | 消息简介                                                     |
| send_time       | string | 是       | 发送时间                                                     |
| end_time        | string | 是       | 消息结束时间                                                 |
| driver_phone    | string | 否       | 当range_person 为1时，需要传driver_phone，以";"分隔司机手机号 |

示例:

```json
{
    "platform_id": 1101,
    "type":1,
    "city_id":440300,
    "range_person":1,
    "content_title":"content_title",
    "content":"content",
    "content_url":"httts://www.baidu.com",
    "content_summary":"content_summary",
    "send_time":"2021-10-26 17:00:00",
    "end_time":"2021-10-26 23:59:59",
    "driver_phone":"10010001113;10010001115",
    "user_id": 8589934595,
    "token": "5bAnQfebG6oTV2oy5LEbFBFTEpcPqtsrteUyhOribCA0yk0OwiAQR_G7_NcsQD4CXIaQdjTEtmOmw8p4d6PG3fsl74nH1vXKsrexojpnncE8Sb7MMZfiQyzR4OQpC6FeDIS3Xyjf6Wj9Rqjur3VK18EHarLWYBHqSk3H_pmSD9nbkMLrHQAA__8=",
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 16.2 editMessage

```
编辑消息推送
```

##### Url

```
/api/v1/platform/message/editMessage
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名          | 类型   | 是否必填 | 描述                                                         |
| --------------- | ------ | -------- | ------------------------------------------------------------ |
| platform_id     | int    | 是       | 出行平台id                                                   |
| id              | long   | 是       | 消息id                                                       |
| type            | int    | 是       | 消息类型：<br />1:安全消息;2:活动消息3:其他消息              |
| city_id         | int    | 是       | 城市编码                                                     |
| range_person    | int    | 是       | 发送范围 <br />0：全部司机；1：指定司机；2:IOS，3：安卓      |
| content_title   | string | 是       | 消息标题                                                     |
| content         | string | 是       | 消息内容                                                     |
| content_url     | string | 否       | 消息链接                                                     |
| content_summary | string | 否       | 消息简介                                                     |
| send_time       | string | 是       | 发送时间                                                     |
| end_time        | string | 是       | 消息结束时间                                                 |
| driver_phone    | string | 否       | 当range_person 为1时，需要传driver_phone，以";"分隔司机手机号 |

示例:

```json
{
    "platform_id": 1101,
    "id":10001,
    "type":1,
    "city_id":440300,
    "range_person":1,
    "content_title":"content_title",
    "content":"content",
    "content_url":"httts://www.baidu.com",
    "content_summary":"content_summary",
    "send_time":"2021-10-26 17:00:00",
    "end_time":"2021-10-26 23:59:59",
    "driver_phone":"10010001113;10010001115",
    "user_id": 8589934595,
    "token": "5bAnQfebG6oTV2oy5LEbFBFTEpcPqtsrteUyhOribCA0yk0OwiAQR_G7_NcsQD4CXIaQdjTEtmOmw8p4d6PG3fsl74nH1vXKsrexojpnncE8Sb7MMZfiQyzR4OQpC6FeDIS3Xyjf6Wj9Rqjur3VK18EHarLWYBHqSk3H_pmSD9nbkMLrHQAA__8=",
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 16.3 getMessage

```
查看消息推送
```

##### Url

```
/api/v1/platform/message/getMessage
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | long | 是       | 消息id     |

示例:

```json
{
    "platform_id": 1101,
    "id":10007,
    "user_id": 8589934595,
    "token": "5bAnQfebG6oTV2oy5LEbFBFTEpcPqtsrteUyhOribCA0yk0OwiAQR_G7_NcsQD4CXIaQdjTEtmOmw8p4d6PG3fsl74nH1vXKsrexojpnncE8Sb7MMZfiQyzR4OQpC6FeDIS3Xyjf6Wj9Rqjur3VK18EHarLWYBHqSk3H_pmSD9nbkMLrHQAA__8=",
}
```

##### Response

| 参数名          | 类型   | 是否必填 | 描述                                                         |
| --------------- | ------ | -------- | ------------------------------------------------------------ |
| id              | long   | 是       | 消息id                                                       |
| platform_id     | int    | 是       | 出行平台id                                                   |
| type            | int    | 是       | 消息类型：<br />1:安全消息;2:活动消息3:其他消息              |
| city_id         | int    | 是       | 城市编码                                                     |
| range_person    | int    | 是       | 发送范围 <br />0：全部司机；1：指定司机；2:IOS，3：安卓      |
| content_title   | string | 是       | 消息标题                                                     |
| content         | string | 是       | 消息内容                                                     |
| content_url     | string | 否       | 消息链接                                                     |
| content_summary | string | 否       | 消息简介                                                     |
| send_time       | string | 是       | 发送时间                                                     |
| end_time        | string | 是       | 消息结束时间                                                 |
| status          | int    | 是       | 状态：<br />1=待审核,2=已通过,3=已拒绝,4=已终止              |
| driver_phone    | string | 否       | 当range_person 为1时，需要传driver_phone，以";"分隔司机手机号 |
| operator_id     | long   | 是       | 操作人id                                                     |
| operator_name   | string | 是       | 操作人                                                       |
| create_time     | string | 是       | 创建时间                                                     |
| update_time     | string | 是       | 更新时间                                                     |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "id": 10007,
        "platform_id": 1101,
        "type": 1,
        "city_id": 440300,
        "range_person": 1,
        "content_title": "content_title",
        "content": "content",
        "content_url": "httts://www.baidu.com",
        "content_summary": "content_summary",
        "send_time": "2021-10-26 17:00:00",
        "end_time": "2021-10-26 23:59:59",
        "status": 2,
        "driver_phone": "10010001113;10010001115",
        "operator_id": 8589934595,
        "operator_name": "ddcx_admin",
        "create_time": "2021-10-26 17:05:54",
        "update_time": "2021-10-26 17:06:39"
    }
}
```

#### 16.4 auditMessage

```
审核消息推送
```

##### Url

```
/api/v1/platform/message/auditMessage
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名       | 类型 | 是否必填 | 描述                             |
| ------------ | ---- | -------- | -------------------------------- |
| platform_id  | int  | 是       | 出行平台id                       |
| id           | long | 是       | 消息id                           |
| audit_status | int  | 是       | 审核状态：<br />1：通过；2：拒绝 |

示例:

```json
{
    "platform_id": 1101,
    "id":10001,
    "audit_status":1,
    "user_id": 8589934595,
    "token": "5bAnQfebG6oTV2oy5LEbFBFTEpcPqtsrteUyhOribCA0yk0OwiAQR_G7_NcsQD4CXIaQdjTEtmOmw8p4d6PG3fsl74nH1vXKsrexojpnncE8Sb7MMZfiQyzR4OQpC6FeDIS3Xyjf6Wj9Rqjur3VK18EHarLWYBHqSk3H_pmSD9nbkMLrHQAA__8=",
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 16.5 stopMessage

```
终止消息推送
```

##### Url

```
/api/v1/platform/message/stopMessage
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名      | 类型 | 是否必填 | 描述       |
| ----------- | ---- | -------- | ---------- |
| platform_id | int  | 是       | 出行平台id |
| id          | long | 是       | 消息id     |

示例:

```json
{
    "platform_id": 1101,
    "id":10001,
    "user_id": 8589934595,
    "token": "5bAnQfebG6oTV2oy5LEbFBFTEpcPqtsrteUyhOribCA0yk0OwiAQR_G7_NcsQD4CXIaQdjTEtmOmw8p4d6PG3fsl74nH1vXKsrexojpnncE8Sb7MMZfiQyzR4OQpC6FeDIS3Xyjf6Wj9Rqjur3VK18EHarLWYBHqSk3H_pmSD9nbkMLrHQAA__8=",
}
```

##### Response

| 参数名 | 类型 | 是否必填 | 描述 |
| ------ | ---- | -------- | ---- |

示例:

```json
{
    "code": 0,
    "message": "Success"
}
```

#### 16.6 messageList

```
消息推送列表
```

##### Url

```
/api/v1/platform/message/messageList
```

##### Method

```
Http Post application/json
```

##### Param

| 参数名       | 类型   | 是否必填 | 描述                                                   |
| ------------ | ------ | -------- | ------------------------------------------------------ |
| platform_id  | int    | 是       | 出行平台id                                             |
| type         | int    | 是       | 消息类型<br />0:全部;1:安全消息;2:活动消息3:其他消息   |
| range_person | int    | 是       | 发送范围<br />0：全部司机；1：指定司机；2:IOS，3：安卓 |
| status       | int    | 是       | 状态<br />0=全部,1=待审核,2=已通过,3=已拒绝,4=已终止   |
| start        | string | 是       | 开始时间                                               |
| end          | string | 是       | 结束时间                                               |
| page_no      | int    | 是       | 页码                                                   |
| page_size    | int    | 是       | 每页记录数                                             |

示例:

```json
{
    "platform_id": 1101,
    "type":0,
    "range_person":0,
    "status":0,
    "start":"",
    "end":"",
    "page_no":1,
    "page_size":10,
    "user_id": 8589934595,
    "token": "5bAnQfebG6oTV2oy5LEbFBFTEpcPqtsrteUyhOribCA0yk0OwiAQR_G7_NcsQD4CXIaQdjTEtmOmw8p4d6PG3fsl74nH1vXKsrexojpnncE8Sb7MMZfiQyzR4OQpC6FeDIS3Xyjf6Wj9Rqjur3VK18EHarLWYBHqSk3H_pmSD9nbkMLrHQAA__8="
}
```

##### Response

| 参数名                  | 类型          | 是否必填 | 描述         |
| ----------------------- | ------------- | -------- | ------------ |
| total_count             | int           | 是       | 总数         |
| message_list            | array[object] | 是       | 消息列表     |
| message.id              | long          | 是       | 消息id       |
| message.platform_id     | int           | 是       | 出行平台id   |
| message.type            | int           | 是       | 消息类型     |
| message.city_id         | int           | 是       | 城市编码     |
| message.range_person    | int           | 是       | 发送范围     |
| message.content_title   | string        | 是       | 消息标题     |
| message.content         | string        | 是       | 消息内容     |
| message.content_url     | string        | 是       | 消息链接     |
| message.content_summary | string        | 是       | 消息简介     |
| message.send_time       | string        | 是       | 发送时间     |
| message.end_time        | string        | 是       | 消息结束时间 |
| message.operator_id     | long          | 是       | 操作人ID     |
| message.operator_name   | string        | 是       | 操作人       |
| message.create_time     | string        | 是       | 创建时间     |
| message.update_time     | string        | 是       | 更新时间     |
| page_index              | int           | 是       | 当前页码     |

示例:

```json
{
    "code": 0,
    "message": "Success",
    "data": {
        "total_count": 1,
        "message_list": [
            {
                "id": 10000,
                "platform_id": 1101,
                "type": 1,
                "city_id": 440300,
                "range_person": 1,
                "content_title": "content_title",
                "content": "content",
                "content_url": "httts://www.baidu.com",
                "content_summary": "content_summary",
                "send_time": "2021-10-26 17:00:00",
                "end_time": "2021-10-26 23:59:59",
                "operator_id": 8589934595,
                "operator_name": "ddcx_admin",
                "create_time": "2021-10-26 16:44:04",
                "update_time": "2021-10-26 16:50:51"
            }
        ],
        "page_index": 1
    }
}
```

## Channel

### 公共Header参数

| 参数名 | 类型   | 是否必填 | 描述                             |
| ------ | ------ | -------- | -------------------------------- |
| Sign   | string | 是       | 签名串，注意参数名是大写开头Sign |

### 公共参数

| 参数名  | 类型   | 是否发填 | 描述                |
| ------- | ------ | -------- | ------------------- |
| user_id | long   | 是       | 当前登录的用户id    |
| token   | string | 是       | 当前登录的用户token |



# 附录

## 签名算法

```
body:post的application/json内容，body进行压缩，将换行,空格去除，如：{"platform_id":1101,"a":"test","b":"value"}
sign_key:分配的签名key字符串

sign = md5(body+sign_key)，取32位md5字符串（小写）
```

