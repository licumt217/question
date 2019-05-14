<template>


    <div>
        <Row style="padding:5px;">
            <Col span="2" offset="22">
                <Button type="success" @click="add">新增</Button>
            </Col>
        </Row>
        <Table stripe :columns="columns" :data="dataList"></Table>


        <!-- -->
        <Modal
                v-model="isShowModal"
                title="量表组"
                :mask-closable="false"
        >
            <p>
                <Input v-model="formItem.name" placeholder="请输入量表组名称"></Input>
            </p>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowModal=false">取消</Button>
                <Button type="primary" size="large" @click="save">确定</Button>
            </div>
        </Modal>


    </div>


</template>

<script>
    export default {
        data() {
            return {
                isShowModal: false,
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '量表组名称',
                        key: 'name'
                    },
                    {
                        title: '创建时间',
                        key: 'createDt'
                    },

                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }

                ],
                dataList: [],
                formItem:{

                }
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            getList() {
                // this.http.get('users/list', {}).then(data => {

                let data = [{
                    id:1,
                    name: '量表组1',
                    createDt: '2019/02/17',
                }, {
                    id:2,
                    name: '量表组2',
                    createDt: '2019/02/17',
                }]


                this.dataList = data;
                // })
            },

            save() {
                if (!this.formItem.name) {
                    this.$Message.warning("请输入量表组名称！")
                    return;
                }

                this.dataList.push({
                    id:Math.ceil(Math.random()*1000),
                    name: this.formItem.name,
                    createDt: '2019/05/13'
                })
                this.isShowModal = false;

                if(this.formItem.id){
                    this.$Message.success("修改成功！")
                }else{
                    this.$Message.success("添加成功！")
                }

            },
            add() {
                this.isShowModal = true
                this.formItem={

                };
            },
            edit(params) {
                this.formItem=params.row
                this.isShowModal = true
            },
            delete(params) {

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
</style>
