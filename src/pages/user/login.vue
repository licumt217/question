<template>

    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >
                <div class="ms-title">推广管家</div>

                <div class="ms-login">

                    <Tabs >
                        <Tab-pane label="账户登录" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="0" class="demo-ruleForm">

                                <Form-item prop="phone">
                                    <Input  :maxlength="20" placeholder="请输入手机号" v-model="formItem.phone"></Input>
                                </Form-item>

                                <Form-item prop="password">
                                    <Input type="password" placeholder="请输入密码" :maxlength="20" v-model="formItem.password"></Input>
                                </Form-item>

                            </Form>

                        </Tab-pane>
                    </Tabs>

                    <p class="" style="text-align: right;">
                        <a href="javascript:;" style="color:#393737;cursor: pointer;" @click="showForgetModal">忘记密码？</a>
                    </p>

                    <div class="login-btn">
                        <Button type="primary" @click="login">登录</Button>
                    </div>

                    <div class="signup-btn">
                        <a href="javascript:" @click="register">注册</a>
                    </div>
                    <!--<Spin size="large" fix ></Spin>-->
                </div>
            </div>
        </transition>

        <Modal
                v-model="isShowForgetModal"
                title="请输入手机号"
                :mask-closable="false"
        >
            <p>
                <Input  :maxlength="11" placeholder="请输入手机号" v-model="phone"></Input>
            </p>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowForgetModal=false">取消</Button>
                <Button type="primary" size="large" @click="ok">确定</Button>
            </div>
        </Modal>
    </div>

</template>

<script>
    import {Util} from '../../assets/js/Util'
    const md5=require('md5')
    export default {
        data() {
            return {
                phone:'',
                isShowForgetModal:false,
                formItem: {
                    phone: '',
                    password: '',
                    // userType: 'student',
                    // studentNumber: '',
                    // jobNumber: '',
                },
                rules: {
                    phone: [
                        {required: true, message: "用户名不能为空", trigger: "blur"},
                        {type: 'string', min: 6, message: '用户名长度不能少于6位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"}
                    ],
                },
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        mounted() {
            if (this.isLogin) {
                this.$router.push('/')
            }
        },
        methods: {
            ok(){
                if(this.phone && Util.isValidPhone(this.phone)){
                    this.isShowForgetModal=false;
                    this.$Message.success({
                        content:`新的随机密码已发送至手机号${this.phone}对应的邮箱xxx@126.com，请注意查收！`,
                        duration:7
                    })
                }else{
                    this.$Message.warning(`请填写正确的手机号！`)
                    this.isShowForgetModal=true;
                }


            },
            showForgetModal(){
                this.isShowForgetModal=true;
            },
            cancelModal(){

            },
            register(){
                this.$router.push('/user/register')
            },
            login() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {

                        let data={
                            "password": "e10adc3949ba59abbe56e057f20f883e",
                            "type": 0,
                            "_id": "5cc267ed7740d16e07d99897",
                            "username": "qiang.li",
                            "name": "李强",
                            "studentNumber": "09064214",
                            "jobNumber": "",
                            "__v": 0,
                            "passwordUptTime": "2019-04-28T17:15:35.965Z"
                        }

                        this.$Message.success("登录成功")

                        this.$store.commit('isLogin', true)
                        this.$store.commit('userId', data._id)
                        this.$store.commit('username', data.username)
                        this.$store.commit('userInfo', data)
                        // this.getMenuList()

                        return;




                        this.formItem.password=md5(this.formItem.password)

                        this.http.post('users/login', {
                            username: this.formItem.username,
                            password: this.formItem.password
                        }).then((data) => {
                            this.$Message.success("登录成功")

                            this.$store.commit('isLogin', true)
                            this.$store.commit('userId', data._id)
                            this.$store.commit('username', data.username)
                            this.$store.commit('userInfo', data)
                            this.getMenuList()



                        }).catch(err => {
                            this.$Message.error(err)
                        })
                    }

                })

            },
            getMenuList(){
                this.http.get('resources/listByLevel', {
                    params:{
                        userId:this.$store.state.userId
                    }
                }).then((data) => {



                data=[
                    {
                        "order": 0,
                        "icon": "ios-photos",
                        "children": [],
                        "_id": "5cc0338c7740d16e07d99895",
                        "name": "题类型管理",
                        "url": "/questiontype/list",
                        "opUserId": "5cc014dd22cfa65f131eeb61",
                        "parentCode": "0",
                        "code": "0002",
                        "activeName": "/questiontype/list",
                        "__v": 0
                    },
                    {
                        "order": 0,
                        "icon": "ios-paper",
                        "children": [],
                        "_id": "5cc267217740d16e07d99896",
                        "name": "题管理",
                        "url": "/borrow/list",
                        "opUserId": "5cc014dd22cfa65f131eeb61",
                        "parentCode": "0",
                        "code": "0003",
                        "activeName": "/borrow/list",
                        "__v": 0
                    },
                    {
                        "order": 0,
                        "icon": "ios-paper",
                        "children": [],
                        "_id": "5cc267217740d16e07d99896",
                        "name": "题组管理",
                        "url": "/borrow/list",
                        "opUserId": "5cc014dd22cfa65f131eeb61",
                        "parentCode": "0",
                        "code": "0003",
                        "activeName": "/borrow/list",
                        "__v": 0
                    },
                    {
                        "order": 0,
                        "icon": "ios-paper",
                        "children": [],
                        "_id": "5cc267217740d16e07d99896",
                        "name": "问卷管理",
                        "url": "/borrow/list",
                        "opUserId": "5cc014dd22cfa65f131eeb61",
                        "parentCode": "0",
                        "code": "0003",
                        "activeName": "/borrow/list",
                        "__v": 0
                    }
                ]







                    this.$store.commit("menuList",data)

                    this.$router.push('/')


                }).catch(err => {
                    this.$Message.error(err)
                })




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
