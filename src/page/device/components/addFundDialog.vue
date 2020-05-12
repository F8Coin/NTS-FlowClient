<template>
    <!-- :title="addFundDialog.title" -->
    <el-dialog
        v-loading="loading" 
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
                style="margin:10px;width:auto;"
                >

                <el-form-item prop='addTypeId' label="分类：">  
                    <el-select v-model="form.addTypeId" placeholder="请选择添加类型" class="dropDown" @change="selectAddTypeId(form.addTypeId)">
						<el-option
							label="卫星模块"
							value="1"
							>
						</el-option>
						<el-option
							label="物联网卡"
							value="2"
							>
						</el-option>
                        <el-option
							label="双模设备"
							value="3"
							>
						</el-option>
					</el-select>
                </el-form-item>

                <el-form-item prop='satModuleSn' label="卫星模块SN:" v-if="isSatForm">
                    <el-input type="text" v-model="form.satModuleSn" placeholder="请输入卫星模块SN"></el-input>
                </el-form-item>

                <!-- 1-OGI 2-OG2 -->
                <el-form-item prop='satModuleId' label="卫星模块类型：" v-if="isSatForm">  
                    <el-select v-model="form.satModuleId" placeholder="请选择卫星模块类型" class="satModule" @change="selectSatModuleId(form.satModuleId)">
						<el-option
							label="OGI"
							value="1"
							>
						</el-option>
						<el-option
							label="OG2"
							value="2"
							>
						</el-option>
					</el-select>
                </el-form-item>

                <!-- <el-form-item prop='satCarrierId' label="卫星运营商:" v-if="isSatForm">    
					<el-input type="text" v-model="form.satCarrierId" placeholder="请输入卫星运营商ID"></el-input>
                </el-form-item> -->

                <el-form-item prop='satCarrierId' label="卫星运营商:" v-if="isSatForm">    
					<el-select v-model="form.satCarrierId" placeholder="请选择卫星运营商" class="satCarrier" @change="selectSatCarrierId(form.satCarrierId)">
						<el-option
							v-for="item in form.satCarrierList"
							:key="item.satCarrierId"
							:label="item.satCarrierName"
							:value="item.satCarrierId"
							:disabled="item.disabled">
						</el-option>
					</el-select>
                </el-form-item>

                <el-form-item prop='terminalTypeId' label="终端类型:">
                    <el-select v-model="form.terminalTypeId" placeholder="请选择设备终端类型" class="satCarrier" @change="selectTerminalTypeId(form.terminalTypeId)">
						<el-option
							v-for="item in form.terminalTypeList"
							:key="item.terminalTypeId"
							:label="item.terminalTypeName"
							:value="item.terminalTypeId"
							:disabled="item.disabled">
						</el-option>
					</el-select>
                </el-form-item>

                <el-form-item prop='terminalName' label="设备型号:" v-if="isSatForm">
                    <el-input type="text" v-model="form.terminalName"></el-input>
                </el-form-item>


                <el-form-item prop='Iot_ICCID' label="物联卡ICCID:" v-if="isCardForm">
                    <el-input type="text" v-model="form.Iot_ICCID"></el-input>
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
   import {api} from '@/config/api';
   import { mapState, mapGetters } from 'vuex';
   import { addMoney,updateMoney } from "@/api/money";

  export default {
      name:'addFundDialogs',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){
                    let text;
                    if(rule.field == "module"){
                        text='模块名称';
                    }else if(rule.field == "terminal"){
                        text='终端类型';
                    }else if(rule.field == "companyName"){
                        text='企业名称';
                    }else if(rule.field == "account"){
                        text='企业主账号';
                    }
                    callback(new Error(text+'不能为空'));
                }else {
                    callback();
                }
            };
          return {
            isVisible: this.isShow,
            loading: false,
            isSatForm: true,
            isCardForm: false,
            form:{
                addTypeId: '',
                deviceId:'',
                satModuleSn: '',
                module: '',
                terminal: '',
                companyName:'',
                account:'',
                satModuleId: '',
                Iot_ICCID: '',
                satCarrierList: [],
                satCarrierId: '',
                terminalName: '',
                terminalTypeId: '',
                terminalTypeList: []
            },
            satCarrierId: '',
            layerTitle: "添加设备",
            form_rules: {
                deviceId   : [
                    {required: true, message : '设备ID不能为空',trigger : 'blur'}
                ],
                module   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                terminal   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                companyName   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                account   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ]
            },
            //详情弹框信息
            dialog: {
                width:'400px',
                formLabelWidth:'120px'
            }
          }
      },
      props:{
          isShow:Boolean,
          dialogRow:Object
      },
      computed:{
        ...mapGetters(['addFundDialog']),

      },
      created(){       
        this.getDeviceTypeList();
        this.getAllCarrierList();
            
      },
      mounted(){
          
      },
      methods:{
          showMessage(type,message){
            this.$message({  // Element ui自带信息弹窗
                type: type,
                message: message,
            });
          },

          selectAddTypeId(val) {
            // 1-卫星模块 2-物联网卡 3-双模   
              switch (val){
                  case "1":
                    this.isSatForm = true;
                    this.isCardForm = false;
                    break;
                  case "2": 
                    this.isCardForm = true;
                    this.isSatForm = false; 
                    break;
                  case "3":
                    this.isSatForm = true;
                    this.isCardForm = true;
                    break;
                  default: 
                    this.isSatForm = true;
                    this.isCardForm = false;
                    break;
              }
          },

          selectSatModuleId(val) {
            //   console.log('卫星模块ID:'+val);
          },
          
          selectSatCarrierId(val) {
            //   console.log('卫星运营商:'+val);
          },

          selectTerminalTypeId(val) {
            //   console.log('卫星终端类型ID:'+val)
          },

          closeDialog(){
              this.$emit('closeDialog');
          },

          //表单提交
          onSubmit(form){
            this.$refs['form'].validate((valid) => {
                if (valid) {//表单数据验证完成之后，提交数据;
                    const para = {
                        carrierId: this.form.satCarrierId ,
                        deviceName: this.form.terminalName ,
                        deviceSn: this.form.satModuleSn ,
                        deviceTypeId: this.form.terminalTypeId ,
                        satelliteModule: this.form.satModuleId,
                        cardIccId: this.form.Iot_ICCID
                    }
                    // 添加设备
                    let carrierId= this.form.satCarrierId;
                    this.onAddDevice(para,carrierId);
                }
            })
          },

          // 设备管理-- 添加设备完成后激活卫星模块
            async onAddDevice(params,satCarrier) {
                let res = await api.addDevice(params);
                if(res.data.code == 0) {
                    let carrierName= ""
                    if(satCarrier == "4") {
                        carrierName= "INMARSATIDP";
                        this.loading= true;
                        this.onActiveDeviceFun({
                            carrier:  carrierName,
                            subscriberId: params.deviceSn 
                        })
                    }else if( satCarrier == "1") {
                        carrierName= "ORBCOMM";
                        this.loading= true;
                        this.onActiveDeviceFun({
                            carrier:  carrierName,
                            subscriberId: params.deviceSn 
                        })
                    }else {
                        this.showMessage('success','添加成功')
                        this.isVisible = false;
                        this.$emit('getTerminalList');
                    }
                }else {
                    this.showMessage('error', res.data.msg);
                }  
            },     

          
            // 激活卫星模块方法
            async onActiveDeviceFun(params) {
                let res = await api.ocpDeviceActive(params);
                if(res.data.code == 0) {
                    this.loading = false;
                    this.showMessage('success','激活添加操作成功');
                    this.isVisible = false;    
                    this.$emit('getTerminalList');
                }else {
                    this.loading = false;
                    this.isVisible = false;
                    this.showMessage('error',res.data.msg);
                    this.$emit('getTerminalList');
                }
            },  


          // 设备管理-- 终端分类
          async getDeviceTypeList() {
              let res = await api.deviceTypeData();
              if(res.data.code == 0) {
                //   this.showMessage('success', '获取终端分类成功');
                for (let i = 0; i < res.data.data.length; i++) {
                    this.form.terminalTypeList.push({
                        terminalTypeId: res.data.data[i].deviceTypeId,
                        terminalTypeName: res.data.data[i].name
                    })
                }
                // console.log(this.form.terminalTypeList);
              }else {
                  this.showMessage('error',res.data.msg);
              }
          },
          
          // 运营商-- 运营商列表
          async getAllCarrierList() {
              let res = await api.allCarrierListData();
              if(res.data.code == 0) {
                for (let i = 0; i < res.data.data.length; i++) {
                    this.form.satCarrierList.push({
                        satCarrierId:  res.data.data[i].carrierId,
                        satCarrierName: res.data.data[i].name
                    })
                    
                }
              }else {
                  this.showMessage('error',res.data.msg);
              }
          }   
      }
  }
</script>

<style lang="less">
    .el-dialog__wrapper {
        .el-dialog {
            width: 35%;
        }
    }

    .search_container{
        margin-bottom: 20px;
    }

    .satModule {
        width: 100%;
    }

    .dropDown {
        width: 100%;
    }

    .satCarrier {
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
