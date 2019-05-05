<template>
    <div>
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="android-funnel"></Icon>
                编辑员工
            </p>
            <Row class='editTeamMemberZone' type="flex" justify="center">
                <Col span="8">
                    <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleInline">
                        <Form-item label="手机号">
                            <div class="teamMemberText">{{formItem.phone}}</div>
                        </Form-item>
                        <Form-item label="姓名" prop="name">
                            <Input :maxlength="10" v-model="formItem.name" placeholder="请输入"></Input>
                        </Form-item>
                        <Form-item label="创建日期">
                            <div class="teamMemberText">{{formItem.createDt}}</div>
                        </Form-item>
                        <Form-item label="隶属团队">
                            <div class="teamMemberText">{{formItem.dtteamName}}</div>
                        </Form-item>
                        <Form-item label="隶属部门" prop="dtdeptName">
                            <Input :readonly="true" :disabled="disabledChoiceDept" v-model="formItem.dtdeptName" placeholder="请选择">
                                <Tooltip slot="append" placement="bottom-start" content="当前用户为该团队负责人" :disabled="!disabledChoiceDept">
                                    <Button :disabled="disabledChoiceDept" type="text" icon="android-checkbox-outline" @click="editDep">修改</Button>
                                </Tooltip>
                            </Input>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                            <Button type="ghost" @click='go2teamList' style="margin-left: 8px">取消</Button>
                        </Form-item>
                    </Form>
                </Col>
            </Row>
        </Card>
        <Modal class-name="vertical-center-modal" width="800" v-model="showEditDeptModal" title="选择隶属部门" @on-ok="editDepOk" @on-cancel="editDepCancel">
            <Row type="flex" justify="center">
                <Col span="22">
                    <div class="nodata nouser" v-show="deptList.length<=0 || !deptList">暂无数据</div>
                    <table class="user" v-show="deptList.length>0" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>选择</td>
                            <td>部门名称</td>
                            <td>当前部门负责人</td>
                        </tr>
                        <tr v-for="(dept,index) in deptList">
                            <td class="checkbox">
                                <input :id="'dept'+index" type="radio" :value="dept" name="selectedDept" v-model="selectedDept">
                                <label :for="'dept'+index"> </label>
                            </td>
                            <td>{{dept.dtdeptName}}</td>
                            <td>{{dept.qrmDtuserName}}</td>
                        </tr>
                    </table>
                </Col>
            </Row>
            <Row type="flex" justify="center" style="margin-top:20px;">
                <Col>
                    <Page :total="deptTotal" size="small" show-elevator show-total :pageSize='deptPageSize' @on-change="toDeptPage" v-if="deptTotal > deptPageSize"></Page>
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
                showEditDeptModal:false,
                deptPage: 1,
                deptPageSize: 8,
                deptTotal: 0,
                disabledChoiceDept:false,
                selectedDept:{},
                thisAccountDetail:{},
                formItem: {
                    phone: '',
                    name: '',
                    createDt:'',
                    dtteamName:'',
                    dtdeptName:'',
                    qrmDtteamId:'',
                    qrmDtdeptId:'',
                    qrmDtcodeUserId:''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    // dtdeptName:[
                    //     { required: true, message: '请选择隶属部门', trigger: 'blur' }
                    // ]
                },
                deptList: []
            }
        },
        mounted: function () {
            this.thisAccountDetail = JSON.parse(util.getSession('uer_thisAccountDetail'))
            this.initform()
        },
        watch:{
            deptPage:function(val){
                this.getDeptList()
            }
        },
        methods: {
            getDeptList(){
                let deferred = $.Deferred();
                this.http.post('tcprom/common/getDeptList', {
                    qrmDtteamId:this.formItem.qrmDtteamId,
                    start:(this.deptPage - 1) * this.deptPageSize,
                    limit:this.deptPageSize,
                    enableStatus:"0",
                }).then((data) => {
                    this.deptList=data.resultData
                    this.deptTotal = Number(data.totalCount)
                    deferred.resolve();
                })
                return deferred.promise();
            },
            initform(){
                this.formItem.name = this.thisAccountDetail.name
                this.formItem.phone = this.thisAccountDetail.phone
                this.formItem.createDt = this.thisAccountDetail.createDt
                this.formItem.dtteamName = this.thisAccountDetail.dtteamName
                this.formItem.dtdeptName = this.thisAccountDetail.dtdeptName
                this.formItem.qrmDtteamId = this.thisAccountDetail.qrmDtteamId
                this.formItem.qrmDtdeptId = this.thisAccountDetail.qrmDtdeptId
                this.formItem.qrmDtcodeUserId = this.thisAccountDetail.qrmDtcodeUserId
                if(this.thisAccountDetail.orgType == 1){
                    this.disabledChoiceDept = true
                }
            },
            editTeamMember: function () {
                this.http.post('tcprom/accountManage/editDtcodeUser', {
                    phone: this.formItem.phone,
                    name: this.formItem.name,
                    qrmDtteamId: this.formItem.qrmDtteamId,
                    qrmDtdeptId: this.formItem.qrmDtdeptId,
                    qrmDtcodeUserId:this.formItem.qrmDtcodeUserId
                }).then((data) => {
                    // this.reset();
                    util.goto(this,'team');
                    this.$Message.success(data.msg);
                })
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.editTeamMember();
                    }
                })
            },
            editDep(){
                if(this.formItem.qrmDtteamId){
                    this.getDeptList().then(()=>{
                        if(this.deptList.length>0){
                            this.showEditDeptModal = true
                        }else{
                            this.$Message.warning("该团队下暂无部门信息")
                        }
                    })
                }
            },
            editDepOk(){
                this.showEditDeptModal = false
                this.formItem.qrmDtdeptId = this.selectedDept.qrmDtdeptId?this.selectedDept.qrmDtdeptId:''
                this.formItem.dtdeptName = this.selectedDept.dtdeptName?this.selectedDept.dtdeptName:''
                this.selectedDept = {}
            },
            editDepCancel(){
                this.selectedDept = {}
            },
            toDeptPage(page){
                this.deptPage = page
            },
            go2teamList: function () {
                this.reset();
                util.goto(this,'team');
            },
            reset () {
                this.$refs['formItem'].resetFields();
            }
        }
    }
</script>
<style lang="less" >
    @import '../../assets/css/reset.less';
    @import '../../assets/css/customTable.less';
    .editTeamMemberZone{
       padding: 4em 0;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: -10%;
        }
    }
    .teamMemberText{
        padding: 0 15px;
        display: inline-block;
        letter-spacing: 1px;
    }

</style>