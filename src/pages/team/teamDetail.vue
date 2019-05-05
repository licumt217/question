<template>
    <div class="teamDetail">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                团队信息
            </p>
            <span slot="extra">
                <Button v-show="isEditting" style="margin-right:1em;padding:2px 15px;" type="primary" size="small"
                        @click="saveEditDetail">保存</Button>
                <Button v-show="isEditting" style="margin-right:1em;padding:2px 15px;" type="ghost" size="small"
                        @click="cancelEditDetail">取消</Button>
                <Button v-show="!isEditting" style="margin-right:1em" type="primary" size="small" icon="android-sync"
                        @click="editTeamDetail">修改</Button>
            </span>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="start" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="团队名称：">
                            <div class="teamInfoText" v-show="!isEditting">{{formItem.dtteamName}}</div>
                            <Input :maxlength="20" v-show="isEditting" v-model.trim="formItem.dtteamName"
                                   placeholder="请输入" style="width: 200px"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="状态：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.enableStatus >
                                0?(formItem.enableStatus==1?'停用':'待激活'):'启用'}}
                            </div>
                            <Select v-show="isEditting" v-model="formItem.enableStatus" placeholder="请选择"
                                    style="width: 200px">
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="团队组成：">
                            <div class="teamInfoText">{{formItem.deptCount}}&nbsp;个部门&nbsp;&nbsp;{{formItem.empCount}}&nbsp;名员工</div>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="middle" class="formItemRow">
                    <Col span="8">
                        <Form-item label="公司名称：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.companyName}}</div>
                            <Input v-show="isEditting" v-model.trim="formItem.companyName"
                                   placeholder="请选择" style="width: 200px">
                            </Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="负责人姓名：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.qrmDtuserName}}</div>
                            <Input :readonly="true" v-show="isEditting" v-model.trim="formItem.qrmDtuserName"
                                   placeholder="请选择" style="width: 200px">
                                <Button class="editBtn" slot="append" type="text" icon="android-checkbox-outline"
                                        @click="chioceName">选择
                                </Button>
                            </Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="负责人手机号：">
                            <div class="teamInfoText">{{formItem.phone}}</div>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="middle" class="formItemRow">
                    <Col span="8">
                        <Form-item label="开户行名称：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.bankName}}</div>
                            <Input :maxlength="30" v-show="isEditting" v-model.trim="formItem.bankName"
                                   placeholder="请输入" style="width: 200px"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="开户银行：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.bankAccount}}</div>
                            <Input :maxlength="30" v-show="isEditting" v-model.trim="formItem.bankAccount"
                                   placeholder="请输入" style="width: 200px"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="收款账号：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.account}}</div>
                            <Input :maxlength="30" v-show="isEditting" v-model.trim="formItem.account"
                                   placeholder="请输入" style="width: 200px"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="8">
                        <Form-item label="省：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.provinceName}}</div>
                            <Select v-model="formItem.provinceCode" v-show="isEditting" :filterable="true"
                                    style="width: 200px" @on-open-change="onProvinceOpenChange($event)"
                                    :clearable="true"
                                    ref="province">
                                <Option v-for="item in provinces"
                                        :value="item.regionCode"
                                        :key="item.regionCode">{{item.regionName}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="市：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.cityName}}</div>
                            <Select v-model="formItem.cityCode" v-show="isEditting" :filterable="true"
                                    style="width: 200px" @on-open-change="onCityOpenChange($event)" :clearable="true"
                                    ref="city">
                                <Option v-for="item in citys"
                                        :value="item.regionCode"
                                        :key="item.regionCode">{{item.regionName}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="区：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.countyName}}</div>
                            <Select v-model="formItem.countyCode" v-show="isEditting" :filterable="true"
                                    style="width: 200px" :clearable="true" ref="county">
                                <Option v-for="item in districts"
                                        :value="item.regionCode"
                                        :key="item.regionCode">{{item.regionName}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="middle" class="formItemRow">
                    <Col span="8">
                        <Form-item label="营业执照号：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.businessLicenseNo}}</div>
                            <Input :maxlength="30" v-show="isEditting" v-model.trim="formItem.businessLicenseNo"
                                   placeholder="请输入" style="width: 200px"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="开户许可证号：">
                            <div v-show="!isEditting" class="teamInfoText">{{formItem.accountLicenseNo}}</div>
                            <Input :maxlength="30" v-show="isEditting" v-model.trim="formItem.accountLicenseNo"
                                   placeholder="请输入" style="width: 200px"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="备注：">
                            <div v-show="!isEditting&&formItem.remark.length>10" class="teamInfoText"
                                 :title="formItem.remark">
                                {{formItem.remark.slice(0,10)+'...'}}
                            </div>
                            <div v-show="!isEditting&&formItem.remark.length<=10" class="teamInfoText"
                                 :title="formItem.remark">
                                {{formItem.remark}}
                            </div>
                            <Input :maxlength="500" v-show="isEditting" v-model="formItem.remark"
                                   placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Card style="margin-top:15px;">
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                成员信息
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-people"
                        @click="go2deptEdit">部门设置</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="android-person-add"
                        @click="go2AddTeamMember">新增员工</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-copy-outline"
                        @click="go2MultiAddEmployee">批量新增</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="android-contact"
                        @click="go2historyEmployee">历史员工</Button>
            </span>
            <Form :model="detailItem" :label-width="80">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="5">
                        <Form-item label="手机号">
                            <Input :maxlength="11" v-model="detailItem.phone" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="姓名">
                            <Input :maxlength="10" v-model="detailItem.userName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="账户状态">
                            <Select v-model="detailItem.enableStatus" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                                <Option value="2">待激活</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="部门">
                            <Select v-model="detailItem.qrmDtdeptId" placeholder="请选择">
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
                </Row>
                <Row type="flex" justify="space-around" align="middle" class="formItemRow">
                    <Col span="5">
                        <Form-item label="职位">
                            <Select v-model="detailItem.orgType" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="1">团队负责人</Option>
                                <Option value="2">部门负责人</Option>
                                <Option value="3">员工</Option>
                                <Option value="4">个人</Option>
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
                                        <Button v-show="member.isJoin == 0" type="error" size="small"
                                                @click="removeEmp(member)">移出团队
                                        </Button>
                                        <Button v-show="member.isJoin == 1" type="warning" size="small"
                                                @click="cancleInvite(member)">取消邀请
                                        </Button>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <template>
                        <Row type="flex" justify="center" style="margin:20px;">
                            <Col>
                                <Page :total="total" show-elevator show-total :pageSize='pageSize' @on-change="toPage"
                                      v-if="total > pageSize"></Page>
                            </Col>
                        </Row>
                    </template>
                </div>
            </div>
        </Card>
        <Modal class-name="vertical-center-modal" width="800" v-model="showDtteamModal" title="选择团队负责人"
               @on-ok="choiceOk" @on-cancel="choiceCancel">
            <Row type="flex" justify="center">
                <Col span="22" style="line-height:40px;margin-bottom:1em;">
                    <Row type="flex" justify="end" align='middle'>
                        <Col span="8" style="margin-right:1em">
                            <Input :maxlength="choiceItem.type == 1?11:10" v-model="choiceItem.searchStr"
                                   placeholder="请输入">
                                <Select v-model="choiceItem.type" slot="prepend" style="width:70px">
                                    <Option value="1">手机号</Option>
                                    <Option value="2">姓名</Option>
                                </Select>
                            </Input>
                        </Col>
                        <Col span="2">
                            <Button type="success" long @click="serchUser(choiceItem.type)">搜索</Button>
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
                                <input :id="'user'+index" type="radio" :value="user" name="selectedUser"
                                       v-model="selectedUser">
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
                    <Page :total="userTotal" size="small" show-elevator show-total :pageSize='userPageSize'
                          @on-change="toUserPage($event,choiceSearchItem.type)" v-if="userTotal > userPageSize"></Page>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
  import { util } from 'util'

  export default {
    name: 'teamDetail',
    data () {
      return {
        // 地区的select用on-open-change事件 用on-change有问题，存code码，减少请求次数
        prevProvinceCode: '',
        prevCityCode: '',
        provinces: '',
        citys: '',
        districts: '',
        page: 1,
        pageSize: 4,
        total: 0,
        userPage: 1,
        phonePage: 1,
        namePage: 1,
        userPageSize: 8,
        userTotal: 0,
        isEditting: false,
        showDtteamModal: false,
        qrmDtteamId: '',
        accountListData: [{}],
        deptList: [],
        userList: [],
        selectedUser: '',
        formItem: {
          dtteamName: '',
          enableStatus: '',
          deptCount: '',
          empCount: '',
          qrmDtuserName: '',
          qrmDtcodeUserId: '',
          phone: '',
          remark: ''
        },
        teamInfo: {},
        detailItem: {
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
        },
        choiceItem: {
          type: '',//0为手机号，1为姓名
          searchStr: ''
        },
        choiceSearchItem: {
          type: '',//0为手机号，1为姓名
          searchStr: ''
        }
      }
    },
    mounted: function () {
      let _this = this
      // _this.qrmDtteamId = _this.$route.query.qrmDtteamId;
      _this.qrmDtteamId = util.getSession('qrmDtteamId')
      setTimeout(() => {
        if (util.isEmpty(_this.qrmDtteamId)) {
          util.goto(this, 'team')
        }
        _this.getDeptList()
        _this.getAccountList()
        _this.getTeamInfo()
      }, 500)
    },
    watch: {
      page: function (val) {
        this.getAccountList()
      },
      phonePage: function (val) {
        this.getTeamAccount(1)
      },
      namePage: function (val) {
        this.getTeamAccount(2)
      },
      userPage: function (val) {
        this.getTeamAccount()
      }
    },
    methods: {
      onProvinceOpenChange ($event) {
        if ($event) {
          this.prevProvinceCode = this.formItem.provinceCode
        } else {
          if (this.formItem.provinceCode !== this.prevProvinceCode) {
            this.getCitys()
          }
        }
      },
      onCityOpenChange ($event) {
        if ($event) {
          this.prevCityCode = this.formItem.cityCode
        } else {
          if (this.formItem.cityCode !== this.prevCityCode) {
            this.getDistricts()
          }
        }
      },
      getRegion () {
        this.$refs.province.clearSingleSelect()
        this.provinces = []
        this.$refs.city.clearSingleSelect()
        this.citys = []
        this.$refs.county.clearSingleSelect()
        this.districts = []
        this.http.post('tcprom/common/getRegionList', {}).then((data) => {
          this.provinces = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
          this.http.post('tcprom/common/getRegionList', {
            regionCode: this.teamInfo.provinceCode,
          }).then((data) => {
            this.citys = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
            this.http.post('tcprom/common/getRegionList', {
              regionCode: this.teamInfo.cityCode,
            }).then((data) => {
              this.districts = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
              // 回显数据
              this.formItem = Object.assign({}, this.teamInfo)
            })
          })
        })
      },
      getProvinces () {
        this.http.post('tcprom/common/getRegionList', {}).then((data) => {
          this.provinces = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
        })
      },
      getCitys () {
        this.$refs.city.clearSingleSelect()
        this.citys = []
        this.$refs.county.clearSingleSelect()
        this.districts = []
        this.http.post('tcprom/common/getRegionList', {
          regionCode: this.formItem.provinceCode,
        }).then((data) => {
          this.citys = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
        })
      },
      getDistricts () {
        this.$refs.county.clearSingleSelect()
        this.districts = []
        this.http.post('tcprom/common/getRegionList', {
          regionCode: this.formItem.cityCode,
        }).then((data) => {
          this.districts = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
        })
      },
      toPage (page) {
        this.page = page
      },
      toUserPage (page, type) {
        if (type == 1) {
          this.phonePage = page
        } else if (type == 2) {
          this.namePage = page
        } else {
          this.userPage = page
        }
      },
      query: function () {
        this.searchItem = Object.assign({}, this.detailItem)
        this.total = 0
        if (this.page == 1) {
          this.getAccountList()
        } else {
          this.page = 1
        }
      },
      getTeamInfo () {
        this.http.post('tcprom/dtteamManage/queryTeamById', {
          qrmDtteamId: this.qrmDtteamId,
        }).then((data) => {
          this.teamInfo = data.dtTeamData
          this.getRegion()
        })
      },
      getDeptList () {
        this.http.post('tcprom/common/getDeptList', {
          qrmDtteamId: this.qrmDtteamId,
        }).then((data) => {
          this.deptList = data.resultData
        })
      },
      getAccountList () {
        this.http.post('tcprom/accountManage/getTeamUserList', {
          phone: this.searchItem.phone,
          userName: this.searchItem.userName,
          qrmDtteamId: this.qrmDtteamId,
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
      getTeamAccount (type) {
        let self = this
        let searchItem = {}
        let deferred = $.Deferred()
        if (type == 1) {
          searchItem = Object.assign({}, {
            qrmDtteamId: self.qrmDtteamId,
            phone: self.choiceSearchItem.searchStr,
            enableStatus: '0',
            start: (self.phonePage - 1) * self.userPageSize,
            limit: self.userPageSize
          })
        } else if (type == 2) {
          searchItem = Object.assign({}, {
            qrmDtteamId: self.qrmDtteamId,
            userName: self.choiceSearchItem.searchStr,
            enableStatus: '0',
            start: (self.namePage - 1) * self.userPageSize,
            limit: self.userPageSize
          })
        } else {
          searchItem = Object.assign({}, {
            qrmDtteamId: self.qrmDtteamId,
            enableStatus: '0',
            start: (self.userPage - 1) * self.userPageSize,
            limit: self.userPageSize
          })
        }
        self.http.post('tcprom/accountManage/getDtcodeUserList', searchItem).then((data) => {
          self.userList = data.resultData
          self.userTotal = Number(data.totalCount)
          deferred.resolve()
        })
        return deferred.promise()
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
                  this.getAccountList()
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
                qrmDtteamId: this.qrmDtteamId,
              }).then((data) => {
                if (this.accountListData.length > 1 || this.page == 1) {
                  this.getAccountList()
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
      editTeamDetail () {
        this.isEditting = true
      },
      cancelEditDetail () {
        this.getTeamInfo()
        this.isEditting = false
      },
      saveEditDetail () {
        this.http.post('tcprom/dtteamManage/editDtteam', {
          dtteamName: this.formItem.dtteamName,
          enableStatus: this.formItem.enableStatus,
          qrmDtuserId: this.formItem.qrmDtcodeUserId,
          remark: this.formItem.remark,
          qrmDtteamId: this.qrmDtteamId,
          bankName: this.formItem.bankName,
          bankAccount: this.formItem.bankAccount,
          account: this.formItem.account,
          companyName: this.formItem.companyName,
          provinceCode: this.formItem.provinceCode,
          cityCode: this.formItem.cityCode,
          countyCode: this.formItem.countyCode,
          businessLicenseNo: this.formItem.businessLicenseNo,
          accountLicenseNo: this.formItem.accountLicenseNo,
        }).then((data) => {
          this.$Message.success(data.msg)
          this.isEditting = false
          this.getTeamInfo()
          this.getAccountList()
        })
      },
      chioceName () {
        this.getTeamAccount().then(() => {
          if (this.userList.length > 0) {
            this.showDtteamModal = true
          } else {
            this.$Message.warning('该团队下没有用户信息')
          }
        })
      },
      go2deptEdit () {
        util.goto(this, 'team/teamDetail/deptEdit')
      },
      go2AddTeamMember () {
        util.goto(this, 'team/teamDetail/addTeamMember')
      },
      go2MultiAddEmployee () {
        util.goto(this, 'team/teamDetail/multiAddEmployee')
      },
      go2historyEmployee () {
        util.goto(this, 'team/teamDetail/historyEmployee')
      },
      choiceOk () {
        this.showDtteamModal = false
        this.formItem.qrmDtcodeUserId = this.selectedUser.qrmDtcodeUserId ? this.selectedUser.qrmDtcodeUserId : ''
        this.formItem.qrmDtuserName = this.selectedUser.name ? this.selectedUser.name : ''
        this.formItem.phone = this.selectedUser.phone ? this.selectedUser.phone : ''
        this.choiceItem.type = ''
        this.choiceItem.searchStr = ''
        this.choiceSearchItem.type = ''
        this.choiceSearchItem.searchStr = ''
        this.selectedUser = {}
      },
      choiceCancel () {
        this.choiceItem.type = ''
        this.choiceItem.searchStr = ''
        this.choiceSearchItem.type = ''
        this.choiceSearchItem.searchStr = ''
        this.selectedUser = {}
      },
      serchUser (type) {
        if (type == 1) {
          this.phonePage = 1
        } else if (type == 2) {
          this.namePage = 1
        } else {
          this.userPage = 1
        }
        this.userTotal = 0
        this.choiceSearchItem = Object.assign({}, this.choiceItem)
        this.getTeamAccount(type)
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
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: -10%;
        }
    }

    .editBtn {
        color: #ed3f14;
    }

    .queryBtn {
        margin-top: -5px;
    }

    .checkbox input[type="radio"] {
        display: none;
    }

    .checkbox input[type="radio"]:checked + label {
        vertical-align: middle;
        cursor: pointer;
        background: url(../../assets/images/radio_checked.png) no-repeat;
        width: 18px;
        height: 18px;
        display: inline-block;
        background-size: 100% 100%;
    }

    .checkbox input[type="radio"] + label {
        vertical-align: middle;
        cursor: pointer;
        background: url(../../assets/images/radio.png) no-repeat;
        width: 18px;
        height: 18px;
        display: inline-block;
        background-size: 100% 100%;
    }

    .isIn {
        color: #ed3f14;
    }

    .teamInfoText {
        padding: 0 15px;
        display: inline-block;
        letter-spacing: 1px;
    }
</style>