<template>
    <div class="chinaTabsTable">
       <el-table 
          :data="tableData" 
          style="width: 100%" align='center'>
            <el-table-column
                prop="ID"
                label="订单号"
                align='center'
                width="80">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column
                prop="provinces"
                label="客户"
                align='center'
                width="140">
            </el-table-column>
            <el-table-column
                prop="orderMoney"
                label="IMEI"
                align='center'>
                <template slot-scope="scope">  
                    <span style="color:#CC0033">{{ scope.row.satelliteFlow }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="incomeMoney"
                label="套餐名称"
                align='center'
                width="120">
                <template slot-scope="scope">  
                    <span style="color:#00d053;">{{ scope.row.satelliteCost }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="payType"
                label="订购数量"
                align='center'>
            <template slot-scope="scope">
                <span style="color:#00d053;">{{ scope.row.activeText }}</span>
            </template>
            </el-table-column>
            <el-table-column
                prop="orderPeriod"
                label="套餐状态"
                align='center'
                width="120">
                <template slot-scope="scope">
                    <span style="color:#00d053;">{{ scope.row.operatorType }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="orderPersonConunt"
                label="套餐总量"
                align='center'
                width="120">
            </el-table-column>
            <el-table-column
                prop="orderYearRate"
                label="使用率"
                align='center'
                width='120'
            >
            </el-table-column>
            <el-table-column
                prop="orderYearRate"
                label="已用"
                align='center'
                width='120'
            >
            </el-table-column>
            <el-table-column
                prop="orderYearRate"
                label="剩余"
                align='center'
                width='120'
            >
            </el-table-column>
            <el-table-column
                prop="orderYearRate"
                label="激活时间"
                align='center'
                width='120'
            >
            </el-table-column>
            <el-table-column
                prop="orderYearRate"
                label="失效时间"
                align='center'
                width='120'
            >
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
                        @click='onEditMoney(scope.row)'
                    >充值</el-button>
                    <el-button 
                        type="danger" 
                        icon='delete' 
                        size="mini"
                        @click='onDeleteMoney(scope.row,scope.$index)'
                    >查看更多</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    // import data from '../data/chinaTabs.json';

    // export default {
    //      data(){
    //          return {
    //             tableData:[],
    //             tableHeight:0,
    //          }
    //      },
    //      props:{
    //         toggleData:[String]
    //      },
    //      mounted(){
    //          this.setTableHeight();
    //          window.onresize = () => {
    //             this.setTableHeight();
    //          }
           
    //      },
    //      methods:{
    //          setTableHeight(){
    //             this.$nextTick(() => {
    //                this.tableHeight =  document.body.clientHeight - 280
    //             })
    //          },
    //          showTableData(item){
    //             switch(item){
    //                 case 'eastChina':
    //                     this.tableData = data.china.eastChina;
    //                     break;
    //                 case 'southChina':
    //                     this.tableData = data.china.southChina;
    //                     break;
    //                 case 'centralChina':
    //                     this.tableData = data.china.centralChina;
    //                     break;
    //                 case 'northChina':
    //                     this.tableData = data.china.northChina;
    //                     break;
    //                 case 'northwestChina':
    //                     this.tableData = data.china.northwestChina;
    //                     break;
    //                 case 'southwestChina':
    //                     this.tableData = data.china.southwestChina;
    //                     break;
    //                 case 'northeastChina':
    //                     this.tableData = data.china.northeastChina;
    //                     break;
    //                 case 'specialareaChina':
    //                     this.tableData = data.china.specialareaChina;
    //                     break;
    //             }
    //          }
    //      },
    //     watch: {
    //         // 监听属性的变化，可以接收参数;
    //          toggleData(v) {
    //             this.showTableData(v);
    //         },
    //     }
    // }
</script>

<style lang="less">

</style>
