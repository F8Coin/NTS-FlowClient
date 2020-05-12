<template>
  <div class="search_container searchArea">
        <el-form 
            onSubmit="return false"
            :inline="true" 
            :model='search_data' 
            :rules="rules"
            ref="search_data" 
            class="demo-form-inline search-form">
            <el-form-item label="">
                <el-input class="inputText" v-model="search_data.name" placeholder="请输入搜索卫星SN或ICCID卡号"  @keyup.enter.native='onScreeoutTerminal("search_data")'></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button  type="primary" size ="mini" icon="search" @click='onScreeoutTerminal("search_data")'>查询</el-button>
            </el-form-item>
            <el-form-item label="">
                <el-button  type="primary" size ="mini" icon="search" @click='onResetTerminal()'>重置</el-button>
            </el-form-item>
             <!-- 查询起始时间 -->
            <!-- <el-form-item label="">
               <span class="demonstration">开始时间</span>
                <el-date-picker
                v-model="startDate"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
               <span class="demonstration">结束时间</span>
                <el-date-picker
                v-model="endDate"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item> -->

            <el-form-item class="btnRight">
                <!-- <el-button type="primary" size ="mini" icon="search" @click='onScreeoutTerminal("search_data")'>查询</el-button> -->
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onBatchDelMoney()' :disabled="searchBtnDisabled">批量删除</el-button> -->
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onAddDevice()'>添加</el-button> -->
                <el-button type="success" size ="mini" icon="view" @click='onexportData()'>导出Excel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

   import { api } from '@/config/api';
   import { mapGetters } from 'vuex';

  export default {
      name:'searchItem',
      data(){
          return {
            search_data:{
                name:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入搜索内容', trigger: 'blur' },
                ]
            },
            startDate: '',
            endDate: '',
          }
      },
       computed:{
        ...mapGetters(['searchBtnDisabled']),

      },
      created(){
      },
      methods:{
          showMessage(type,message){
            this.$message({  // Element ui自带信息弹窗
                type: type,
                message: message,
            });
          },

          onResetTerminal(){
              this.search_data.name = "";
              this.$emit("searchList");
          },

          onexportData(){
              this.$emit("exportData");
          },

          onScreeoutTerminal(searchForm){
              this.$refs[searchForm].validate((valid) => {
					if (valid) {
                        // this.$store.commit('SET_SEARCH',this.search_data);
                        // this.$emit("searchList");
                        this.screenOutTerminal({
                            info: this.search_data.name
                        })
                    }
              })
          },





          onAddDevice(){
              this.$emit("showDialog",'add');
          },
          onBatchDelMoney(){
              this.$emit("onBatchDelMoney");
          },
          // 模糊查询
          async screenOutTerminal(params) {
              let res = await api.terminalIdQuery(params);
              if(res.data.code == 0) {
                  this.$emit("terminalIdQuery",res.data.rows);
              }else {
                  this.showMessage('error',res.data.msg);
              }
          }
      }
  }
</script>

<style lang="less" scoped>
    .search_container{
        margin-bottom: 20px;
        .search-form {
            .inputText {
                width: 320px;
            }
        }
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    }
</style>
