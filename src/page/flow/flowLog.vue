<template>
    <div class="fillcontain">
        <search-item @showDialog="showAddFundDialog" @searchList="searchFlowLog" @exportData="exportData" @resetList="resetFlowLog" @onBatchDelMoney="onBatchDelMoney"></search-item>
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                align='center'
                @select="selectTable"
                @select-all="selectAll"
                >
                <el-table-column
                    type="selection"
                    align='center'>
                </el-table-column>
                
                <el-table-column
                    prop="sortnum"
                    label="序号"
                    align='center'
                    width="60">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.sortnum }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="companyName"
                    label="企业名称"
                    align='center'
                    width="120"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.companyName }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="mainAccount"
                    label="主账户"
                    align='center'
                    width="150"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.mainAccount }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="deviceSn"
                    label="设备SN"
                    align='center'
                    width="210"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.deviceSn }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="deviceType"
                    label="设备类型"
                    align='center'
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.deviceType }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="activeDate"
                    label="激活日期"
                    align='center'
                    width="130"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.activeDate }}</span>
                    </template>
                </el-table-column>           

                <el-table-column
                    prop="carrier"
                    label="运营商"
                    align='center'
                    width="130"
                    >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.carrier }}</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="smsMo"
                    label="smsMo"
                    align='center'
                    >
                    <template slot-scope="scope">  
                        <span>{{ (scope.row.smsMo) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="smsMt"
                    label="smsMt"
                    align='center'
                    >
                    <template slot-scope="scope">  
                        <span>{{ (scope.row.smsMt) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="dataMo"
                    label="dataMo"
                    align='center'
                    >
                    <template slot-scope="scope">  
                        <span>{{ (scope.row.dataMo) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="dataMt"
                    label="dataMt"
                    align='center'
                    >
                    <template slot-scope="scope">  
                        <span>{{ (scope.row.dataMt) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="dataBoth"
                    label="dataBoth"
                    align='center'
                    width="100"
                    >
                    <template slot-scope="scope">  
                        <span style="color:#00d053">{{ (scope.row.dataBoth) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="voiceMo"
                    label="voiceMo"
                    align='center'
                    width="100"
                    >
                    <template slot-scope="scope">  
                        <span>{{ (scope.row.voiceMo) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="voiceMt"
                    label="voiceMt"
                    align='center'
                    width="100"
                    >
                    <template slot-scope="scope">  
                        <span>{{ (scope.row.voiceMt) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="orbcommReports"
                    label="ntsReports"
                    align='center'
                    width="160"
                    >
                    <template slot-scope="scope">  
                        <span>{{ (scope.row.orbcommReports) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="orbcommMessages"
                    label="ntsMessages"
                    align='center'
                    width="160"
                    >
                    <template slot-scope="scope">  
                        <span>{{ (scope.row.orbcommMessages) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="ntscommBytes"
                    label="ntsBytes"
                    align='center'
                    width="160"
                    >
                    <template slot-scope="scope">  
                        <span style="color:#00d053">{{ (scope.row.orbcommBytes) }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="usageTime"
                    label="时间"
                    align='center'
                    width="190"
                    >
                    <template slot-scope="scope">  
                        <span style="color:#4db3ff">{{ scope.row.usageTime }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    width="180"
                    v-if= "isFlogLog"
                    >
                    <template slot-scope='scope'>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="mini"
                            @click='onFlowLog(scope.row,scope.$index)'
                        >日志详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"  @getFundList="searchFlowList"  @closeDialog="hideAddFundDialog"></addFundDialog>
        </div>
    </div>
</template>

<script>
    import { api } from '@/config/api'
    import { parseTime } from '@/utils/setMethods'
    import { json2excel } from '@/utils/setMethods' 
    import { mapGetters } from "vuex";
    import * as mutils from '@/utils/mUtils'
    import * as filter from '@/utils/filter'
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
                isShow:false,
                isFlogLog: false,
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
                flowListData: {
                    pageNum: 1,
                    pageSize: 10,
                    deviceSn: ''
                },
                flowLogData: {
                    pageNum: 1,
                    pageSize: 10,
                    deviceSn: " "
                },
                pageTotal:0,
                exportDataList: [],
                pageData: {
                    pageNum: 1,
                    pageSize: 10,
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
        created() {
            this.flowLogData.deviceSn = this.$route.query.deviceSn;
            if(this.flowLogData.deviceSn) {
                const para = Object.assign(this.flowLogData);
                this.satelliteUseLog(para);
            }else {
                this.satelliteUseLog(this.pageData);
            }
            
        },
      	mounted() {
            this.setTableHeight();
            window.onresize = () => {
                this.setTableHeight();
            }
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

            //  导出Excel
            handleDownload() {
                // 组装导出的excel所需要的数据结构
                var excelDatas = [
                    {
                        tHeader: ['account','subaccount','subscriberId','carrier','pricePlan','smsMo','smsMt','dataMo','dataMt','dataBoth','voiceMo','voiceMt','orbcommReports','orbcommMessages','orbcommBytes','statisticsTime'],
                        filterVal: ['account','subaccount','subscriberId','carrier','pricePlan','smsMo','smsMt','dataMo','dataMt','dataBoth','voiceMo','voiceMt','orbcommReports','orbcommMessages','orbcommBytes','statisticsTime'],
                        tableDatas: this.exportDataList,  // 表一的数据字段
                        sheetName: '流量数据日志1'  // 表一的sheet名字
                    }
                ]
                json2excel(excelDatas, "NTS流量数据日志", true, "xlsx")
            },

            // 流量管理-卫星流量统计日志
            async satelliteTotalLog(parms) {
                 var parms = {
                    'X-NTS-Token': '',
                    'deviceSn': '',
                    "overDate": '',
                    'pageNum': '',
                    'pageSize': '',
                    'startDate': ''
                }
                let res = await  api.satelliteTotalLog(parms)
                if(res.data.code == 0) {
                    // console.log('获取卫星流量统计日志成功')
                }
            },

            // 流量管理-卫星流量使用日志
            async satelliteUseLog(parms) {
                let res = await  api.satelliteUseLog(parms)
                if(res.data.code == 0) {
                    this.tableData= [];
                    this.exportDataList= res.data.rows;
                    // this.exportDataList= this.filterResData(res.data.rows);
                    if(res.data.rows && res.data.rows.length>0) {
                        this.loading = false;
                        this.pageTotal= res.data.total;
                        this.tableData= this.filterResData(res.data.rows);
                    }else if(res.data.rows.length == 0){
                        this.loading = false;
                        this.showMessage('error','暂无数据');
                    } else {
                        this.loading = false;
                        this.showMessage('error',res.data.msg);
                    } 
                }else {
                    this.showMessage('error',res.data.msg);   
                }
            },


            // 根据SN查询单台设备流量使用日志
            searchFlowLog(params){ 
                this.flowLogData.deviceSn = params.deviceSn;
                const para = Object.assign({},this.pageData,params);
                this.satelliteUseLog(para);
            },

            // 重置查询条件
            resetFlowLog(params) {
                this.flowLogData.deviceSn = params.deviceSn;
                const para = Object.assign({},this.pageData,params);
                this.satelliteUseLog(para);
            },

            // 导出数据
            exportData() {
                this.handleDownload();
            },

            // // 显示资金弹框
            showAddFundDialog(val){
                // this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
            },
            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },
            // // 上下分页
            handleCurrentChange(val){
                if(this.flowLogData.deviceSn) {
                    this.flowLogData.pageNum = val;
                    const para = Object.assign(this.flowLogData);
                    this.satelliteUseLog(para);
                }else {
                    this.pageData.pageNum = val;
                    this.satelliteUseLog(this.pageData);
                }
            },
            // // 每页显示多少条
            handleSizeChange(val){
                if(this.flowLogData.deviceSn) {
                    this.flowLogData.pageSize = val;
                    const para = Object.assign(this.flowLogData);
                    this.satelliteUseLog(para);
                }else {
                    this.pageData.pageSize = val;
                    this.satelliteUseLog(this.pageData);
                }
            },

            filterResData(arryData) {
                var resData= [];
                for (let i = 0; i < arryData.length; i++) {
                    let orbcommBytesData= arryData[i].orbcommBytes ? arryData[i].orbcommBytes : "0.0" 
                    let dataMoData= arryData[i].dataMo ? arryData[i].dataMo : '0';
                    let dataMtData= arryData[i].dataMt ? arryData[i].dataMt : '0';
                    let dataBothData= Number(dataMoData) + Number(dataMtData);

                    resData[i] = {
                        sortnum: (i+1),
                        companyName: arryData[i].companyName ? arryData[i].companyName : '新时空智能',
                        deviceType: arryData[i].deviceType ? arryData[i].deviceType : '-',
                        activeDate: arryData[i].activeDate ? arryData[i].activeDate : '-',
                        deviceSn: arryData[i].subscriberId ,
                        mainAccount: arryData[i].mainAccount ? arryData[i].mainAccount : 'NTS_84782960',
                        carrier: arryData[i].carrier,
                        smsMo: arryData[i].smsMo ? arryData[i].smsMo : '0',
                        smsMt: arryData[i].smsMt ? arryData[i].smsMt : '0',
                        dataMo: arryData[i].dataMo ? arryData[i].dataMo : '0',
                        dataMt: arryData[i].dataMt ? arryData[i].dataMt : '0',
                        dataBoth: dataBothData + " B",
                        voiceMo: arryData[i].voiceMo ? arryData[i].voiceMo : '0',
                        voiceMt: arryData[i].voiceMt ? arryData[i].voiceMt : '0',
                        orbcommReports: arryData[i].orbcommReports ? arryData[i].orbcommReports : '0',
                        orbcommMessages: arryData[i].orbcommReports ? arryData[i].orbcommReports : '0',
                        orbcommBytes: (arryData[i].orbcommBytes ? arryData[i].orbcommBytes : '0') + " B",
                        orbcommBytes: orbcommBytesData + " B",
                        usageTime: filter.GMTtoStr(arryData[i].usageTime)
                    }     
                } 
                return resData;
            },
            // // 编辑操作方法
            onyearFlow(row){
                this.addFundDialog.dialogRow = row;
                this.showAddFundDialog();
            },
            // // 删除数据
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
                        this.searchFlowList()
                    })
                })
                .catch(() => {})
            },
            // // 查看详情 
            onFlowLog(){
                this.addFundDialog.show= true;
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
                        this.searchFlowList()
                    })
                })
                .catch(() => {})
            },
            // // 当用户手动勾选数据行的 Checkbox 时触发的事件
            selectTable(val, row){
                this.setSearchBtn(val);
            },
            // // 用户全选checkbox时触发该事件
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
            }
        },
    }
</script>

<style lang="less" scoped>
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



