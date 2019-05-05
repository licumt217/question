<template>
    <div class="teamList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                推广团队管理
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="android-contacts"
                        @click="go2addTeam">新增团队</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-shuffle-strong"
                        @click="go2quitList">退团申请</Button>
            </span>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="6">
                        <Form-item label="团队名称">
                            <Input :maxlength="20" v-model="formItem.dtteamName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="负责人姓名">
                            <Input :maxlength="10" v-model="formItem.qrmDtuserName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="负责人手机号">
                            <Input :maxlength="11" v-model="formItem.phone" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="6" style="margin-right:26px">
                        <Form-item label="账户状态">
                            <Select v-model="formItem.enableStatus" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="9" style="text-align:right">
                        <Button class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="teamList.length<=0 || !teamList">暂无数据</div>
                            <table class="addAcount" style="table-layout:auto;" cellspacing="0"
                                   v-show="teamList.length>0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>名称</td>
                                    <td>手机号</td>
                                    <td>负责人姓名</td>
                                    <td>团队状态</td>
                                    <td>创建人</td>
                                    <td>创建日期</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(team,index) in teamList" v-show="Object.keys(team).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{team.dtteamName}}</td>
                                    <td>{{team.phone}}</td>
                                    <td>{{team.qrmDtuserName}}</td>
                                    <td>{{team.enableStatus > 0?(team.enableStatus==1?'停用':'待激活'):'启用'}}</td>
                                    <td>{{team.createUserName}}</td>
                                    <td>{{team.createDt}}</td>
                                    <td>
                                        <Button type="primary" size="small" class="edit-btn"
                                                @click="go2teamDetail(team)">详情
                                        </Button>
                                        <Button v-show="team.enableStatus<2"
                                                :type="team.enableStatus==0?'error':'success'" size="small"
                                                @click='toggleTeam(team)'>{{team.enableStatus==0?'停用':'启用'}}
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
    name: 'teanList',
    data () {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        teamList: [{}],
        formItem: {
          dtteamName: '',
          qrmDtuserName: '',
          phone: '',
          enableStatus: '-1',
        },
        searchItem: {
          dtteamName: '',
          qrmDtuserName: '',
          phone: '',
          enableStatus: '',
        },
      }
    },
    mounted: function () {
      setTimeout(() => {
        this.getTeamList()
      }, 50)
    },
    watch: {
      page: function (val) {
        this.getTeamList()
      }
    },
    methods: {
      toPage (page) {
        this.page = page
      },
      getTeamList () {
        this.http.post('tcprom/common/getTeamList', {
          dtteamName: this.searchItem.dtteamName,
          qrmDtuserName: this.searchItem.qrmDtuserName,
          phone: this.searchItem.phone,
          enableStatus: this.searchItem.enableStatus < 0 ? '' : this.searchItem.enableStatus,
          start: (this.page - 1) * this.pageSize,
          limit: this.pageSize
        }).then((data) => {
          this.teamList = data.resultData
          this.total = Number(data.totalCount)
        })
      },
      query () {
        this.searchItem = Object.assign({}, this.formItem)
        this.total = 0
        if (this.page == 1) {
          this.getTeamList()
        } else {
          this.page = 1
        }
      },
      toggleTeam (team) {
        if (team) {
          this.http.post('tcprom/dtteamManage/enableOrDisableDtteam', {
            qrmDtteamId: team.qrmDtteamId,
            enableStatus: team.enableStatus == '0' ? '1' : '0'
          }).then((data) => {
            team.enableStatus = team.enableStatus == '0' ? '1' : '0'
            this.$Message.success(data.msg)
          })
        }
      },
      go2addTeam () {
        util.goto(this, 'team/addTeam')
      },
      go2quitList () {
        util.goto(this, 'team/quitList')
      },
      go2teamDetail (team) {
        util.setSession('qrmDtteamId', team.qrmDtteamId)
        this.$router.push({ path: 'team/teamDetail' })
        // this.$router.push({ path: "team/teamDetail", query: {qrmDtteamId:team.qrmDtteamId}})
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
    .queryBtn {
        margin-top: -5px;
    }
</style>