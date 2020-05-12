<template>
    <el-dialog 
        :visible.sync="isVisible"
        :title="addFundDialog.title" 
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <section class="data_section" ref="data_section"> 
			<a href="javascript:void(0)">
				<el-row :gutter="10" class="row_list">
					<el-col :span="12">
						<div class="row_right row_base">
							
							<el-col :span="12">
								<div class="pay part5_color data_list rflex">
									<div class="leftItem cflex wflex">
										<!-- <p class="investor">{{ $t('index.home_text5') }}</p> -->
										<p class="investor">已消耗4G流量</p>
										<!-- <span class="number">6675<span class="perTitle">( {{ $t('index.device_unit') }} )</span></p> -->
										<p class="number">{{ addFunDialogData.cardFlow }}<span class="perTitle">( {{ $t('index.flow_unit') }} )</span></p>
									</div>
									<div class="rightItem">
										<!-- <icon-svg icon-class="iconpay" /> -->
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="pay part6_color data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">4G套餐类型</p>
										<p class="number">{{ addFunDialogData.cardPlansType }}</p>
										<!-- <p class="investor">{{ $t('index.home_text6') }}</p>
										<p class="number">8373<span class="perTitle">( {{ $t('index.device_unit') }} )</span></p> -->
									</div>
									<div class="rightItem">
										<!-- <icon-svg style="font-size:36px" icon-class="iconfufei0" /> -->
									</div>
								</div>
							</el-col>
						</div>
					</el-col>
					
					<el-col :span="12">
						<div class="row_left row_base">
							<el-col :span="12">
								<div class="pay part1_color data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">已消耗卫星流量</p>
										<p class="number"> {{ addFunDialogData.satFlow }} <span class="perTitle">({{ $t('index.flow_unit') }})</span></p>
									</div>
									<div class="rightItem">
										<!-- <icon-svg icon-class="iconfukuan" /> -->
										<!-- <i class="fa fa-area-chart icons"></i> -->
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="pay part2_color data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">卫星套餐类型</p>
										<!-- <span class="number">720<span class="perTitle">( {{ $t('index.flow_unit') }} )</span></p> -->
										<p class="number">{{ addFunDialogData.satPlansType }}</p>
									</div>
									<div class="rightItem">
										<!-- <icon-svg icon-class="iconpay3" /> -->
									</div>
								</div>
							</el-col>
						</div>
					</el-col>
				</el-row>
			</a>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="24">
					<bar-chart type="barChart"></bar-chart>
				</el-col>
			</el-row>
			<!-- <el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
				    <pie-chart type="carrierType"></pie-chart>
				</el-col>
				<el-col :span="10">
					<line-chart></line-chart>
				</el-col>
			   	<el-col :span="7">
					<radar-chart></radar-chart>
				</el-col>
			</el-row>  -->
		</section>
    </el-dialog>
    
</template>

<script>
	import echarts from 'echarts';
	import { api } from '@/config/api';
	import barChart from 'cps/echarts/barChart'; // 最近1年流量消耗统计柱形图
	import pieChart from 'cps/echarts/pieChart'; // 承运商用户数量占比
	import radarChart from 'cps/echarts/radarChart'; // 设备管理概况分布
	import lineChart from 'cps/echarts/lineChart'; // 最近7天流量购买订单数统计 
   import { mapState, mapGetters } from 'vuex'
   import { addMoney,updateMoney } from "@/api/money";
import * as filter from '@/utils/filter';

  export default {
      name:'addFundDialogs',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){
                    let text;
                    if(rule.field == "username"){
                        text='业务负责人';
                    }else if(rule.field == "tel"){
                        text='电话';
                    }else if(rule.field == "email"){
                        text='邮箱';
                    }else if(rule.field == "address"){
                        text='企业地址';
                    }
                    callback(new Error(text+'不能为空'));
                }
            };
          return {
            addFundDialog: {
                title: '流量统计详情'
            },  
			isVisible: this.isShow,
			satModleSn: this.todeviceSn,
            form:{
                address:'',
                company: '',
                username: '',
                tel:'',
                email:'',
                remarks: ''
            },
            //详情弹框信息
            dialog: {
                width:'100px',
                formLabelWidth:'120px'
			},
			xAxis: [
				{
					data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
				}
            ],
			series: [
				{
					data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
				},
				{
					data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.6, 48.7, 18.8, 6.0, 2.3],
				}
			],
			addFunDialogData: {
				satFlow: '',
				cardFlow: '', 
				satPlansType: '',
				cardPlansType: ''
			}
          }
      },
      components: {
        // logList,
        barChart,
        pieChart,
        radarChart,
        lineChart
    },
      props:{
          isShow:Boolean,
		  dialogRow:Object,
		  todeviceSn: String,
      },
      computed:{
        ...mapGetters(['addFundDialog']),

      },
      created(){

           if(this.addFundDialog.type === 'edit'){
                this.form = this.dialogRow;
                // this.form.incomePayType = (this.dialogRow.incomePayType).toString();
                // this.form.pay = -this.dialogRow.pay;
            }else{
                // this.$refs['form'].resetFields();
                // console.log(this.$refs['form']);
            }                
      },
      mounted(){
		//   console.log('获取传递过来的设备Sn:'+ this.satModleSn);
		this.getFlowTotalInfoUp({deviceSn:this.satModleSn});
		this.getFlowTotalInfoDown({deviceSn:this.satModleSn});
      },
      methods:{
			showMessage(type,message){
				this.$message({  // Element ui自带信息弹窗
					type: type,
					message: message
				});
			},    

			onScreeoutMoney(){

			},
			onAddMoney(){

			},
			closeDialog(){
				this.$emit('closeDialog');
			},
			// 表单提交
			onSubmit(form){
				this.$refs['form'].validate((valid) => {
					if (valid) {//表单数据验证完成之后，提交数据;
						let formData = this[form];
						const para = Object.assign({}, formData)
						// edit
						if(this.addFundDialog.type === 'edit'){
							updateMoney(para).then(res => {
								this.$message({
									message: '修改成功',
									type: 'success'
								})
								this.$refs['form'].resetFields()
								this.isVisible = false
								this.$emit('getFundList');
						})
						}else{
							// add
							addMoney(para).then(res => {
								this.$message({
									message: '新增成功',
									type: 'success'
								})
								this.$refs['form'].resetFields()
								this.isVisible = false
								this.$emit('getFundList');
						})
						}
					}
				})
			},
		  
			// 流量管理-获取4G卫星流量使用详情(上)
			async getFlowTotalInfoUp(params) {
				let res = await api.flowTotalInfoUp(params);
				if(res.data.code == 0) {
					// this.showMessage('success',res.data.msg);
					this.addFunDialogData = this.filterUpData(res.data.data[0]);

				}else {
					this.showMessage('error',res.data.msg);
				}
			},

			// 流量管理-获取4G卫星流量使用详情(下)
			async getFlowTotalInfoDown(params) {
				let res = await api.flowTotalInfoDown(params)
				if(res.data.code == 0) {
					// this.showMessage('success',res.data.msg);
				}else {
					this.showMessage('error',res.data.msg);
				}
			},

			filterUpData(objData) {
				let dataBothData= objData.dataBoth ? objData.dataBoth : "0.0" 
				let orbcommBytesData= objData.orbcommBytes ? objData.orbcommBytes : "0.0" 
				let satSumData= ((Number(dataBothData) + Number(orbcommBytesData))/1024).toFixed(2);
				// let satSumData= ((Number(dataBothData) + Number(orbcommBytesData))/1024);
				let cardFlow= objData.cardDataUsage ? (Number(objData.cardDataUsage)/1024).toFixed(2) : "0.0"
				// let cardFlow= objData.cardDataUsage ? objData.cardDataUsage : "0.0"

				let  newObjData= {
						satFlow: satSumData,
						cardFlow: cardFlow, 
						satPlansType: objData.pricePlan ? objData.pricePlan : "无",
						cardPlansType: objData.cardDataPlan ? objData.cardDataPlan : "无"
					}
				return newObjData;	
			},

			filterDownData(objData) {

			}
      }
  }
</script>

<style lang="less" scoped>
	.el-dialog__wrapper{
		.el-dialog {
			width: 50%;
		}
	} 
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


    .data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
			.orderbarArea{
				height: 370px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				width:62px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 30px;
				}
			}
		    .number{
				font-size: 18px;
				font-weight: bold;
				.perTitle{
					font-size: 16px;
   				    margin-left: 5px;
				}
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
	}
</style>
