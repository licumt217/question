<template>


    <div>
        <Row style="padding:5px;">
            <Col span="2" offset="22">
                <Button type="success" @click="add">新增</Button>
            </Col>
        </Row>
        <Table stripe :columns="columns" :data="dataList"></Table>
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
                        title: '试题类型',
                        key: 'type',
                        render: (h, params) => {
                            return h('div', {}, params.row.type === 0 ? '填空题' : params.row.type === 1 ? '单选题' : '问答题')
                        }
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
            this.getList()
        },
        methods: {
            getList() {
                this.http.get('books/list', {}).then(data => {
                    // this.dataList = data;

                    data=[
                        {
                            "_id": "5cb420b6a7b8c50c7cb005a7",
                            "name": "西游记后传",
                            "type": 0,
                            "__v": 0
                        },
                        {
                            "_id": "5cb420c1a7b8c50c7cb005a8",
                            "name": "红楼梦",
                            "type": 1,
                            "__v": 0
                        },
                        {
                            "_id": "5cb460baa7b8c50c7cb005a9",
                            "name": "三国演义",
                            "type": 2,
                            "__v": 0
                        },

                    ]

                    this.dataList = data;



                })
            },
            add() {
              this.$router.push('/questiontype/operate')
            },
            edit(params){
                this.$router.push({
                    path:'/questiontype/operate',
                    query:{
                        opType:'edit',
                        formItem:params.row
                    }
                })
            },
            borrow(params){

                this.http.get('borrows/list',{
                    params:{
                        book:params.row._id,
                        state:0
                    }
                }).then((data)=>{
                    console.log(data)
                    if(data && data.length>0){
                        this.$Message.warning("此书已被他人借阅！")
                    }else{
                        this.$router.push({
                            path:'/borrow/operate',
                            query:{
                                bookId:params.row._id
                            }
                        })
                    }


                }).catch(error=>{
                    this.$Message.error(error)
                })


            },
            delete(params){

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.http.post('books/remove',{
                            _id:params.row._id
                        }).then(()=>{
                            this.$Message.success("删除成功")
                            this.getList()
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
    /*h3 {*/
        /*margin: 40px 0 0;*/
    /*}*/

    /*ul {*/
        /*list-style-type: none;*/
        /*padding: 0;*/
    /*}*/

    /*li {*/
        /*display: inline-block;*/
        /*margin: 0 10px;*/
    /*}*/

    /*a {*/
        /*color: #42b983;*/
    /*}*/
</style>
