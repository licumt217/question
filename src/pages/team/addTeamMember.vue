<template>
    <div>
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                新增员工
            </p>
            <Row class='addTeamMemberZone' type="flex" justify="center">
                <Col span="8">
                    <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleInline">
                        <Form-item label="手机号" prop="phone">
                            <Input :maxlength="11" v-model="formItem.phone" placeholder="请输入" ></Input>
                        </Form-item>
                        <Form-item label="姓名" prop="name">
                            <Input :maxlength="10" v-model="formItem.name" placeholder="请输入"></Input>
                        </Form-item>
                        <Form-item label="隶属团队" prop="dtteamName">
                            <Input :readonly="true" v-model="formItem.dtteamName" placeholder="请选择"></Input>
                        </Form-item>
                        <Form-item label="隶属部门" prop="dtdeptName">
                            <Input :readonly="true" v-model="formItem.dtdeptName" placeholder="请选择">
                                <Button :disabled="disabledChoiceDept" slot="append" type="text" icon="android-checkbox-outline" @click="editDep">选择</Button>
                            </Input>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                            <Button type="ghost" @click='go2TeamDetail' style="margin-left: 8px">取消</Button>
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
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (!util.validates.isValidPhone(value)) {
                        callback(new Error('手机号格式错误'));
                    }else{
                         callback();
                    }
                }
            };
            return {
                showEditDeptModal:false,
                deptPage: 1,
                deptPageSize: 8,
                deptTotal: 0,
                disabledChoiceDept:false,
                selectedDept:{},
                formItem: {
                    phone: '',
                    name: '',
                    dtteamName:'',
                    dtdeptName:'',
                    qrmDtteamId:'',
                    qrmDtdeptId:''
                },
                ruleInline: {
                    phone: [
                        { validator: validatePhone,  required: true, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' },
                        { type: 'string', min: 2, message: '姓名长度不小于2位', trigger: 'blur' }
                    ],
                },
                deptList:[],
                qrmDtteamId:'',
            }
        },
        mounted: function () {
            this.qrmDtteamId = util.getSession('qrmDtteamId');
            this.getDtteamList();
        },
        watch:{
            deptPage:function(val){
                this.getDeptList()
            }
        },
        methods: {
            getDtteamList(){
                this.http.post('tcprom/common/getTeamList', {
                    qrmDtteamId:this.qrmDtteamId,
                    start: 0,
                }).then((data) => {
                    this.formItem.dtteamName = data.resultData[0].dtteamName
                    this.formItem.qrmDtteamId = data.resultData[0].qrmDtteamId
                })
            },
            getDeptList(){
                let deferred = $.Deferred();
                this.http.post('tcprom/common/getDeptList', {
                    qrmDtteamId:this.formItem.qrmDtteamId,
                    start:(this.deptPage - 1) * this.deptPageSize,
                    limit:this.deptPageSize,
                    enableStatus:"0",
                }).then((data) => {
                     deferred.resolve();
                    this.deptList=data.resultData
                    this.deptTotal = Number(data.totalCount) ;
                })
                return deferred.promise();
            },
            addAccount () {
                this.http.post('tcprom/accountManage/addDtcodeUser', {
                    phone: this.formItem.phone,
                    name: this.formItem.name,
                    qrmDtteamId: this.formItem.qrmDtteamId,
                    qrmDtdeptId: this.formItem.qrmDtdeptId
                }).then((data) => {
                    util.goto(this,'team/teamDetail');
                    this.$Message.success(data.msg);
                })
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addAccount();
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
            go2TeamDetail: function () {
                this.reset();
                util.goto(this,'team/teamDetail');
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
    .addTeamMemberZone{
       padding: 4em 0;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: -15%;
        }
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