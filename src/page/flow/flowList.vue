<template>
    <div class="fillcontain">
        <search-item @showDialog="showAddFundDialog" @searchList="searchFlowList" @exportData="exportData" @resetList="resetFlowList" @onBatchDelMoney="onBatchDelMoney"></search-item>
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
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.companyName }}</span>
                </template>
            </el-table-column>

             <el-table-column
                prop="mainAccount"
                label="主账户"
                align='center'
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.mainAccount }}</span>
                </template>
            </el-table-column>

            <!-- <el-table-column
                prop="mainAccount"
                label="账户余额"
                align='center'
                width="150"
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.mainAccount }}</span>
                </template>
            </el-table-column> -->

            <el-table-column
                prop="deviceSn"
                label="卫星SN"
                align='center'
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.deviceSn }}</span>
                </template>
            </el-table-column>

            <!-- <el-table-column
                prop="deviceType"
                label="设备类型"
                align='center'
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.deviceType }}</span>
                </template>
            </el-table-column> -->
            
            <!-- <el-table-column
                prop="activeDate"
                label="激活日期"
                align='center'
                width="130"
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.activeDate }}</span>
                </template>
            </el-table-column> -->
           
            <el-table-column
                prop="carrier"
                label="卫星运营商"
                align='center'
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.carrier }}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="cardICCID"
                label="ICCID"
                align='center'
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.cardICCID }}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="cardCarrier"
                label="物联网卡运营商"
                align='center'
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.cardCarrier }}</span>
                </template>
            </el-table-column>
            
            <el-table-column
                prop="iotData"
                label="4G数据流量"
                align='center'
                >
                <template slot-scope="scope">  
                    <span style="color:#00d053">{{ scope.row.iotData }} kB</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="satelliteData"
                label="卫星数据流量"
                align='center'
                > 
                <template slot-scope="scope">  
                    <span style="color:#00d053">{{ scope.row.satelliteData }} KB</span>
                </template>
            </el-table-column>
            <!-- <el-table-column
                prop="satModelState"
                label="卫星模块"
                align='center'
                >
                <template slot-scope="scope">  
                    <span style="color:#f56767">{{ (scope.row.satModelState) }}</span>
                </template>
            </el-table-column> -->
            <el-table-column
                prop="updateTime"
                label="时间"
                align='center'
                width="190"
                >
                <template slot-scope="scope">  
                    <span style="color:#4db3ff">{{ scope.row.updateTime }}</span>
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
                        @click='onyearFlow(scope.row.deviceSn)'
                    >详情</el-button>
                    <el-button 
                        type="danger" 
                        icon='delete' 
                        size="mini"
                        @click='onFlowLog(scope.row.deviceSn)'
                    >流量日志</el-button>
                </template>
            </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :todeviceSn="childData.deviceSn" :dialogRow="addFundDialog.dialogRow"  @getFundList="searchFlowList"  @closeDialog="hideAddFundDialog"></addFundDialog>
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
                editid:'',
                rowIds:[],
                sortnum:0,
                format_type_list: {
                    0: '提现',
                    1: '提现手续费',
                    2: '提现锁定',
                    3: '理财服务退出',
                    4: '购买宜定盈',
                    5: '充值',
                    6: '优惠券',
                    7: '充值礼券',
                    8: '转账'
                },
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
                pageTotal:0,
                // 用于列表筛选
                fields: {
                    incomePayType:{
                        filter: {
                            list: [{
                                text: '提现',
                                value: 0
                            },{
                                text: '提现手续费',
                                value: 1
                            }, {
                                text: '提现锁定',
                                value: 2
                            }, {
                                text: '理财服务退出',
                                value: 3
                            }, {
                                text: '购买宜定盈',
                                value: 4
                            }, {
                                text: '充值',
                                value: 5
                            }, {
                                text: '优惠券',
                                value: 6
                            }, {
                                text: '充值礼券',
                                value: 7
                            }, {
                                text: '转账',
                                value: 8
                            }],
                            multiple: true
                        }
                    },
                },
                childData: {
                    deviceSn: ''
                },
                exportDataList: []
               
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
            this.satelliteTotalData(this.flowListData);
            // this.satelliteTotalLog();
            // this.satelliteUseLog();
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
                        sheetName: '流量数据报表1'  // 表一的sheet名字
                    }
                ]
                json2excel(excelDatas, "NTS流量数据报表", true, "xlsx")
            },

            // 流量管理-卫星流量统计查询
            async satelliteTotalData(parms) {
                let res = await  api.satelliteTotalData(parms)
                this.pageTotal = res.data.total
                if(res.data.code == 0) {
                    this.loading = false;
                    this.tableData= [];
                    this.exportDataList= res.data.rows;
                    if(res.data.rows && res.data.rows.length>0) {
                        for (let i = 0; i < res.data.rows.length; i++) {
                            let dataBothData= res.data.rows[i].dataBoth ? res.data.rows[i].dataBoth : "0.0" 
                            let orbcommBytesData= res.data.rows[i].orbcommBytes ? res.data.rows[i].orbcommBytes : "0.0" 
                            let satSumData= ((Number(dataBothData) + Number(orbcommBytesData))/1024).toFixed(2);
                            // let satSumData= ((Number(dataBothData) + Number(orbcommBytesData))/1024);
                            let cardFlow= res.data.rows[i].cardDataUsage ? (Number(res.data.rows[i].cardDataUsage)/1024).toFixed(2) : "0.0"
                            // let cardFlow= res.data.rows[i].cardDataUsage ? res.data.rows[i].cardDataUsage : "0.0"
                            this.tableData[i] = {
                                sortnum: (i+1),
                                companyName: res.data.rows[i].companyName ? res.data.rows[i].companyName : '新时空智能',
                                deviceType: res.data.rows[i].deviceType ? res.data.rows[i].deviceType : '-',
                                activeDate: res.data.rows[i].activeDate ? res.data.rows[i].activeDate : '-',
                                deviceSn: res.data.rows[i].subscriberId ,
                                mainAccount: res.data.rows[i].mainAccount ? res.data.rows[i].mainAccount : 'NTS_84782960',
                                carrier: res.data.rows[i].carrier,
                                contactPerson: res.data.rows[i].contactPerson ? res.data.rows[i].contactPerson : '马先生',
                                contactTel: res.data.rows[i].contactTel ? res.data.rows[i].contactTel : '18603059551',
                                iotData: cardFlow,
                                satelliteData: satSumData,
                                satModelState: res.data.rows[i].satModelState ? res.data.rows[i].satModelState : '已激活',
                                updateTime: filter.GMTtoStr(res.data.rows[i].statisticsTime),
                                cardICCID: res.data.rows[i].cardIccid ? res.data.rows[i].cardIccid : '-',
                                cardCarrier: res.data.rows[i].cardCarrier ? res.data.rows[i].cardCarrier : '-',
                            }
                            
                        }  
                    } 
                }else {
                    this.showMessage('error', res.data.msg);
                }
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
                var parms = {
                    'X-NTS-Token': '',
                    'deviceSn': '',
                    "overDate": '',
                    'pageNum': '',
                    'pageSize': '',
                    'startDate': ''
                }
                let res = await  api.satelliteUseLog(parms)
                if(res.data.code == 0) {
                    // console.log('获取卫星流量使用日志成功')
                }
            },

            // 根据SN查询单台设备流量
            searchFlowList(params){ 
                const para = Object.assign({},this.flowListData,params);
                this.satelliteTotalData(para);
            },

            // 重置查询条件
            resetFlowList(params) {
                params= {
                    search_data:{
                        startDate:'',
                        overDate:'',
                        deviceSn:''
                    },
                }    
                this.satelliteTotalData()
            },

            // 导出数据
            exportData() {
                this.handleDownload();
            },

            // // 显示最近一年流量数据概况
            showAddFundDialog(val){
                // this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
            },
            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },
            // // 上下分页
            handleCurrentChange(val){
                this.flowListData.pageNum = val;
                this.searchFlowList(this.flowListData)
            },
            // // 每页显示多少条
            handleSizeChange(val){
                this.flowListData.pageSize = val;
                this.searchFlowList(this.flowListData)
            },
            getPay(val){
               if(mutils.isInteger(val)){
                   return -val;
               }else{
                   return val;
               }
            },

            // /**
            // * 格式化状态
            // */
            formatterType(item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[type];
            },
            filterType(value, item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[value] == this.format_type_list[type];
            },
            // 流量统计-详情
            onyearFlow(params){
                // this.addFundDialog.dialogRow = row;
                this.showAddFundDialog();
                this.childData.deviceSn = params
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
            // // 查看流量日志 
            onFlowLog(deviceSn){
                this.$router.push({path:'/flow/flowLog',query:{deviceSn:deviceSn}})
                // this.$router.push({name:'',params:{deviceSn:deviceSn}})

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



