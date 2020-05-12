<template>
    <div class="chinaTabsTable">
       <el-table 
          :data="tableData" 
          style="width: 100%" align='center'>
            <el-table-column
                prop="ID"
                label="序号"
                align='center'
                width="80">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column
                prop="provinces"
                label="套餐类型"
                align='center'
                width="140">
            </el-table-column>
            <el-table-column
                prop="orderMoney"
                label="套餐内容"
                align='center'>
                <template slot-scope="scope">  
                    <span style="color:#CC0033">{{ scope.row.satelliteFlow }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="incomeMoney"
                label="套餐资费"
                align='center'
                width="120">
                <template slot-scope="scope">  
                    <span style="color:#00d053;">{{ scope.row.satelliteCost }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="payType"
                label="套餐优惠活动"
                align='center'>
            <template slot-scope="scope">
                <span style="color:#00d053;">{{ scope.row.activeText }}</span>
            </template>
            </el-table-column>
            <el-table-column
                prop="orderPeriod"
                label="运营商"
                align='center'
                width="120">
                <template slot-scope="scope">
                    <span style="color:#00d053;">{{ scope.row.operatorType }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column
                prop="orderPersonConunt"
                label="流量套餐"
                align='center'
                width="120">
            </el-table-column>
            <el-table-column
                prop="orderYearRate"
                label="套餐价格"
                align='center'
                width='120'
            >
            </el-table-column> -->
            <el-table-column
                prop="remarks"
                label="备注"
                align='left'
                >
                <template slot-scope="scope">
                    <span style="color:#3366CC">{{scope.row.remarks}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                align='center'
                label="操作"
                width="180">
                <template slot-scope='scope'>
                    <el-button 
                        type="warning" 
                        icon='edit' 
                        size="mini"
                        @click='onbuyFlow(scope.row)'
                    >购买</el-button>
                    <!-- <el-button 
                        type="danger" 
                        icon='delete' 
                        size="mini"
                        @click='onShowMore(scope.row,scope.$index)'
                    >查看更多</el-button> -->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import data from '../data/chinaTabs.json';

    export default {
         data(){
             return {
                tableData:[],
                tableHeight:0,
             }
         },
         props:{
            toggleData:[String]
         },
         mounted(){
             this.setTableHeight();
             window.onresize = () => {
                this.setTableHeight();
             }
           
         },
         methods:{
             showMessage(type,message){
                this.$message({  // Element ui自带信息弹窗
                    type: type,
                    message: message
                });
            },
            
             setTableHeight(){
                this.$nextTick(() => {
                   this.tableHeight =  document.body.clientHeight - 280
                })
             },
             showTableData(item){
                switch(item){
                    case 'eastChina':
                        this.tableData = data.china.eastChina;
                        break;
                    case 'southChina':
                        this.tableData = data.china.southChina;
                        break;
                    case 'centralChina':
                        this.tableData = data.china.centralChina;
                        break;
                    case 'northChina':
                        this.tableData = data.china.northChina;
                        break;
                    case 'northwestChina':
                        this.tableData = data.china.northwestChina;
                        break;
                    case 'southwestChina':
                        this.tableData = data.china.southwestChina;
                        break;
                    case 'northeastChina':
                        this.tableData = data.china.northeastChina;
                        break;
                    case 'specialareaChina':
                        this.tableData = data.china.specialareaChina;
                        break;
                }
             },
             onbuyFlow(params){
                // console.log('传递进来的参数:'+ JSON.stringify(params));
                this.$emit('showbuyFlowDialog',params);
             },
             onShowMore(){
                this.showMessage('warning','暂无套餐更多详情信息!')
             }
         },
        watch: {
            // 监听属性的变化，可以接收参数;
             toggleData(v) {
                this.showTableData(v);
            },
        }
    }
</script>

<style lang="less">

</style>
