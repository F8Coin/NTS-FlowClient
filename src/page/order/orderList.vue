<template>
    <div class="chinaTabsTable fillcontain">
        <search-item @showDialog="showAddFundDialog" @searchList="getOrderList" @onBatchDelMoney="onBatchDelMoney"  @resetTableData="resetTableData" @exportData="exportData"></search-item>
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                align='center'
                @select="selectTable"
                @select-all="selectAll"
                border
                stripe
                header-cell-class-name="table-header-class">
                <el-table-column
                    type="selection"
                    align='center'
                    width="40">
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单号"
                    align='center'
                    width="240"
                    >
                </el-table-column>
                <!-- <el-table-column
                    prop="companyName"
                    label="企业名称"
                    width="240"
                    align='center'>
                </el-table-column>
                <el-table-column
                    prop="contactPerson"
                    label="业务负责人"
                    align='center'
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="contactTel"
                    label="负责人电话"
                    align='center'
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="contactEmail"
                    label="负责人邮箱"
                    align='center'
                    width="210"> 
                </el-table-column>
                <el-table-column
                    prop="companyAddress"
                    label="企业地址"
                    align='center'>
                </el-table-column>
                <el-table-column
                    prop="mainAccount"
                    label="企业主账户"
                    align='center'
                    width="130">
                </el-table-column> -->
                <el-table-column
                    prop="packageName"
                    label="套餐类型"
                    align='center'
                    >
                </el-table-column>
                 <el-table-column
                    prop="flowNumber"
                    label="购买流量 (KB)"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="actualPrice"
                    label="支付金额 (元)"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="订单提交时间"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="进入到支付页面时间"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="payTime"
                    label="支付成功的时间"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="orderStatus"
                    label="订单状态"
                    align='center'
                    width="180">
                </el-table-column>
                <!-- <el-table-column
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
                        >详情</el-button>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="mini"
                            @click='onDeleteMoney(scope.row,scope.$index)'
                        >删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"  @getFundList="getOrderList"  @closeDialog="hideAddFundDialog"></addFundDialog>
        </div>
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

    import {api} from '@/config/api';
    import { parseTime } from '@/utils/setMethods';
    import { json2excel } from '@/utils/setMethods';
    import { mapGetters } from "vuex";
    import * as mutils from '@/utils/mUtils';
    import SearchItem from "./components/searchItem";
    import AddFundDialog from "./components/addFundDialog";
    import Pagination from "@/components/pagination";
    import { getMoneyIncomePay , removeMoney, batchremoveMoney } from "@/api/money";

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:0,
                loading:true,
                isShow:false, 
                editid:'',
                rowIds:[],
                sortnum:0,
                addFundDialog:{  
                    show:false,
                    dialogRow:{}
                },
                incomePayData:{
                    page:1,
                    limit:10,
                    name:''
                },
                pageTotal:0,
                // 用于列表筛选
                fields: {
                },
                format_orderStatus_list: {
                    "0": "待付款",
                    "1": "处理中",
                    "2": "已完成",
                    "3": "取消",
                    "4": "售后"
                },
                format_payStatus_list: {
                    "0": "初始化",
                    "1": "付款中",
                    "2": "支付成功"
                },
                exportDataList: [],
                pageData: {
                    pageNum: "1",
                    pageSize: "10"
                }    
               
            }
        },
        components:{
            SearchItem,
            AddFundDialog,
            Pagination
        },
        computed:{
            ...mapGetters(['search'])
        },
      	mounted() {
            // this.getOrderList();
            this.getFlowListOrder();
            // this.setTableHeight();
            // window.onresize = () => {
            //     this.setTableHeight();
            // }
	    },
        methods: {
            showMessage(type,message){
                this.$message({  // Element ui自带信息弹窗
                    type: type,
                    message: message
                });
			},

             setTableHeight(){
                this.$nextTick(() => {
                   this.tableHeight =  document.body.clientHeight - 300
                })
             },
            // 获取企业列表数据
            getOrderList(){
                const para = Object.assign({},this.incomePayData,this.search);
                getMoneyIncomePay(para).then(res => {
                    //  this.loading = false;
                    //  this.pageTotal = res.data.total
                    //  this.tableData = res.data.moneyList
                })
            },

            // 导出数据
            exportData(){
                this.handleDownload();
            },

            //  导出Excel
            handleDownload() {
                // 组装导出的excel所需要的数据结构
                var excelDatas = [
                    {
                        tHeader: ['订单号','企业名称','业务负责人','负责人电话','负责人邮箱','企业地址','企业主账号','套餐名称','创建时间','订单状态'],
                        filterVal: ['orderCode','companyName','contactPerson','contactTel','contactEmail','companyAddress','mainAccount','plansName','createTime','orderStatus'],
                        tableDatas: this.exportDataList,  // 表一的数据字段
                        sheetName: '流量购买订单统计'  // 表一的sheet名字
                    }
                ]
                json2excel(excelDatas, "流量购买订单统计", true, "xlsx")
            },

            // 显示添加信息框
            showAddFundDialog(val){
                this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
            },
            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },
            // 上下分页
            handleCurrentChange(val){
                this.pageData.pageNum = val;
                this.getFlowListOrder();
            },
            // 每页显示多少条
            handleSizeChange(val){
                this.pageData.pageSize = val;
                this.getFlowListOrder();
            },
            getPay(val){
               if(mutils.isInteger(val)){
                   return -val;
               }else{
                   return val;
               }
            },

            /**
            * 格式化状态
            */
            formatterType(item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[type];
            },
            filterType(value, item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[value] == this.format_type_list[type];
            },
            filterPayType(code) {
                return this.format_payStatus_list[code];
            },
            filterOrderType(code) {
                return this.format_orderStatus_list[code];
            },
            // 编辑操作方法
            onEditMoney(row){
                this.addFundDialog.dialogRow = row;
                this.showAddFundDialog();
            },
            // 删除数据
            onDeleteMoney(row){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const para = { id: row.id }
                    removeMoney(para).then(res => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getOrderList()
                    })
                })
                .catch(() => {})
            },
            onBatchDelMoney(){
                this.$confirm('确认批量删除记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const ids = this.rowIds.map(item => item.id).toString()
                    const para = { ids: ids }
                    batchremoveMoney(para).then(res => {
                        this.$message({
                            message: '批量删除成功',
                            type: 'success'
                        })
                        this.getOrderList()
                    })
                })
                .catch(() => {})
            },
            // 当用户手动勾选数据行的 Checkbox 时触发的事件
            selectTable(val, row){
                this.setSearchBtn(val);
            },
            // 用户全选checkbox时触发该事件
            selectAll(val){
                 val.forEach((item) => {
                     this.rowIds.push(item.id);
                });
                this.setSearchBtn(val);
            },
            setSearchBtn(val){
                let isFlag = true;
                if(val.length > 0){
                    isFlag = false;
                }else{
                    isFlag = true;
                }
                this.$store.commit('SET_SEARCHBTN_DISABLED',isFlag);
            },

            resetTableData(){
                const para = Object.assign({},this.pageData);
                this.getFlowListOrder(para);
            },

            getOrderList(params){
                const para = Object.assign({},this.pageData,params);
                this.getFlowListOrder(para);
            },

            // 订单管理-企业流量订单列表
            async getFlowListOrder(params) {
                const para = Object.assign({},this.pageData,params);
                let res = await api.orderCompanyFlowList(para);
                if(res.data.code == 0) {
                    this.loading = false;
                    this.pageTotal = res.data.total;
                    // this.showMessage('success','获取企业订单列表成功');
                    this.exportDataList = res.data.rows;
                    this.tableData= this.filterTableData(res.data.rows);
                }else {
                    this.showMessage('error', res.data.msg);
                }
            },
            filterTableData(arrayData){
                let newArrayData= [];
                for (let i = 0; i < arrayData.length; i++) {
                    newArrayData[i]= {
                        orderId: arrayData[i].orderCode ? arrayData[i].orderCode : '-',
                        companyName: arrayData[i].companyName ? arrayData[i].companyName : '-',
                        contactPerson: arrayData[i].contactPerson ? arrayData[i].contactPerson : '-',
                        contactTel: arrayData[i].contactTel ? arrayData[i].contactTel : '-',
                        contactEmail: arrayData[i].contactEmail ? arrayData[i].contactEmail : '-',
                        companyAddress: arrayData[i].companyAddress ? arrayData[i].companyAddress : '-',
                        mainAccount: arrayData[i].mainAccount ? arrayData[i].mainAccount : '-',
                        packageName: arrayData[i].plansName === "自定义套餐" ? "卫星-基础套餐" : arrayData[i].plansName,
                        createTime: arrayData[i].createTime ? arrayData[i].createTime : '-',
                        updateTime: arrayData[i].updateTime ? arrayData[i].updateTime : '-',
                        payTime: arrayData[i].payTime ? arrayData[i].payTime : '-',
                        // payStatus: this.filterPayType(arrayData[i].orderStatus) ? this.filterPayType(arrayData[i].orderStatus) : '-',
                        orderStatus: this.filterOrderType(arrayData[i].orderStatus) ? this.filterOrderType(arrayData[i].orderStatus) : '-',
                        actualPrice: arrayData[i].actualPrice ? arrayData[i].actualPrice : '-',
                        flowNumber: arrayData[i].flowNumber ? arrayData[i].flowNumber : '-',
                    }
                    
                }
                return newArrayData 
            }

        },
    }
</script>

<style lang="less">
    .table_container{
        padding: 10px;
        background: #fff;
        border-radius: 2px;
    }
    .el-dialog--small{
       width: 600px !important;
    }
    .pagination{
        text-align: right;
        margin-top: 10px;
    }
</style>
