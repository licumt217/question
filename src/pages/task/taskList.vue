<template>
    <div class="taskList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                推广任务管理
            </p>
            <span slot="extra">
                <Button style="margin-right:1em" type="primary" size="small" icon="android-contacts"
                        @click="go2addTask">新建任务</Button>
            </span>
            <Form :model="formItem" :label-width="100">
                <Row type="flex" justify="start" class="formItemRow" align="middle">
                    <Col span="6">
                        <Form-item label="任务名称">
                            <Input :maxlength="20" v-model="formItem.taskName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="推广团队名称">
                            <Input :maxlength="20" v-model="formItem.qrmDtteamName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="start" class="formItemRow" align="middle">
                    <Col span="6">
                        <Form-item label="任务开始时间">
                            <DatePicker type="datetimerange" v-model="formItem.taskStart"
                                        placeholder="开始时间" style="width: 100%" :editable="false"></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="任务结束时间">
                            <DatePicker type="datetimerange" v-model="formItem.taskEnd"
                                        placeholder="结束时间" style="width: 100%" :editable="false"></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="4" style="text-align:right">
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
                                    <td width="10%">任务名称</td>
                                    <td width="20%">任务开始时间</td>
                                    <td width="20%">任务结束时间</td>
                                    <td width="30%">推广团队</td>
                                    <td width="20%">操作</td>
                                </tr>
                                <tr v-for="(task,index) in taskList" v-show="Object.keys(task).length>0">
                                    <td>{{task.taskName}}</td>
                                    <td>{{task.startDt}}</td>
                                    <td>{{task.endDt}}</td>
                                    <td style="padding: 0 10px" v-if="task.qrmDtteamNames.length<4">
                                        {{task.qrmDtteamNames.join(',')}}
                                    </td>
                                    <td v-else style="padding: 0 10px" :title="task.qrmDtteamNames.join(',')">
                                        {{task.qrmDtteamNames.slice(0,3).join(',')+'...'}}
                                    </td>

                                    <td>
                                        <Button type="primary" size="small" class="edit-btn"
                                                @click="go2taskDetail(task.proTaskId)">查看详情
                                        </Button>
                                        <Button type="error" size="small" @click='deleteTask(task.proTaskId)'>
                                            删除
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
        <template class="modal">
            <Modal v-model="showDelete" width="300">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>确认删除任务吗？</p>
                </div>
                <div slot="footer" style="text-align: center">
                    <Button type="primary" size="large" @click="cancel">
                        取消
                    </Button>
                    <Button type="error" size="large" :loading="modal_loading" @click="doDelete">
                        删除
                    </Button>
                </div>
            </Modal>
        </template>
    </div>
</template>

<script>
  import { util } from 'util'
  import moment from 'moment'
  import _ from 'lodash'

  export default {
    name: 'taskList',
    data () {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        taskList: [],
        formItem: {
          taskName: '',
          qrmDtteamName: '',
          taskStart: '',
          taskEnd: '',
          start: '',
          limit: '',
        },
        showDelete: false,
        modal_loading: false,
        delteTaskId: '',
      }
    },
    mounted: function () {
      // 恢复去详情页之前的页数
      this.page = Number(sessionStorage.getItem('taskPage')) || 1
      sessionStorage.removeItem('taskPage')
      sessionStorage.removeItem('billPage')
      this.getTaskList()
    },
    watch: {
      page: function (val) {
        this.getTaskList()
      }
    },
    methods: {
      getTaskList () {
        this.http.post('tcprom/taskManage/getTaskListByMap', {
          taskName: this.formItem.taskName,
          qrmDtteamName: this.formItem.qrmDtteamName,
          startDtStart: this.formItem.taskStart[0] && moment(this.formItem.taskStart[0]).format('YYYY-MM-DD HH:mm:ss'),
          startDtEnd: this.formItem.taskStart[1] && moment(this.formItem.taskStart[1]).format('YYYY-MM-DD HH:mm:ss'),
          endDtStart: this.formItem.taskEnd[0] && moment(this.formItem.taskEnd[0]).format('YYYY-MM-DD HH:mm:ss'),
          endDtEnd: this.formItem.taskEnd[1] && moment(this.formItem.taskEnd[1]).format('YYYY-MM-DD HH:mm:ss'),
          start: (this.page - 1) * this.pageSize,
          limit: this.pageSize,
        }).then((data) => {
          this.taskList = data.resultData
          this.taskList.forEach((val, index) => {
            this.taskList[index].qrmDtteamNames = this.taskList[index].qrmDtteamNames.split(',')
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
      deleteTask (proTaskId) {
        this.showDelete = true
        this.delteTaskId = proTaskId
      },
      doDelete () {
        this.modal_loading = true
        this.http.post('tcprom/taskManage/delTaskById', {
          proTaskId: this.delteTaskId
        }).then((data) => {
          this.$Message.success('删除成功！')
          this.getTaskList()
          this.showDelete = false
          this.modal_loading = false
        })
      },
      cancel () {
        this.showDelete = false
        this.modal_loading = false
      },
      go2addTask () {
        util.goto(this, 'manageTask/addTask')
      },
      go2taskDetail (proTaskId) {
        // 将页码存放在session
        sessionStorage.setItem('taskPage', this.page)
        this.$router.push({
          path: '/manageTask/taskDetail',
          query: {
            proTaskId: proTaskId
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