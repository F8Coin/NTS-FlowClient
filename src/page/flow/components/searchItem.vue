<template>
  <div class="search_container searchArea">
        <el-form 
            :inline="true" 
            :model='search_data' 
            :rules="rules"
            ref="search_data" 
            class="demo-form-inline search-form">
            <el-form-item label="">
                <el-input style="width: 320px" v-model="search_data.deviceSn" placeholder="请输入搜索的卫星SN或物联网卡号"  @keyup.enter.native='onqueryFlow("search_data")'></el-input>
            </el-form-item>
            
             <!-- 查询起始时间 -->
            <el-form-item label="">
               <span class="demonstration">开始时间</span>
                <el-date-picker
                v-model="search_data.startDate"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
               <span class="demonstration">结束时间</span>
                <el-date-picker
                v-model="search_data.overDate"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="btnRight">
                <el-button type="primary" size ="mini" icon="search" @click='onqueryFlow("search_data")'>查询</el-button>
                <el-button type="primary" size ="mini" icon="search" @click='onresetFlow'>重置</el-button>
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onBatchDelMoney()' :disabled="searchBtnDisabled">批量删除</el-button> -->
                <el-button type="success" size ="mini" icon="view" @click="onexportData">导出Excel</el-button>
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onAddMoney()'>添加</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
   import { mapGetters } from 'vuex'
   import * as filter from '@/utils/filter'

  export default {
      deviceSn:'searchItem',
      data(){
          return {
            search_data:{
                startDate:'',
                overDate:'',
                deviceSn:''
            },
            rules: {
                deviceSn: [
                    { required: true, message: '请输入搜索的SN', trigger: 'blur' },
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
          onqueryFlow(searchForm){
              this.$refs[searchForm].validate((valid) => {
					if (valid) {
                        // this.$store.commit('SET_SEARCH',this.search_data);
                        this.search_data.startDate = filter.StrtoGMT(this.search_data.startDate) 
                        this.search_data.overDate = filter.StrtoGMT(this.search_data.overDate) 
                        this.$emit("searchList",this.search_data);
                    }
              })
          },
          onresetFlow() {
              this.search_data= {
                    startDate:'',
                    overDate:'',
                    deviceSn:''
                },
              this.$emit("resetList",this.search_data);
          },
          onexportData() {
              this.$emit("exportData");
          },
          onAddMoney(){
              this.$emit("showDialog",'add');
          },
          onBatchDelMoney(){
              this.$emit("onBatchDelMoney");
          }
      }
  }
</script>

<style lang="less" scoped>
    .search_container{
        margin-bottom: 20px;
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
