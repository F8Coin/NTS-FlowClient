
<template>
  <div class="logContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <a href="javascript:void(0)" target="_blank">
           <!-- <icon-svg icon-class="iconGithub" /> -->
           <i class="fa fa-volume-up icons"></i>
        </a>
        <span>公告通知：</span>
      </div>
      <div class="logArea el-scrollbar">
            <div class="item" v-for="(item,index) in logsData" :key="index">
              <p class="timeArea">
                <span class="title">日期：</span>
                <span class="title time">{{ item.releaseTime }}</span>
              </p>
              <div class="logContent">
                  <p class="title">通知内容：</p>
                  <ul class="logUl">
                    <!-- <li v-for="(citem,cindex) in item.data" :key="cindex">{{citem}}</li> -->
                    <li> {{ item.content }} </li>
                </ul>
              </div>
          </div>
      </div>
   
  </el-card>
  </div>
</template>

<script>
  import { api } from '@/config/api';
  import * as filter from '@/utils/filter';

  export default {
    name:'logList',
    data() {
      return {
        logsData:[],
      };
    },
    created() {
      this.getNoticeData();
    },
    methods: {
      showMessage(type,message){
        this.$message({  // Element ui自带信息弹窗
            type: type,
            message: message
        });
			},
      // 消息通知- 消息列表
			async getNoticeData() {
				let res = await api.noticeDataList();
				if(res.data.code == 0) {
          // this.showMessage('success',res.data.msg);
          this.logsData = res.data.rows;
				}else {
					this.showMessage('error',res.data.msg);
				}
			},
    }
  }
</script>

<style lang="less" scoped>
  .logContainer{
      padding: 10px;
      background: #fff;
      box-sizing: border-box;
      height:370px;
      max-height: 370px;
      overflow: hidden;
      border-radius: 6px;
      .logArea{
        overflow: auto;
        height: 100%;
      }
      .item{
        .title{
          font-size: 13px;
        }
        .time{
          color:#87DE75;
        }
          .logContent{
            .logUl{
              padding-left: 30px;
              li{
                font-size: 12px;
                list-style: disc;
                line-height: 20px;
              }
            }
        }
      }
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

