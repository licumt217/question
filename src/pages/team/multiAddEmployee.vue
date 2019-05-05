<template>
    <div>
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-body-outline"></Icon>
                批量新增员工
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-cloud-upload-outline" @click="updateList">导入员工名单</Button>
            </span>
            <div class="nodata" style="padding:4em 0" v-show="accountList.length<=0 || !accountList">请先导入员工名单</div>
            <div v-show="accountList.length>0"  class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <table  class="addAcount" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td>手机号</td>
                                    <td>姓名</td>
                                    <td>验证结果</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(account,index) in accountList">
                                    <td>
                                        <Button v-show="account.isEditting == 'false' || !account.isEditting" type="text">{{account.importPhone}}</Button>
                                        <Input  :maxlength="11" class="addInput" v-show="account.isEditting == 'true'" v-model="account.importPhone"></Input>
                                    </td>
                                    <td>
                                        <Button v-show="account.isEditting == 'false' || !account.isEditting" type="text">{{account.importName}}</Button>
                                        <Input  class="addInput" v-show="account.isEditting == 'true'"  v-model="account.importName"></Input>
                                    </td>
                                    <td :class="{error:account.reserved1==1}">
                                        {{account.importMsg}}
                                    </td>
                                    <td>
                                        <Button v-show="account.isEditting == 'false'" type="primary" size="small" @click="editThisAccount(account)">编辑</Button>
                                        <Button v-show="account.isEditting == 'true'" type="success" size="small" @click="checkAccount(account)">确定</Button>
                                        <Button type="error" size="small" class="delete-btn" @click="deleteThisAccount(account)">删除</Button>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <template>
                        <Row type="flex" justify="space-between" style="margin:30px 0 20px;">
                            <Col span="10">
                                <Button style="color:#ed3f14;" type="text">注：员工信息均为必填，不能重复，不能包含空格、任意符号与图片。</Button>
                            </Col>
                            <Col span="10">
                                <Page style="float:right;padding-right:10%" :total="total" size="small" show-elevator show-total :pageSize='pageSize' @on-change="toPage" v-if="total > pageSize"></Page>
                            </Col>
                        </Row>
                    </template>
                </div>
                <Form ref="formItem" :model="formItem" :label-width="100">
                    <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                        <Col span="7">
                            <Form-item label="请选择团队">
                                <Select :readonly="true" v-model="formItem.team" placeholder="请选择">
                                    <Option v-if="teamList.length==0" value="-1">暂无团队</Option>
                                    <Option v-else v-for="team in teamList" :key="team.qrmDtteamId" :value="team.qrmDtteamId">{{team.dtteamName}}</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="7">
                            <Form-item label="请选择部门">
                                <Select filterable clearable v-model="formItem.dept" placeholder="请选择">
                                    <Option v-if="deptList.length==0" value="-1">暂无部门</Option>
                                    <Option v-else v-for="dept in deptList" :key="dept.qrmDtdeptId" :value="dept.qrmDtdeptId">{{dept.dtdeptName}}</Option>
                                </Select>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="24" style="text-align:center">
                        <Button style="margin-right:20px" type="primary" size="large" @click="addAccount">保存</Button>
                        <Button type="ghost" size="large" @click='go2TeamDetail'>取消</Button>
                    </Col>
                </Row>
            </div>
        </Card>
        <Modal class-name="vertical-center-modal" width="800" v-model="showUpdateModal" title="导入名单" @on-ok="updateOk" @on-cancel="updateCancel" ok-text="确认导入">
            <Card>
                <p slot="title">
                    <span style="color:#ed3f14;">注：员工信息均为必填，不能重复，不能包含空格、任意符号与图片。</span>
                </p>
                <span slot="extra">
                    <Button style="margin-right:1em" type="warning" size="small" icon="ios-cloud-download-outline" @click="downloadExample">点击下载表格模板</Button>
                </span>
                <Row type="flex" justify="center">
                    <Col span="24">
                        <Upload
                            ref="upload"
                            type="drag"
                            :format="['xlsx','xls']"
                            :on-success="handleSuccess"
                            :on-error="handleError"	
                            :on-format-error="handleFormatError"
                            :on-remove = "handleRemove"
                            :action="actionAddress">
                            <div style="padding: 80px 0;">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p style="font-size:18px;">点击或将文件拖拽到这里上传</p>
                            </div>
                        </Upload>
                    </Col>
                </Row>
            </Card>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';

    export default {
        data () {
            return {
                page: 1,
                pageSize: 8,
                total: 0,
                showUpdateModal:false,
                formItem: {
                    team:'',
                    dept:'',
                },
                actionAddress:'',
                accountList:[],
                teamList:[],
                deptList:[],
                batchIds:[],
                qrmDtteamId:'',
            }
        },
        watch:{
            page:function(val){
               this.getUploadData() 
            },
        },
        mounted: function () {
            let _this = this
            _this.actionAddress = location.origin +'/tcprom/accountManage/listImport'
            // _this.actionAddress = 'http://demo.tingjiandan.com:8080/tcprom/accountManage/listImport'
            _this.qrmDtteamId = util.getSession('qrmDtteamId');
            setTimeout(()=>{
                if(util.isEmpty(_this.qrmDtteamId)){
                    util.goto(this,'team');
                }
                _this.getTeamList();
                _this.getDeptList();
            },500)
        },
        methods: {
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 xls 或 xlsx 格式的文件。'
                });
            },
            handleSuccess (res, file ,fileList) {
                if(res.isSuccess == 0){
                    this.$Notice.success({
                        title: "导入成功"
                    });
                    this.batchIds.push(res.batchId)
                }else{
                    this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                    this.$Notice.warning({
                        title: res.msg
                    });
                }
            },
            handleError(error, file, fileList){
                console.log(error)
                this.$Notice.warning({
                    title: error
                });
            },
            handleRemove(file, fileList){
                this.batchIds.splice(this.batchIds.indexOf(file.response.batchId),1)
            },
            toPage:function(page){
                this.page = page;
            },
            getUploadData(){
                this.http.post('tcprom/accountManage/getImportList', {
                    start: (this.page - 1) * this.pageSize,
                    limit:this.pageSize,
                    batchIds:this.batchIds
                }).then((data) => {
                    this.accountList = data.resultData.filter(item => {
                        item.isEditting = 'false'
                        return item
                    })
                    this.total = Number(data.totalCount)
                })
            },
            getTeamList(){
                this.http.post('tcprom/common/getTeamList', {
                    qrmDtteamId:this.qrmDtteamId
                }).then((data) => {
                    this.teamList=data.resultData
                    this.formItem.team = this.teamList[0].qrmDtteamId 
                })
            },
            getDeptList(){
                this.http.post('tcprom/common/getDeptList', {
                    qrmDtteamId:this.qrmDtteamId,
                    enableStatus:"0",
                }).then((data) => {
                    this.deptList=data.resultData
                })
            },
            editThisAccount(account){
                account.importMsg = "";
                account.isEditting = "true"
            },
            checkAccount(account){
                this.http.post('tcprom/accountManage/checkUserCanAdd', {
                    phone: account.importPhone,
                    name: account.importName,
                    qrmUserImportId:account.qrmUserImportId
                }).then((data) => {
                    account.reserved1 = data.isAdd
                    account.importMsg = data.msg
                    account.isEditting = "false"
                })
            },
            deleteThisAccount(account){
                this.$Modal.confirm({
                    title: "删除新增员工",
                    content: `<p style="margin-top:-5px;">确认删除 ${account.importName} 这条员工数据？</p>`,
                    loading: true,
                    onOk: () => {
                        this.http.post('tcprom/accountManage/delImportById', {
                            qrmUserImportId:account.qrmUserImportId
                        }).then((data) => {
                        if(this.accountList.length>1 || this.page==1){
                                this.getUploadData();
                            }else{
                                this.page--;
                            }
                            this.$Modal.remove();
                            this.$Message.success(data.msg);
                        },()=>{
                            this.$Modal.remove();
                        })
                    }
                });
            },
            addAccount() {
                this.http.post('tcprom/accountManage/batchAddDtcodeUser', {
                    qrmDtteamId:this.qrmDtteamId,
                    qrmDtdeptId:this.formItem.dept<0?'':this.formItem.dept,
                    batchIds:this.batchIds
                }).then((data) => {
                    util.goto(this,'team/teamDetail');
                    this.$Message.success(data.msg);
                })
            },
            go2TeamDetail() {
                util.goto(this,'team/teamDetail');
            },
            updateList(){
                this.showUpdateModal=true;
            },
            updateOk(){
                let check = this.$refs.upload.fileList.length > 0 && this.batchIds.length >0;
                if(check){
                    this.showUpdateModal=false
                    this.getUploadData()
                    this.getDeptList()
                    this.getTeamList()
                }else{
                    this.showUpdateModal=false
                }
            },
            updateCancel(){

            },
            downloadExample(){
                // window.location =  "http://demo.tingjiandan.com:8080/tcprom/accountManage/downloadModel"
                window.location =  location.origin + "/tcprom/accountManage/downloadModel"
            }
        }
    }
</script>
<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    @import '../../assets/css/customTable.less';
    .addInput{
        width: 50%;
    }
    .formItemRow{
        padding:1em 0 2em;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: -15%;
        }
    }
    .error{
        color: #ed3f14;
    }
</style>