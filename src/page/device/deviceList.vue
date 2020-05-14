<template>
    <div class="fillcontain">
        <search-item @showDialog="showAddFundDialog" @searchList="getTerminalListData" @onBatchDelMoney="onBatchDelMoney" @terminalIdQuery="terminalIdQueryData" @exportData="exportData"></search-item>
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
                 header-cell-class-name="table-header-class"
                >
              <el-table-column
                v-if="idFlag"
                prop="id"
                label="id"
                align='center'
                >
            </el-table-column>
             <el-table-column
                type="selection"
                align='center'
                width="40">
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="企业名称"
                align='center'
                width="240"
                >
            </el-table-column>
            <el-table-column
                prop="satSN"
                label="卫星SN"
                align='center'
                >
            </el-table-column>
            <el-table-column
                prop="cardSN"
                label="ICCID"
                align='center'
                >
            </el-table-column>
            <el-table-column
                prop="satActiveStatus"
                label="卫星模块状态"
                align='center'
                >
            </el-table-column>
            <el-table-column
                prop="cardActiveStatus"
                label="ICCID卡状态"
                align='center'
                >
            </el-table-column>
            <el-table-column
                prop="satModuleName"
                label="卫星模块名称"
                align='center'
                width="100"
                >
            </el-table-column>
            <el-table-column
                prop="satTerminalType"
                label="终端类型"
                align='center'
                width="120"
                >
            </el-table-column>
            <el-table-column
                prop="satTerminalActiveTime"
                label="卫星模块激活日期"
                align='center'
                width="180">
            </el-table-column>
            <el-table-column
                prop="cardTerminalActiveTime"
                label="物联网卡激活日期"
                align='center'
                width="180">
            </el-table-column>
            <el-table-column
                prop="satActiveStatus"
                align='center'
                label="操作"
                width="180">
                <template slot-scope='scope'>
                     <el-button
                        v-show="scope.row.satActiveStatus === '未激活' ? true : false "
                        type="warning" 
                        icon='edit' 
                        size="mini"
                        @click='onActiveDevice(scope.row)'
                    >待激活</el-button>
                    <el-button
                         v-show="scope.row.satActiveStatus === '未激活' ? false : true "
                        type="success" 
                        icon='edit' 
                        size="mini"
                        @click='onUnSuspendDevice(scope.row)'
                    >启用</el-button>
                    <el-button
                        v-show="scope.row.satActiveStatus === '未激活' ? false : true " 
                        type="danger" 
                        icon='delete' 
                        size="mini"
                        @click='onSuspendDevice(scope.row)'
                    >停用</el-button>
                    <!-- @click='onSuspendDevice(scope.row,scope.$index)' -->
                </template>
            </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"  @getFundList="getMoneyList" @getTerminalList="getTerminalListData"  @closeDialog="hideAddFundDialog"></addFundDialog>
        </div>
    </div>
</template>

<script>
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
                idFlag:false,
                isShow:false, // 是否显示资金modal,默认为false
                editid:'',
                rowIds:[],
                sortnum:0,
                satActive: true,
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

                exportDataList: [],

                pageData: {
                   pageNum: '1', 
                   pageSize: '10',
                },
                format_satModuleType_list: {
                    1: "OGI",
                    2: "OG2",
                },
                format_satActiveType_list: {
                    0: "未激活",
                    1: "已激活",
                    2: "暂停",
                    3: "启用",
                    4: "禁用"
                }, 
                format_cardActiveType_list: {
                    0: "未激活",
                    1: "已激活",
                },
                ocpOptionsParams: {
                    carrier: '',
                    subscriberId : '' 
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
            // this.getMoneyList();
            this.getTerminalListData();
            this.setTableHeight();
            window.onresize = () => {
                this.setTableHeight();
            }
	   },
        methods: {
            setTableHeight(){
                this.$nextTick(() => {
                   this.tableHeight =  document.body.clientHeight - 300
                })
            },
            // 获取资金列表数据
            getMoneyList(){
                const para = Object.assign({},this.incomePayData,this.search);
                getMoneyIncomePay(para).then(res => {
                     this.loading = false;
                    //  this.pageTotal = res.data.total
                    //  this.tableData = res.data.moneyList
                })
            },

            //  模糊查询数据渲染
            terminalIdQueryData(params) {
                console.log(params);
                this.loading = false;
                this.pageTotal = params.length;
                this.tableData = this.filterTableData(params);
            },

            // 导出数据
            exportData() {
                this.handleDownload();
            },

            //  导出Excel
            handleDownload() {
                // 组装导出的excel所需要的数据结构
                var excelDatas = [
                    {
                        tHeader: ['企业名称','企业主账号','卫星SN','ICCID','卫星模块激活状态','ICCID卡激活状态','卫星模块名称','终端类型','卫星模块激活日期','物联网卡激活日期'],
                        filterVal: ['company','account','deviceSn','iccid','sllActivate','cardActivate','satelliteModule','terminalType','sllActivateTime','cardActivateTime'],
                        tableDatas: this.exportDataList,  // 表一的数据字段
                        sheetName: '设备列表统计'  // 表一的sheet名字
                    }
                ]
                json2excel(excelDatas, "NTS设备列表统计", true, "xlsx")
            },

            // 获取终端列表数据
            async getTerminalListData(params) {
                const para = Object.assign({},this.pageData,params);
                let res = await api.allDeviceList(para);
                if(res.data.code == 0) {
                    // 渲染表格数据
                    this.loading = false;
                    if(res.data.rows && res.data.rows.length>0) {
                        this.pageTotal = res.data.total;
                        this.exportDataList = res.data.rows;
                        this.tableData = this.filterTableData(res.data.rows);
                    }
                }else {
                    this.showMessage('error',res.data.msg);
                }
            },

            // 显示资金弹框
            showAddFundDialog(val){
                // this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
            },
            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },
            // 上下分页
            handleCurrentChange(val){
                this.pageData.pageNum = val;
                this.getTerminalListData()
            },
            // 每页显示多少条
            handleSizeChange(val){
                this.pageData.pageSize = val;
                 this.getTerminalListData()
            },
            getPay(val){
               if(mutils.isInteger(val)){
                   return -val;
               }else{
                   return val;
               }
            },
          
            // 启用卫星模块方法
            onUnSuspendDevice(row){
                let carrierName= ""
                this.$confirm('确认启用该设备吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    if(row.satModuleName === "OG2") {
                        carrierName= "ORBCOMM"
                    }else if(row.satModuleName === "OGI") {
                        carrierName= "INMARSATIDP"
                    } 
                    this.loading= true;
                    this.onUnSuspendDeviceFun({
                        carrier:  carrierName,
                        subscriberId: row.satSN
                    })
                })
            },

            async onUnSuspendDeviceFun(params) {
                let res = await api.ocpDeviceUnsuspend(params);
                if(res.data.code == 0){
                    this.loading= false;
                    this.showMessage('success','启用操作成功');
                    this.getTerminalListData();
                }else {
                    this.loading= false;
                    this.showMessage('error',res.data.msg);
                }
            },

            // 停用卫星模块方法
            onSuspendDevice(row){
                let carrierName= ""
                this.$confirm('确认停用该设备吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    if(row.satModuleName === "OG2") {
                        carrierName= "ORBCOMM"
                    }else if(row.satModuleName === "OGI") {
                        carrierName= "INMARSATIDP"
                    } 
                    this.loading = true;
                    this.onSuspendDeviceFun({
                        carrier:  carrierName,
                        subscriberId: row.satSN
                    })
                })
                .catch(() => {})
            },

            async onSuspendDeviceFun(params) {
                let res = await api.ocpDeviceSuspend(params);
                if(res.data.code == 0){
                    this.loading= false;
                    this.showMessage('success','停用操作成功');
                    this.getTerminalListData();
                }else {
                    this.loading= false;
                    this.showMessage('error',res.data.msg);
                }
            },

            //  激活卫星模块方法
            onActiveDevice(row) {
                let carrierName= ""
                this.$confirm('确认激活该设备吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    if(row.satModuleName === "OG2") {
                        carrierName= "ORBCOMM"
                    }else if(row.satModuleName === "OGI") {
                        carrierName= "INMARSATIDP"
                    } 
                    this.loading = true;
                    this.onActiveDeviceFun({
                        carrier:  carrierName,
                        subscriberId: row.satSN
                    })
                })
                .catch(() => {})    
            },

            async onActiveDeviceFun(params) {
                let res = await api.ocpDeviceActive(params);
                if(res.data.code == 0) {
                    this.loading= false;
                    this.showMessage('success','激活操作成功');
                    this.getTerminalListData();
                }else {
                    this.loading= false;
                    this.showMessage('error',res.data.msg);
                }
            },

            //  取消激活卫星模块方法
            onDeActiveDevice(row) {
                let carrierName= ""
                this.$confirm('确认重置激活该设备吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    if(row.satModuleName === "OG2") {
                        carrierName= "ORBCOMM"
                    }else if(row.satModuleName === "OGI") {
                        carrierName= "INMARSATIDP"
                    } 
                    this.loading = true;
                    this.onDeActiveDeviceFun({
                        carrier:  carrierName,
                        subscriberId: row.satSN
                    })
                })
                .catch(() => {})    
            },

            async onDeActiveDeviceFun(params) {
                let res = await api.ocpDeviceDeactive(params);
                if(res.data.code == 0) {
                    this.loading= false;
                    this.showMessage('success','激活操作成功');
                    this.getTerminalListData();
                }else {
                    this.loading= false;
                    this.showMessage('error',res.data.msg);
                }
            },

            //  取消激活卫星模块方法
            onDeActiveDevice(row) {
                let carrierName= ""
                this.$confirm('确认重置激活该设备吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    if(row.satModuleName === "OG2") {
                        carrierName= "ORBCOMM"
                    }else if(row.satModuleName === "OGI") {
                        carrierName= "INMARSATIDP"
                    } 
                    this.loading = true;
                    this.onDeActiveDeviceFun({
                        carrier:  carrierName,
                        subscriberId: row.satSN
                    })
                })
                .catch(() => {})    
            },

            async onDeActiveDeviceFun(params) {
                let res = await api.ocpDeviceDeactive(params);
                if(res.data.code == 0) {
                    this.loading= false;
                    this.showMessage('success','激活操作成功');
                    this.getTerminalListData();
                }else {
                    this.showMessage('error',res.data.msg);
                }
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
                        this.getMoneyList()
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
            filterTableData(arrayData){
                let newArrayData = [];
                for (let i = 0; i < arrayData.length; i++) {
                    newArrayData[i] = {
                        companyName: arrayData[i].company ? arrayData[i].company : '-' ,
                        mainAccount: arrayData[i].account ? arrayData[i].account : '-' ,
                        satSN: arrayData[i].deviceSn ? arrayData[i].deviceSn : '-' ,
                        cardSN: arrayData[i].iccid ? arrayData[i].iccid : '-' ,
                        satActiveStatus: this.format_satActiveType_list[arrayData[i].sllActivate] ? this.format_satActiveType_list[arrayData[i].sllActivate] : '-' ,
                        cardActiveStatus: this.format_cardActiveType_list[arrayData[i].cardActivate] ? this.format_cardActiveType_list[arrayData[i].cardActivate] : '-' ,
                        satModuleName: this.format_satModuleType_list[arrayData[i].satelliteModule] ? this.format_satModuleType_list[arrayData[i].satelliteModule] : '-' ,
                        satTerminalType: arrayData[i].terminalType ? arrayData[i].terminalType : '-' ,
                        satTerminalActiveTime: arrayData[i].sllActivateTime ? arrayData[i].sllActivateTime : '-' ,
                        cardTerminalActiveTime: arrayData[i].cardActivateTime ? arrayData[i].cardActivateTime : '-' ,
                    }
                    
                }
                return newArrayData;
            }
        },
    }
</script>

<style lang="less" scoped>
    .el-dialog__wrapper {
        .el-dialog {
            width: 25% !important;
        }
    }

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


