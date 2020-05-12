<template>
  <div class="search_container searchArea">
        <el-form 
            onSubmit="return false"
            :inline="true"
            :title= "订单信息" 
            :model='search_data' 
            :rules="rules"
            ref="search_data" 
            class="demo-form-inline search-form">
            <el-form-item label="">
                <el-input class="inputText" v-model="search_data.search" placeholder="请输入搜索内容"  @keyup.enter.native='onScreenOutOrder("search_data")'></el-input>
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
                v-model="search_data.endDate"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="btnRight">
                <el-button type="primary" size ="mini" icon="search" @click='onScreenOutOrder("search_data")'>查询</el-button>
                <el-button type="primary" size ="mini" icon="search" @click='onResetData("search_data")'>重置</el-button>
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onBatchDelMoney()' :disabled="searchBtnDisabled">批量删除</el-button> -->
                <el-button type="success" size ="mini" icon="view" @click="onexportData()">导出Excel</el-button>
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onAddMoney()'>添加</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import * as filter from '@/utils/filter'
    import { mapGetters } from 'vuex'

  export default {
      name:'searchItem',
      data(){
          return {
            search_data:{
                startDate:'',
                endDate:'',
                search:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入搜索公司名称', trigger: 'blur' },
                ]
            },
          }
      },
       computed:{
        ...mapGetters(['searchBtnDisabled']),

      },
      created(){
      },
      methods:{
          onScreenOutOrder(searchForm){
              this.$refs[searchForm].validate((valid) => {
					if (valid) {
                        // this.$store.commit('SET_SEARCH',this.search_data);
                        this.search_data.startDate =   this.search_data.startDate? filter.DateToStr(this.search_data.startDate) : ''
                        this.search_data.endDate =  this.search_data.endDate ? filter.DateToStr(this.search_data.endDate) : ''
                        this.$emit("searchList",this.search_data);
                    }
              })
          },
          onResetData(){
              this.search_data={
                        startDate:'',
                        endDate:'',
                        search:''
                    },
              this.$emit('resetTableData')      
          },

          onAddMoney(){
              this.$emit("showDialog",'add');
          },
          onBatchDelMoney(){
              this.$emit("onBatchDelMoney");
          },
          onexportData(){
              this.$emit("exportData")
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
