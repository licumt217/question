<template>

    <Row class="outerRow">
        <Col span="4">&nbsp;</Col>
        <Col span="16">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" >
            <Form-item prop="user">
                <Input type="text" v-model="formInline.user" placeholder="手机号">
                </Input>
            </Form-item>
            <Form-item prop="password">


                <Row>
                    <Col span="10">
                    <Input type="password" v-model="formInline.password" placeholder="验证码">
                    </Input>
                    </Col>
                    <Col span="10" offset="4">
                    <Button type="primary" @click="handleSubmit('formCustom')">获取验证码</Button>
                    </Col>
                </Row>
            </Form-item>
            <Form-item>
                <Checkbox >我同意《停简单推广协议》</Checkbox>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
            </Form-item>
        </Form>
        <div>
            <h1>测试</h1>
        </div>


        <Row>
            <div id="container"></div>
            <qq-map @ready="ready" :style='{ height:"400px" }'></qq-map>
        </Row>
        <div id="mm" style="width:200px;height:200px;" width="200" height="200"></div>
        <i class="ivu-icon ivu-icon-checkmark"></i>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="ghost">Ghost</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
        <br><br>w
        <Button type="info">信息按钮</Button>
        <Button type="success">成功按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="error">错误按钮</Button>
        </Col>
        <img src="../../assets/images/prePay/background.png" alt="" id='codeLogo' style='display:none;' />
        <Col span="4">&nbsp;</Col>

    </Row>
</template>

<script type="text/ecmascript-6">
    import {util} from 'util';
    require('qrcode')
    import {wxUtil} from '../../assets/js/wxUtil';

    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                },
                map:null
            }
        },
        mounted: function () {
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
//                        this.$Message.success('提交成功!');

                        util.goto(this,'a')


                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
    //import {} from '../../assets/css/abc.css'
</script>
<!--<style  >-->
<style lang="less" >
    @import '../../assets/css/reset.less';
    .outerRow{
        margin-top:4em;
    }
    /*@import '../../assets/css/abc.css';*/
    h1{
        color:@header-title-color;
        box-shadow: 3px 3px 3px red;
    }

</style>