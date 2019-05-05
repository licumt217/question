<template>
    <div class="deptDetail">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="android-contract"></Icon>
                部门详情
            </p>
            <span slot="extra">
                <Button v-show="isEditting" style="margin-right:1em;padding:2px 15px;" type="primary" size="small"  @click="saveEditDetail">保存</Button>
                <Button v-show="isEditting" style="margin-right:1em;padding:2px 15px;" type="ghost" size="small"  @click="cancelEditDetail">取消</Button>
                <Button v-show="!isEditting" style="margin-right:1em" type="primary" size="small" icon="android-sync" @click="editDeptDetail">修改</Button>
            </span>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="部门名称：">
                            <div v-show="!isEditting"  class="deptInfoText">{{formItem.dtdeptName}}</div>
                            <Input :maxlength="20" v-show="isEditting" v-model="formItem.dtdeptName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" >
                        <Form-item label="部门状态：">
                            <div v-show="!isEditting" class="deptInfoText">{{formItem.enableStatus > 0?(formItem.enableStatus==1?'停用':'待激活'):'启用'}}</div>
                            <Select v-show="isEditting" v-model="formItem.enableStatus" placeholder="请选择">
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="8">
                        <Form-item label="负责人姓名：">
                            <div v-show="!isEditting" class="deptInfoText">{{formItem.qrmDtuserName}}</div>
                            <Input :readonly="true" v-show="isEditting" v-model="formItem.qrmDtuserName" placeholder="请选择">
                                <Button class="editBtn" slot="append" type="text" icon="android-checkbox-outline" @click="chioceName">选择</Button>
                            </Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="负责人手机号：">
                            <div class="deptInfoText">{{formItem.phone}}</div>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="20">
                        <Form-item label="备注：">
                            <div v-show="!isEditting" class="deptInfoText">{{formItem.remark}}</div>
                            <Input :maxlength="30" v-show="isEditting" v-model="formItem.remark" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Card style="margin-top:15px;">
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="android-contract"></Icon>
                部门成员列表
            </p>
             <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="android-person-add" @click="go2addMember">增加成员</Button>
            </span>
            <Form :model="searchItem" :label-width="80">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="7">
                        <Form-item label="手机号">
                            <Input :maxlength="11" v-model="detailItem.phone" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        <Form-item label="姓名">
                            <Input :maxlength="10" v-model="detailItem.userName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        <Form-item label="账户状态">
                            <Select v-model="detailItem.enableStatus" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="1"  style="text-align:right;height:41px;">
                        <Button size="small" class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="accountListData.length<=0 || !accountListData">暂无数据</div>
                            <table class="addAcount" v-show="accountListData.length>0" style="table-layout:auto;" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>手机号</td>
                                    <td>姓名</td>
                                    <td>账户状态</td>
                                    <td>创建人</td>
                                    <td>创建日期</td>
                                    <td>隶属部门</td>
                                    <td>身份</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(member,index) in accountListData" v-show="Object.keys(member).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{member.phone}}</td>
                                    <td>{{member.name}}</td>
                                    <td>{{member.enableStatus > 0?(member.enableStatus==1?'停用':'待激活'):'启用'}}</td>
                                    <td>{{member.createName}}</td>
                                    <td>{{member.createDt}}</td>
                                    <td>{{member.dtdeptName}}</td>
                                    <td>{{member.orgType | parseIdentity(0)}}</td>                        
                                    <td>
                                        <Button type="error" size="small" @click="removeEmp(member)">移出部门</Button>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <template>
                        <Row type="flex" justify="center" style="margin:40px;">
                            <Col>
                                <Page :total="total" show-elevator show-total :pageSize='pageSize' @on-change="toPage" v-if="total > pageSize"></Page>
                            </Col>
                        </Row>
                    </template>
                </div>
            </div>
        </Card>
        <Modal class-name="vertical-center-modal" width="800" v-model="showDtdeptModal" title="选择部门负责人" @on-ok="choiceOk" @on-cancel="choiceCancel">
            <Row type="flex" justify="center">
                <Col span="22" style="line-height:40px;margin-bottom:1em;">
                    <Row type="flex" justify="end" align='middle'>
                        <Col span="8" style="margin-right:1em">
                            <Input :maxlength="choiceItem.type == 1?11:10" v-model="choiceItem.searchStr" placeholder="请输入">
                                 <Select v-model="choiceItem.type" slot="prepend" style="width:70px">
                                    <Option value="1">手机号</Option>
                                    <Option value="2">姓名</Option>
                                </Select>
                            </Input>
                        </Col>
                        <Col span="2">
                            <Button type="success" long  @click="serchUser(choiceItem.type)">搜索</Button>
                        </Col>
                    </Row>
                </Col>
                <Col span="22">
                    <div class="nodata nouser" v-show="userList.length<=0 || !userList">暂无数据</div>
                    <table class="user" v-show="userList.length>0" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>选择</td>
                            <td>姓名</td>
                            <td>手机号</td>
                        </tr>
                        <tr v-for="(user,index) in userList">
                            <td class="checkbox">
                                <input :id="'user'+index" type="radio" :value="user" name="selectedUser" v-model="selectedUser">
                                <label :for="'user'+index"> </label>
                            </td>
                            <td>{{user.name}}</td>
                            <td>{{user.phone}}</td>
                        </tr>
                    </table>
                </Col>
            </Row>
            <Row type="flex" justify="center" style="margin-top:20px;">
                 <Col>
                    <Page :total="userTotal" size="small" show-elevator show-total :pageSize='userPageSize' @on-change="toUserPage($event,choiceSearchItem.type)" v-if="userTotal > userPageSize"></Page>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';

    export default {
        data () {
            return {
                page: 1,
                pageSize: 4,
                total: 0,
                userPage:1,
                phonePage:1,
                namePage:1,
                userPageSize:8,
                userTotal:0,
                isEditting:false,
                showDtdeptModal:false,
                qrmDtteamId:'',
                qrmDtdeptId:'',
                accountListData:[{}],
                selectedUser:'',
                userList:[],
                deptInfo:{},
                formItem: {
                    dtdeptName: '',
                    enableStatus: '',
                    qrmDtuserName: '',
                    qrmDtcodeUserId:'',
                    phone: '',
                    remark:''
                },
                detailItem: {
                    phone:'',
                    userName:'',
                    enableStatus:'-1'
                },
                searchItem:{
                    phone:'',
                    userName:'',
                    enableStatus:''
                },
                choiceItem:{
                    type:'',//0为手机号，1为姓名
                    searchStr:''
                },
                choiceSearchItem:{
                    type:'',//0为手机号，1为姓名
                    searchStr:''
                }
            }
        },
        mounted: function () {
            let _this = this
            if(localStorage.roleType == 0){
                _this.qrmDtdeptId = util.getSession('qrmDtdeptId');
                _this.qrmDtteamId = util.getSession('qrmDtteamId');
            }else if(localStorage.roleType == 1){
                _this.qrmDtdeptId = util.getSession('user_qrmDtdeptId');
            }
            setTimeout(()=>{
                if(util.isEmpty(_this.qrmDtdeptId) && localStorage.roleType == 0){
                    util.goto(this,'team/teamDetail/deptEdit');
                }
                _this.getDeptInfo();
                _this.getAccountList();
            },500)
        },
        watch: {
            page: function (val) {
                this.getAccountList()
            },
            phonePage: function (val) {
                this.getDeptAccount(1)
            },
            namePage: function (val) {
                this.getDeptAccount(2)
            },
            userPage: function (val) {
                this.getDeptAccount()
            }
        },
        methods: {
            toPage(page) {
                this.page = page
            },
            toUserPage(page,type){
                if(type == 1){
                    this.phonePage = page
                }else if(type == 2){
                     this.namePage = page
                }else{
                    this.userPage = page
                }
            },
            query: function () {
                this.searchItem =  Object.assign({}, this.detailItem);
                this.total = 0;
                if(this.page == 1){
                     this.getAccountList()
                }else{
                    this.page = 1;
                }
            },
            getDeptInfo(){
                this.http.post('tcprom/dtdeptManage/queryDeptById', {
                    qrmDtdeptId:this.qrmDtdeptId,
                }).then((data) => {
                    this.deptInfo=data.dtDeptData
                    this.formItem = Object.assign({}, this.deptInfo);
                })
            },
            getAccountList () {
                this.http.post('tcprom/accountManage/getDtcodeUserList', {
                    qrmDtdeptId:this.qrmDtdeptId,
                    noOrgType:'1',
                    phone: this.searchItem.phone,
                    userName: this.searchItem.userName,
                    enableStatus:this.searchItem.enableStatus<0?'':this.searchItem.enableStatus,
                    start: (this.page - 1) * this.pageSize,
                    limit:this.pageSize
                }).then((data) => {
                    this.accountListData=data.resultData
                    this.total = Number(data.totalCount)
                })
            },
            getDeptAccount(type){
                let self =  this
                let searchItem = {};
                let deferred = $.Deferred();
                if(type == 1){
                    searchItem = Object.assign({},{
                        qrmDtdeptId:self.qrmDtdeptId,
                        enableStatus:"0",
                        orgTyp:"3",
                        phone: self.choiceSearchItem.searchStr,
                        start: (self.phonePage - 1) * self.userPageSize,
                        limit:self.userPageSize
                    });
                }else if(type == 2){
                    searchItem = Object.assign({},{
                        qrmDtdeptId:self.qrmDtdeptId,
                        enableStatus:"0",
                        orgTyp:"3",
                        userName: self.choiceSearchItem.searchStr,
                        start: (self.namePage - 1) * self.userPageSize,
                        limit:self.userPageSize
                    });
                }else{
                    searchItem = Object.assign({},{
                        qrmDtdeptId:self.qrmDtdeptId,
                        enableStatus:"0",
                        orgType:"3",
                        start: (self.userPage - 1) * self.userPageSize,
                        limit:self.userPageSize
                    });
                }
                self.http.post('tcprom/accountManage/getDtcodeUserList',searchItem).then((data) => {
                    self.userList=data.resultData
                    self.userTotal = Number(data.totalCount)
                    deferred.resolve();
                })
                return deferred.promise();
            },
            removeEmp(member){
                if(member){
                    this.$Modal.confirm({
                        title: "移出部门",
                        content: `<p style="margin-top:-5px;">确认将 ${member.name} 移出本部门？</p>`,
                        loading: true,
                        maskClosable: true,
                        onOk: () => {
                            this.http.post('tcprom/quitRecord/removeEmp', {
                                qrmDtuserId: member.qrmDtcodeUserId,
                                type: '2'
                            }).then((data) => {
                                if(this.accountListData.length>1 || this.page==1){
                                    this.getAccountList();
                                }else{
                                    this.page--;
                                }
                                this.$Modal.remove();
                                this.$Message.success(data.msg);
                            })
                        }
                    });
                    
                }
            },
            editDeptDetail: function () {
                this.isEditting = true;
            },
            cancelEditDetail:function(){
                this.formItem = Object.assign({}, this.deptInfo);
                this.isEditting = false;
            },
            saveEditDetail: function () {
                this.http.post('tcprom/dtdeptManage/editDtdept', {
                    dtdeptName:this.formItem.dtdeptName,
                    enableStatus:this.formItem.enableStatus,
                    qrmDtuserId:this.formItem.qrmDtcodeUserId,
                    remark:this.formItem.remark,
                    qrmDtdeptId:this.qrmDtdeptId
                }).then((data) => {
                    this.$Message.success(data.msg);
                    this.isEditting = false;
                    this.getDeptInfo()
                    this.getAccountList()
                })
            },
            chioceName:function(){
                this.getDeptAccount().then(()=>{
                    if(this.userList.length > 0){
                        this.showDtdeptModal=true;
                     }else{
                        this.$Message.warning('该部门下没有用户信息')
                     }
                })
            },
            go2addMember:function(){
                if(localStorage.roleType == 0){
                     util.goto(this,'team/teamDetail/deptEdit/deptDetail/addMember');
                }else if(localStorage.roleType == 1){
                     util.goto(this,'team/deptEdit/deptDetail/addMember');
                }
            },
            choiceOk:function(){
                this.showDtdeptModal = false
                this.formItem.qrmDtcodeUserId = this.selectedUser.qrmDtcodeUserId?this.selectedUser.qrmDtcodeUserId:''
                this.formItem.qrmDtuserName = this.selectedUser.name?this.selectedUser.name:''
                this.formItem.phone = this.selectedUser.phone?this.selectedUser.phone:''
                this.choiceItem.type = ''
                this.choiceItem.searchStr = ''
                this.choiceSearchItem.type = ''
                this.choiceSearchItem.searchStr = ''
                this.selectedUser = {};
            },
            choiceCancel:function(){
                this.choiceItem.type = ''
                this.choiceItem.searchStr = ''
                this.choiceSearchItem.type = ''
                this.choiceSearchItem.searchStr = ''
                this.selectedUser = {};
            },
            serchUser:function(type){
                if(type == 1){
                    this.phonePage = 1;
                }else if(type == 2){
                    this.namePage =1;
                }else{
                    this.userPage =1;
                }
                this.userTotal = 0;
                this.choiceSearchItem = Object.assign({}, this.choiceItem);
                this.getDeptAccount(type)
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    @import '../../assets/css/customTable.less';
    // .formItemRow{
    //     height:40px;
    //     line-height:40px;
    // }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: -10%;
        }
    }
    .editBtn{
        color: #ed3f14;
    }
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
    .deptInfoText{
        padding: 0 15px;
        display: inline-block;
        letter-spacing: 1px;
    }
</style>