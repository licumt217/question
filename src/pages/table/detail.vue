<template>


    <div>
        <Row style="padding:5px;">
            <Col span="10" offset="14">
                <Button type="primary" @click="showItemModal(0)">指导语</Button>
                <Button type="success" @click="showItemModal(1)">新增问答</Button>
                <Button type="warning" @click="showItemModal(2)">新增条目</Button>
                <Button type="info" @click="showItemModal(3)">新增矩阵</Button>
            </Col>
        </Row>
        <div style="text-align: center">
            <h1>{{formItem.title}}</h1>
        </div>
        <div>
            <Row v-for="(item,index) in formItem.items">

                <Col span="21">
                    <!--指导语-->
                    <template v-if="item.type===0">
                        <Col span="16" offset="4" style="margin-bottom: 20px;">
                            <div style="margin-bottom: 2px;" @click="editItem(item,index)">{{(index+1)+'、'+item.desc}}</div>
                        </Col>
                    </template>

                    <!--问答-->
                    <template v-if="item.type===1">
                        <Col span="16" offset="4" style="margin-bottom: 20px;">
                            <div style="margin-bottom: 2px;" @click="editItem(item,index)">{{(index+1)+'、'+item.desc}}</div>
                            <Input type="textarea" :rows="3" v-model="item.descAnswer" placeholder="请输入您的答案"></Input>
                        </Col>
                    </template>



                    <!--条目-->
                    <template v-if="item.type===2">
                        <Col span="16" offset="4" style="margin-bottom: 20px;">
                            <div style="margin-bottom: 2px;" @click="editItem(item,index)">{{(index+1)+'、'+item.desc}}</div>
                            <RadioGroup>
                                <Radio :label="option.desc" v-for="option in item.options"></Radio>
                            </RadioGroup>
                        </Col>
                    </template>

                    <!--矩阵-->
                    <template v-if="item.type===3">
                        <Col span="16" offset="4" style="margin-bottom: 20px;">
                            <div style="margin-bottom: 2px;" @click="editItem(item,index)">{{(index+1)+'、'+item.desc}}</div>
                            <div v-for="(child,childIndex) in item.children" style="padding-left: 2em;margin-bottom: 1em;">
                                <p >{{((index+1)+'.'+(childIndex+1))+' '+child.desc}}</p>
                                <RadioGroup>
                                    <Radio :label="option.desc" v-for="option in item.options"></Radio>
                                </RadioGroup>
                            </div>



                        </Col>
                    </template>
                </Col>
                <Col span="3">
                    <Button type="text" size="small" @click="up(item,index)" v-if="index>0">上</Button>
                    <Button type="text" size="small" @click="down(item,index)" v-if="index<(formItem.items.length-1)">下</Button>
                </Col>


            </Row>
        </div>

        <!--问答、条目、矩阵-->
        <Modal
                v-model="isShowItemModal"
                :title="itemModalType===0?'指导语':itemModalType===1?'问答':itemModalType===2?'条目':'矩阵'"
                width="800"
                :mask-closable="false"
        >

            <Form :label-width="120" v-if="itemModalType===0">

                <FormItem label="请输入指导语">
                    <Input type="textarea" :rows="5" :maxlength="200" v-model="tiaomu.desc"
                           placeholder="请输入指导语"></Input>
                </FormItem>
            </Form>


            <Form :label-width="120" v-if="itemModalType===1">

                <FormItem label="请输入问答标题">
                    <Input type="textarea" :rows="5" :maxlength="200" v-model="tiaomu.desc"
                           placeholder="请输入问答标题"></Input>
                </FormItem>
            </Form>


            <Form :label-width="120" v-if="itemModalType===2">

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

            <Form :label-width="120" v-if="itemModalType===3">

                <FormItem label="请输入矩阵标题" style="font-size: 1em;font-weight: bold">
                    <Input type="textarea" :rows="2" :maxlength="200" v-model="tiaomu.desc"
                           placeholder="请输入矩阵标题"></Input>
                </FormItem>
                <div style="margin: 5px;text-align: right">
                    <Button type="success" size="small" @click="addChildItem">新增子条目</Button>
                </div>

                <Row style="margin-top: 10px;font-size: 1em;font-weight: bold;">
                    <Col span="16">
                        子条目标题
                    </Col>
                    <Col span="3" offset="5">
                        移除
                    </Col>
                </Row>

                <Row v-for="(option,index) in tiaomu.children" style="margin-bottom: 5px;">
                    <Col span="16">
                        <Input :maxlength="200" v-model="option.desc" placeholder="请输入子条目标题"></Input>
                    </Col>
                    <Col span="3" offset="5">
                        <Icon type="ios-remove-circle" size="25" style="cursor: pointer;margin-top: 4px;"
                              @click="removeChildItem(index)"></Icon>
                    </Col>
                </Row>



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


                <p style="margin-top: 1em;font-weight: bold">因子计算规则</p>
                <Row style="margin-top: 10px;font-size: 1em;font-weight: bold;">
                    <Col span="3" offset="1">
                        子条目个数
                    </Col>
                    <Col span="3" offset="1">
                        操作符
                    </Col>
                    <Col span="3" offset="1">
                        分数值
                    </Col>
                    <Col span="3" offset="1">
                        符合条件真值
                    </Col>
                    <Col span="3" offset="1">
                        符合条件假值
                    </Col>
                </Row>
                <Row style="margin-bottom: 5px;">

                    <Col span="3" offset="1">
                        <Select v-model="tiaomu.factorCalRule.count">
                            <Option v-for="(order,i) in tiaomu.children" :value="i+1" :key="i+1">{{ i+1 }}</Option>
                        </Select>

                    </Col>
                    <Col span="3" offset="1">
                        <Select v-model="tiaomu.factorCalRule.operator">
                            <Option value=">" key=">">   > </Option>
                            <Option value=">=" key=">="> >= </Option>
                            <Option value="<" key="<"> < </Option>
                            <Option value="<=" key="<="> <= </Option>
                            <Option value="=" key="="> = </Option>
                        </Select>
                    </Col>
                    <Col span="3" offset="1">
                        <Select v-model="tiaomu.factorCalRule.score">
                            <Option v-for="n in 10" :value="n" :key="n">   {{n}} </Option>
                        </Select>
                    </Col>
                    <Col span="3" offset="1">
                        <Select v-model="tiaomu.factorCalRule.trueSocre">
                            <Option v-for="n in 10" :value="n" :key="n">   {{n}} </Option>
                        </Select>
                    </Col>
                    <Col span="3" offset="1">
                        <Select v-model="tiaomu.factorCalRule.falseScore">
                            <Option v-for="n in 10" :value="n" :key="n">   {{n}} </Option>
                        </Select>
                    </Col>
                </Row>
            </Form>


            <div slot="footer">
                <Button type="text" size="large" @click="closeItemModal">取消</Button>
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
                tiaomu: {
                    id: '',
                    tableId: '',//量表id
                    type: 0,
                    desc: '',//描述
                    options: [{//条目的选项
                        desc: '',
                        score: 0
                    }],
                    parentId: '',
                    children:[{
                        desc: '',//描述
                        options: [{//条目的选项
                            desc: '',
                            score: 0
                        }],
                    }],
                    sort:0,
                    isChild: false,//是否矩阵中的子条目
                    factorCalRule: {
                        operator: '',//>,<,>=,<=,=
                        count: 0,//自条目个数
                        score: 0,//分数值
                        trueSocre: 0,//符合条件真值
                        falseScore: 0,//符合条件假值
                    },//因子计算规则
                },
                itemModalType: 0,//0，1，2，3对应三个条目类型
                isShowItemModal: false,
                id: this.$route.query.id,
                formItem: {
                    title: '我是量表标题',
                    items: []
                    // items: [{
                    //     id:'',
                    //     tableId:'',//量表id
                    //     type: 0,
                    //     desc: '',//描述
                    //     options: [{//条目的选项
                    //         desc: '',
                    //         score: 0
                    //     }],
                    //         parentId:'',
                    //      isChild:false,//是否矩阵中的子条目
                    //         factorCalRule:{
                    //              operator:'>',//>,<,>=,<=,=
                    //                 count:3,//自条目个数
                    //                 score:2,//分数值
                    //                 trueSocre:4,//符合条件真值
                    //                 falseScore:0,//符合条件假值
                    //         },//因子计算规则
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
                isEdit:false,

                editedItem:null,
                editedIndex:0,
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
            up(item,index){
                // 上下货下上两个的order互换下。
            },
            down(item,index){

            },
            closeItemModal(){
                this.isShowItemModal=false;

                if(this.isEdit){

                    this.formItem.items[this.editedIndex]=this.editedItem
                }


            },
            addChildItem(){
                this.tiaomu.children.push({
                    desc:'',
                })
            },
            removeChildItem(index){
                this.tiaomu.children.splice(index,1)
            },
            addOption() {
                this.tiaomu.options.push({
                    desc: '',
                    score: 0
                })
            },
            removeOption(index) {
                this.tiaomu.options.splice(index, 1)
            },
            /**
             * 编辑条目（各种类型的条目）
             * @param item
             */
            editItem(item,index){
                // alert(JSON.stringify(item))
                this.editedItem=JSON.parse(JSON.stringify(item));
                this.editedIndex=index;
                this.showItemModal(item.type,true)
                this.tiaomu=item;
            },
            addItem(type) {


                if (type === 0) {//指导语

                    if (!this.tiaomu.desc) {
                        this.$Message.warning("请输入指导语！");
                        return
                    }

                    this.hideItemModal()

                    this.tiaomu.type = 0;

                    this.tiaomu.sort=this.formItem.items.length+1;

                    if(!this.isEdit){
                        this.formItem.items.push(this.tiaomu)
                    }



                } else if (type === 1) { //问答

                    if (!this.tiaomu.desc) {
                        this.$Message.warning("请输入问答标题！");
                        return;
                    }


                    if(!this.isEdit){
                        this.formItem.items.push({
                            type: 1,
                            desc: this.tiaomu.desc,
                            sort:this.formItem.items.length+1

                        })
                    }


                    this.hideItemModal()


                } else if (type === 2) {//条目
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

                    this.tiaomu.type=2;

                    if(!this.isEdit){
                        this.tiaomu.sort=this.formItem.items.length+1;
                        this.formItem.items.push(this.tiaomu)
                    }



                } else if(type===3){//矩阵

                    if (!this.tiaomu.desc) {
                        this.$Message.warning("请输入矩阵标题！");
                        return
                    }

                    if (this.tiaomu.children.length === 0) {
                        this.$Message.warning("请至少添加一条子条目！");
                        return
                    }

                    for (let i = 0; i < this.tiaomu.children.length; i++) {
                        if (!this.tiaomu.children[i].desc) {
                            this.$Message.warning("有子条目标题未填写，请检查！！");
                            return
                        }
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


                    if(!this.tiaomu.factorCalRule.count){
                        this.$Message.warning("请选择子条目个数！");
                        return
                    }
                    if(!this.tiaomu.factorCalRule.operator){
                        this.$Message.warning("请选择操作符！");
                        return
                    }
                    if(!this.tiaomu.factorCalRule.score){
                        this.$Message.warning("请选择分数值！");
                        return
                    }
                    if(!this.tiaomu.factorCalRule.trueSocre){
                        this.$Message.warning("请选择符合条件真值！");
                        return
                    }
                    if(!this.tiaomu.factorCalRule.falseScore){
                        this.$Message.warning("请选择符合条件假值！");
                        return
                    }

                    this.hideItemModal()

                    this.tiaomu.type=3;
                    this.tiaomu.sort=this.formItem.items.length+1;

                    if(!this.isEdit){
                        this.formItem.items.push(this.tiaomu)
                    }


                }
            },
            resetItemModalInfo() {
                this.tiaomu = {
                    desc: '',
                    options: [],
                    type: 1,
                    children:[],
                    factorCalRule: {
                        operator: '',//>,<,>=,<=,=
                        count: 0,//自条目个数
                        score: 0,//分数值
                        trueSocre: 0,//符合条件真值
                        falseScore: 0,//符合条件假值
                    },//因子计算规则
                }



            },
            showItemModal(type,isEdit) {
                this.resetItemModalInfo()

                this.isEdit=!!isEdit;


                this.itemModalType = type
                this.isShowItemModal = true
            },
            hideItemModal() {
                this.isShowItemModal = false
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
