<template>


    <div class="login-wrap">
        <transition name="slideT">
            <div class="mainContent" >

                <div class="ms-login">

                    <Tabs >
                        <Tab-pane label="量表操作" name="account" icon="android-person">

                            <Form :model="formItem" :rules="rules" ref="loginForm" :label-width="80" class="demo-ruleForm">

                                <Form-item prop="name" label="名称">
                                    <Input  :maxlength="50" placeholder="请输入量表名称" v-model="formItem.name"></Input>
                                </Form-item>

                                <!--<FormItem label="性别" prop="gender">-->
                                    <!--<RadioGroup v-model="formItem.gender">-->
                                        <!--<Radio label="male">男</Radio>-->
                                        <!--<Radio label="female">女</Radio>-->
                                    <!--</RadioGroup>-->
                                <!--</FormItem>-->

                            </Form>

                        </Tab-pane>
                    </Tabs>

                    <div class="login-btn">
                        <Button type="primary" @click="operate">确定</Button>
                    </div>
                    <div class="signup-btn">
                        <a href="javascript:" @click="back">返回</a>
                    </div>
                    <!--<Spin size="large" fix ></Spin>-->
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    const md5=require('md5')
    import {Util} from '../../assets/js/Util'
    export default {
        data() {
            return {
                isEdit:this.$route.query.opType==='edit',
                id:this.$route.query.id,
                formItem: {
                    phone: '',
                },
                rules: {
                    name: [
                        {required: true, message: "量表名称不能为空", trigger: "blur"}
                    ],
                    // gender: [
                    //     {required: true, message: "性别不能为空", trigger: "change"}
                    // ],
                },
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        mounted() {
            if(this.isEdit){

                //编辑的话根据用户id后台请求接口获取用户信息


                // this.formItem={};
            }
        },
        methods: {
            back(){
                this.$router.push('/table/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url='table/add';
                        if(this.isEdit){
                            url='table/update'
                        }

                        let data={
                        }



                        if(this.isEdit){
                            this.$Message.success("修改成功！")
                        }else{
                            this.$Message.success("新增成功！")
                        }

                        this.$router.push('/table/list')
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




        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100vh;
        background-size: 100% 100%;
    }

    .mainContent {
        position: absolute;
        left: 50%;
        margin-left: -190px;
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
        width: 380px;
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
