<template>
    <div :id="id" class="orderArea orderbarArea"></div>
</template>

<script>
    import { api } from '@/config/api';
    import echarts from 'echarts';
    import echartsTheme from "cps/echarts/theme/westeros.json";
    export default {
        name:'barChat',
        data(){
            return {
                id:'barChart',
                myChart:null,
                xAxis: [
                    {
                        data: []
                    }
                ],
                series: [
                    {
                        data: []
                    },
                    {
                        data: []
                    }
                ]
            }
        },
        created(){
            this.getFlowMonthData();
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
                let option = {
                    tooltip : {
                        trigger: 'axis',
                        formatter: function(params) {
                            return params[0].name+"份"+"</br>"+params[0].seriesName+" : "+params[0].data+" KB"+'</br>'+params[1].seriesName+" : "+params[1].data+" KB"
                        }
                    },
                    legend: {
                        data:['4G流量','卫星流量']
                    },
                    xAxis : [
                        {
                            type : 'category',
                            // data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                            data: this.xAxis[0].data
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLabel:{formatter:'{value} KB'}
                        }
                    ],
                    series : [
                        {
                            name:'4G流量',
                            type:'bar',
                            // data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                            data: this.series[0].data,
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        },
                        {
                            name:'卫星流量',
                            type:'bar',
                            // data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.6, 48.7, 18.8, 6.0, 2.3],
                            data: this.series[1].data,
                            markPoint : {
                                // data : [
                                //     {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                                //     {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                                // ]
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        }
                    ]
                };
				return option;
            },
            
            // 首页- 获取4G / 卫星 每月流量使用统计
			async getFlowMonthData() {
				let res = await api.flowMonthData();
				if(res.data.code == 0) {
                    // this.showMessage('success',res.data.msg);
                    for (let i = 0; i < res.data.data.length; i++) {
                        this.xAxis[0].data.push(res.data.data[i].date);
                        this.series[0].data.push(res.data.data[i].sumCard ? res.data.data[i].sumCard : "0" );
                        this.series[1].data.push(res.data.data[i].sumSat ? res.data.data[i].sumSat : "0" );
                    }
                    this.loadChart();
				}else {
					this.showMessage('error',res.data.msg);
				}
			},
        },
        watch: {
        }
    }
</script>

<style lang="less">

</style>
