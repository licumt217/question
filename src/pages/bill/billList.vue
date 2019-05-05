<template>
    <div class="billList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                结算单管理
            </p>
            <Form :model="searchItem" :label-width="100">
                <Row type="flex" justify="start" class="formItemRow" align="middle">
                    <Col span="6">
                        <Form-item label="任务名称">
                            <Input :maxlength="20" v-model="searchItem.taskName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="推广团队名称">
                            <Input :maxlength="10" v-model="searchItem.dtteamName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="结算单状态">
                            <Select v-model="searchItem.billStatus">
                                <Option value="">全部</Option>
                                <Option v-for="item in statusOptions" :value="item.key" :key="item.key">
                                    {{item.value}}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <Form-item label="结算单月份">
                            <Select v-model="searchItem.billMonth">
                                <Option value="">全部</Option>
                                <Option v-for="item in months" :value="item.value" :key="item.value">
                                    {{item.label}}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="结算单年份">
                            <Select v-model="searchItem.billYear">
                                <Option value="">全部</Option>
                                <Option v-for="item in years" :value="item.value" :key="item.value">
                                    {{item.label}}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="3" offset="1" style="text-align:right">
                        <Button size="large" class="queryBtn" type="success" icon="ios-search" @click="query">查询
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="billList.length<=0 || !billList">暂无数据</div>
                            <table class="addAcount" style="table-layout:auto;" cellspacing="0"
                                   v-show="billList.length>0" cellpadding="0" border="0">
                                <tr>
                                    <td>任务名称</td>
                                    <td>团队名称</td>
                                    <td>结算单状态</td>
                                    <td>结算月份</td>
                                    <td>结算年份</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(bill,index) in billList" v-show="Object.keys(billList).length>0"
                                    :key="index">
                                    <td>{{bill.taskName}}</td>
                                    <td>{{bill.qrmDtteamName}}</td>
                                    <td v-if="bill.state==='0'">
                                        未发送
                                    </td>
                                    <td v-else-if="bill.state === '1'">
                                        未接受
                                    </td>
                                    <td v-else-if="bill.state === '2'">
                                        已接受
                                    </td>
                                    <td v-else-if="bill.state === '3'">
                                        未打款
                                    </td>
                                    <td v-else-if="bill.state === '4'">
                                        已驳回
                                    </td>
                                    <td v-else-if="bill.state === '5'">
                                        已打款
                                    </td>
                                    <td>{{bill.settlementMonth}}</td>
                                    <td>{{bill.settlementYear}}</td>
                                    <td>
                                        <Button type="primary" size="small" class="edit-btn"
                                                v-if="bill.state==='1'||bill.state==='2'||bill.state==='4'||bill.state==='5'"
                                                @click="go2BillDetail(bill.proSettlementId)">
                                            查看详情
                                        </Button>
                                        <Button type="success" size="small" class="edit-btn"
                                                v-else-if="bill.state==='0'" @click="go2PostBill(bill.proSettlementId)">
                                            发送结算单
                                        </Button>
                                        <Button type="info" size="small" class="edit-btn"
                                                v-else-if="bill.state==='3'"
                                                @click="go2BillDetail(bill.proSettlementId)">
                                            打款
                                        </Button>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <template>
                        <Row type="flex" justify="center" style="margin:30px;">
                            <Col>
                                <Page :current.sync="page" :total="total" show-elevator show-total :pageSize='pageSize'
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
  import _ from 'lodash'

  export default {
    name: 'billList',
    data () {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        billList: [],
        searchItem: {
          taskName: '',
          dtteamName: '',
          billStatus: '',
          billMonth: '',
          billYear: '',
        },
        statusOptions: [],
        years: [
          { label: '2018年', value: '2018' },
          { label: '2019年', value: '2019' }
        ],
        months: [
          { label: '1月', value: '01' },
          { label: '2月', value: '02' },
          { label: '3月', value: '03' },
          { label: '4月', value: '04' },
          { label: '5月', value: '05' },
          { label: '6月', value: '06' },
          { label: '7月', value: '07' },
          { label: '8月', value: '08' },
          { label: '9月', value: '09' },
          { label: '10月', value: '10' },
          { label: '11月', value: '11' },
          { label: '12月', value: '12' },
        ],
      }
    },
    mounted: function () {
      // 恢复去详情页之前的页数
      this.page = Number(sessionStorage.getItem('billPage')) || 1
      sessionStorage.removeItem('billPage')
      sessionStorage.removeItem('taskPage')
      this.getBillList()
      this.getBillStatus()
    },
    watch: {
      page: function (val) {
        this.getBillList()
      }
    },
    methods: {
      getBillStatus () {
        this.http.post('tcprom/common/getEnumList', {
          type: '2'
        }).then((data) => {
          this.statusOptions = data.resultData
        })
      },
      getBillList () {
        this.http.post('tcprom/settlement/getSettlementListByMap', {
          taskName: this.searchItem.taskName,
          qrmDtteamName: this.searchItem.dtteamName,
          state: this.searchItem.billStatus,
          settlementYear: this.searchItem.billYear,
          settlementMonth: this.searchItem.billMonth,
          start: (this.page - 1) * this.pageSize,
          limit: this.pageSize
        }).then((data) => {
          this.billList = data.resultData
          this.total = Number(data.totalCount)
        })
      },
      query () {
        this.total = 0
        if (this.page === 1) {
          this.getBillList()
        } else {
          this.page = 1
        }
      },
      go2PostBill (proSettlementId) {
        // 将页码存放在session
        sessionStorage.setItem('billPage', this.page)
        this.$router.push({
          path: '/billsManagement/postBill',
          query: {
            proSettlementId: proSettlementId
          }
        })
      },
      go2BillDetail (proSettlementId) {
        // 将页码存放在session
        sessionStorage.setItem('billPage', this.page)
        this.$router.push({
          path: '/billsManagement/billDetail',
          query: {
            proSettlementId: proSettlementId
          }
        })
      },
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