<template>
    <div class="deptList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="android-contract"></Icon>
                部门设置
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="android-clipboard" @click="showDeptModal">新增部门</Button>
            </span>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="deptList.length<=0 || !deptList">暂无数据</div>
                            <table class="addAcount" style="table-layout:auto;" v-show="deptList.length>0" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>部门</td>
                                    <td>部门状态</td>
                                    <td>部门负责人</td>
                                    <td>手机号</td>
                                    <td>备注</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(dept,index) in deptList" v-show="Object.keys(dept).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{dept.dtdeptName}}</td>
                                    <td>{{dept.enableStatus > 0?(dept.enableStatus==1?'停用':'待激活'):'启用'}}</td>
                                    <td>{{dept.qrmDtuserName}}</td>
                                    <td>{{dept.phone}}</td>
                                    <td>{{dept.remark}}</td>
                                    <td>
                                        <Button type="primary" size="small" class="edit-btn" @click="go2deptDetail(dept)">详情</Button>
                                        <Button :type="dept.enableStatus==0?'error':'success'" size="small" @click='toggleDept(dept)'>{{dept.enableStatus==0?'停用':'启用'}}</Button>
                                    </td>
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
        <Modal class-name="vertical-center-modal" width="600" v-model="showAddDeptModal" title="新增部门">
            <Row type="flex" justify="center">
                <Col span="14">
                    <Form ref="formItem" :model="formItem" :label-width="80" :rules="ruleInline">
                        <Form-item label="部门名称" prop="dtdeptName">
                            <Input :maxlength="20" v-model="formItem.dtdeptName" placeholder="请输入"></Input>
                        </Form-item>
                        <Form-item label="部门状态" prop="enableStatus">
                            <Select v-model="formItem.enableStatus" placeholder="请选择">
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="备注" prop="remark">
                            <Input :maxlength="30" v-model="formItem.remark" type="textarea" :rows="3" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入"></Input>
                        </Form-item>
                    </Form>
                </Col>
            </Row>
            <Row type="flex" justify="center" slot="footer">
                <Col>
                    <Button type="primary" @click="handleSubmit('formItem')">确认</Button>
                    <Button type="ghost" @click="addCancel" style="margin-left: 8px">取消</Button>
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
                pageSize: 10,
                total: 0,
                showAddDeptModal:false,
                qrmDtteamId:'',
                deptList:  [{}],
                formItem: {
                    dtdeptName: '',
                    enableStatus: '',
                    remark:''
                },
                ruleInline: {
                    dtdeptName: [
                        { required: true, message: '请填写团队名称', trigger: 'blur' }
                    ],
                    enableStatus: [
                        { required: true, message: '请选择团队状态', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted: function () {
            let _this = this
            if(localStorage.roleType == 0){
                _this.qrmDtteamId = util.getSession('qrmDtteamId');
            }else if(localStorage.roleType == 1){
                _this.qrmDtteamId = util.getSession('user_qrmDtteamId');
            }
            setTimeout(()=>{
                if(util.isEmpty(_this.qrmDtteamId)){
                    util.goto(this,'team');
                }
                _this.getDeptList();
            },500)
        },
        watch: {
            page: function (val) {
                this.getDeptList()
            }
        },
        methods: {
            toPage(page) {
                this.page = page
            },
            getDeptList() {
                this.http.post('tcprom/common/getDeptList', {
                    qrmDtteamId:this.qrmDtteamId,
                    start:(this.page - 1) * this.pageSize,
                    limit:this.pageSize
                }).then((data) => {
                    this.deptList=data.resultData
                    this.total = Number(data.totalCount) 
                })
            },
            go2deptDetail(dept){
                if(localStorage.roleType == 0){
                    util.setSession('qrmDtdeptId',dept.qrmDtdeptId)
                    util.goto(this,'team/teamDetail/deptEdit/deptDetail');
                }else{
                    util.setSession('user_qrmDtdeptId',dept.qrmDtdeptId)
                    util.goto(this,'team/deptEdit/deptDetail');
                }
            },
            toggleDept(dept){
                if(dept){
                    this.http.post('tcprom/dtdeptManage/enableOrDisableDtdept', {
                        qrmDtdeptId: dept.qrmDtdeptId,
                        enableStatus: dept.enableStatus=='0'?'1':'0'
                    }).then((data) => {
                        dept.enableStatus = dept.enableStatus=='0'?'1':'0'
                        this.$Message.success(data.msg);
                    })
                }
            },
            showDeptModal(){
                this.showAddDeptModal = true;
            },
            addCancel(){
                this.showAddDeptModal = false;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addDept();
                    }
                })
            },
            addDept(){
                this.http.post('tcprom/dtdeptManage/addDtdept', {
                    qrmDtteamId: this.qrmDtteamId,
                    dtdeptName:this.formItem.dtdeptName,
                    enableStatus: this.formItem.enableStatus,
                    remark:this.formItem.remark
                }).then((data) => {
                    this.reset();
                    this.showAddDeptModal = false;
                    this.getDeptList();
                    this.$Message.success(data.msg);
                })
            },
            reset () {
                this.$refs['formItem'].resetFields();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    @import '../../assets/css/customTable.less';
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: -10%;
        }
    }
    .queryBtn{
        margin-top: -5px;
    }
</style>