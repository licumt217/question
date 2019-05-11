<template>


    <div>
        <Row style="padding:5px;">
            <Col span="10" offset="14">
                <Button type="primary" @click="showDirectionsModal">指导语</Button>
                <Button type="success" @click="showItemModal(0)">新增问答</Button>
                <Button type="warning" @click="showItemModal(1)">新增条目</Button>
                <Button type="info" @click="showItemModal(2)">新增矩阵</Button>
            </Col>
        </Row>
        <div style="text-align: center">
            <h1>{{formItem.title}}</h1>
        </div>
        <div>
            <Row v-for="(item,index) in formItem.items">

                <!--问答-->
                <template v-if="item.type===0">
                    <Col span="16" offset="4" style="margin-bottom: 20px;">
                        <div style="margin-bottom: 2px;">{{(index+1)+'、'+item.desc}}</div>
                        <Input type="textarea" :rows="3" v-model="item.descAnswer" placeholder="请输入您的答案"></Input>
                    </Col>
                </template>

                <!--条目-->
                <template v-if="item.type===1">
                    <Col span="16" offset="4" style="margin-bottom: 20px;">
                        <div style="margin-bottom: 2px;">{{(index+1)+'、'+item.desc}}</div>
                        <RadioGroup>
                            <Radio :label="option.desc" v-for="option in item.options"></Radio>
                        </RadioGroup>
                    </Col>
                </template>


            </Row>
        </div>

        <!--设置指导语-->
        <Modal
                v-model="isShowDirectionsModal"
                title="指导语"
                :mask-closable="false"
        >
            <p>
            <Form :label-width="120">

                <FormItem label="请输入指导语">
                    <Input type="textarea" :rows="7" v-model="formItem.directions" placeholder="请输入指导语"></Input>
                </FormItem>
            </Form>
            </p>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowDirectionsModal=false">取消</Button>
                <Button type="primary" size="large" @click="setDirections">确定</Button>
            </div>
        </Modal>


        <!--问答、条目、矩阵-->
        <Modal
                v-model="isShowItemModal"
                :title="itemModalType===0?'问答':itemModalType===1?'条目':'矩阵'"
                width="800"
                :mask-closable="false"
        >
            <Form :label-width="120" v-if="itemModalType===0">

                <FormItem label="请输入问答标题">
                    <Input type="textarea" :rows="5" :maxlength="200" v-model="wenda.desc"
                           placeholder="请输入问答标题"></Input>
                </FormItem>
            </Form>


            <Form :label-width="120" v-if="itemModalType===1">

                <FormItem label="请输入条目标题" style="font-size: 1em;font-weight: bold">
                    <Input type="textarea" :rows="2" :maxlength="200" v-model="tiaomu.desc"
                           placeholder="请输入条目标题"></Input>
                </FormItem>
                <div style="margin: 5px;text-align: right">
                    <Button type="success" size="small" @click="addOption">新增选项</Button>
                </div>

                <Row style="margin-top: 10px;font-size: 1em;font-weight: bold;">
                    <Col span="16">
                        选项文字
                    </Col>
                    <Col span="3" offset="1">
                        分数
                    </Col>
                    <Col span="3" offset="1">
                        移除
                    </Col>
                </Row>
                <Row v-for="(option,index) in tiaomu.options" style="margin-bottom: 5px;">
                    <Col span="16">
                        <Input :maxlength="200" v-model="option.desc" placeholder="请输入选项文字"></Input>
                    </Col>
                    <Col span="3" offset="1">
                        <Select v-model="option.score">
                            <Option v-for="order in orderList" :value="order" :key="order">{{ order }}</Option>
                        </Select>
                    </Col>
                    <Col span="3" offset="1">
                        <Icon type="ios-remove-circle" size="25" style="cursor: pointer;margin-top: 4px;"
                              @click="removeOption(index)"></Icon>
                    </Col>
                </Row>
            </Form>


            <div slot="footer">
                <Button type="text" size="large" @click="isShowItemModal=false">取消</Button>
                <Button type="primary" size="large" @click="addItem(itemModalType)">确定</Button>
            </div>
        </Modal>


    </div>

</template>

<script>

    let item = {
        type: 0,//0,1,2 条目类型：问答条目、普通条目、矩阵条目
        desc: '我是描述',//描述
        descAnswer: '',

    }

    const md5 = require('md5')
    import {Util} from '../../assets/js/Util'

    export default {
        data() {
            return {
                orderList: [0, 1, 2, 3, 4, 5],

                optionList: [{
                    desc: '选项一',
                    score: 0
                }],
                wenda: {
                    desc: ''
                },
                tiaomu: {
                    desc: '',
                    options: [],
                    type:1
                },
                itemModalType: 0,//0，1，2对应三个条目类型
                isShowItemModal: false,
                isShowDirectionsModal: false,
                isEdit: this.$route.query.opType === 'edit',
                id: this.$route.query.id,
                formItem: {
                    title: '我是量表标题',
                    directions: '我是指导语',
                    items: []
                    // items: [{
                    //     type: 0,
                    //     desc: '',//描述
                    //     descAnswer: '',
                    //     options: [{//条目的选项
                    //         desc: '',
                    //         score: 0
                    //     }]
                    // }]

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
            if (this.isEdit) {

                //编辑的话根据用户id后台请求接口获取用户信息


                // this.formItem={};
            }
        },
        methods: {
            addOption() {
                this.tiaomu.options.push({
                    desc: '',
                    score: 0
                })
            },
            removeOption(index) {
                this.tiaomu.options.splice(index, 1)
            },
            addItem(type) {

                if (type === 0) {

                    if (!this.wenda.desc) {
                        this.$Message.warning("请输入问答标题！");
                        return;
                    }

                    this.formItem.items.push({
                        type: 0,
                        desc: this.wenda.desc
                    })

                    this.hideItemModal()


                } else if (type === 1) {

                    if (!this.tiaomu.desc) {
                        this.$Message.warning("请输入条目标题！");
                        return
                    }

                    if (this.tiaomu.options.length === 0) {
                        this.$Message.warning("请至少添加一条选项！");
                        return
                    }

                    for (let i = 0; i < this.tiaomu.options.length; i++) {
                        if (!this.tiaomu.options[i].desc) {
                            this.$Message.warning("有选项文字未填写，请检查！！");
                            return
                        }
                    }

                    this.hideItemModal()

                    this.formItem.items.push(this.tiaomu)


                } else {

                }
            },
            resetItemModalInfo() {
                this.wenda.desc = ''
                this.tiaomu = {
                    desc: '',
                    options: [],
                    type:1
                }
            },
            showItemModal(type) {
                this.resetItemModalInfo()


                this.itemModalType = type
                this.isShowItemModal = true
            },
            hideItemModal() {
                this.isShowItemModal = false
            },
            showDirectionsModal() {
                this.isShowDirectionsModal = true;
            },
            hideDirectionsModal() {
                this.isShowDirectionsModal = false;
            },
            //设置量表指导语
            setDirections() {

            },
            back() {
                this.$router.push('/table/list')
            },
            operate() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {


                        let url = 'table/add';
                        if (this.isEdit) {
                            url = 'table/update'
                        }

                        let data = {}


                        if (this.isEdit) {
                            this.$Message.success("修改成功！")
                        } else {
                            this.$Message.success("新增成功！")
                        }

                        this.$router.push('/table/list')
                        return;


                        this.formItem.password = md5(this.formItem.password)

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
