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
                userGroup:'',
                userGroupList:[{
                    label:'用户组1',
                    value:'1'
                },{
                    label:'用户组2',
                    value:'2'
                },{
                    label:'用户组3',
                    value:'3'
                },],
                isShowUserGroupModal:false,
                columns: [
                    {
                        type:'index',
                        width:60,
                        align:'center'
                    },
                    {
                        title: '量表名称',
                        key: 'name'
                    },
                    {
                        title: '创建时间',
                        key: 'createDt'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        render: (h, params) => {
                                    return h('div', {}, params.row.state === 0 ? '已完成' : '未完成')
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
                                },'删除'),
                                h('Button',{
                                    props:{
                                        type:'success',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.detail(params)
                                        }
                                    }
                                },'查看'),
                                h('Button',{
                                    props:{
                                        type:'success',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.publish(params)
                                        }
                                    }
                                },'发布')
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
            selectUserGroup(){

            },
            pageChange(page){
              console.log(page)
            },
            getList() {
                // this.http.get('users/list', {}).then(data => {

                    let data=[{
                        name:'量表1',
                        createDt:'2019/02/17',
                        state:0,
                    },{
                        name:'量表2',
                        createDt:'2019/02/17',
                        state:1,
                    }]


                    this.dataList = data;
                // })
            },
            add() {
              this.$router.push('/table/operate')
            },
            edit(params){
                this.$router.push({
                    path:'/table/operate',
                    query:{
                        opType:'edit',
                        id:'id',
                        // id:params.row._id,
                    }
                })
            },
            detail(params){
                this.$router.push('/table/detail')
            },
            publish(params){
                this.$Message.success("发布成功！")
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
</style>
