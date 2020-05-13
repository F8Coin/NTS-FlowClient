/* eslint-disable */
const urls = {
    server: {
        production: 'http://flow.ntsitech.com/nts',
        development: 'http://flow.ntsitech.com/nts'
        // production: 'http://flow.ntsitech.com/nts-test',
        // development: 'http://flow.ntsitech.com/nts-test'
        // production: 'http://47.106.76.62:8889',
        // development: 'http://47.106.76.62:8889'
    },
    /*
     * TODO NTS 前端接口
     */

    // 注册企业用户/添加用户
    registApi: {
        url: '/api/auth/register'
    } ,
    
    // 登录
    loginApi: {
        url: '/api/auth/login'
    },

    // 消息通知- 消息列表
    noticeDataListApi: {
        url: '/api/notice/list'
    },

    // 首页- 获取4G / 卫星 每月流量使用统计
    flowMonthDataApi: {
        url: '/api/index/get4GStaUseData'
    },

    // 首页- 获取最近7天购买流量订单数量
    weekOrdersApi: {
        url: '/api/index/getBuyFlowOrder'
    },

    // 首页- 获取物联网卡状态
    allIotStatusApi: {
        url: '/api/index/getCardStatus'
    },

    // 首页- 获取卫星状态
    allSatStatusApi: {
        url: '/api/index/getSatStatus'
    },

    // 首页- 获取承运商用户的百分比
    allCarrierPercentApi: {
        url: '/api/index/getDeviceVendorPercentage'
    },

    // 首页- 获取流量信息,流量订单数,设备数量
    homeDataApi: {
        url: '/api/index/getFlowOrderDeviceCount'
    },

    // 用户信息
    userInfoDataApi: {
        url: '/api/user/getUserInfo'
    },

    // 企业管理--添加企业用户
    addAccountApi: {
        url: '/api/company/addUser'
    },

    // 账户余额- 企业账户余额
    companyAccountBalanceApi: {
        url: '/api/wallet/balance'
    },

    // 运营商--运营商列表
    allCarrierDataApi: {
        url: '/api/dict/getCarrierList'
    },

    // 设备管理--添加设备
    addDeviceApi: {
        url: '/api/device/add'
    },

    // 设备管理--设备数据列表
    deviceListDataApi: {
        url: '/api/device/data'
    },

    // 设备管理--设备详情
    deviceInfoDataApi: {
        url: '/api/device/details'
    },

    // 设备管理--设备列表
    allDeviceListApi: {
        url: '/api/device/list'
    },

    // 设备管理--SN查询设备
    deviceSnQueryApi: {
        url: '/api/device/query'
    },

    // 设备管理--模糊查询
    terminalIdQueryApi: {
        url: '/api/device/search'
    },

    // 设备管理--设备分类
    deviceTypeDataApi: {
        url: '/api/device/type'
    },

    // OCP接口--激活操作
    ocpDeviceActiveApi: {
        url: '/api/ocp/activate'
    },

    // OCP接口--更改操作
    ocpDeviceChangeApi: {
        url: '/api/ocp/change'
    },

    // OCP接口--禁用操作
    ocpDeviceDeactiveApi: {
        url: '/api/ocp/deactivate'
    },

    // OCP接口--检查连接
    ocpDeviceContactApi: {
        url: '/api/ocp/echo'
    },

    // OCP接口--暂停操作
    ocpDeviceSuspendApi: {
        url: '/api/ocp/suspend'
    },

    // OCP接口--交换操作
    ocpDeviceExchangeApi: {
        url: '/api/ocp/swap'
    },

    // OCP接口--启用操作
    ocpDeviceUnsuspendApi: {
        url: '/api/ocp/unsuspend'
    },

    // 流量管理-卫星流量统计查询
    satelliteTotalDataApi: {
        url: '/api/flow/satAggSum'
    },

    // 流量管理-卫星流量统计日志
    satelliteTotalLogApi: {
        url: '/api/flow/satAggSumLog'
    },

    // 流量管理-卫星流量使用日志
    satelliteUseLogApi: {
        url: '/api/flow/satDetailLog'
    },

    // 流量套餐- 流量套餐列表
    flowPackageTypeApi: {
        url: '/api/flowPlans/list'
    },

    // 流量管理-获取4G卫星流量使用详情(上)
    flowTotalInfoUpApi: {
        url: '/api/flow/get4GSatUseFlow2'
    },

    // 流量管理-获取4G卫星流量使用详情(下)
    flowTotalInfoDownApi: {
        url: '/api/flow/get4GSatUseFlow'
    },

    // 订单管理-设备流量购买订单
    buyDeviceFlowApi: {
        url: '/api/order/add'
    },

    // 订单管理-企业流量购买订单
    buyCompanyFlowApi: {
        url: '/api/order/buyFlow'
    },

    // 订单管理-企业流量订单列表
    orderCompanyFlowListApi: {
        url: '/api/order/companyFlowList'
    },

    // 订单管理-设备流量订单列表
    orderDeviceFlowListApi: {
        url: '/api/order/deviceFlowList'
    },

    // 支付管理- 流量购买订单
    weChatPayApi: {
        url: '/api/wxPay/flowOrder'
    },

    // 支付管理- 支付结果
    weChatPayResultApi: {
        url: '/api/pay/end'
    }
}

export { urls }