<template>
    <div>
        <Card>
            <p slot="title">
                <Icon size="14" color="#2db7f5" type="ios-infinite-outline"></Icon>
                新增团队
            </p>
            <Row class='addTeamZone' type="flex" justify="center">
                <Col span="8">
                    <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleInline">
                        <Form-item label="团队名称：" prop="dtteamName">
                            <Input :maxlength="20" v-model="formItem.dtteamName" placeholder="请输入"></Input>
                        </Form-item>
                        <Form-item label="团队状态：" prop="enableStatus">
                            <Select v-model="formItem.enableStatus" placeholder="请选择">
                                <Option value="0">启用</Option>
                                <Option value="1">停用</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="开户行名称：" prop="bankName">
                            <Input v-model="formItem.bankName" :rows="4" placeholder="输入您的开户行名称"></Input>
                        </Form-item>
                        <Form-item label="开户银行：" prop="bankAccount">
                            <Input v-model="formItem.bankAccount" :rows="4"
                                   placeholder="输入您的收款银行，例如：招商银行"></Input>
                        </Form-item>
                        <Form-item label="收款账号：" prop="account">
                            <Input v-model="formItem.account" :rows="4"
                                   placeholder="输入您的收款银行账号"></Input>
                        </Form-item>
                        <Form-item label="公司名称：" prop="companyName">
                            <Input v-model="formItem.companyName" :rows="4" placeholder="输入您的公司名称"></Input>
                        </Form-item>
                        <Form-item label="团队地区：" prop="province">
                            <Select v-model="formItem.province" placeholder="省"
                                    @on-change="getCitys" :filterable="true" :clearable="true"
                                    ref="province">
                                <Option v-for="item in provinces"
                                        :value="item.regionCode"
                                        :key="item.regionCode">{{item.regionName}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item prop="city">
                            <Select v-model="formItem.city" placeholder="市"
                                    @on-change="getDistricts" :filterable="true" :clearable="true"
                                    ref="city">
                                <Option v-for="item in citys"
                                        :value="item.regionCode"
                                        :key="item.regionCode">{{item.regionName}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item prop="district">
                            <Select v-model="formItem.district" placeholder="区" :filterable="true" :clearable="true"
                                    ref="county">
                                <Option v-for="item in districts"
                                        :value="item.regionCode"
                                        :key="item.regionCode">{{item.regionName}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="营业执照号：">
                            <Input v-model="formItem.businessLicense" :rows="4"
                                   placeholder="输入您公司的营业执照号"></Input>
                        </Form-item>
                        <Form-item label="开户许可证号：">
                            <Input v-model="formItem.accountLicense" :rows="4"
                                   placeholder="输入您公司的开户许可证号"></Input>
                        </Form-item>
                        <Form-item label="备注：">
                            <Input type="textarea" v-model="formItem.remark" :rows="4"
                                   placeholder="备注信息" :maxlength="500"></Input>
                        </Form-item>
                        <Form-item>
                            <Button type="primary" @click="handleSubmit('formItem')">确认添加</Button>
                            <Button type="ghost" @click='go2teamList' style="margin-left: 8px">取消</Button>
                        </Form-item>
                    </Form>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script type="text/ecmascript-6">
  import { util } from 'util'

  export default {
    name: 'AddTeam',
    data () {
      const validateAccount = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入银行账号'))
        } else {
          if (Number.isNaN(Number(value))) {
            callback(new Error('银行账号格式错误'))
          } else {
            callback()
          }
        }
      }
      return {
        formItem: {
          dtteamName: '',
          enableStatus: '',
        },
        ruleInline: {
          dtteamName: [
            { required: true, message: '请填写团队名称', trigger: 'blur' }
          ],
          enableStatus: [
            { required: true, message: '请选择团队状态', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '开户行名称不能为空', }
          ],
          bankAccount: [
            { required: true, message: '开户银行不能为空', }
          ],
          account: [
            { validator: validateAccount, trigger: 'blur', required: true }
          ],
          companyName: [
            { required: true, message: '公司名称不能为空', }
          ],
          province: [
            { required: true, message: '省份不能为空', trigger: 'blur' }
          ],
          city: [
            { required: true, message: '市不能为空', trigger: 'blur' }
          ],
          district: [
            { required: true, message: '区不能为空', trigger: 'blur' }
          ],
        },
        provinces: [],
        citys: [],
        districts: [],
      }
    },
    mounted: function () {
      this.getProvinces()
    },
    methods: {
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
          regionCode: this.formItem.province,
        }).then((data) => {
          this.citys = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
        })
      },
      getDistricts () {
        this.$refs.county.clearSingleSelect()
        this.districts = []
        this.http.post('tcprom/common/getRegionList', {
          regionCode: this.formItem.city,
        }).then((data) => {
          this.districts = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
        })
      },
      addTeam: function () {
        this.http.post('tcprom/dtteamManage/addDtteam', {
          dtteamName: this.formItem.dtteamName,
          enableStatus: this.formItem.enableStatus,
          remark: this.formItem.remark,
          bankName: this.formItem.bankName,
          bankAccount: this.formItem.bankAccount,
          account: this.formItem.account,
          provinceCode: this.formItem.province,
          cityCode: this.formItem.city,
          countyCode: this.formItem.district,
          businessLicenseNo: this.formItem.businessLicense,
          accountLicenseNo: this.formItem.accountLicense
        }).then((data) => {
          this.$Message.success({
            content: data.msg,
            duration: 0.5,
            onClose: () => {
              this.reset()
              util.goto(this, 'team')
            }
          })
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.addTeam()
          }
        })
      },
      go2teamList: function () {
        util.goto(this, 'team')
      },
      reset () {
        this.$refs['formItem'].resetFields()
      }
    }
  }
</script>
<style lang="less">
    @import '../../assets/css/reset.less';

    .addTeamZone {
        padding: 4em 0;
    }

</style>