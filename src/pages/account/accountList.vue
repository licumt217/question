<template>
    <div class="accountList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="android-funnel"></Icon>
                账户操作
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-crop-strong"
                        @click="go2AddAccount">新增账户</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-copy-outline"
                        @click="go2multiAddAccount">批量新增</Button>
            </span>
            <Form :model="formItem" :label-width="100">
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
                    <Col span="7">
                        <Form-item label="团队名称">
                            <Input :maxlength="20" v-model="formItem.dtteamName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>

                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="7">
                        <Form-item label="账户状态">
                            <Select v-model="formItem.enableStatus" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                                <Option value="2">待激活</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        <Form-item label="身份">
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
                            <div class="nodata" v-show="accountListData.length<=0 || !accountListData">暂无数据</div>
                            <table class="addAcount" style="table-layout:auto;" v-show="accountListData.length>0"
                                   cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>账户ID</td>
                                    <td>手机号</td>
                                    <td>姓名</td>
                                    <td>团队名称</td>
                                    <td>部门名称</td>
                                    <td>身份</td>
                                    <td>账户状态</td>
                                    <td>创建人</td>
                                    <td>创建日期</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(account,index) in accountListData" v-show="Object.keys(account).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{account.qrmDtcodeUserId}}</td>
                                    <td>{{account.phone}}</td>
                                    <td>{{account.name}}</td>
                                    <td>{{account.dtteamName}}</td>
                                    <td>{{account.dtdeptName}}</td>
                                    <td>{{account.orgType | parseIdentity(0)}}</td>
                                    <td>{{account.enableStatus > 0?(account.enableStatus==1?'停用':'待激活'):'启用'}}</td>
                                    <td>{{account.createName}}</td>
                                    <td>{{account.createDt}}</td>
                                    <td>
                                        <Button type="primary" size="small" class="edit-btn"
                                                @click='go2EditAccount(account)'>编辑
                                        </Button>
                                        <Button v-show="account.enableStatus<2"
                                                :type="account.enableStatus==0?'error':'success'" size="small"
                                                @click='toggleAccount(account)'>{{account.enableStatus==0?'停用':'启用'}}
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

<script>
  import { util } from 'util'

  export default {
    name: 'accountList',
    data () {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        accountListData: [{}],
        formItem: {
          phone: '',
          userName: '',
          dtteamName: '',
          enableStatus: '-1',
          orgType: '-1'
        },
        searchItem: {
          phone: '',
          userName: '',
          dtteamName: '',
          enableStatus: '',
          orgType: ''
        },
      }
    },
    mounted: function () {
      setTimeout(() => {
        this.getAccountList()
      }, 50)
    },
    watch: {
      page: function (val) {
        this.getAccountList()
      }
    },
    methods: {
      toPage (page) {
        this.page = page
      },
      query () {
        this.searchItem = Object.assign({}, this.formItem)
        this.total = 0
        if (this.page == 1) {
          this.getAccountList()
        } else {
          this.page = 1
        }

      },
      getAccountList () {
        this.http.post('tcprom/accountManage/getDtcodeUserList', {
          phone: this.searchItem.phone,
          userName: this.searchItem.userName,
          dtteamName: this.searchItem.dtteamName,
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
      go2EditAccount (account) {
        util.setSession('thisAccountDetail', JSON.stringify(account))
        this.$router.push({ path: 'account/editAccount' })
      },
      go2AddAccount () {
        util.goto(this, 'account/addAccount')
      },
      go2multiAddAccount () {
        util.goto(this, 'account/multiAddAccount')
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
</style>