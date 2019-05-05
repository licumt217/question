<template>
    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" v-show="showMain">
                <div class="ms-title">推广管家</div>
                <div class="ms-login">
                    <Tabs v-model="type">
                        <Tab-pane label="账户登录" name="account" icon="android-person">
                            <Form :model="ruleForm" :rules="rules" ref="Form" :label-width="0" class="demo-ruleForm">
                                <Form-item prop="username">
                                    <Input v-model="ruleForm.username" @keyup.enter.native="submit" :maxlength="20"
                                           placeholder="请输入用户名"></Input>
                                </Form-item>
                                <Form-item prop="password">
                                    <Input type="password" placeholder="请输入密码" v-model="ruleForm.password"
                                           :maxlength="20" @keyup.enter.native="submit"></Input>
                                </Form-item>
                            </Form>
                        </Tab-pane>
                        <Tab-pane v-show="type == 'phone'" label="手机号登录" name="phone" icon="android-phone-portrait">
                            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                                <Form-item prop="phone">
                                    <Input type="text" v-model="formInline.phone" :disabled="isDisabledPhone"
                                           :maxlength="11" placeholder="请输入手机号" @keyup.enter.native="submit"></Input>
                                </Form-item>
                                <Form-item prop="phoneCode">
                                    <Row>
                                        <Col span="14">
                                            <Input type="text" v-model="formInline.phoneCode" :maxlength="6"
                                                   placeholder="请输入验证码" @keyup.enter.native="submit"></Input>
                                        </Col>
                                        <Col span="8" offset="2">
                                            <Button type="ghost" long :disabled='isDisabledYzm' @click="handleYzm">
                                                {{yzmBtnText}}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form-item>
                                <!--<div class="login-btn">
                                    <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                                </div>-->
                            </Form>
                        </Tab-pane>
                    </Tabs>
                    <div class="login-btn">
                        <Button type="primary" @click="submit">登录</Button>
                    </div>
                    <div class="signup-btn">
                        <a href="javascript:" @click="go2Signup">注册</a>
                    </div>
                    <Spin size="large" fix v-if="spinShow"></Spin>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
  import { util } from 'util'

  export default {
    name: 'login',
    data: function () {
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else {
          if (!util.validates.isValidPhone(value)) {
            callback(new Error('手机号格式错误'))
          } else {
            callback()
          }
        }
      }
      return {
        type: 'account',
        ruleForm: {
          username: '',
          password: ''
        },
        formInline: {
          phone: '',
          phoneCode: ''
        },
        isDisabledYzm: false,
        isDisabledPhone: false,
        wait: 60,
        yzmBtnText: '获取验证码',
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { type: 'string', min: 3, message: '用户名长度不能小于3位', trigger: 'blur' },
            { type: 'string', max: 20, message: '用户名长度最长为20位', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        },
        ruleInline: {
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          phoneCode: [
            { required: true, message: '请填写验证码', trigger: 'blur' },
            { type: 'string', min: 4, message: '验证码长度不能小于4位', trigger: 'blur' }
          ]
        },
        showMain: false,
        spinShow: false
      }
    },
    mounted: function () {
      setTimeout(() => {
        this.showMain = true
      }, 300)
    },
    methods: {
      go2Signup () {
        util.goto(this, 'signup')
      },
      submit () {
        if (this.type == 'account') {
          this.submitForm()
        } else if (this.type == 'phone') {
          this.handleSubmit()
        }
      },
      submitForm () {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.login()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      login () {
        this.spinShow = true
        this.http.post('tcprom/login/loginpost', {
          userName: this.ruleForm.username,
          passWord: this.ruleForm.password
        }).then((data) => {
          this.spinShow = false
          // console.log(data);
          if (data.isUser) {
            this.$store.commit({
              type: 'changeName',
              userName: data.name
            })
            localStorage.setItem('ms_username', data.name)
            localStorage.setItem('roleType', data.orgType)
            localStorage.setItem('isLogin', '1')
            sessionStorage.setItem('reload', true)
            this.setCookie('prom', data.prom, 7)
            this.$router.push('/account')
          } else {
            if (data.msg) {
              this.$Message.warning(data.msg)
            } else {
              this.$Message.warning('登陆错误！！！！！！！！')
            }

          }

        }, () => {
          this.spinShow = false
        })
      },
      setCookie (name, value, expireTime) {
        let exp = new Date()
        exp.setTime(exp.getTime() + expireTime * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
      },
      loginByPhone () {
        this.spinShow = true
        this.http.post('tcprom/login/loginWX', {
          phone: this.formInline.phone,
          phoneCode: this.formInline.phoneCode,
          requestType: '1'
        }).then((data) => {
          this.spinShow = false
          if (data.isUser) {
            this.$store.commit({
              type: 'changeName',
              userName: data.name
            })
            localStorage.setItem('ms_username', data.name)
            localStorage.setItem('isLogin', '1')
            localStorage.setItem('roleType', data.orgType)
            sessionStorage.setItem('reload', true)
            this.setCookie('prom', data.prom, 7)
            this.$router.push('/team')
          } else {
            this.$Message.warning(data.msg)
          }

        }, () => {
          this.spinShow = false
        })
      },
      handleSubmit () {
        this.$refs.formInline.validate((valid) => {
          if (valid) {
            this.loginByPhone()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleYzm () {
        this.$refs.formInline.validateField('phone', (value) => {
          if (value) {
            this.$Message.error('获取验证码失败')
          } else {
            this.http.post('tcprom/login/getPhoneCode', {
              phone: this.formInline.phone
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
      }
    }
  }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100vh;
        background: url("../../assets/images/bg-image.jpg");
        background-size: 100% 100%;
    }

    .mainContent {
        position: absolute;
        top: 25%;
        left: 50%;
        margin-left: -180px;
    }

    .ms-title {
        width: 100%;
        margin-bottom: 20px;
        text-align: center;
        font-size: 26px;
        color: rgba(255, 255, 255, 0.8);
        font-weight: 500;
        letter-spacing: 4px;

    }

    .ms-login {
        width: 360px;
        overflow: hidden;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
        box-sizing: border-box;
        position: relative
    }

    .login-btn {
        text-align: center;
    }

    .signup-btn {
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .slideT-enter-active, .slideT-leave-active {
        transition: all .6s ease-out;
    }

    .slideT-enter {
        opacity: 0;
        transform: translateY(-30px);
    }

</style>