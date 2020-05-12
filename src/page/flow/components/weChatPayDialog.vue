<template>
    <el-dialog 
        :visible.sync="isVisible"
        :title="layerTitle" 
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <div class="form">
            <el-form 
                ref="form" 
                :model="form"
                :rules="form_rules"
                :label-width="dialog.formLabelWidth" 
                style="margin:10px;width:auto;">

                <el-form-item prop='mainAccount' label="企业主账号:">
                    <el-input type="text" v-model.number="form.mainAccount" placeholder="请输入创建者企业主账号"></el-input>
                </el-form-item>

                <el-form-item prop='flowPlansId' label="选择套餐:">    
					<el-select v-model="form.flowPlansId" placeholder="请选择流量套餐类型" class="flowPackage" @change="selectflowPlansId(form.flowPlansId)">
						<el-option
							v-for="item in flowPackage"
							:key="item.flowPlansId"
							:label="item.plansName"
							:value="item.flowPlansId"
							:disabled="item.disabled">
						</el-option>
					</el-select>
                </el-form-item>

                <el-form-item prop='flowAmount' label="购买数量:">
                    <el-input type="text" v-model.number="form.flowAmount" placeholder="请输入购买的流量数量 (单位 KB)"></el-input>
                </el-form-item>

                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>

                <el-form-item  class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>购 买</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>

<script>
   import { api } from '@/config/api'
   import { mapState, mapGetters } from 'vuex'
   import { addMoney,updateMoney } from "@/api/money";

  export default {
      name:'addFundDialogs',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){ // 判断输入数值不能为空
                    let text;
                    if(rule.field == "mainAccount"){
                        text= "企业主账号"
                    }
                    else if(rule.field == "flowAmount"){
                        text= "购买流量的数量"
                    }
                    callback(new Error(text+'不能为空'));
                }else {
                    callback(); // 不能省略
                }
            };
          return {
            isVisible: this.isShow,
            form:{
                mainAccount: '',
				remarks: '',
				flowAmount: '',
				flowPlansId: ''
			},
			flowPackage: [
				{label: '1',value: '自定义套餐'}
			],
            layerTitle: '流量购买',
            form_rules: {
                
                // 校验方式2
                mainAccount   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                flowPlansId   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                flowAmount   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
            },
            //详情弹框信息
            dialog: {
                width:'300px',
                formLabelWidth:'120px'
            }
          }
      },
      props:{
          isShow:Boolean,
          dialogRow:Object
      },
      computed:{
        // ...mapGetters(['addFundDialog']),

      },
      created(){

      },
      mounted(){
		  this.getFlowPackageType();
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

            async addAccount(addInfo) {
                let res = await api.addAccount(addInfo);
                if(res.data.code == 0) {
                    this.showMessage('success', '账户创建成功');
                    this.$emit('closeDialog');
                }else {
                    this.showMessage('error','账户创建失败, '+res.data.msg);
                }
			},

			async weChatPay(params){
				let res= await api.weChatPay(params)
				if(res.data.code == 0) {
					// this.showMessage('success',res.data.msg);
					// 将返回的url生成二维码,完成支付
					this.isVisible= false;
					// res.data.data.codeUrl 
				}else {
					this.showMessage('error',res.data.msg);
				}
			},
			
			async companyFlowOrder(params) {
				let res = await api.buyCompanyFlow(params)
				if(res.data.code == 0) {
					this.weChatPay({
						orderCode:res.data.data.orderCode
					});
				}else {
					this.showMessage('error',res.data.msg);
				}
			},

            //表单提交
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {//表单数据验证完成之后，提交数据;
						this.companyFlowOrder({
							flowNumber: this[form].flowAmount,
							flowPlansId: this[form].flowPlansId,
							// mainAccount: formData.mainAccount,
							// remarks: formData.remarks
						})
                    }else {
                        this.showMessage('error', '数据校验不通过');
                    }
                })
			},
			
			// 流量套餐- 流量套餐列表
			async getFlowPackageType() {
				let res = await api.flowPackageType({
					// iotPackageType: '1',	
					// satellitePackageType: '2'	
				})
				if(res.data.code == 0) {
					if(res.data.data && res.data.data.length) {
						this.flowPackage= res.data.data;
					}else {
						this.showMessage('error', res.data.msg);
					}
				}else {
					this.showMessage('error','获取套餐列表失败');
				}
			},

			// 选择流量套餐类型
			selectflowPlansId(val) {
				console.log('获取套餐类型Id:'+val);
			}
        }
    }
</script>

<style lang="less">
    .el-dialog__wrapper {
        .el-dialog {
            width: 35% ;
        }
    }
    .search_container{
		margin-bottom: 20px;
	}
	.flowPackage {
		width: 100%;
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
