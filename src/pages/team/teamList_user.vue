<template>
    <div class="accountList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                团队成员管理
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-people"
                        @click="go2deptEdit">部门设置</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="android-person-add"
                        @click="go2addTeamMember">新增员工</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-copy-outline"
                        @click="go2multiAddTeamMember">批量新增</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-shuffle-strong"
                        @click="go2quitList">退团申请</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="android-contact"
                        @click="go2historyEmployee">历史员工</Button>
            </span>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="5">
                        <Form-item label="手机号">
                            <Input :maxlength="11" v-model="formItem.phone" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="姓名">
                            <Input :maxlength="10" v-model="formItem.userName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="部门">
                            <Select v-model="formItem.qrmDtdeptId" @on-change="show" placeholder="请选择">
                                <Option v-if="deptList.length <= 0 || !deptList" value="-2" :key="deptList.length">
                                    暂无部门
                                </Option>
                                <Option v-else value="-1" :key="deptList.length">全部</Option>
                                <Option v-for="dept in deptList" :key="dept.qrmDtdeptId" :value="dept.qrmDtdeptId">
                                    {{dept.dtdeptName}}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="5">
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
                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="5">
                        <Form-item label="账户状态">
                            <Select v-model="formItem.enableStatus" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                                <Option value="2">待激活</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="5" offset="12" style="text-align:right">
                        <Button class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="accountListData.length<=0 || !accountListData">暂无数据</div>
                            <table class="addAcount" v-show="accountListData.length>0" style="table-layout:auto;"
                                   cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>手机号</td>
                                    <td>姓名</td>
                                    <td>隶属部门</td>
                                    <td>身份</td>
                                    <td>账户状态</td>
                                    <td>创建人</td>
                                    <td>创建日期</td>
                                    <td>是否加入</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(member,index) in accountListData" v-show="Object.keys(member).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{member.phone}}</td>
                                    <td>{{member.name}}</td>
                                    <td>{{member.dtdeptName}}</td>
                                    <td>{{member.orgType | parseIdentity(0)}}</td>
                                    <td>{{member.enableStatus > 0?(member.enableStatus==1?'停用':'待激活'):'启用'}}</td>
                                    <td>{{member.createName}}</td>
                                    <td>{{member.createDt}}</td>
                                    <td :class="{isIn:member.isJoin == 1}">{{member.isJoin==0?'已加入':'等待加入'}}</td>
                                    <td>
                                        <Button v-show="member.enableStatus != 2" type="primary" size="small"
                                                @click="go2editTeamMember(member)">编辑
                                        </Button>
                                        <Button v-show="member.isJoin == 1" type="warning" size="small"
                                                @click="cancleInvite(member)">取消邀请
                                        </Button>
                                        <Button v-show="member.isJoin == 0 && member.orgType != 1"
                                                :type="member.enableStatus==0?'warning':'success'" size="small"
                                                @click='toggleAccount(member)'>{{member.enableStatus==0?'停用':'启用'}}
                                        </Button>
                                        <Button v-show="member.isJoin == 0 && member.orgType != 1" type="error"
                                                size="small" @click="removeEmp(member)">移除团队
                                        </Button>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <template>
                        <Row type="flex" justify="center" style="margin:30px;">
                            <Col>
                                <Page :total="total" show-elevator show-total :pageSize='pageSize' @on-change="toPage"
                                      v-if="total > pageSize"></Page>
                            </Col>
                        </Row>
                    </template>
                </div>
            </div>
        </Card>
    </div>
</template>

<script type="text/ecmascript-6">
  import { util } from 'util'

  export default {
    name: 'teamList_user',
    data () {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        accountListData: [{}],
        deptList: [],
        formItem: {
          phone: '',
          userName: '',
          enableStatus: '-1',
          qrmDtdeptId: '-1',
          orgType: '-1',
        },
        searchItem: {
          phone: '',
          userName: '',
          enableStatus: '',
          qrmDtdeptId: '',
          orgType: '',
        }
      }
    },
    mounted: function () {
      setTimeout(() => {
        this.getDeptList()
        this.getTeamMemberList()
        this.getTeamID()
      }, 50)
    },
    watch: {
      page: function (val) {
        this.getTeamMemberList()
      },
    },
    methods: {
      show () {
        console.log(this.formItem.qrmDtdeptId)
      },
      getTeamID () {
        this.http.post('tcprom/common/getTeamList', {
          start: 0,
        }).then((data) => {
          util.setSession('user_qrmDtteamId', data.resultData[0].qrmDtteamId)
        })
      },
      toPage (page) {
        this.page = page
      },
      query: function () {
        this.searchItem = Object.assign({}, this.formItem)
        this.total = 0
        if (this.page == 1) {
          this.getTeamMemberList()
        } else {
          this.page = 1
        }
      },
      getDeptList () {
        this.http.post('tcprom/common/getDeptList', {}).then((data) => {
          this.deptList = data.resultData
        })
      },
      getTeamMemberList: function () {
        this.http.post('tcprom/accountManage/getTeamUserList', {
          phone: this.searchItem.phone,
          userName: this.searchItem.userName,
          qrmDtteamId: '',
          qrmDtdeptId: this.searchItem.qrmDtdeptId < 0 ? '' : this.searchItem.qrmDtdeptId,
          enableStatus: this.searchItem.enableStatus < 0 ? '' : this.searchItem.enableStatus,
          orgType: this.searchItem.orgType < 0 ? '' : this.searchItem.orgType,
          start: (this.page - 1) * this.pageSize,
          limit: this.pageSize
        }).then((data) => {
          this.accountListData = data.resultData
          this.total = Number(data.totalCount)
        })
      },
      toggleAccount (account) {
        if (account) {
          this.http.post('tcprom/accountManage/enableOrDisableDtcodeUser', {
            qrmDtcodeUserId: account.qrmDtcodeUserId,
            enableStatus: account.enableStatus == '0' ? '1' : '0'
          }).then((data) => {
            account.enableStatus = account.enableStatus == '0' ? '1' : '0'
            this.$Message.success(data.msg)
          })
        }
      },
      removeEmp (member) {
        if (member) {
          this.$Modal.confirm({
            title: '移出团队',
            content: `<p style="margin-top:-5px;">确认将 ${member.name} 移出本团队？</p>`,
            loading: true,
            onOk: () => {
              this.http.post('tcprom/quitRecord/removeEmp', {
                qrmDtuserId: member.qrmDtcodeUserId,
                quitType: '2',
                type: '1'
              }).then((data) => {
                if (this.accountListData.length > 1 || this.page == 1) {
                  this.getTeamMemberList()
                } else {
                  this.page--
                }
                this.$Modal.remove()
                this.$Message.success(data.msg)
              }, () => {
                this.$Modal.remove()
              })
            }
          })
        }
      },
      cancleInvite (member) {
        if (member) {
          this.$Modal.confirm({
            title: '取消邀请',
            content: `<p style="margin-top:-5px;">确认取消邀请 ${member.name} 加入本团队？</p>`,
            loading: true,
            onOk: () => {
              this.http.post('tcprom/joinRecord/removeJoinTeam', {
                qrmDtcodeUserId: member.qrmDtcodeUserId,
              }).then((data) => {
                if (this.accountListData.length > 1 || this.page == 1) {
                  this.getTeamMemberList()
                } else {
                  this.page--
                }
                this.$Modal.remove()
                this.$Message.success(data.msg)
              }, () => {
                this.$Modal.remove()
              })
            }
          })

        }
      },
      go2deptEdit: function () {
        util.goto(this, 'team/deptEdit')
      },
      go2addTeamMember: function () {
        util.goto(this, 'team/addTeamMember')
      },
      go2quitList: function () {
        util.goto(this, 'team/quitList')
      },
      go2multiAddTeamMember: function () {
        util.goto(this, 'team/multiAddTeamMember')
      },
      go2historyEmployee: function () {
        util.goto(this, 'team/historyEmployee')
      },
      go2editTeamMember: function (member) {
        util.setSession('uer_thisAccountDetail', JSON.stringify(member))
        util.goto(this, 'team/editTeamMember')
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
    .queryBtn {
        margin-top: -5px;
    }

    .isIn {
        color: #ed3f14;
    }
</style>