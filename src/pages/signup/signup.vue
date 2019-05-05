<template>
    <div class="signup-wrap">
        <transition name="slideT">
            <div class="mainContent">
                <Row type="flex" justify="space-around" align="middle">
                    <Col span="8">
                        <Card>
                            <p slot="title">
                                <Icon type="ios-personadd"></Icon>
                                注册
                            </p>
                            <p slot="extra">
                                <Icon type="close" @click="returnToLogin" style="cursor: pointer"></Icon>
                            </p>
                            <Form :label-width="120" :model="formValue" :rules="ruleValidate" ref="Form">
                                <Form-item label="手机号：" prop="phone">
                                    <Input v-model.trim="formValue.phone" placeholder="请输入手机号"
                                           :maxlength="11" :disabled="isDisabledPhone"></Input>
                                </Form-item>
                                <Form-item label="验证码：" prop="phoneCode">
                                    <Input type="text" v-model.trim="formValue.phoneCode" placeholder="请输入验证码"
                                           :maxlength="4">
                                        <Button slot="append" @click="handleYzm" :disabled="isDisabledYzm">
                                            {{yzmBtnText}}
                                        </Button>
                                    </Input>
                                </Form-item>
                                <Form-item label="用户姓名：" prop="name">
                                    <Input v-model.trim="formValue.name" :rows="4" placeholder="输入您的姓名"></Input>
                                </Form-item>
                                <Form-item label="开户行名称：" prop="bankName">
                                    <Input v-model.trim="formValue.bankName" :rows="4" placeholder="输入您的开户行名称"></Input>
                                </Form-item>
                                <Form-item label="开户银行：" prop="bankAccount">
                                    <Input v-model.trim="formValue.bankAccount" :rows="4"
                                           placeholder="输入您的收款银行，例如：招商银行"></Input>
                                </Form-item>
                                <Form-item label="收款账号：" prop="account">
                                    <Input v-model.trim="formValue.account" :rows="4"
                                           placeholder="输入您的收款银行账号"></Input>
                                </Form-item>
                                <Form-item label="公司名称：" prop="companyName">
                                    <Input v-model.trim="formValue.companyName" :rows="4" placeholder="输入您的公司名称"></Input>
                                </Form-item>
                                <Form-item label="地区：" prop="provinceCode">
                                    <Select v-model="formValue.provinceCode" placeholder="省"
                                            @on-change="getCitys" :filterable="true" :clearable="true" ref="province">
                                        <Option v-for="item in provinces"
                                                :value="item.regionCode"
                                                :key="item.regionCode">{{item.regionName}}</Option>
                                    </Select>
                                </Form-item>
                                <Form-item prop="cityCode">
                                    <Select v-model="formValue.cityCode" placeholder="市"
                                            @on-change="getDistricts" :filterable="true" :clearable="true" ref="city">
                                        <Option v-for="item in citys"
                                                :value="item.regionCode"
                                                :key="item.regionCode">{{item.regionName}}</Option>
                                    </Select>
                                </Form-item>
                                <Form-item prop="countyCode">
                                    <Select v-model="formValue.countyCode" placeholder="区" :filterable="true"
                                            :clearable="true" ref="county">
                                        <Option v-for="item in districts"
                                                :value="item.regionCode"
                                                :key="item.regionCode">{{item.regionName}}</Option>
                                    </Select>
                                </Form-item>
                                <Form-item label="营业执照号：">
                                    <Input v-model.trim="formValue.businessLicenseNo" :rows="4"
                                           placeholder="输入您公司的营业执照号"></Input>
                                </Form-item>
                                <Form-item label="开户许可证号：">
                                    <Input v-model.trim="formValue.accountLicenseNo" :rows="4"
                                           placeholder="输入您公司的开户许可证号"></Input>
                                </Form-item>
                                <Form-item>
                                    <Checkbox v-model="formValue.isAgree" true-value="0" false-value="1">我同意 《停简单推广协议》
                                    </Checkbox>
                                </Form-item>
                                <Row type="flex" justify="space-around">
                                    <Col span="5">
                                        <Button long type="primary" @click="addDtteam">注册</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </transition>
    </div>
</template>

<script>
  import { util } from 'util'
  import http from '../../http/axios'

  export default {
    name: 'signup',
    data: () => {
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else {
          if (!util.validates.isValidPhone(value)) {
            callback(new Error('手机号格式错误'))
          } else {
            http.post('tcprom/accountManage/checkPhone', {
              phone: '' + value
            }).then((data) => {
              if (data.isUse === 'true') {
                callback(new Error('手机号已经存在'))
              } else {
                callback()
              }
            })
          }
        }
      }
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
      const validateRegion = (rule, value, callback) => {
        console.log(value)
      }
      return {
        isDisabledYzm: false,
        isDisabledPhone: false,
        yzmBtnText: '获取验证码',
        wait: 60,
        formValue: {
          phone: '',
          phoneCode: '',
          name: '',
          bankName: '',
          bankAccount: '',
          account: '',
          companyName: '',
          provinceCode: '',
          cityCode: '',
          countyCode: '',
          businessLicenseNo: '',
          accountLicenseNo: '',
          isAgree: '0'
        },
        provinces: [],
        citys: [],
        districts: [],
        ruleValidate: {
          phone: [
            { validator: validatePhone, trigger: 'blur', required: true }
          ],
          phoneCode: [
            { required: true, message: '请填写验证码', trigger: 'blur' },
            { type: 'string', min: 4, message: '验证码长度不能小于4位', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '姓名不能为空', type: 'string', }
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
          provinceCode: [
            { required: true, message: '省份不能为空', trigger: 'blur' }
          ],
          cityCode: [
            { required: true, message: '市不能为空', trigger: 'blur' }
          ],
          countyCode: [
            { required: true, message: '区不能为空', trigger: 'blur' }
          ],
        },
      }
    },
    mounted: function () {
      this.getProvinces()
    },
    methods: {
      returnToLogin () {
        util.goto(this, 'login')
      },
      handleYzm () {
        this.$refs.Form.validateField('phone', (valid) => {
          if (!valid) {
            this.http.post('tcprom/login/getPhoneCode', {
              phone: '' + this.formValue.phone
            }).then((data) => {
              this.$Message.success(data.msg)
              this.isDisabledYzm = true
              this.isDisabledPhone = true
              this.time()
            })
          }
        })
      },
      time () {
        let _this = this
        if (this.wait === 0) {
          this.yzmBtnText = '获取验证码'
          this.wait = 60
          this.isDisabledYzm = false
          this.isDisabledPhone = false
        } else {
          if (util.isEmpty(this.wait)) {
            this.wait = 60
          }
          this.yzmBtnText = this.wait + '秒'
          this.wait--
          setTimeout(function () {
            _this.time()
          }, 1000)
        }
      },
      addDtteam () {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            if (this.formValue.isAgree === '1') {
              this.$Message.warning('请阅读并勾选《停简单推广协议》')
            } else {
              this.http.post('tcprom/accountManage/addUserAndTeam', this.formValue).then((data) => {
                if (data.isSuccess === '0') {
                  this.$Message.success('注册成功')
                  setTimeout(() => {
                    util.goto(this, 'login')
                  }, 2000)
                }
              })
            }
          }
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
        if (this.formValue.provinceCode) {
          this.http.post('tcprom/common/getRegionList', {
            regionCode: this.formValue.provinceCode,
          }).then((data) => {
            this.citys = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
          })
        }
      },
      getDistricts () {
        this.$refs.county.clearSingleSelect()
        this.districts = []
        if (this.formValue.cityCode) {
          this.http.post('tcprom/common/getRegionList', {
            regionCode: this.formValue.cityCode,
          }).then((data) => {
            this.districts = data.resultData.sort((a, b) => a.regionName.localeCompare(b.regionName, 'zh-Hans-CN', { sensitivity: 'accent' }))
          })
        }
      },
    }
  }
</script>

<style scoped lang="less">
    .signup-wrap {
        position: relative;
        width: 100%;
        min-width: 1366px;
        min-height: 100vh;
        background: url("../../assets/images/bg-image.jpg");
        background-size: 100% 100%;
        padding-top: 30px;
    }

    .slideT-enter-active, .slideT-leave-active {
        transition: all .6s ease-out;
    }

    .slideT-enter {
        opacity: 0;
        transform: translateY(-30px);
    }

</style>