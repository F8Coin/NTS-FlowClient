<template>
    <div :id="id" class="orderArea"></div>
</template>

<script>
    import {api} from '@/config/api'
    import echarts from 'echarts';
    import echartsTheme from "cps/echarts/theme/westeros.json";
    
    export default {
        name:'radarChart',
        data(){
            return {
                 id:"radarChart",
                 myChart:null,
                 radarChartData: {
                     value: [],
                     indicator: [],
                 },
                format_satTerminalStatus_list: {
                    "activateSat": "激活",
                    "noActivateSat": "未激活",
                    "disableSat": "停用",
                    "sumSat": "总数",
                    "offLine": "离线",
                    "onLine": "在线",
                },
                format_cardTerminalStatus_list: {
                    "stopProtect4G": "停机保号",
                    "sum4G": "总数",
                    "disable4G": "停机",
                    "activate4G": "激活",
                    "noActivate4G": "未激活",
                    "offLine4G": "离线",
                    "onLine4G": "在线",
                }  
            }
        },
        created(){
            this.allSatStatusData();
            this.allIotStatusData();
        },
        mounted(){
            
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
                    this.myChart = echarts.init(document.getElementById(this.id));
                    this.myChart.setOption(this.initOption());
                })
            },
         	initOption(){
               let option = {
                    title: {
                        text: '卫星终端状态',
                        textStyle: {
                            color: '#506b90'
                        }
                    },
                    radar: [{
                    name: {
                        fontSize: 11 // 顶点字体大小 不能设置 radio 否则不能生效
                    },
                    splitLine: {
                        lineStyle: {
                          color: '#00aaff' // 每一圈的边界颜色
                        }
                    },
                    axisLabel: {
                        inside: true
                    },
                    axisLine: {
                        lineStyle: {
                          color: '#00aaff' // 半径线颜色
                        }
                    },
                    splitArea: {
                        areaStyle: {
                        // color: ['#00aaff', '#0099ff', '#00aaff', '#0099ff', '#00aaff'] // 每一圈的颜色
                        }
                    },
                    indicator: this.radarChartData.indicator
                    // indicator: [
                    //     {text: '库存', max: 500, color: '#87DE75'},
                    //     {text: '测试', max: 500,color: '#FFA3A1'},
                    //     {text: '正常', max: 500,color: '#FF9900'},
                    //     {text: '激活', max: 500,color: '#5FB4FA'},
                    //     {text: '暂停', max: 500,color: '#a9d86e'},
                    //     {text: '未激活', max: 500,color: '#FF6C60'}
                    // ]
                    }],
                    series: [{
                    type: 'radar',
                    data: [{
                            // value: [600, 730, 850, 400, 500, 400],
                            value: this.radarChartData.value,
                            areaStyle: {
                            normal: {
                                opacity: 0.8, // 图表透明度
                                color: '#87DE75' // 图表颜色
                            }
                            },
                            lineStyle: {
                            color: '#6397ff' // 图表边框颜色
                            },
                            label: {
                            normal: {
                                    show: true,
                                    color: '#6397ff', // 顶点数字颜色
                                    fontSize: 16,  // 顶点数字大小
                                    formatter: function (params) {
                                        return params.value
                                    }
                                }
                            }
                        }]
                    }]
                }
				return option;
            },
            
            // 获取卫星状态
			async allSatStatusData() {
				let res = await api.allSatStatus();
				if(res.data.code == 0) {
                    // this.showMessage('success',res.data.msg);
                    if(res.data.data && res.data.data.length>0){
                        let resData = res.data.data;
                        for (const key in resData) {
                            if ( key === "sumSat" || key === "activateSat" || key === "noActivateSat" || key === "disableSat") {
                                this.radarChartData.indicator.push({
                                    text: this.format_satTerminalStatus_list[key], max: 80,color: '#FF6C60'
                                })
                                this.radarChartData.value.push(resData[key]);
                            }
                        }
                        this.loadChart();
                    }else {
                        let resData = {
                            activateSat: 0,
                            disableSat: 0,
                            noActivateSat: 0,
                            offLineSat: 0,
                            onLineSat: 0,
                            sumSat: 0
                        };
                        for (const key in resData) {
                            if ( key === "sumSat" || key === "activateSat" || key === "noActivateSat" || key === "disableSat") {
                                this.radarChartData.indicator.push({
                                    text: this.format_satTerminalStatus_list[key], max: 80,color: '#FF6C60'
                                })
                                this.radarChartData.value.push(resData[key]);
                            }
                        }
                        this.loadChart();
                    }
                    
				}else {
					this.showMessage('error',res.data.msg);
				}
			},
            // 首页- 获取物联网卡状态
			async allIotStatusData() {
				let res = await api.allIotStatus();
				if(res.data.code == 0) {
                    // this.showMessage('success',res.data.msg);
                    // console.log(res.data);
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
