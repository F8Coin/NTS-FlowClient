<template>
    <div class="fillcontain">
        <div class="tabContainer" ref="tabContainer">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('eastChina')"><i class="fa fa-camera-retro"></i>卫星流量套餐</span>
                    <china-tabs-table  @showbuyFlowDialog="showbuyFlowDialog" :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <!-- <el-tab-pane>
                    <span slot="label" @click="toggleTabs('southChina')"><i class="fa fa-bank"></i>流量套餐2</span>
                    <china-tabs-table  @showbuyFlowDialog="showbuyFlowDialog" :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('centralChina')"><i class="fa fa-cubes"></i>流量套餐3</span>
                    <china-tabs-table  @showbuyFlowDialog="showbuyFlowDialog" :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('northChina')"><i class="fa fa-fax"></i>流量套餐4</span>
                    <china-tabs-table  @showbuyFlowDialog="showbuyFlowDialog" :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('northwestChina')"><i class="fa fa-institution"></i>流量套餐5</span>
                    <china-tabs-table  @showbuyFlowDialog="showbuyFlowDialog" :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toggleTabs('southwestChina')"><i class="fa fa-life-ring"></i>流量套餐6</span>
                    <china-tabs-table  @showbuyFlowDialog="showbuyFlowDialog" :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                     <span slot="label" @click="toggleTabs('northeastChina')"><i class="fa fa-paper-plane"></i>流量套餐7</span>
                     <china-tabs-table  @showbuyFlowDialog="showbuyFlowDialog" :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane>
                <el-tab-pane>
                     <span slot="label" @click="toggleTabs('specialareaChina')"><i class="fa fa-calendar"></i>流量套餐8</span>
                     <china-tabs-table  @showbuyFlowDialog="showbuyFlowDialog" :toggleData="toggleData"></china-tabs-table>
                </el-tab-pane> -->
            </el-tabs>
            <!-- <pagination :pageTotal="pageTotal"></pagination> --> 
            <buyFlowDialog  v-if=" buyFlowDialog.show" :isShow=" buyFlowDialog.show" :dialogRow=" buyFlowDialog.dialogRow"  @getFundList="getUserList"  @closeDialog="hidebuyFlowDialog"></buyFlowDialog>
        </div>
    </div>
</template>

<script>
    import chinaTabsTable from './components/chinaTabsTable'
    import data from './data/chinaTabs.json';
    import Pagination from "@/components/pagination";
    import buyFlowDialog from './components/buyFlowDialog'

    export default {
        data(){
            return {
                toggleData:'',
                pageTotal:60,
                buyFlowDialog:{  
                    show:false,
                    dialogRow:{}
                },
            }
        },
        components: {
            chinaTabsTable,
            Pagination,
            buyFlowDialog
        },
        mounted(){
            //  this.setTabHeight();
            //  window.onresize = () => {
            //     this.setTabHeight();
            //  }
            this.toggleTabs('eastChina');
        },
        methods: {
            setTabHeight(){
                this.$nextTick(() => {
                    this.$refs.tabContainer.style.height =  (document.body.clientHeight - 160)+'px'
                })
            },

            toggleTabs(item){
                this.toggleData = item;
            },

            // 显示添加信息框
            showbuyFlowDialog(){
                // this.$store.commit('SET_DIALOG_TITLE', val)
                this.buyFlowDialog.show = true;
                // this.createAccount(registData);
            },

            // 隐藏添加信息框
            hidebuyFlowDialog(){
                // this.$store.commit('SET_DIALOG_TITLE', val)
                this.buyFlowDialog.show = false;
                // this.createAccount(registData);
            },
        }
    }
</script>

<style lang="less" scoped>
    .fa{
        margin-right:5px;
    }
  
</style>


