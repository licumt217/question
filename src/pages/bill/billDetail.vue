<template>
    <div class="billDetail">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                结算单详情
            </p>
            <Form :label-width="120" :model="billDetail" :rules="ruleValidate" ref="Form">
                <Row type="flex" justify="space-around">
                    <Col span="12">
                        <Card>
                            <p slot="title">基础信息</p>
                            <Row>
                                <Col span="24">
                                    <Form-item label="结算周期：">
                                        <p>{{settlePeriod}}</p>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="结算金额：">
                                        <p>{{billDetail.amount||0}}元</p>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="实际结算金额：">
                                        <p>{{billDetail.realAmount||0}}元</p>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="结算税款：">
                                        <p>{{billDetail.amountTax||0}}元</p>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="实际结算税款：">
                                        <p>{{billDetail.realAmountTax||0}}元</p>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="结算算法：">
                                        <p>{{billDetail.ruleName}}</p>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="结算团队：">
                                        <p>{{billDetail.qrmDtteamName}}</p>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <Form-item label="结算单备注：" v-if="billDetail.state==='0'">
                                        <Input v-model="billDetail.remark" type="textarea" :rows="4"
                                               placeholder="备注信息" :maxlength="500"></Input>
                                    </Form-item>
                                    <Form-item label="结算单备注：" v-else>
                                        <Input v-model="billDetail.remark" type="textarea" :rows="4"
                                               placeholder="备注信息" disabled></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Card>
                        <Card v-if="billDetail.state==='2'||billDetail.state==='3'||billDetail.state==='4'||billDetail.state==='5'">
                            <p slot="title">接受人信息</p>
                            <Row>
                                <Col span="12">
                                    <Form-item label="接受人：">
                                        <p>{{billDetail.receiveUserName}}</p>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="接受时间：">
                                        <p>{{billDetail.receiveDt}}</p>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Card>
                        <Card v-if="billDetail.state==='3'||billDetail.state==='4'||billDetail.state==='5'">
                            <p slot="title">发票信息</p>
                            <Row>
                                <Col span="12">
                                    <Form-item label="上传发票：">
                                        <div v-show="billDetail.invoiceFileAddress">
                                            <a href="javascript:">
                                                {{billDetail.invoiceFileAddress.split('/')[billDetail.invoiceFileAddress.split('/').length-1]}}
                                            </a>
                                            <Button type="ghost" style="margin-left: 5px" size="small"
                                                    @click="preview(billDetail.invoiceFileAddress)">预览
                                            </Button>
                                        </div>
                                        <upload v-show="!billDetail.invoiceFileAddress"
                                                ref="upload"
                                                :format="['jpg','jpeg','png']"
                                                :before-upload="handleUpload"
                                                :max-size="2048"
                                                type="select"
                                                :action="ossUrl">
                                            <Button type="primary" size="small">上传发票</Button>
                                        </upload>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="邮寄地址：">
                                        <p>{{billDetail.invoiceSendAddress}}</p>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <Form-item label="开票人：">
                                        <p>{{billDetail.uploadUserName}}</p>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24">
                                    <Form-item>
                                        <p style="font-size: 12px">提示：停简单开票信息为【北京停简单信息技术有限公司 28747364364634737473】</p>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row v-if="billDetail.state==='4'">
                                <Col span="24">
                                    <Form-item label="驳回原因：">
                                        <Input v-model="billDetail.denyRemark" type="textarea" disabled></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Card>
                        <Card v-if="billDetail.state==='3'||billDetail.state==='5'">
                            <p slot="title">打款信息</p>
                            <Row>
                                <Col span="12">
                                    <Form-item label="打款账号：">
                                        <p>{{billDetail.account}}</p>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="打款银行：">
                                        <p>{{billDetail.bankAccount}}</p>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <!--此处v-if判断是为了需要上传打款记录的表单label前显示星号必填标识-->
                                    <Form-item label="上传打款记录：" prop="payFileAddress" v-if="billDetail.state==='3'">
                                        <div v-show="billDetail.payFileAddress">
                                            <a href="javascript:">
                                                {{billDetail.payFileAddress.split('/')[billDetail.payFileAddress.split('/').length-1]}}
                                            </a>
                                            <Button type="ghost" style="margin-left: 5px" size="small"
                                                    @click="preview(billDetail.payFileAddress)">预览
                                            </Button>
                                        </div>
                                        <upload v-show="billDetail.state!=='5'"
                                                ref="upload"
                                                :format="['jpg','jpeg','png']"
                                                :before-upload="handleUpload"
                                                :max-size="2048"
                                                type="select"
                                                :action="ossUrl">
                                            <Button size="small">选择打款记录</Button>
                                        </upload>
                                    </Form-item>
                                    <Form-item label="上传打款记录：" v-else>
                                        <div v-show="billDetail.payFileAddress">
                                            <a href="javascript:">
                                                {{billDetail.payFileAddress.split('/')[billDetail.payFileAddress.split('/').length-1]}}
                                            </a>
                                            <Button type="ghost" style="margin-left: 5px" size="small"
                                                    @click="preview(billDetail.payFileAddress)">预览
                                            </Button>
                                        </div>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="打款人：">
                                        <p>{{$store.state.userName}}</p>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Card>
                        <Row v-if="billDetail.state==='0'"
                             type="flex"
                             justify="center"
                             class="formItemRow"
                             align="middle"
                             style="margin-top: 20px">
                            <Col span="8" push="2">
                                <Button style="width: 100px" type="primary">发送结算单</Button>
                            </Col>
                            <Col span="8">
                                <Button style="width:100px" type="primary" @click="go2BillList">返回</Button>
                            </Col>
                        </Row>
                        <Row v-if="billDetail.state==='1'||billDetail.state==='2'||billDetail.state==='4'||billDetail.state==='5'"
                             type="flex"
                             justify="center"
                             class="formItemRow"
                             align="middle"
                             style="margin-top: 20px">
                            <Col>
                                <Button style="width:100px" type="primary" @click="go2BillList">返回</Button>
                            </Col>
                        </Row>
                        <Row v-if="billDetail.state==='3'"
                             type="flex"
                             justify="center"
                             class="formItemRow"
                             align="middle"
                             style="margin-top: 20px">
                            <Col pull="2">
                                <Button style="width:100px" type="success" @click="doPay">确认打款</Button>
                            </Col>
                            <Col pull="1">
                                <Button style="width:100px" type="primary" @click="go2BillList">取消</Button>
                            </Col>
                            <Col>
                                <Button style="width:100px" type="error" @click="reject">驳回</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Card>
        <Modal v-model="visible">
            <div slot="footer">
            </div>
            <img :src="previewUrl" v-if="visible" style="width: 100%">
        </Modal>
        <Modal title="驳回原因" v-model="rejectModal">
            <div slot="footer">
                <Button @click="closeRejectModal" type="info">取消</Button>
                <Button @click="doReject" type="info">驳回</Button>
            </div>
            <Input v-model.trim="rejectReason" type="textarea" :rows="4"
                   placeholder="请输入驳回原因" :maxlength="200"></Input>
        </Modal>
    </div>
</template>

<script>
  import { util } from 'util'
  import emojiRejex from 'emoji-regex'

  export default {
    name: 'billDetail',
    data () {
      return {
        billDetail: {},
        visible: false,
        rejectModal: false,
        rejectReason: '',
        previewUrl: '',
        ossUrl: '',
        ruleValidate: {
          payFileAddress: {
            required: true
          }
        }
      }
    },
    mounted: function () {
      this.getBillDetail()
      this.ossUrl = util.constants.ossUrl
    },
    computed: {
      settlePeriod () {
        return `${this.billDetail.settlementYear || ''}年${this.billDetail.settlementMonth || ''}月`
      },
    },
    methods: {
      handleUpload (file) {
        if (file.type.indexOf('image') !== -1) {
          const param = new FormData()
          param.append('file', file)
          param.append('businessType', 'prom')
          param.append('customName', file.name)
          this.http.post('filedepot/ossObject/uploadToOSSWeb/prom', param).then((response) => {
            this.billDetail.payFileAddress = response.fileVisitPath
            this.previewUrl = response.fileVisitPath
            // this.$Message.success('上传成功')
          }, (error) => {
            // this.$Message.error(error)
          })
        } else {
          this.$Message.error('文件格式错误')
        }
        return false
      },
      preview (url) {
        this.previewUrl = url
        this.visible = true
      },
      getBillDetail () {
        this.http.post('tcprom/settlement/getSettlementDetailsById', {
          proSettlementId: this.$route.query.proSettlementId
        }).then((data) => {
          this.billDetail = data
        })
      },
      go2BillList () {
        this.$router.push({
          path: '/billsManagement'
        })
      },
      reject () {
        this.rejectModal = true
      },
      doReject () {
        if (!this.rejectReason) {
          this.$Message.error('请输入驳回原因')
        } else if (emojiRejex().test(this.rejectReason)) {
          this.$Message.error('不能输入表情')
        } else {
          this.http.post('tcprom/settlement/deny', {
            proSettlementId: this.$route.query.proSettlementId,
            denyRemark: this.rejectReason,
          }).then((data) => {
            this.rejectModal = false
            this.$Message.success({
              content: '发票驳回成功',
              duration: 0.5,
              onClose: () => {
                this.go2BillList()
              }
            })
          })
        }
      },
      closeRejectModal () {
        this.rejectModal = false
      },
      doPay () {
        if (!this.billDetail.payFileAddress) {
          this.$Message.error('请上传打款记录')
        } else {
          this.http.post('tcprom/settlement/pay', {
            proSettlementId: this.$route.query.proSettlementId,
            payFileAddress: this.billDetail.payFileAddress
          }).then((data) => {
            this.$Message.success({
              content: '已打款',
              duration: 0.5,
              onClose: () => {
                this.go2BillList()
              }
            })
          })
        }
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
</style>