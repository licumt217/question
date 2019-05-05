<template>
    <div class="taskList">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                新建推广任务
            </p>
            <Form :model="formItem" :rules="ruleValidate" :label-width="100" ref="formCustom">
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="任务名称" prop="taskName">
                            <Input :maxlength="15" v-model.trim="formItem.taskName" placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="推广团队" prop="dtteamName">
                            <Row>
                                <Col span="18">
                                    <Input v-model="formItem.dtteamName" placeholder="请输入"
                                           type="textarea" :autosize="true" :readonly="true">
                                    </Input>
                                </Col>
                                <Col span="6">
                                    <Button icon="android-checkbox-outline" @click="addTeam" style="width: 100%;">
                                        添加团队
                                    </Button>
                                </Col>
                            </Row>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="推广车场" prop="dtParkName">
                            <Row>
                                <Col span="18">
                                    <Input v-model="formItem.dtParkName" placeholder="请输入"
                                           type="textarea" :autosize="true" :readonly="true">
                                    </Input>
                                </Col>
                                <Col span="6">
                                    <Button icon="android-checkbox-outline"
                                            @click="addPark" style="width: 100%;">
                                        添加车场
                                    </Button>
                                </Col>
                            </Row>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="任务生效时间" prop="taskStart">
                            <DatePicker type="datetime" v-model="formItem.taskStart" placeholder="开始时间"
                                        style="width: 100%" :editable="false"></DatePicker>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item prop="taskEnd">
                            <DatePicker type="datetime" v-model="formItem.taskEnd" placeholder="结束时间"
                                        style="width: 100%" :editable="false"></DatePicker>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="业绩算法" prop="algorithm">
                            <Select v-model="formItem.algorithm" style="width:100%">
                                <Option v-for="item in performanceAl" :value="item.key" :key="item.key">
                                    {{item.value }}
                                </Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="8">
                        <Form-item label="备注" prop="remark">
                            <Input v-model.trim="formItem.remark" type="textarea"
                                   :autosize="{minRows: 2,maxRows: 5}" :maxlength="500"></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row type="flex" justify="center" class="formItemRow" align="middle">
                    <Col span="4" push="2">
                        <Button type="primary" @click="addTask">新建任务</Button>
                    </Col>
                    <Col span="4" push="2">
                        <Button type="warning" @click="go2TaskList">取消</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Modal :width="600" v-model="showAddTeam" title="添加团队" @on-ok="chooseTeamOk" @on-cancel="chooseTeamCancel">
            <Row type="flex" justify="center" style="margin-bottom: 5px">
                <Col span="16">
                    <Input :maxlength="20" v-model="teamName" placeholder="请输入团队名称"></Input>
                </Col>
                <Col span="4" style="text-align:right">
                    <Button type="success" icon="ios-search" @click="queryTeam">查询</Button>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span="22">
                    <div class="nodata nouser" v-show="teamList.length<=0 || !teamList">暂无数据</div>
                    <table class="user" v-show="teamList.length>0" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>选择</td>
                            <td>名称</td>
                            <td>当前负责人</td>
                        </tr>
                        <tr v-for="(team,index) in teamList" :key="index">
                            <td class="checkbox">
                                <Checkbox v-model="selectedTeam[team.qrmDtteamId]"></Checkbox>
                            </td>
                            <td>{{team.dtteamName}}</td>
                            <td>{{team.qrmDtuserName}}</td>
                        </tr>
                    </table>
                </Col>
            </Row>
            <Row type="flex" justify="center" style="margin-top:20px;">
                <Col>
                    <Page :current.sync="teamPage" :total="teamTotal" size="small" show-elevator show-total
                          :pageSize='pageSize' v-if="teamTotal > pageSize"></Page>
                </Col>
            </Row>
        </Modal>
        <Modal :width="600" v-model="showAddPark" title="添加车场" @on-ok="chooseParkOk" @on-cancel="chooseParkCancel">
            <Row type="flex" justify="center" style="margin-bottom: 5px">
                <Col span="16">
                    <Input :maxlength="20" v-model="parkName" placeholder="请输入车场名称"></Input>
                </Col>
                <Col span="4" style="text-align:right">
                    <Button type="success" icon="ios-search" @click="queryPark">查询</Button>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col span="22">
                    <div class="nodata nouser" v-show="parkList.length<=0 || !parkList">暂无数据</div>
                    <table class="user" v-show="parkList.length>0" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>选择</td>
                            <td>名称</td>
                        </tr>
                        <tr v-for="(park,index) in parkList">
                            <td class="checkbox">
                                <Checkbox v-model="selectedPark[park.pmParkId]"></Checkbox>
                            </td>
                            <td>{{park.parkName}}</td>
                        </tr>
                    </table>
                </Col>
            </Row>
            <Row type="flex" justify="center" style="margin-top:20px;">
                <Col>
                    <Page :current.sync="parkPage" :total="parkTotal" size="small" show-elevator show-total
                          :pageSize='pageSize' v-if="parkTotal > pageSize"></Page>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<script>
  import { util } from 'util'
  import _ from 'lodash'
  import moment from 'moment'
  import emojiRejex from 'emoji-regex'

  export default {
    name: 'addTask',
    data () {
      const noneEmoji = (rule, value, callback) => {
        const regex = emojiRejex()
        if (regex.test(value)) {
          callback(new Error('不能输入表情'))
        } else {
          callback()
        }
      }
      return {
        parkName: '',
        teamName: '',
        showAddTeam: false,
        showAddPark: false,
        prevSelectedTeam: {},
        prevSelectedTeamsObj: [],
        selectedTeam: {},
        selectedTeamsObj: [],
        prevSelectedPark: {},
        prevSelectedParksObj: [],
        selectedPark: {},
        selectedParksObj: [],
        teamPage: 1,
        parkPage: 1,
        pageSize: 10,
        teamTotal: 0,
        parkTotal: 0,
        teamList: [],
        parkList: [],
        performanceAl: [],
        ruleValidate: {
          taskName: [
            { required: true, message: '任务名称不能为空', },
            { validator: noneEmoji }
          ],
          dtteamName: [
            { required: true, message: '推广团队不能为空', }
          ],
          dtParkName: [
            { required: true, message: '推广车场不能为空', }
          ],
          taskStart: [
            { required: true, message: '任务开始时间不能为空', type: 'date' }
          ],
          taskEnd: [
            { required: true, message: '任务结束时间不能为空', type: 'date' }
          ],
          algorithm: [
            { required: true, message: '业绩算法不能为空', }
          ],
          remark: [
            { validator: noneEmoji }
          ],
        },
        formItem: {
          taskName: '',
          dtteamName: '',
          dtParkName: '',
          taskStart: '',
          taskEnd: '',
          algorithm: '',
          remark: '',
        },
      }
    },
    mounted: function () {
      this.getTeamList()
      this.getParkList()
      this.getAlgorithm()
    },
    watch: {
      selectedTeam: {
        handler: function (val, oldVal) {
          for (let key in val) {
            if (val[key]) {
              const team = _.find(this.teamList, { 'qrmDtteamId': key })
              if (team) {
                if (!_.find(this.selectedTeamsObj, team))
                  this.selectedTeamsObj.push(team)
              }
            } else {
              _.remove(this.selectedTeamsObj, function (n) {
                return n.qrmDtteamId === key
              })
            }
          }
        },
        deep: true
      },
      selectedPark: {
        handler: function (val, oldVal) {
          for (let key in val) {
            if (val[key]) {
              const park = _.find(this.parkList, { 'pmParkId': key })
              if (park) {
                if (!_.find(this.selectedParksObj, park))
                  this.selectedParksObj.push(park)
              }
            } else {
              _.remove(this.selectedParksObj, function (n) {
                return n.pmParkId === key
              })
            }
          }
        },
        deep: true
      },
      teamPage () {
        this.getTeamList()
      },
      parkPage () {
        this.getParkList()
      }
    },
    methods: {
      queryTeam () {
        this.teamPage = 1
        this.getTeamList(this.teamName)
      },
      queryPark () {
        this.parkPage = 1
        this.getParkList(this.parkName)
      },
      getTeamList (teamName) {
        this.http.post('tcprom/common/getTeamList', {
          enableStatus: '0',
          dtteamName: this.teamName,
          start: (this.teamPage - 1) * this.pageSize,
          limit: this.pageSize
        }).then((data) => {
          this.teamList = data.resultData
          this.teamTotal = Number(data.totalCount)
        })
      },
      getParkList (parkName) {
        this.http.post('tcprom/common/gePmParkList', {
          start: (this.parkPage - 1) * this.pageSize,
          limit: this.pageSize,
          parkName: parkName
        }).then((data) => {
          this.parkList = data.resultData
          this.parkTotal = Number(data.totalCount)
        })
      },
      getAlgorithm () {
        this.http.post('tcprom/common/getEnumList', {
          type: '3'
        }).then((data) => {
          this.performanceAl = data.resultData
        })
      },
      go2TaskList () {
        this.$router.push({ path: '/manageTask' })
      },
      addTeam () {
        this.prevSelectedTeam = JSON.parse(JSON.stringify(this.selectedTeam))
        this.prevSelectedTeamsObj = JSON.parse(JSON.stringify(this.selectedTeamsObj))
        this.showAddTeam = true
        this.teamName = ''
      },
      addPark () {
        this.prevSelectedPark = JSON.parse(JSON.stringify(this.selectedPark))
        this.prevSelectedParksObj = JSON.parse(JSON.stringify(this.selectedParksObj))
        this.showAddPark = true
        this.parkName = ''
      },
      addTask () {
        this.$refs['formCustom'].validate((valid) => {
          const qrmDtteamIds = []
          const pmParkIds = []
          this.selectedTeamsObj.forEach(value => {
            qrmDtteamIds.push(value.qrmDtteamId)
          })
          this.selectedParksObj.forEach(value => {
            pmParkIds.push(value.pmParkId)
          })
          if (valid) {
            this.http.post('tcprom/taskManage/addTask', {
              taskName: this.formItem.taskName,
              qrmDtteamIds: qrmDtteamIds.join(','),
              pmParkIds: pmParkIds.join(','),
              startDt: this.formItem.taskStart && moment(this.formItem.taskStart).format('YYYY-MM-DD HH:mm:ss'),
              endDt: this.formItem.taskEnd && moment(this.formItem.taskEnd).format('YYYY-MM-DD HH:mm:ss'),
              ruleType: this.formItem.algorithm,
              remark: this.formItem.remark,
            }).then((data) => {
              this.$Message.success({
                content: '任务添加成功',
                duration: 0.5,
                onClose: () => {
                  this.go2TaskList()
                }
              })
            })
          } else {
            // this.$Message.error('表单不完整')
          }
        })
      },
      chooseTeamOk () {
        const selectTeamsName = []
        this.selectedTeamsObj.forEach((val) => {
          selectTeamsName.push(val.dtteamName)
        })
        this.formItem.dtteamName = selectTeamsName.join('、')
      },
      chooseTeamCancel () {
        this.selectedTeam = JSON.parse(JSON.stringify(this.prevSelectedTeam))
        this.selectedTeamsObj = JSON.parse(JSON.stringify(this.prevSelectedTeamsObj))
        const selectTeamName = []
        this.selectedTeamsObj.forEach((val) => {
          selectTeamName.push(val.dtteamName)
        })
        this.formItem.dtteamName = selectTeamName.join('、')
      },
      chooseParkOk () {
        const selectParksName = []
        this.selectedParksObj.forEach((val) => {
          selectParksName.push(val.parkName)
        })
        this.formItem.dtParkName = selectParksName.join('、')
      },
      chooseParkCancel () {
        this.selectedPark = JSON.parse(JSON.stringify(this.prevSelectedPark))
        this.selectedParksObj = JSON.parse(JSON.stringify(this.prevSelectedParksObj))
        const selectParksName = []
        this.selectedParksObj.forEach((val) => {
          selectParksName.push(val.parkName)
        })
        this.formItem.dtParkName = selectParksName.join('、')
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