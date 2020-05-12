import Vue from 'vue'
import Router from 'vue-router'
import { Layout,Content }  from "../layout"; // 页面整体布局
import { topRouterMap } from "./topRouter";

Vue.use(Router) 
// process.env.NODE_ENV === "development" ? Vue.use(Router) : null;

function filterTopRouterMap(name){
	let router = topRouterMap.find((item) => {
		return item.parentName === name;
	});
	return router.data; // arr
}

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
	'/'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [
	/**
	 * 首页
	 */
	{
		path: '',  
		component: Layout,
		redirect: '/home/index',
		hidden:true
  	},
	/**
	 * 登录
	 */
	{ 	
		path: '/login',
		name: 'login',
		component:() => import('@/page/login'),
		hidden: true
	},
	/**
	 * 401/404
	 */
	{ 	
		path: '/404',
		component: () => import('@/page/errorPage/404'),
		hidden: true
	},
	{ 	
		path: '/401',
		component: () => import('@/page/errorPage/401'),
		hidden: true 
	},
	/**
	 * 首页
	 */
	{
		path: '/home',
		name: 'index',
		component:Layout,
		meta:{
			title:'首页',
		  	icon: 'fa-dashboard',
		},
		noDropdown:true,
		children:[ 
			{
				path:'index', 
				meta:{
					title:'首页', 
					icon:'fa-index',
					routerType:'leftmenu'
				},
        		component: () => import('@/page/index/index'),
			}
		]
	}
]

//注册路由
export default new Router({
	mode:'history', // 默认为'hash'模式
	// base: '/permission/', // 添加根目录,对应服务器部署二级目录
	// base: '/flow/', 
	base: '/ntsflowc/', 
	routes: constantRouterMap  // 不需要权限的路由
})

//异步路由（需要权限的页面）
export const asyncRouterMap = [
	/**
	 * 企业管理
	 */
	// {
	// 	path:'/user',
	// 	name: 'userMenu',
	// 	component:Layout,
	// 	meta: {
	// 		// title:'企业管理', // 一级菜单名称
	// 		title:'账户管理', // 一级菜单名称
	// 		icon: 'fa-user',
	// 	},
	// 	noDropdown:false, // 设置是否有二级或者更多级子菜单,true-有二级; false-没有二级 
	// 	children:[
	// 		{
	// 			path:'userList',
	// 			name:'item1_subMenu1', 
	// 			meta:{
	// 				title:'企业列表', // 二级菜单名称
	// 				// icon:'fa-user',
	// 			  	routerType:'leftmenu'
	// 			},
	// 			component: () => import('@/page/userList/userList'),
	// 		},
	// 		{
	// 			path:'personal',
	// 			name: 'item1_subMenu3', 
	// 			meta:{
	// 				title:'用户中心', 
	// 			  	routerType:'leftmenu'
	// 			},
	// 			component: () => import('@/page/personal/userCenter'),
	// 		}
	// 	]
	// },
	
	/**
	 * 设备管理
	 */
	{
		path:'/device',
		name: 'deviceMenu',
		meta: {
				title:'设备管理',
				icon: 'fa-asterisk',
		},
		component:Layout,
		children:[
			{
				path:'deviceList',
				name:'deviceList_title',
				meta: {
							title:'设备列表',
							icon: 'fa-asterisk',
							routerType:'leftmenu'
						},
				component: () => import('@/page/device/deviceList'),

			},
			// {
			// 	path:'deviceGroup',
			// 	name:'deviceGroup_title',
			// 	meta: {
			// 		title:'设备分布',
			// 		icon: 'fa-asterisk',
			// 		routerType:'leftmenu',
			// 	},
			// 	component: () => import('@/page/device/deviceGroup'),
			// }
	  	]
	},

	/**
	 * 流量管理
	 */
	{
		path:'/flow',
		name: 'flowMenu',
		meta: {
		  title:'流量管理',
		  icon: 'fa fa-database',
		},
		component:Layout,
		children:[
		  {
			path:'flowList',
			name:'flowList_title',
			meta: {
					title:'流量统计',
					icon: 'fa-asterisk',
					routerType:'leftmenu'
			},
			component: () => import('@/page/flow/flowList'),
		  },
		  {
			path:'flowLog',
			name:'flowLog_title',
			meta: {
					title:'流量日志',
					icon: 'fa-asterisk',
					routerType:'leftmenu'
			},
			component: () => import('@/page/flow/flowLog'),
		  },
		  {
			path:'flowBuy',
			name:'flowBuy_title',
			meta: {
					title:'流量购买',
					icon: 'fa-asterisk',
					routerType:'leftmenu'
			},
			component: () => import('@/page/flow/flowBuy'),
		  }
		]
	},

	/**
	 * 订单管理
	 */
	{
		path:'/order',
		name: 'orderMenu',
		meta: {
		  title:'订单管理',
		  icon: 'fa-bar-chart-o',
		},
		component:Layout,
		redirect: '/order/orderList',
		children:[
		  	{
				path:'orderList',
				name:'orderList_title',
				meta: {
					title:'订单列表',
					icon: '',
				},
				component: () => import('@/page/order/orderList')
		  	},
		]
	},

	/**
	 * 统计报表
	 */
	// {
	// 	path: '/report',
	// 	component: Layout,
	// 	name: 'reportMenu',
	// 	meta: {
	// 		title: '统计报表', 
	// 		icon: 'fa fa-pencil-square-o'
	// 	},
	// 	children: [
	// 		{  
	// 			path: 'billReport', 
	// 			name: 'billReportTitle', 
	// 			component: () => import('@/page/errorPage/401'), 
	// 			meta: { 
	// 				title: '计费周期报告',
	// 				noCache: true 
	// 			}
	// 		},
	// 		{
	// 			path: 'optionReport', 
	// 			name: 'optionReportTitle', 
	// 			component: () => import('@/page/errorPage/404'), 
	// 			meta: { 
	// 				title: '使用情况报告', 
	// 				noCache: true
	// 			}
	// 		}
    // 	]
	//   },

	/**
	 * 支付方式管理
	 */
	// {
	// 	path: '/pay',
	// 	component: Layout,
	// 	name: 'payMenu',
	// 	meta: {
	// 		title: '支付方式管理', 
	// 		icon: 'fa fa-money'
	// 	},
	// 	children: [
	// 		{  
	// 			path: 'billReport', 
	// 			name: 'addPayTitle', 
	// 			component: () => import('@/page/errorPage/401'), 
	// 			meta: { 
	// 				title: '添加支付方式',
	// 				noCache: true 
	// 			}
	// 		},
	// 		{
	// 			path: 'optionReport', 
	// 			name: 'suspendPayTitle', 
	// 			component: () => import('@/page/errorPage/404'), 
	// 			meta: { 
	// 				title: '停用支付方式', 
	// 				noCache: true
	// 			}
	// 		}
    // 	]
	// },  
	  
	/**
	 * 信息管理
	 */
	// {
	// 	path: '/information',
	// 	component: Layout,
	// 	name: 'informationMenu',
	// 	meta: {
	// 		title: '信息管理', 
	// 		icon: 'fa-exclamation-triangle'
	// 	},
	// 	children: [
	// 		{  
	// 			path: 'noticeList', 
	// 			name: 'noticeTitle', 
	// 			component: () => import('@/page/errorPage/401'), 
	// 			meta: { 
	// 				title: '公告通知', 
	// 				noCache: true 
	// 			}
	// 		},
	// 		{
	// 			path: 'alarmList', 
	// 			name: 'alarmTitle', 
	// 			component: () => import('@/page/errorPage/404'), 
	// 			meta: { 
	// 				title: '报警信息', 
	// 				noCache: true
	// 			}
	// 		},
	// 		{
	// 			path: 'operationLog', 
	// 			name: 'operationTitle', 
	// 			component: () => import('@/page/errorPage/404'), 
	// 			meta: { 
	// 				title: '操作日志', 
	// 				noCache: true
	// 			}
	// 		}
    // 	]
  	// },  

	/**
	 * 权限设置
	 */
	// {
    // 	path: '/authority',
	// 	name: 'permissionMenu',
	// 	meta: {
	// 			title: '权限设置',
	// 			icon: 'fa-cogs',
	// 			roles: ['admin', 'editor'] // you can set roles in root nav
    // 		},
    // 	component: Layout,
    // 	// redirect: '/permission/page',
    // 	children: [
	// 		{
	// 			path: 'userPermission',
	// 			name: 'userPermission_title',
	// 			meta: {
	// 				title: '用户权限',
	// 				roles: ['admin'] // or you can only set roles in sub nav
	// 			},
	// 			component: () => import('@/page/errorPage/401'),
	// 		},
	// 		{
	// 			path: 'devicePermission',
	// 			name: 'devicePermission_title',
	// 			meta: {
	// 					title: '设备权限',
	// 					roles:['editor']
	// 				},
	// 			component: () => import('@/page/errorPage/404'),
	// 		}
	// 	]
  	// },
  
	{ path: '*', redirect: '/404', hidden: true }
	];
	
	/**
	 *  路由设置要求：
	 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
	 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
	 * 
	 * 按需加载路由组件的2种方法：
	 * 1、component: () => import('@/page/login')
	 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
	 * 
	 * 
	 * 
	 * 什么情况下，路由会定位到404页面?
	 * 路由中redirect:'',不起作用？
	 * 三级子菜单要在顶部展示？
	 * 
	 * 
	 * 
	 */

