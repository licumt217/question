<template>
    <div class="quitList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="android-contract"></Icon>
                增加部门成员
            </p>
            <Form :model="formItem" :label-width="80">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="7">
                        <Form-item label="手机号">
                            <Input :maxlength="11" v-model="formItem.phone" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        <Form-item label="姓名">
                            <Input :maxlength="10" v-model="formItem.userName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="3" style="text-align:right;height:46px;">
                        <Button class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="accountListData.length<=0 || !accountListData">暂无数据</div>
                            <Checkbox v-show="accountListData.length>0" class="checkAll" :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll"></Checkbox>
                            <Checkbox-group v-model="selectedAccounts" @on-change="checkAllGroupChange">
                                <table class="addAcount" style="table-layout:auto;" v-show="accountListData.length>0" cellspacing="0" cellpadding="0" border="0">
                                        <tr>
                                            <td style="width:67px;"></td>
                                            <td>序号</td>
                                            <td>手机号</td>
                                            <td>姓名</td>
                                            <td>隶属部门</td>
                                            <td>身份</td>
                                        </tr>
                                        <tr v-for="(item,index) in accountListData" v-show="Object.keys(item).length>0">
                                            <!--<td class="checkbox">
                                                <input :id="'item'+index" type="radio" :value="item" name="selectedAccount" v-model="selectedAccount">
                                                <label :for="'item'+index"> </label>
                                            </td>-->
                                            <td>
                                                <Checkbox class="check_box" :label="item.qrmDtcodeUserId"></Checkbox>
                                            </td>
                                            <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                            <td>{{item.phone}}</td>
                                            <td>{{item.name}}</td>
                                            <td>{{item.dtdeptName}}</td>
                                            <td>{{item.orgType | parseIdentity(0)}}</td>
                                        </tr>
                                </table>
                            </Checkbox-group>
                        </Col>
                    </Row>
                    <Row type="flex" justify="end" style="margin:30px 20px 0 0; line-height:40px; height:40px; overflow:hidden;">
                        <Col>
                            <Page size="small" :total="total" show-elevator show-total :pageSize='pageSize' @on-change="toPage" v-if="total > pageSize"></Page>
                        </Col>
                    </Row>
                    <Row type="flex" v-show="accountListData.length>0" justify="center" style="margin:30px 0 20px;">
                        <Col span="2">
                            <Button type="primary" long @click="addDeptAccount">确认</Button>
                        </Col>
                        <Col span="2" offset="1">
                            <Button type="ghost" long @click="addCancel" style="margin-left: 8px">取消</Button>
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
                selectedAccount:'',
                selectedAccounts:[],
                accountListData:  [{}],
                indeterminate: false,
                checkAll: false,
                qrmDtdeptId:'',
                qrmDtteamId:'',
                formItem: {
                    userName: '',
                    phone:''
                },
                searchItem: {
                    userName: '',
                    phone:''
                },
            }
        },
        watch: {
            page: function (val) {
                this.getMemberList()
            }
        },
        mounted: function () {
            let _this = this
           if(localStorage.roleType == 0){
                _this.qrmDtdeptId = util.getSession('qrmDtdeptId');
                _this.qrmDtteamId = util.getSession('qrmDtteamId');
            }else if(localStorage.roleType == 1){
                _this.qrmDtteamId = util.getSession('user_qrmDtteamId');
                _this.qrmDtdeptId = util.getSession('user_qrmDtdeptId');
            }
            setTimeout(()=>{
                if(util.isEmpty(_this.qrmDtteamId)){
                    util.goto(this,'team');
                }
                _this.getMemberList();
            },500)
        },
        methods: {
            toPage(page) {
                this.page = page
            },
            query() {
                this.searchItem =  Object.assign({}, this.formItem);
                this.total = 0;
                if(this.page == 1){
                    this.getMemberList()
                }else{
                    this.page = 1;
                }
            },
            getMemberList() {
                this.http.post('tcprom/accountManage/getDtcodeUserList', {
                    qrmDtteamId:this.qrmDtteamId,
                    noqrmDtdeptId:this.qrmDtdeptId,
                    noOrgType:'1',
                    phone: this.searchItem.phone,
                    userName: this.searchItem.userName,
                    start: (this.page - 1) * this.pageSize,
                    limit:this.pageSize
                }).then((data) => {
                    this.accountListData=data.resultData
                    this.total = Number(data.totalCount)
                })
            },
            addDeptAccount(){
                if(this.selectedAccounts.length == 0){
                    this.$Message.warning('请先选择用户')
                    return 
                }
                this.http.post('tcprom/accountManage/batchAddDeptEmp', {
                    qrmDtuserIds:this.selectedAccounts,
                    qrmDtdeptId: this.qrmDtdeptId,
                }).then((data) => {
                    this.selectedAccounts =[];
                    this.indeterminate = false;
                    this.checkAll = false;
                    if(localStorage.roleType == 0){
                        util.goto(this,'team/teamDetail/deptEdit/deptDetail');
                    }else if(localStorage.roleType == 1){
                        util.goto(this,'team/deptEdit/deptDetail');
                    }
                    this.$Message.success(data.msg);
                })
            },
            addCancel(){
                if(localStorage.roleType == 0){
                    util.goto(this,'team/teamDetail/deptEdit/deptDetail');
                }else if(localStorage.roleType == 1){
                    util.goto(this,'team/deptEdit/deptDetail');
                }
            },
            handleCheckAll(){
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.accountListData.filter((item)=>{
                        this.selectedAccounts.push(item.qrmDtcodeUserId)
                    })
                } else {
                    this.selectedAccounts = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length == this.pageSize || data.length == this.total) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
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
    .checkbox input[type="radio"]{
        display: none;
    }
    .checkbox input[type="radio"]:checked  + label {
        vertical-align: middle;
        cursor: pointer;
        background: url(../../assets/images/radio_checked.png) no-repeat;
        width: 18px;
        height: 18px;
        display: inline-block;
        background-size: 100% 100%;
    }
    .checkbox input[type="radio"]+ label {
        vertical-align: middle;
        cursor: pointer;
        background: url(../../assets/images/radio.png) no-repeat;
        width: 18px;
        height: 18px;
        display: inline-block;
        background-size: 100% 100%;
    }
</style>
<style lang="less">
    .check_box span:nth-child(2){
        display: none;
    }
    .checkAll{
        position: absolute;
        top:12px;
        left:22px;
    }
</style>

