<template>


    <div>
        <Row style="padding:5px;">
            <Col span="2" offset="22">
                <Button type="success" @click="add">新增</Button>
            </Col>
        </Row>
        <Table stripe :columns="columns" :data="dataList"></Table>
        <div style="text-align: center;margin-top: 1em;">
            <Page :total="100" @on-change="pageChange"/>
        </div>

    </div>


</template>

<script>
    export default {
        data() {
            return {
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
                dataList: []
            }
        },
        mounted() {
            this.getUserList()
        },
        methods: {
            pageChange(page){
              console.log(page)
            },
            getUserList() {
                this.http.get('users/list', {}).then(data => {

                    data=[{
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


                    this.dataList = data;
                })
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
                        this.getUserList()

                        // this.http.post('users/remove',{
                        //     _id:params.row._id
                        // }).then(()=>{
                        //     this.$Message.success("删除成功")
                        //     this.getUserList()
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
