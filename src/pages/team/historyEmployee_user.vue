<template>
    <div class="accountList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                历史员工
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-cloud-download-outline" @click="downloadDetail">导出名单</Button>
            </span>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="7">
                        <Form-item label="姓名">
                            <Input :maxlength="10" v-model="formItem.qrmDtuserName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        <Form-item label="账户状态">
                            <Select v-model="formItem.enableStatus" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        <Form-item label="部门名称">
                            <Input :maxlength="20" v-model="formItem.qrmDtdeptName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="7">
                        <Form-item label="手机号">
                            <Input :maxlength="11" v-model="formItem.phone" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        <Form-item label="职位">
                            <Select v-model="formItem.orgType" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="1">团队负责人</Option>
                                <Option value="2">部门负责人</Option>
                                <Option value="3">员工</Option>
                                <Option value="4">个人</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="7" style="text-align:right">
                        <Button class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="historyDeployList.length<=0 || !historyDeployList">暂无数据</div>
                            <table class="addAcount" style="table-layout:auto;" v-show="historyDeployList.length>0" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>手机号</td>
                                    <td>姓名</td>
                                    <td>隶属部门</td>
                                    <td>身份</td>
                                    <td>账户状态</td>
                                    <td>加入团队日期</td>
                                    <td>退出团队日期</td>
                                    <td>理由</td>
                                    <td>退出方式</td>
                                    <td>操作人</td>
                                </tr>
                                <tr v-for="(deploy,index) in historyDeployList" v-show="Object.keys(deploy).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{deploy.phone}}</td>
                                    <td>{{deploy.qrmDtuserName}}</td>
                                    <td>{{deploy.qrmDtdeptName}}</td>
                                    <td>{{deploy.orgType | parseIdentity(0)}}</td>
                                    <td>{{deploy.enableStatus > 0?(deploy.enableStatus==1?'停用':'待激活'):'启用'}}</td>
                                    <td>{{deploy.joinDt}}</td>
                                    <td>{{deploy.applyDt}}</td>
                                    <td>{{deploy.quitReason}}</td>
                                    <td>{{deploy.quitType | parseQuitType}}</td>
                                    <td>{{deploy.approverName}}</td>
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
                historyDeployList:  [{}],
                qrmDtteamId:'',
                formItem: {
                    phone: '',
                    qrmDtuserName: '',
                    qrmDtdeptName:'',
                    enableStatus: '-1',
                    orgType: '-1'
                },
                searchItem: {
                    phone: '',
                    qrmDtuserName: '',
                    qrmDtdeptName:'',
                    enableStatus: '',
                    orgType:''
                },
            }
        },
        mounted: function () {
            this.getHistoryDeployList();
        },
         watch: {
            page: function (val) {
                this.getHistoryDeployList()
            }
        },
        methods: {
            toPage(page) {
                this.page = page
            },
            query: function () {
                this.searchItem =  Object.assign({}, this.formItem);
                this.total = 0;
                if(this.page == 1){
                    this.getHistoryDeployList()
                }else{
                    this.page = 1;
                }
            },
            getHistoryDeployList: function () {
               this.http.post('tcprom/quitRecord/getQuitTeamList', {
                    phone: this.searchItem.phone,
                    qrmDtuserName: this.searchItem.qrmDtuserName,
                    qrmDtdeptName:this.searchItem.qrmDtdeptName,
                    enableStatus:this.searchItem.enableStatus<0?'':this.searchItem.enableStatus,
                    orgType:this.searchItem.orgType<0?'':this.searchItem.orgType,
                    approvelStatus:"1",
                    start: (this.page - 1) * this.pageSize,
                    limit:this.pageSize
                }).then((data) => {
                    this.historyDeployList=data.resultData
                    this.total = Number(data.totalCount)
                })
            },
            downloadDetail:function(){
                window.location = `${location.origin}/tcprom/quitRecord/downloadExcel?qrmDtuserName=${this.formItem.qrmDtuserName}`+
                                    `&qrmDtdeptName=${this.formItem.qrmDtdeptName}`+
                                    `&enableStatus=${this.formItem.enableStatus<0?'':this.formItem.enableStatus}`+
                                    `&phone=${this.formItem.phone}`+
                                    `&orgType=${this.formItem.orgType<0?'':this.formItem.orgType}`;
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    @import '../../assets/css/customTable.less';
    .queryBtn{
        margin-top: -5px;
    }
</style>