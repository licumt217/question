<template>
    <div class="performanceList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="stats-bars"></Icon>
                支付宝推广业绩查询
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-cloud-download-outline"
                        @click="downloadSum">业绩统计下载</Button>
                <Button style="margin-right:1em" type="primary" size="small" icon="ios-cloud-download-outline"
                        @click="downloadDetail">业绩明细下载</Button>
            </span>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="5">
                        <Form-item label="姓名">
                            <Input :maxlength="10" v-model="formItem.qrmDtuserName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
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
                    <Col span="5">
                        <Form-item label="统计开始时间">
                            <Date-picker type="datetime" @on-change="handleStartTime"
                                         placeholder="选择日期和时间"></Date-picker>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="统计结束时间">
                            <Date-picker type="datetime" @on-change="handleEndTime" placeholder="选择日期和时间"></Date-picker>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" class="formItemRow" align="middle">
                    <Col span="5">
                        <Form-item label="团队名称">
                            <Input :maxlength="20" v-model="formItem.qrmDtteamName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="部门名称">
                            <Input :maxlength="20" v-model="formItem.qrmDtdeptName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="手机号">
                            <Input :maxlength="20" v-model="formItem.phone" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <!--<Col span="5">
                        <Form-item label="二维码类型">
                            <Select v-model="formItem.createType" placeholder="请选择">
                                <Option value="-1">全部</Option>
                                <Option value="1">微信</Option>
                                <Option value="2">支付宝</Option>
                                <Option value="3">停简单</Option>
                            </Select>
                        </Form-item>
                    </Col>-->
                    <Col span="5" style="text-align:right">
                        <Button class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="qrmPerformList.length<=0 || !qrmPerformList">暂无数据</div>
                            <table class="addAcount" style="table-layout:auto;" v-show="qrmPerformList.length>0"
                                   cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td>序号</td>
                                    <td>姓名</td>
                                    <td>手机号</td>
                                    <td>团队名称</td>
                                    <td>部门名称</td>
                                    <td>身份</td>
                                    <td>启用状态</td>
                                    <!--<td>扫描总次数(按扫描时间)</td>-->
                                    <!--<td>扫描已注册(按注册时间)</td>-->
                                    <!--<td>扫描未注册(按注册时间)</td>-->
                                    <td>免密推广业绩</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(perform,index) in qrmPerformList" v-show="Object.keys(perform).length>0">
                                    <td>{{pageSize*(page-1)+index+1| zerofill}}</td>
                                    <td>{{perform.qrmDtuserName}}</td>
                                    <td>{{perform.phone}}</td>
                                    <td>{{perform.qrmDtteamName}}</td>
                                    <td>{{perform.qrmDtdeptName}}</td>
                                    <td>{{perform.orgType | parseIdentity(0)}}</td>
                                    <td>{{perform.enableStatus > 0?(perform.enableStatus==1?'停用':'待激活'):'启用'}}</td>
                                    <!--<td>{{perform.scanCount}}</td>-->
                                    <!--<td>{{perform.transCount}}</td>-->
                                    <!--<td>{{Number(perform.scanCount)-Number(perform.transCount) }}</td>-->
                                    <td>{{perform.hasOrderCount}}</td>
                                    <td>
                                        <Button type="primary" size="small" class="edit-btn"
                                                @click="go2detail(perform)">详情
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
    name: 'PerformanceListAliPay',
    data () {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        qrmPerformList: [{}],
        formItem: {
          phone: '',
          qrmDtuserName: '',
          enableStatus: '-1',
          startDate: '',
          endDate: '',
          qrmDtteamName: '',
          qrmDtdeptName: ''
        },
        searchItem: {
          phone: '',
          qrmDtuserName: '',
          enableStatus: '',
          startDate: '',
          endDate: '',
          qrmDtteamName: '',
          qrmDtdeptName: ''
        },
      }
    },
    mounted: function () {
      this.getPerformacneList()
    },
    watch: {
      page: function (val) {
        this.getPerformacneList()
      }
    },
    methods: {
      handleStartTime (date) {
        this.formItem.startDate = date
      },
      handleEndTime (date) {
        this.formItem.endDate = date
      },
      toPage (page) {
        this.page = page
      },
      query: function () {
        if (this.formItem.startDate && this.formItem.endDate) {
          let start = new Date(this.formItem.startDate).getTime()
          let end = new Date(this.formItem.endDate).getTime()
          if (end < start) {
            this.$Message.warning('结束时间不能早于开始时间！')
            return
          }
        }
        this.searchItem = Object.assign({}, this.formItem)
        this.total = 0
        if (this.page == 1) {
          this.getPerformacneList()
        } else {
          this.page = 1
        }
      },
      getPerformacneList () {
        this.http.post('tcprom/dtCodeRecord/selectDtCodeRecordListByMap', {
          qrmDtuserName: this.searchItem.qrmDtuserName,
          enableStatus: this.searchItem.enableStatus < 0 ? '' : this.searchItem.enableStatus,
          startDate: this.searchItem.startDate,
          endDate: this.searchItem.endDate,
          qrmDtteamName: this.searchItem.qrmDtteamName,
          qrmDtdeptName: this.searchItem.qrmDtdeptName,
          phone: this.searchItem.phone,
          start: (this.page - 1) * this.pageSize,
          limit: this.pageSize,
          createType: '2'
        }).then((data) => {
          this.qrmPerformList = data.resultData
          this.total = Number(data.totalCount)
        })
      },
      go2detail (perform) {
        util.setSession('thisPerformId', perform.qrmDtcodeUserId)
        util.goto(this, 'performance/performance_aliPay/performanceDetail')
      },
      downloadSum () {
        if (!this.formItem.startDate || !this.formItem.endDate) {
          this.$Message.warning('请选择开始时间和结束时间!')
        } else {
          let start = new Date(this.formItem.startDate).getTime()
          let end = new Date(this.formItem.endDate).getTime()
          if (end < start) {
            this.$Message.warning('结束时间不能早于开始时间！')
            return
          }
          window.location = `${location.origin}/tcprom/dtCodeRecord/downloadExcel?qrmDtuserName=${this.formItem.qrmDtuserName}` +
            `&enableStatus=${this.formItem.enableStatus < 0 ? '' : this.formItem.enableStatus}` +
            `&startDate=${this.formItem.startDate}&endDate=${this.formItem.endDate}` +
            `&qrmDtteamName=${this.formItem.qrmDtteamName}&qrmDtdeptName=${this.formItem.qrmDtdeptName}` +
            `&excelType=1&createType=2`
        }
      },
      downloadDetail () {
        if (!this.formItem.startDate || !this.formItem.endDate) {
          this.$Message.warning('请选择开始时间和结束时间!')
        } else {
          let start = new Date(this.formItem.startDate).getTime()
          let end = new Date(this.formItem.endDate).getTime()
          if (end < start) {
            this.$Message.warning('结束时间不能早于开始时间！')
            return
          }
          window.location = `${location.origin}/tcprom/dtCodeRecord/downloadExcel?qrmDtuserName=${this.formItem.qrmDtuserName}` +
            `&enableStatus=${this.formItem.enableStatus < 0 ? '' : this.formItem.enableStatus}` +
            `&startDate=${this.formItem.startDate}&endDate=${this.formItem.endDate}` +
            `&qrmDtteamName=${this.formItem.qrmDtteamName}&qrmDtdeptName=${this.formItem.qrmDtdeptName}` +
            `&excelType=2&createType=2`
        }
      }
    }
  }
</script>
<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    @import '../../assets/css/customTable.less';

    .queryBtn {
        margin-top: -5px;
    }
</style>