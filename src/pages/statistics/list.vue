<template>


    <div>
        <Tabs value="name1">

            <TabPane label="问卷" name="name1">
                <Row style="padding:5px;">



                    <Col span="16">
                        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                            <FormItem prop="user" label="手机号" :label-width="60">
                                <Input type="text" v-model="formInline.user" placeholder="Username">
                                    <!--<span slot="prepend">手机号</span>-->
                                </Input>
                            </FormItem>
                            <FormItem label="性别" :label-width="50" prop="gender">

                                <Select v-model="formInline.gender">
                                    <Option value="beijing">男</Option>
                                    <Option value="shanghai">女</Option>
                                </Select>
                            </FormItem>

                            <FormItem>
                                <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">查询</Button>
                            </FormItem>
                        </Form>

                    </Col>


                    <Col span="2" offset="6">
                        <Button type="success" @click="add">新增</Button>
                    </Col>
                </Row>
                <Table stripe :columns="columns" :data="dataListOfPaper"></Table>
                <div style="text-align: center;margin-top: 1em;">
                    <Page :total="totalOfPaper" @on-change="pageChangeOfPaper"/>
                </div>
            </TabPane>

            <TabPane label="反馈报告" name="name2">
                <Row style="padding:5px;">
                    <Col span="2" offset="22">
                        <Button type="success" @click="add">新增</Button>
                    </Col>
                </Row>
                <Table stripe :columns="columns" :data="dataListOfBack"></Table>
                <div style="text-align: center;margin-top: 1em;">
                    <Page :total="totalOfBack" @on-change="pageChangeOfBack"/>
                </div>
            </TabPane>
        </Tabs>



    </div>


</template>

<script>
    export default {
        data() {
            return {
                totalOfPaper:100,
                totalOfBack:100,
                formInline: {
                    user: '',
                    select: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: 'Please fill in the password.', trigger: 'change' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'change' }
                    ]
                },
                columns: [
                    {
                        type:'index',
                        width:60,
                        align:'center'
                    },
                    {
                        title: '手机号',
                        key: 'phone'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                                    return h('div', {}, params.row.gender === 'male' ? '男' : '女')
                                }
                    },
                    {
                        title: '电子邮箱',
                        key: 'email'
                    },
                    {
                        title: '出生日期',
                        key: 'birthday'
                    },
                    // {
                    //     title: '用户类型',
                    //     key: 'type',
                    //     render: (h, params) => {
                    //         return h('div', {}, params.row.type === 0 ? '学生' : params.row.type === 1 ? '教师' : '管理员')
                    //     }
                    // },

                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.edit(params)
                                        }
                                    }
                                },'编辑'),
                                h('Button',{
                                    props:{
                                        type:'error',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.delete(params)
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }

                ],
                dataListOfPaper: [],
                dataListOfBack: []
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            pageChangeOfPaper(page){
                console.log(page)
            },
            pageChangeOfBack(page){
                console.log(page)
            },
            getList() {
                // this.http.get('users/list', {}).then(data => {

                    let data=[{
                        phone:'13521092619',
                        gender:'male',
                        birthday:'2019/02/17',
                        email:'licumt222@126.com'
                    },{
                        phone:'12345678977',
                        gender:'male',
                        birthday:'2019/02/17',
                        email:'licumt222@126.com'
                    },{
                        phone:'12588855545',
                        gender:'female',
                        birthday:'2011/02/17',
                        email:'licumt222@126.com'
                    }]


                    this.dataListOfPaper = data;
                    this.dataListOfBack = data;
                // })
            },
            add() {
              this.$router.push('/user/operate')
            },
            edit(params){
                this.$router.push({
                    path:'/user/operate',
                    query:{
                        opType:'edit',
                        id:'id',
                        // id:params.row._id,
                    }
                })
            },
            delete(params){

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.$Message.success("删除成功")
                        this.getList()

                        // this.http.post('users/remove',{
                        //     _id:params.row._id
                        // }).then(()=>{
                        //     this.$Message.success("删除成功")
                        //     this.getList()
                        // }).catch(error=>{
                        //     this.$Message.error(error)
                        // })

                    },
                    onCancel: () => {
                    }
                });


            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
