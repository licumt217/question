<template>
    <div class="quitList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                退团申请
            </p>
            <Form :model="formItem" :label-width="80">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="5">
                        <Form-item label="姓名">
                            <Input :maxlength="10" v-model="formItem.qrmDtuserName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="账户状态">
                            <Select v-model="formItem.enableStatus" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="团队名称">
                            <Input :maxlength="20" v-model="formItem.qrmDtteamName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="部门名称">
                            <Input :maxlength="20" v-model="formItem.qrmDtdeptName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="5" offset="18" style="text-align:right;height:46px;">
                        <Button class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata nouser" v-show="quitList.length<=0 || !quitList">暂无数据</div>
                            <table class="addAcount" style="table-layout:auto;" v-show="quitList.length>0"  cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>姓名</td>
                                    <td>隶属团队</td>
                                    <td>隶属部门</td>
                                    <td>身份</td>
                                    <td>加入团队日期</td>
                                    <td>申请退出日期</td>
                                    <td>理由</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(item,index) in quitList" v-show="Object.keys(item).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{item.qrmDtuserName}}</td>
                                    <td>{{item.qrmDtteamName}}</td>
                                    <td>{{item.qrmDtdeptName}}</td>
                                    <td>{{item.orgType | parseIdentity(0)}}</td>
                                    <td>{{item.joinDt}}</td>
                                    <td>{{item.applyDt}}</td>
                                    <td style="max-width:180px">{{item.quitReason}}</td>
                                    <td>
                                        <Button v-show="item.approvelStatus==0" type="error" size="small" @click="toggleQuit(item,'2')">驳回</Button>
                                        <Button v-show="item.approvelStatus==0" type="success" size="small" @click="toggleQuit(item,'1')">同意</Button>
                                        <Button class="hasAgree" v-show="item.approvelStatus==1" type="dashed" size="small">已同意</Button>
                                        <Button class="hasDisagree" v-show="item.approvelStatus==2" type="dashed" size="small">已驳回</Button>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style="margin:30px;">
                        <Col>
                            <Page :total="total" show-elevator show-total :pageSize='pageSize' @on-change="toPage" v-if="total > pageSize"></Page>
                        </Col>
                    </Row>
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
                quitList:  [{}],
                formItem: {
                    qrmDtuserName: '',
                    enableStatus: '-1',
                    qrmDtteamName: '',
                    qrmDtdeptName: '',
                },
                searchItem: {
                    qrmDtuserName: '',
                    enableStatus:'',
                    qrmDtteamName: '',
                    qrmDtdeptName: '',
                },
            }
        },
        mounted: function () {
            this.getquitList();
        },
        watch: {
            page: function (val) {
                this.getquitList()
            }
        },
        methods: {
            toPage(page) {
                this.page = page
            },
            query(){
                this.page = 1;
                this.total = 0;
                this.searchItem =  Object.assign({}, this.formItem);
                this.getquitList()
            },
            getquitList: function () {
                this.http.post('tcprom/quitRecord/getQuitTeamList', {
                    qrmDtuserName: this.searchItem.qrmDtuserName,
                    qrmDtteamName:this.searchItem.qrmDtteamName,
                    qrmDtdeptName:this.searchItem.qrmDtdeptName,
                    enableStatus:this.searchItem.enableStatus<0?'':this.searchItem.enableStatus,
                    start: (this.page - 1) * this.pageSize,
                    limit:this.pageSize
                }).then((data) => {
                    this.quitList=data.resultData
                    this.total = Number(data.totalCount)
                })
            },
            toggleQuit(item,type){
                this.$Modal.confirm({
                    title: "退团申请",
                    content: type=="1"?`<p style="margin-top:-5px;">同意 ${item.qrmDtuserName} 申请退出团队？</p>`:`<p style="margin-top:-5px;">驳回 ${item.qrmDtuserName} 的退团申请？</p>`,
                    loading: true,
                    onOk: () => {
                        if(item.approvelStatus && item.approvelStatus == 0){
                            this.http.post('tcprom/quitRecord/quitTeamReview', {
                                qrmDtcodeQuitrecordId: item.qrmDtcodeQuitrecordId,
                                approvelStatus: type
                            }).then((data) => {
                                this.$Modal.remove();
                                item.approvelStatus = type
                                this.$Message.success(data.msg);
                            },()=>{
                                this.$Modal.remove();
                            })
                        }
                    }
                });
            },
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
    .hasAgree{
        color: #19be6b;
    }
    .hasDisagree{
        color: #ed3f14;
    }
</style>