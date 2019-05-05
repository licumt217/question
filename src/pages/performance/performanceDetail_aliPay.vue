<template>
    <div class="performanceList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="stats-bars"></Icon>
                个人业绩明细
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-cloud-download-outline" @click="downloadDetail">业绩明细下载</Button>
            </span>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="7">
                        <Form-item label="扫码日期:">
                            <Date-picker type="datetime" style="width: 100%" @on-change="handleStartTime" placeholder="选择日期和时间"></Date-picker>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        <Form-item label="~" label-width="28">
                            <Date-picker type="datetime" style="width: 100%" @on-change="handleEndTime" placeholder="选择日期和时间"></Date-picker>
                        </Form-item>
                    </Col>
                    <Col span="3" style="text-align:right;height:44px;">
                        <Button class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="qrmPerformList.length<=0 || !qrmPerformList">暂无数据</div>
                            <table cellspacing="0" class="addAcount" style="table-layout:auto;" v-show="qrmPerformList.length>0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>姓名</td>
                                    <td>手机号</td>
                                    <td>扫码用户ID</td>
                                    <td>扫码用户手机号</td>
                                    <td>扫码日期</td>
                                    <td>注册时间</td>
                                    <td>有效订单时间</td>
                                    <td>开通免密时间</td>
                                </tr>
                                <tr v-for="(perform,index) in qrmPerformList" v-show="Object.keys(perform).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{perform.qrmDtuserName}}</td>
                                    <td>{{perform.phone}}</td>
                                    <td>{{perform.scanUserId}}</td>
                                    <td>{{perform.scanPhone}}</td>
                                    <td>{{perform.scanDate}}</td>
                                    <td>{{perform.registerDate}}</td>
                                    <td>{{perform.orderTime}}</td>
                                    <td>{{perform.paybindTime}}</td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <template>
                        <Row type="flex" justify="center" style="margin:50px;">
                            <Col>
                                <Page :total="total" show-elevator show-total :pageSize='pageSize' @on-change="toPage" v-if="total > pageSize"></Page>
                            </Col>
                        </Row>
                    </template>
                </div>
            </div>
        </Card>
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';

    export default {
        data () {
            return {
                page: 1,
                pageSize: 10,
                total: 0,
                thisPerformId:'',
                qrmPerformList:  [{}],
                formItem: {
                    startDate: '',
                    endDate: '',
                },
                searchItem: {
                    startDate: '',
                    endDate: '',
                },
            }
        },
        mounted: function () {
            let _this = this
            _this.thisPerformId = util.getSession('thisPerformId');
            setTimeout(()=>{
                if(util.isEmpty(_this.thisPerformId)){
                    util.goto(this,'performance/performance_aliPay');
                }
                _this.getPerformacneList();
            },500)
        },
        watch: {
            page: function (val) {
                this.getPerformacneList()
            }
        },
        methods: {
            handleStartTime(date){
                this.formItem.startDate = date; 
            },
            handleEndTime(date){
                this.formItem.endDate = date; 
            },
            toPage(page) {
                this.page = page
            },
            query() {
                if(this.formItem.startDate && this.formItem.endDate){
                    let start = new Date(this.formItem.startDate).getTime()
                    let end = new Date(this.formItem.endDate).getTime()
                    if(end < start){
                        this.$Message.warning('结束时间不能早于开始时间！')
                        return
                    }
                }
                this.searchItem =  Object.assign({}, this.formItem);
                this.total = 0;
                if(this.page == 1){
                    this.getPerformacneList()
                }else{
                    this.page = 1;
                }
            },
            getPerformacneList() {
                this.http.post('tcprom/dtCodeRecord/selectUserScanListByMap', {
                    qrmDtcodeUserId: this.thisPerformId,
                    startDate:this.searchItem.startDate,
                    endDate:this.searchItem.endDate,
                    start: (this.page - 1) * this.pageSize,
                    limit:this.pageSize,
                    createType:"2"
                }).then((data) => {
                    this.qrmPerformList=data.resultData
                    this.total = Number(data.totalCount)
                })
            },
            downloadDetail(){
                if(!this.formItem.startDate || !this.formItem.endDate){
                    this.$Message.warning('请选择开始时间和结束时间!');
                }else{
                    let start = new Date(this.formItem.startDate).getTime()
                    let end = new Date(this.formItem.endDate).getTime()
                    if(end < start){
                        this.$Message.warning('结束时间不能早于开始时间！')
                        return
                    }
                    window.location = `${location.origin}/tcprom/dtCodeRecord/downloadExcel?qrmDtcodeUserId=${this.thisPerformId}`+
                                    `&startDate=${this.formItem.startDate}&endDate=${this.formItem.endDate}&excelType=2&createType=2`;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    @import '../../assets/css/customTable.less';
    // .formItemRow{
    //     height:60px;
    //     line-height:60px;
    // }
    .queryBtn{
        margin-top: -5px;
    }
</style>