<template>
    <div class="taskList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                推广任务管理
            </p>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="start" class="formItemRow" align="middle">
                    <Col span="6">
                        <Form-item label="任务名称">
                            <Input :maxlength="20" v-model="formItem.taskName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="推广任务状态">
                            <Select v-model="formItem.state" style="width:100%">
                                <Option v-for="(item,$index) in stateOptions" :value="item.key" :key="$index">
                                    {{item.value }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <!--<Col span="6">
                        <Form-item label="推广团队名称">
                            <Input :maxlength="20" v-model="formItem.dtteamName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>-->
                </Row>
                <Row type="flex" justify="start" class="formItemRow" align="middle">
                    <Col span="6">
                        <Form-item label="任务开始时间">
                            <DatePicker style="width: 100%" type="datetimerange" v-model="formItem.taskStart"
                                        placeholder="开始时间" :editable="false"></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="任务结束时间">
                            <DatePicker style="width: 100%" type="datetimerange" v-model="formItem.taskEnd"
                                        placeholder="结束时间" :editable="false"></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="接受任务时间">
                            <DatePicker style="width: 100%" type="datetimerange" v-model="formItem.receiveTime"
                                        placeholder="接受任务时间" :editable="false"></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="2" style="text-align: right">
                        <Button class="queryBtn" type="success" icon="ios-search" @click="query">查询</Button>
                    </Col>
                </Row>
            </Form>
            <div class="layout-content-main">
                <div class="layout-content-main-bottom">
                    <Row type="flex" justify="center" class="content">
                        <Col span="24">
                            <div class="nodata" v-show="!taskList || taskList.length<=0">暂无数据</div>
                            <table class="addAcount" style="table-layout:auto;" cellspacing="0"
                                   v-show="taskList.length>0" cellpadding="0" border="0">
                                <tr>
                                    <td>任务名称</td>
                                    <td>任务状态</td>
                                    <td>任务开始时间</td>
                                    <td>任务结束时间</td>
                                    <td>接受任务时间</td>
                                    <td>操作</td>
                                </tr>
                                <tr v-for="(task,$index) in taskList" v-show="Object.keys(task).length>0" :key="$index">
                                    <td>{{task.taskName}}</td>
                                    <td>{{task.state==='1'?'未接受':'已接受'}}</td>
                                    <td>{{task.startDt}}</td>
                                    <td>{{task.endDt}}</td>
                                    <td>{{task.receiveDt}}</td>
                                    <td>
                                        <Button type="primary" size="small" class="edit-btn"
                                                @click="go2taskDetail(task.proTaskId,'')" v-if="task.state!=='1'">查看详情
                                        </Button>
                                        <Button type="primary" size="small" class="edit-btn"
                                                @click="go2taskDetail(task.proTaskId)"
                                                v-if="task.state==='1'&&task.past==='0'">查看详情
                                        </Button>
                                        <Button type="success" size="small" class="edit-btn"
                                                @click="go2taskDetail(task.proTaskId,task.proTeamReceiveId)"
                                                v-if="task.state==='1'&&task.past==='1'">接受任务
                                        </Button>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" style="margin:30px;">
                        <Col>
                            <Page :current.sync="page" :total="total" show-elevator show-total :pageSize='pageSize'
                                  v-if="total > pageSize"></Page>
                        </Col>
                    </Row>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
  import { util } from 'util'
  import moment from 'moment'

  export default {
    name: 'taskList_user',
    data () {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        taskList: [],
        stateOptions: [],
        formItem: {
          taskName: '',
          state: '',
          taskStart: '',
          taskEnd: '',
          receiveTime: '',
          start: '',
          limit: '',
        },
        modal_loading: false,
        receiveTaskId: '',
      }
    },
    mounted: function () {
      // 恢复去详情页之前的页数
      this.page = Number(sessionStorage.getItem('taskPage')) || 1
      sessionStorage.removeItem('taskPage')
      sessionStorage.removeItem('billPage')
      this.getTaskList()
      this.getTaskStatus()
    },
    watch: {
      page: function (val) {
        this.getTaskList()
      }
    },
    methods: {
      getTaskStatus () {
        this.http.post('tcprom/common/getEnumList', {
          type: '1'
        }).then((data) => {
          this.stateOptions = data.resultData
        })
      },
      getTaskList () {
        this.http.post('tcprom/taskManage/getTeamTaskListByMap', {
          taskName: this.formItem.taskName,
          state: this.formItem.state,
          startDtStart: this.formItem.taskStart[0] && moment(this.formItem.taskStart[0]).format('YYYY-MM-DD HH:mm:ss'),
          startDtEnd: this.formItem.taskStart[1] && moment(this.formItem.taskStart[1]).format('YYYY-MM-DD HH:mm:ss'),
          endDtStart: this.formItem.taskEnd[0] && moment(this.formItem.taskEnd[0]).format('YYYY-MM-DD HH:mm:ss'),
          endDtEnd: this.formItem.taskEnd[1] && moment(this.formItem.taskEnd[1]).format('YYYY-MM-DD HH:mm:ss'),
          receiveDtStart: this.formItem.receiveTime[0] && moment(this.formItem.receiveTime[0]).format('YYYY-MM-DD HH:mm:ss'),
          receiveDtEnd: this.formItem.receiveTime[1] && moment(this.formItem.receiveTime[1]).format('YYYY-MM-DD HH:mm:ss'),
          start: (this.page - 1) * this.pageSize,
          limit: this.pageSize,
        }).then((data) => {
          this.taskList = data.resultData
          this.taskList.forEach((val, index) => {
            // 判断任务是否已经过期
            if (moment(val.endDt).isBefore(moment())) {
              // 已过期
              val.past = '0'
            } else {
              val.past = '1'
            }
          })
          this.total = Number(data.totalCount)
        })
      },
      query () {
        this.total = 0
        if (this.page === 1) {
          this.getTaskList()
        } else {
          this.page = 1
        }
      },
      go2taskDetail (proTaskId, proTeamReceiveId) {
        // 将页码存放在session
        sessionStorage.setItem('taskPage', this.page)
        this.$router.push({
          path: '/manageTask/taskDetail_user',
          query: {
            proTaskId: proTaskId,
            proTeamReceiveId: proTeamReceiveId
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