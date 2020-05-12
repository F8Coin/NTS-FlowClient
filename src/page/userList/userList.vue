<template>
    <div class="fillcontain">
        <search-item @showDialog="showAddFundDialog" @searchList="getUserList" @onBatchDelMoney="onBatchDelMoney"></search-item>
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
                    prop="companyIndex"
                    label="企业编号"
                    align='center'
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="company"
                    label="企业名称"
                    width="250"
                    align='center'>
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="业务负责人"
                    align='center'
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="tel"
                    label="负责人电话"
                    align='center'
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="负责人邮箱"
                    align='center'
                    width="210"> 
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="企业地址"
                    align='center'>
                </el-table-column>
                <el-table-column
                    prop="accountType_company"
                    label="企业主账户"
                    align='center'
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align='center'
                    width="180">
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
                        >编辑</el-button>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="mini"
                            @click='onDeleteMoney(scope.row,scope.$index)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"  @getFundList="getUserList"  @closeDialog="hideAddFundDialog"></addFundDialog>
        </div>
    </div>
</template>

<script>
    import { api } from "@/config/api"
    import { mapGetters } from "vuex";
    import * as mutils from '@/utils/mUtils'
    import SearchItem from "./components/searchItem";
    import AddFundDialog from "./components/addFundDialog";
    import Pagination from "@/components/pagination";
    import { getMoneyIncomePay ,getUserListAccount, removeMoney, batchremoveMoney } from "@/api/money";

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
                    limit:12,
                    name:''
                },
                pageTotal:0,
                // 用于列表筛选
                fields: {
                },
               
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
           
        },
      	mounted() {
            this.getUserList();
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
            // 获取企业列表数据
            getUserList(){
                const para = Object.assign({},this.incomePayData,this.search);
                getUserListAccount(para).then(res => {
                     this.loading = false;
                     this.pageTotal = res.data.total
                     this.tableData = res.data.userList
                })
            },
            //  注册添加企业账号
            async createAccount(registInfo) {
                let res = await api.regist(registInfo);
                if(res.data.code == 0) {
                    this.showMessage('success', '创建账户成功');
                }
            },

            // 显示添加信息框
            showAddFundDialog(){
                // this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
                // this.createAccount(registData);
            },
            // // 显示添加信息框
            // showAddFundDialog(val){
            //     // this.$store.commit('SET_DIALOG_TITLE', val)
            //     this.addFundDialog.show = true;
            // },
            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },
            // 上下分页
            handleCurrentChange(val){
                this.incomePayData.page = val;
                this.getUserList()
            },
            // 每页显示多少条
            handleSizeChange(val){
                this.incomePayData.limit = val;
                this.getUserList()
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
                        this.getUserList()
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
                        this.getUserList()
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


