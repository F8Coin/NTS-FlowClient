/* eslint-disable */
import axios from 'axios'
import { urls } from './constants'

// 拼接为get请求需要的形参数据结构
const jsonUrl = (json) => {
    let arr = []
    let str = ''
    for (let i in json) {
        str = i + '=' + json[i]
        arr.push(str)
    }
    return arr.join('&')
}

let user = JSON.parse(localStorage.getItem("userInfo"));
if (user) {
    // axios.defaults.headers.common['token'] = user.token
    axios.defaults.headers.common['X-NTS-Token'] = user.token
}
// //响应拦截器
// axios.interceptors.response.use((response) => {
//     //token 过期
//     if (response.data.status === '200002') {
//         //清空localStorage 重新登录
//         this.$layer.msg('登录超时，请重新登录')
//         localStorage.removeItem('userInfo')
//         localStorage.removeItem('googleAuth')
//         localStorage.removeItem('authMobile')
//         this.$router.replace('/login')
//     }
//     return response
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error)
// });




const fetch = (url, data, method, header) => {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
        // axios.defaults.headers.common['authorization'] = 'Bearer ' + user;
        axios.defaults.headers.common['X-NTS-Token'] = user.token;
    }
    url = url.url
    if (url) {
        for (let k in data) {
            if (url.indexOf(':' + k) !== -1) { // data 是请求的实参
                url = url.replace(':' + k, data[k])
                delete data[k]
            }
        }
    }
    //
    let realUrl = urls.server[process.env.NODE_ENV] + url
        // let realUrl = urls.server.development + url
    let type = method.toLowerCase()
    let res = {}
    var qs = require('qs');
    if (type === 'get') {
        res = axios.get(realUrl + '?' + jsonUrl(data), header)
    } else if (type === 'post') {
        // res = axios.post(realUrl, qs.stringify(data), header)  // "application/x-www-form-urlencoded
        res = axios.post(realUrl, qs.parse(data), header)  // application/json
    } else if (type === 'put') {
        res = axios.put(realUrl, data);
    }
    return res
}

const api = {}

/*
 * TODO NTS 前端接口
 */

    // 注册企业用户/添加用户
    api.regist = params => {
        return fetch(urls.registApi, params, 'post')
    }

    // 登录
    api.login = params => {
        return fetch(urls.loginApi, params, 'post')
    }

    // 消息通知- 消息列表
    api.noticeDataList = params => {
        return fetch(urls.noticeDataListApi, params, 'get')
    }

     // 首页- 获取4G / 卫星 每月流量使用统计
     api.flowMonthData = params => {
        return fetch(urls.flowMonthDataApi, params, 'get')
    }

    // 首页- 获取最近7天购买流量订单数量
    api.weekOrders = params => {
        return fetch(urls.weekOrdersApi, params, 'get')
    }

    // 首页- 获取物联网卡状态
    api.allIotStatus = params => {
        return fetch(urls.allIotStatusApi, params, 'get')
    }

    // 首页- 获取卫星状态
    api.allSatStatus = params => {
        return fetch(urls.allSatStatusApi, params, 'get')
    }

    // 首页- 获取承运商用户的百分比
    api.allCarrierPercent = params => {
        return fetch(urls.allCarrierPercentApi, params, 'get')
    }

    // 首页- 获取流量信息,流量订单数,设备数量
    api.homeData = params => {
        return fetch(urls.homeDataApi, params, 'get')
    }

    // 用户信息
    api.userInfoData = params => {
        return fetch(urls.userInfoDataApi, params, 'get')
    }

    // 添加企业用户
    api.addAccount = params => {
        return fetch(urls.addAccountApi, params, 'post')
    }

    // 账户余额- 企业账户余额
    api.companyAccountBalance = params => {
        return fetch(urls.companyAccountBalanceApi, params, 'post')
    }

    // 运营商--运营商列表
    api.allCarrierListData = params => {
        return fetch(urls.allCarrierDataApi, params, 'get')
    }

    //  设备管理-添加设备
    api.addDevice = params => {
        return fetch(urls.addDeviceApi, params, 'post')
    }

    // 设备管理--设备数据列表
    api.deviceListData = params => {
        return fetch(urls.deviceListDataApi, params, 'get')
    }

    // 设备管理--设备详情
    api.deviceInfoData = params => {
        return fetch(urls.deviceInfoDataApi, params, 'get')
    }

    // 设备管理--设备列表
    api.allDeviceList = params => {
        return fetch(urls.allDeviceListApi, params, 'get')
    }
    
    // 设备管理--模糊查询
    api.terminalIdQuery = params => {
        return fetch(urls.terminalIdQueryApi, params, 'get')
    }

    // 设备管理--SN查询设备
    api.deviceSnQuery = params => {
        return fetch(urls.deviceSnQueryApi, params, 'get')
    }

    // 设备管理--设备分类
    api.deviceTypeData = params => {
        return fetch(urls.deviceTypeDataApi, params, 'get')
    }

    // OCP接口--激活操作
    api.ocpDeviceActive = params => {
        return fetch(urls.ocpDeviceActiveApi, params, 'get')
    }

    // OCP接口--更改操作
    api.ocpDeviceChange = params => {
        return fetch(urls.ocpDeviceChangeApi, params, 'get')
    }

    // OCP接口--禁用操作
    api.ocpDeviceDeactive = params => {
        return fetch(urls.ocpDeviceDeactiveApi, params, 'get')
    }

    // OCP接口--检查连接
    api.ocpDeviceContact = params => {
        return fetch(urls.ocpDeviceContactApi, params, 'get')
    }

    // OCP接口--暂停操作
    api.ocpDeviceSuspend = params => {
        return fetch(urls.ocpDeviceSuspendApi, params, 'get')
    }

    // OCP接口--交换操作
    api.ocpDeviceExchange = params => {
        return fetch(urls.ocpDeviceExchangeApi, params, 'get')
    }

    // OCP接口--启用操作
    api.ocpDeviceUnsuspend = params => {
        return fetch(urls.ocpDeviceUnsuspendApi, params, 'get')
    }

    // 流量管理-卫星流量统计查询
    api.satelliteTotalData = params => {
        return fetch(urls.satelliteTotalDataApi, params, 'get')
    }

    // 流量管理-卫星流量统计日志
    api.satelliteTotalLog = params => {
        return fetch(urls.satelliteTotalLogApi, params, 'get')
    }

    // 流量管理-卫星流量使用日志
    api.satelliteUseLog = params => {
        return fetch(urls.satelliteUseLogApi, params, 'get')
    }

    // 流量套餐- 流量套餐列表
    api.flowPackageType = params => {
        return fetch(urls.flowPackageTypeApi, params, 'get')
    }

    // 流量管理-获取4G卫星流量使用详情(上)
    api.flowTotalInfoUp = params => {
        return fetch(urls.flowTotalInfoUpApi, params, 'get')
    }

    // 流量管理-获取4G卫星流量使用详情(下)
    api.flowTotalInfoDown = params => {
        return fetch(urls.flowTotalInfoDownApi, params, 'get')
    }

    // 订单管理-设备流量购买订单
    api.buyDeviceFlow = params => {
        return fetch(urls.buyDeviceFlowApi, params, 'get')
    }

    // 订单管理-企业流量购买订单
    api.buyCompanyFlow = params => {
        return fetch(urls.buyCompanyFlowApi, params, 'get')
    }

    // 订单管理-企业流量订单列表
    api.orderCompanyFlowList = params => {
        return fetch(urls.orderCompanyFlowListApi, params, 'get')
    }

    // 订单管理-设备流量订单列表
    api.orderDeviceFlowList = params => {
        return fetch(urls.orderDeviceFlowListApi, params, 'get')
    }

    // 支付管理- 流量购买订单
    api.weChatPay = params => {
        return fetch(urls.weChatPayApi, params, 'get')
    }

    // 支付管理- 支付结果
    api.weChatPayResult = params => {
        return fetch(urls.weChatPayResultApi, params, 'get')
    }


export { api }