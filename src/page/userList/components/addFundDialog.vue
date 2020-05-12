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

                <el-form-item prop='companyName' label="企业名称:">
                    <el-input type="text" v-model="form.companyName" placeholder="请输入企业名称"></el-input>
                </el-form-item>

                <el-form-item prop='contactPerson'  label="业务负责人:">
                    <el-input type="text" v-model.number="form.contactPerson" placeholder="请输入业务负责人姓名"></el-input>
                </el-form-item>

                <el-form-item prop='contactTel' label="负责人电话:">
                    <el-input type="text" v-model.number="form.contactTel" placeholder="请输入业务负责人联系电话"></el-input>
                </el-form-item>

                <el-form-item prop='contactEmail' label="负责人邮箱:">
                    <el-input type="text" v-model.number="form.contactEmail" placeholder="请输入业务负责人邮箱"></el-input>
                </el-form-item>
                
                <el-form-item prop='companyAdd' label="企业地址:">
                    <el-input type="text" v-model.number="form.companyAdd" placeholder="请输入企业地址"></el-input>
                </el-form-item>

                <el-form-item prop='mainAccount' label="企业主账号:">
                    <el-input type="text" v-model.number="form.mainAccount" placeholder="请输入创建者企业主账号"></el-input>
                </el-form-item>

                <el-form-item prop='accountName' label="新建账户名称:">
                    <el-input type="text" v-model.number="form.accountName" placeholder="请设置新建账户的名称"></el-input>
                </el-form-item>

                <el-form-item prop='accountPassword' label="新建账户密码:">
                    <el-input type="text" v-model.number="form.accountPassword" placeholder="请设置新建账户的密码"></el-input>
                </el-form-item>

                <el-form-item label="备注:">
                    <el-input type="textarea" v-model="form.remarks"></el-input>
                </el-form-item>

                <el-form-item  class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
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
                    if(rule.field == "companyName") {
                        text= "企业名称"
                    }
                    else if(rule.field == "contactPerson"){
                        text= '业务负责人';
                    }
                    else if(rule.field == "contactTel"){
                        text= '业务负责人联系电话';
                    }
                    else if(rule.field == "contactEmail"){
                        text= '业务负责人邮箱';
                    }
                    else if(rule.field == "companyAdd"){
                        text= '企业地址';
                    }
                    else if(rule.field == "mainAccount"){
                        text= "企业主账号"
                    }
                    else if(rule.field == "accountName"){
                        text= "新建账号名称"
                    }
                    else if(rule.field == "accountPassword"){
                        text= "新建账户密码"
                    }
                    callback(new Error(text+'不能为空'));
                }else {
                    callback(); // 不能省略
                }
            };
          return {
            isVisible: this.isShow,
            form:{
                companyName: '',
                contactPerson: '',
                contactTel:'',
                contactEmail:'',
                companyAdd:'',
                mainAccount: '',
                accountName: '',
                accountPassword: '',
                remarks: ''
            },
            layerTitle: '创建企业账户',
            form_rules: {
                // 校验方式1
                // companyName   : [
                //     {required: true, message : '企业名称不能为空',trigger : 'blur'}
                // ],
                
                // 校验方式2
                companyName   : [
                    {required: true, validator:validateData,trigger : 'blur'}
                ],
                contactPerson   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                contactTel   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                contactEmail   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                companyAdd   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                mainAccount   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                accountName   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                accountPassword   : [
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
        //    if(this.addFundDialog.type === 'edit'){
        //         this.form = this.dialogRow;
        //         // this.form.incomePayType = (this.dialogRow.incomePayType).toString();
        //         // this.form.pay = -this.dialogRow.pay;
        //         console.log('修改页面弹窗')
        //     }else{
        //         console.log('添加页面弹窗');
        //         // this.$refs['form'].resetFields();
        //         // console.log(this.$refs['form']);
        //     }                
      },
      mounted(){

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

            //表单提交
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {//表单数据验证完成之后，提交数据;

                        console.log('表单数据验证成功');

                        let formData = this[form]; 

                        const para = {
                            accountTypeId: 1,
                            mobile: formData.contactTel,
                            nickname: formData.contactPerson,
                            password: formData.accountPassword,
                            username: formData.accountName
                        }

                        this.addAccount(para);
                        // edit
                        // if(this.addFundDialog.type === 'edit'){
                        //     updateMoney(para).then(res => {
                        //         this.$message({
                        //             message: '修改成功',
                        //             type: 'success'
                        //         })
                        //         this.$refs['form'].resetFields()
                        //         this.isVisible = false
                        //         this.$emit('getFundList');
                        //    })
                        // }else{
                        //     // add
                        //     addMoney(para).then(res => {
                        //         this.$message({
                        //             message: '新增成功',
                        //             type: 'success'
                        //         })
                        //         this.$refs['form'].resetFields()
                        //         this.isVisible = false
                        //         this.$emit('getFundList');
                        //    })
                        // }
                    }else {
                        // this.showMessage('error', '数据校验不通过');
                    }
                })
            },
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
