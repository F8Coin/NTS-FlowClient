<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
	import { api } from '@/config/api';
	import echarts from 'echarts';
    import echartsTheme from "cps/echarts/theme/westeros.json";
    
    export default {
        data(){
            return {
				id:"lineChart",
				myChart:null,
				xAxis: [
					{
						data: []
					}
				],
				series: [
					{
						data: []
					}
				]
            }
		},
		created(){
			this.getWeekOrderData();
		},
        mounted(){
            this.loadChart();
        },
		beforeDestroy() {
			if (!this.myChart) {
				return
			}
			this.myChart.dispose();
			this.myChart = null;
        },
        methods: {
			showMessage(type,message){
                this.$message({  // Element ui自带信息弹窗
                    type: type,
                    message: message
                });
			},

			loadChart(){
  				this.$nextTick(() => {
                    echarts.registerTheme('westeros', echartsTheme)
                    this.myChart = echarts.init(document.getElementById(this.id),'westeros');
                    this.myChart.setOption(this.initOption());
                })
			},
			initOption(){
				let data = {
					title: {
						text: '最近7天流量购买订单数统计',
						x:'center'
					},
					tooltip : {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis : [
						{
							type : 'category',
							boundaryGap : false,
							data: this.xAxis[0].data,
							// data : ['周一','周二','周三','周四','周五','周六','周日']
						}
					],
					yAxis : [
						{
							type : 'value',
							axisLabel: {
								formatter: '{value} (单)'
							}
						}
					],
					series : [
						{
							name:'成交订单数',
							type:'line',
							stack: '总量',
							areaStyle: {normal: {}},
							// data:[120, 132, 101, 134, 90, 230, 210],
							data: this.series[0].data,
							itemStyle: {
								normal: {
									label: {
										show: true, // 开启显示
										position: 'top', // 在上方显示
										textStyle: {
											color: 'black',
											fontSize: 12
										}
									}
								}
							}
						}
					]
				}
				return data;
			},

			// 首页- 获取最近7天购买流量订单数量
			async getWeekOrderData() {
				let res = await api.weekOrders();
				if(res.data.code == 0) {
					// this.showMessage('success',res.data.msg);
					if(res.data.data && res.data.data.length) {
						for (let i = 0; i < res.data.data.length; i++) {
							this.xAxis[0].data.push(res.data.data[i].date);
							this.series[0].data.push(res.data.data[i].sum);
						}
						this.loadChart();
					}
				}else {
					this.showMessage('error',res.data.msg);
				}
			},
		},
        watch: {
            // id:()=>{
            //     this.initOption()
            // }
        }
    }
</script>

<style lang="less">

</style>
