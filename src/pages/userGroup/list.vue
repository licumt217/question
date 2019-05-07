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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'desc',
                    },

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
                        name:'用户组1',
                        desc:'我是用户组11哈哈哈',
                    },{
                        name:'用户组2',
                        desc:'我是用户组11哈哈哈',
                    },{
                        name:'用户组3',
                        desc:'我是用户组11哈哈哈',
                    },{
                        name:'用户组4',
                        desc:'我是用户组11哈哈哈',
                    },]


                    this.dataList = data;
                })
            },
            add() {
              this.$router.push('/userGroup/operate')
            },
            edit(params){
                this.$router.push({
                    path:'/userGroup/operate',
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

                        this.http.post('users/remove',{
                            _id:params.row._id
                        }).then(()=>{
                            this.$Message.success("删除成功")
                            this.getUserList()
                        }).catch(error=>{
                            this.$Message.error(error)
                        })

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
