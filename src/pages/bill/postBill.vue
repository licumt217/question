<template>
    <div class="billDetail">
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                结算单详情
            </p>
            <Form :model="billDetail" :rules="ruleValidate" :label-width="120" ref="Form">
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
                                        <p>{{billDetail.amount}}元</p>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="实际结算金额：" prop="realAmount">
                                        <Input v-model="billDetail.realAmount" placeholder="实际结算金额">
                                            <span slot="append">元</span>
                                        </Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="结算税款：" prop="tax">
                                        <Input v-model.trim="billDetail.tax" placeholder="结算税款">
                                            <span slot="append">元</span>
                                        </Input>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="实际结算税款：" prop="realTax">
                                        <Input v-model.trim="billDetail.realTax" placeholder="实际结算税款">
                                            <span slot="append">元</span>
                                        </Input>
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
                                    <Form-item label="结算单备注：" prop="remark">
                                        <Input v-model.trim="billDetail.remark" type="textarea" :rows="4"
                                               placeholder="备注信息" :maxlength="500"></Input>
                                    </Form-item>
                                </Col>
                            </Row>

                        </Card>
                        <Row type="flex" justify="center" class="formItemRow" align="middle" style="margin-top: 20px">
                            <Col span="8" push="2">
                                <Button type="primary" size="large" @click="postBill">发送结算单</Button>
                            </Col>
                            <Col span="8" push="2">
                                <Button type="primary" size="large" @click="go2BillList">取消</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Card>
    </div>
</template>

<script>
  import { util } from 'util'
  import emojiRejex from 'emoji-regex'

  export default {
    name: 'postBill',
    data () {
      const validateNumber = (rule, value, callback) => {
        if (Number.isNaN(Number(value))) {
          callback(new Error('金额格式错误'))
        } else if (Number(value) < 0) {
          callback(new Error('金额不能为负数'))
        } else {
          callback()
        }
      }
      const noneEmoji = (rule, value, callback) => {
        const regex = emojiRejex()
        if (regex.test(value)) {
          callback(new Error('不能输入表情'))
        } else {
          callback()
        }
      }
      return {
        billDetail: {},
        ruleValidate: {
          realAmount: [
            { validator: validateNumber }
          ],
          tax: [
            { required: true, message: '请输入结算税款' },
            { validator: validateNumber }
          ],
          realTax: [
            { required: true, message: '请输入实际结算税款' },
            { validator: validateNumber }
          ],
          remark: [
            { validator: noneEmoji }
          ],
        },
      }
    },
    mounted: function () {
      this.getBillDetail()
    },
    watch: {},
    computed: {
      settlePeriod () {
        return `${this.billDetail.settlementYear || ''}年${this.billDetail.settlementMonth || ''}月`
      },
    },
    methods: {
      postBill () {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.http.post('tcprom/settlement/send', {
              proSettlementId: this.$route.query.proSettlementId,
              realAmount: this.billDetail.realAmount,
              amountTax: this.billDetail.tax,
              realAmountTax: this.billDetail.realTax,
              remark: this.billDetail.remark
            }).then((data) => {
              this.$Message.success({
                content: '结算单发送成功',
                duration: 0.5,
                onClose: () => {
                  this.go2BillList()
                }
              })
            })
          }
        })
      },
      go2BillList () {
        this.$router.push({ path: '/billsManagement' })
      },
      getBillDetail () {
        this.http.post('tcprom/settlement/getSettlementDetailsById', {
          proSettlementId: this.$route.query.proSettlementId
        }).then((data) => {
          this.billDetail = data
        })
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