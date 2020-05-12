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
				id:'carrierType',
				myChart:null,
				pieChartData: {
					legend_data: [],
					series_data: []
				},
				format_carrierType_list: {
                    "Telecom": "中国电信",
                    "Unicom": "中国联通",
                    "Mobile": "中国移动"
                } 
            }
        },
		props: ['type'],
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
		created(){
			this.allCarrierPercentData();
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
                    this.myChart.setOption(this.initOption(this.type));
                })
			},
			
         	initOption(type){
				let text,legend_data,series_data;
				if(type == "carrierType"){
					text = "承运商用户数量占比";
					// legend_data = ['中国电信','Vodafone','Inmarsat IDP','ORBCOMM','AT&T'];
					legend_data = this.pieChartData.legend_data;
					series_data = this.pieChartData.series_data;
				}
				let data = {
					  title : {
						text: text,
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: legend_data
					},
					series : [
						{
							name: '设备占比',
							type: 'pie',
							radius : '50%',
                            center: ['50%', '60%'],
							data:series_data,
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
				return data;
			},

			// 首页- 获取承运商用户的百分比
			async allCarrierPercentData() {
				let res = await api.allCarrierPercent();
				if(res.data.code == 0) {
					// this.showMessage('success',res.data.msg);
					if(res.data.data && res.data.data.length>0){
						let pieChartObjData= res.data.data;
						for (const key in pieChartObjData) {
							if(key != "Sum") {
								if(key === "Telecom" || key === "Unicom" || key === "Mobile") {
									let  newKey = this.format_carrierType_list[key]
									this.pieChartData.legend_data.push(newKey);
									this.pieChartData.series_data.push({
										name: newKey,
										value: pieChartObjData[key]
									});
								}else {
									this.pieChartData.legend_data.push(key);
									this.pieChartData.series_data.push({
										name: key,
										value: pieChartObjData[key]
									});
								}
							}
						}
						this.loadChart("carrierType");
					}else {
						let pieChartObjData= {
							InmarsatIDP: 0,
							Mobile: 0,
							Orbcomm: 0,
							Sum: 0,
							Telecom: 0,
							Unicom: 0,
							Vodafone: 0
						};
						for (const key in pieChartObjData) {
							if(key != "Sum") {
								if(key === "Telecom" || key === "Unicom" || key === "Mobile") {
									let  newKey = this.format_carrierType_list[key]
									this.pieChartData.legend_data.push(newKey);
									this.pieChartData.series_data.push({
										name: newKey,
										value: pieChartObjData[key]
									});
								}else {
									this.pieChartData.legend_data.push(key);
									this.pieChartData.series_data.push({
										name: key,
										value: pieChartObjData[key]
									});
								}
							}
						}
						this.loadChart("carrierType");

					}
				}else {
					this.showMessage('error',res.data.msg);
				}
            },
            
        },
        watch: {
            type:(v)=>{
                this.initOption(v)
            }
        }
    }
</script>

<style lang="less">

</style>
