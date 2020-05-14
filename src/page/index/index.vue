<template>
	<section class="data_section" ref="data_section"> 
		<a href="javascript:void(0)">
			<el-row :gutter="10" class="row_list">
				<el-col :span="8">
					<div class="row_left row_base">
						<!-- <el-col :span="12">
							<div class="pay part1_color data_list rflex">
								<div class="leftItem cflex wflex">
									<p class="investor">{{ $t('index.home_Iot') }}</p>
									<p class="number"><span class="amount"> {{ homeData.usedFlow4G }} </span> <span class="perTitle">({{ $t('index.flow_unit') }})</span></p>
								</div>
								<div class="rightItem">
								</div>
							</div>
						</el-col> -->
						<el-col :span="12">
							<div class="pay part1_color data_list rflex">
								<div class="leftItem cflex wflex">
									<p class="investor">{{ $t('index.home_satellite') }}</p>
									<p class="number"><span class="amount"> {{ homeData.usedFlowSat }} </span> <span class="perTitle">({{ $t('index.flow_unit') }})</span></p>
								</div>
								<div class="rightItem">
									<!-- <i class="fa fa-life-ring" aria-hidden="true"></i> -->
								</div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="pay part2_color data_list rflex">
								<div class="leftItem cflex wflex">
									<p class="investor">可用卫星流量</p>
									<p class="number"><span class="amount"> {{ homeData.surplusFlowSat }} </span> <span class="perTitle">({{ $t('index.flow_unit') }})</span></p>
								</div>
								<div class="rightItem">
									
									<!-- <i class="fa fa-life-ring" aria-hidden="true"></i> -->
								</div>
							</div>
						</el-col>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="row_right row_base">
						<el-col :span="12">
							<div class="pay part3_color data_list rflex">
								<div class="leftItem cflex wflex">
									<p class="investor">{{ $t('index.home_mOrder') }}</p>
									<p class="number">{{ homeData.monthOrder }} <span class="perTitle">( {{ $t('index.order_unit') }} )</span></p>
								</div>
								<div class="rightItem">
									
								</div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="pay part4_color data_list rflex">
								<div class="leftItem cflex wflex">
									<p class="investor">{{ $t('index.home_yOrder') }}</p>
									<p class="number">{{ homeData.yearOrder }} <span class="perTitle">( {{ $t('index.order_unit') }} )</span></p>
								</div>
								<div class="rightItem">
									
								</div>
							</div>
						</el-col>
						
					</div>
				</el-col>
				<el-col :span="8">
					<div class="row_right row_base">
						
						<el-col :span="12">
							<div class="pay part5_color data_list rflex">
								<div class="leftItem cflex wflex">
									<p class="investor">{{ $t('index.home_activeD') }}</p>
									<p class="number">{{ homeData.activateSat}}<span class="perTitle">( {{ $t('index.model_unit') }} )</span></p>
								</div>
								<div class="rightItem">
									
								</div>
							</div>
						</el-col>
						<el-col :span="12">
							<div class="pay part6_color data_list rflex">
								<div class="leftItem cflex wflex">
									<p class="investor">{{ $t('index.home_totalD') }}</p>
									<p class="number">{{ homeData.activate4G }} <span class="perTitle">( {{ $t('index.card_unit') }} )</span></p>
								</div>
								<div class="rightItem">
									
								</div>
							</div>
						</el-col>
					</div>
				</el-col>
			</el-row>
		</a>
		<el-row :gutter="10" class="row_list order_list">
			<el-col :span="7">
				<log-list></log-list>
			</el-col>
			<el-col :span="17">
				<bar-chart type="barChart"></bar-chart>
			</el-col>
		</el-row>
		<el-row :gutter="10" class="row_list order_list">
			<el-col :span="7">
				<pie-chart type="carrierType"></pie-chart>
			</el-col>
			<el-col :span="10">
				<line-chart></line-chart>
			</el-col>
			<el-col :span="7">
				<radar-chart></radar-chart>
			</el-col>
		</el-row> 
	</section>
</template>

<script>
	import {api} from '@/config/api'
	import * as filter from '@/utils/filter'
	import echarts from 'echarts';
	import logList from "./components/logList";
	import barChart from 'cps/echarts/barChart'; // 最近1年流量消耗统计柱形图
	import pieChart from 'cps/echarts/pieChart'; // 承运商用户数量占比
	import radarChart from 'cps/echarts/radarChart'; // 设备管理概况分布
	import lineChart from 'cps/echarts/lineChart'; // 最近7天流量购买订单数统计
	import { getToken } from '@/utils/auth';

    export default {
    	data(){
    		return {
				homeData: {
					activate4G: "0",
					activateSat: "0",
					allDevice4G: "0",
					allDeviceSat: "0",
					monthOrder: "0",
					surplusFlow4G: "0.0",
					surplusFlowSat: "0.0",
					usedFlow4G: "0.0",
					usedFlowSat: "0.0",
					yearOrder: "0"
				}
    		}
    	},
    	components: {
		   logList,
		   barChart,
		   pieChart,
		   radarChart,
		   lineChart
		},	
		created(){
			this.getUserData();
		},
    	mounted(){
			this.getHomeData();
		},
    	methods: {
			async getHomeData() {
				let res = await api.homeData();
				if(res.data.code == 0) {
					// this.showMessage('success',res.data.msg);
					// let dataBothData= objData.dataBoth ? objData.dataBoth : "0.0" ;
					// let orbcommBytesData= objData.orbcommBytes ? objData.orbcommBytes : "0.0"; 
					// let satSumData= ((Number(dataBothData) + Number(orbcommBytesData))/1024).toFixed(2);
					// let cardFlow= objData.cardDataUsage ? (Number(objData.cardDataUsage)/1024).toFixed(2) : "0.0";

					this.homeData={
						usedFlow4G: res.data.data.usedFlow4G ? res.data.data.usedFlow4G : '0.0' ,
						usedFlowSat: res.data.data.usedFlowSat ? (Number(res.data.data.usedFlowSat)/1024).toFixed(2) : "0.0",
						surplusFlowSat: res.data.data.surplusFlowSat ? (Number(res.data.data.surplusFlowSat)/1024).toFixed(2) : "0.0",
						monthOrder: res.data.data.monthOrder ? res.data.data.monthOrder : '0',
						yearOrder: res.data.data.yearOrder ? res.data.data.yearOrder : '0',
						activateSat: res.data.data.activateSat ? res.data.data.activateSat : '0',
						activate4G: res.data.data.activate4G ? res.data.data.activate4G : '0'
					}
				}else {
					this.showMessage('error',res.data.msg);
				}
			},
			async getUserData() {
				let res = await api.userInfoData()
				console.log(res);
			}
    	}
    }
</script>

<style lang="less" scoped>
	.data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
			.orderbarArea{
				height: 370px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				// width:62px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 30px;
				}
			}
		    .number{
				font-size: 22px;
				font-weight: bold;
				.perTitle{
					font-size: 13px;
   				    margin-left: 5px;
				}
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
	}
  
</style>
