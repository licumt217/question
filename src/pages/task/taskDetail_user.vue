<template>
    <div class="taskList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                推广任务详情
            </p>
            <Form :label-width="100">
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="任务名称">
                            <Input :maxlength="20" v-model="taskDetail.taskName" placeholder="请输入" readonly></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="推广团队">
                            <Input type="textarea" :autosize="true" :maxlength="20" v-model="taskDetail.qrmDtteamNames"
                                   placeholder="请输入" readonly>
                            </Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="推广车场">
                            <Input type="textarea" :autosize="true" :maxlength="20" v-model="taskDetail.parkNames"
                                   placeholder="请输入" readonly>
                            </Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="任务生效时间">
                            <DatePicker type="datetime" v-model="taskDetail.startDt" placeholder="开始时间"
                                        style="width: 100%" readonly></DatePicker>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item>
                            <DatePicker type="datetime" v-model="taskDetail.endDt" placeholder="结束时间"
                                        style="width: 100%" readonly></DatePicker>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="业绩算法">
                            <Input :maxlength="20" v-model="taskDetail.ruleName"
                                   placeholder="请输入" readonly>
                            </Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="备注">
                            <Input v-model="taskDetail.remark" type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}" readonly></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="4" push="2" v-show="$route.query.proTeamReceiveId">
                        <Button type="success" size="large" @click="receiveTask">接受任务</Button>
                    </Col>
                    <Col span="4">
                        <Button type="primary" size="large" @click="go2TaskList">返回列表</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
        <template class="modal">
            <Modal v-model="showReceiveModal" width="300">
                <p slot="header" style="color:#2d8cf0;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>确认</span>
                </p>
                <div style="text-align:center">
                    <p>确认接受任务吗？</p>
                </div>
                <div slot="footer" style="text-align: center">
                    <Button type="primary" size="large" :loading="modal_loading" @click="cancel">
                        取消
                    </Button>
                    <Button type="success" size="large" :loading="modal_loading" @click="doReceiveTask">
                        接受
                    </Button>
                </div>
            </Modal>
        </template>
    </div>
</template>

<script>
  import { util } from 'util'

  export default {
    name: 'TaskDetailUser',
    data () {
      return {
        showReceiveModal: false,
        modal_loading: false,
        taskDetail: {}
      }
    },
    mounted: function () {
      this.getTaskDetail()
    },
    methods: {
      receiveTask () {
        this.showReceiveModal = true
      },
      cancel () {
        this.showReceiveModal = false
      },
      doReceiveTask () {
        this.modal_loading = true
        this.http.post('tcprom/taskManage/receiveTask', {
          proTeamReceiveId: this.$route.query.proTeamReceiveId
        }).then((data) => {
          this.showReceiveModal = false
          this.$Message.success({
            content: '任务接受成功',
            duration: 0.5,
            onClose: () => {
              this.showReceiveModal = false
              this.modal_loading = false
              this.go2TaskList()
            }
          })
        })
      },
      getTaskDetail () {
        this.http.post('tcprom/taskManage/getTaskById', {
          proTaskId: this.$route.query.proTaskId,
        }).then((data) => {
          this.taskDetail = data
        })
      },
      go2TaskList () {
        this.$router.push({ path: '/manageTask' })
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