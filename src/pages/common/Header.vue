<template>
    <div>
        <Row class="header" type="flex">
            <Col span="3">
                <i-button class="hamburger" :class="{'is-active':isActive}" type="text" @click="toggleClick">
                    <Icon type="navicon" size="32"></Icon>
                </i-button>
            </Col>
            <Col span="21" style="text-align:right; padding-right:30px;">
                <Button type="text" class="text">
                    <Icon size="16" type="ios-home-outline"></Icon>
                    <span style="margin-left:4px;letter-spacing:1px;">欢迎使用停简单管理系统</span>
                </Button>
                <!--<Button type="text" @click="isShowResetPasswordModal = true">
                    <Icon size="14" type="ios-unlocked-outline"></Icon>
                    <span style="margin-left:4px;letter-spacing:1px;">修改密码</span>
                </Button>
                <Button type="text" @click="logOut">
                    <Icon size="14" type="android-exit"></Icon>
                    <span style="margin-left:4px;letter-spacing:1px;">登出</span>
                </Button>-->
                <Dropdown @on-click="choice" trigger="click" style="margin-right:20px">
                    <Button size="large" type="text">
                        <Icon size="15" type="social-github"></Icon>
                        <span style="letter-spacing:1px;">{{$store.state.userName}}</span>
                        <Icon size="14" type="android-arrow-dropdown"></Icon>
                    </Button>
                    <Dropdown-menu slot="list">
                        <Dropdown-item name="editPassWrd" v-show="isShowChangePsw">
                            <Icon size="14" type="ios-unlocked-outline"></Icon>
                            <span style="margin-left:6px;letter-spacing:1px;">修改密码</span>
                        </Dropdown-item>
                        <Dropdown-item name="quit">
                            <Icon size="14" type="android-exit"></Icon>
                            <span style="margin-left:4px;letter-spacing:1px;">退出系统</span>
                        </Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
            </Col>
        </Row>
        <Modal class-name="vertical-center-modal" v-model="isShowResetPasswordModal">
            <p slot="header" style="text-align:center;letter-spacing:2px;font-weight:600;font-size:15px;">
                <span>修改密码</span>
            </p>
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <Row type="flex" justify="center">
                    <Col span="13">
                        <Form-item label="原密码" prop="passwd">
                            <Input :type="showOldPasswd?'text':'password'" :icon="showOldPasswd?'eye':'eye-disabled'"
                                   @on-click="showOldPasswd = !showOldPasswd" v-model="formCustom.passwd"
                                   placeholder="请输入原密码"></Input>
                        </Form-item>
                    </Col>
                    <Col span="13">
                        <Form-item label="新密码" prop="newPasswd">
                            <Input :type="showNewPasswd?'text':'password'" :icon="showNewPasswd?'eye':'eye-disabled'"
                                   @on-click="showNewPasswd = !showNewPasswd" v-model="formCustom.newPasswd"
                                   placeholder="请输入新密码"></Input>
                        </Form-item>
                    </Col>
                    <Col span="13">
                        <Form-item label="确认密码" prop="passwdCheck">
                            <Input :type="showCheckPasswd?'text':'password'"
                                   :icon="showCheckPasswd?'eye':'eye-disabled'"
                                   @on-click="showCheckPasswd = !showCheckPasswd" v-model="formCustom.passwdCheck"
                                   placeholder="请确认新密码"></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Row type="flex" justify="center">
                    <Col span="4">
                        <Button long type="primary" @click="handleSubmit('formCustom')">保存</Button>
                    </Col>
                    <Col span="4" offset="1">
                        <Button long type="error" @click="cancleSubmit">取消</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>
<script>
  export default {
    name: 'Header',
    data () {
      const validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'))
        }
        callback()
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck')
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认新密码'))
        } else if (value !== this.formCustom.newPasswd) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        name: 'Admin',
        isShowChangePsw: true,
        isShowResetPasswordModal: false,
        showOldPasswd: false,
        showNewPasswd: false,
        showCheckPasswd: false,
        isActive: false,
        formCustom: {
          passwd: '',
          passwdCheck: '',
          newPasswd: ''
        },
        ruleCustom: {
          passwd: [
            { validator: validateOldPass, trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ],
          newPasswd: [
            { validator: validatePass, trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' },
            { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
          ]
        }
      }
    },
    mounted: function () {
      if (localStorage.roleType && localStorage.roleType == 1) {
        this.isShowChangePsw = false
      }
    },
    computed: {
      username () {
        let username = localStorage.ms_username
        return username ? username : this.name
      }
    },
    methods: {
      toggleClick () {
        this.isActive = !this.isActive
        this.$emit('toggle', {
          isActive: this.isActive
        })
      },
      choice (name) {
        if (name == 'editPassWrd') {
          this.isShowResetPasswordModal = true
        } else if (name == 'quit') {
          this.logOut()
        }
      },
      resetPassword () {
        this.http.post('tcprom/login/updateUserPassWord', {
          oldPassWord: this.formCustom.passwd,
          passWord: this.formCustom.newPasswd,
        }).then((data) => {
          this.resetForm()
          this.isShowResetPasswordModal = false
          this.$Message.success(data.msg)
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.resetPassword()
          }
        })
      },
      cancleSubmit () {
        this.resetForm()
        this.isShowResetPasswordModal = false
      },
      resetForm () {
        this.$refs.formCustom.resetFields()
      },
      logOut () {
        localStorage.removeItem('ms_username')
        localStorage.removeItem('isLogin')
        localStorage.removeItem('roleType')
        this.setCookie('prom', '', -1)
        this.$router.push('/login')
      },
      setCookie (name, value, expireTime) {
        let exp = new Date()
        exp.setTime(exp.getTime() + expireTime * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
      },
    }
  }
</script>
<style lang="less" scoped>
    .layout-header-inner {
        line-height: 58px;
    }

    .header {
        background: #fff;
        border-bottom: 2px solid #ededed;
        line-height: 65px;
        padding-left: 5px;
    }

    .text {
        font-size: 14px;
        color: deepskyblue;
        margin-right: 25px;
    }

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: -10%;
        }
    }

    .hamburger {
        cursor: pointer;
        transform: rotate(0deg);
        transition: .38s;
        transform-origin: 50% 50%;
    }

    .hamburger.is-active {
        transform: rotate(90deg);
    }
</style>
