<template>


    <div>
        <Row style="padding:5px;">
            <Col span="2" offset="22">
                <Button type="success" @click="add">创建问卷</Button>
            </Col>
        </Row>
        <Table stripe :columns="columns" :data="dataList"></Table>
        <div style="text-align: center;margin-top: 1em;">
            <Page :total="100" @on-change="pageChange"/>
        </div>

        <Modal
                v-model="isShowUserGroupModal"
                title="请选择用户组"
                :mask-closable="false"
        >
            <p>
                <Select v-model="userGroup" >
                    <Option v-for="item in userGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </p>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowUserGroupModal=false">取消</Button>
                <Button type="primary" size="large" @click="selectUserGroup">确定</Button>
            </div>
        </Modal>


        <Modal
                v-model="isShowPaperModal"
                :title="opType==='add'?'创建问卷':'编辑问卷'"
                :mask-closable="false"
        >
            <Form :model="paperForm" :label-width="80" :rules="paperFormRules" ref="paperForm">
                <FormItem label="名称" prop="name">
                    <Input v-model="paperForm.name" placeholder="请输入问卷名称"></Input>
                </FormItem>
                <FormItem label="别名" prop="aliasName">
                    <Input v-model="paperForm.aliasName" placeholder="请输入问卷别名"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowPaperModal=false">取消</Button>
                <Button type="primary" size="large" @click="opPaper">确定</Button>
            </div>
        </Modal>



    </div>


</template>

<script>
    export default {
        data() {
            return {
                paperFormRules: {
                    name: [
                        {required: true, message: "问卷名称不能为空", trigger: "blur"}
                    ],
                    aliasName: [
                        {required: true, message: "问卷别名不能为空", trigger: "blur"}
                    ],
                },
                paperForm:{
                  name:'',
                  aliasName:''
                },
                isShowPaperModal:false,
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
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '别名',
                        key: 'aliasName'
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
                                        type:'primary',
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
                                            this.publish(params)
                                        }
                                    }
                                },'发布')
                            ])
                        }
                    }

                ],
                dataList: [],
                opType:'add',
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            opPaper(){
                this.$refs.paperForm.validate(valid=>{
                    if(valid){
                        this.isShowPaperModal=false;

                        if(this.opType==='add'){
                            this.$Message.success("添加成功！")
                        }else{
                            this.$Message.success("编辑成功！")
                        }

                    }
                })
            },
            selectUserGroup(){

            },
            pageChange(page){
              console.log(page)
            },
            getList() {
                // this.http.get('users/list', {}).then(data => {

                let data=[{
                    name:'问卷1',
                    aliasName:'问卷别名1',
                    createDt:'2019/02/17',
                    state:0,
                },{
                    name:'问卷2',
                    aliasName:'问卷别名2',
                    createDt:'2019/02/17',
                    state:1,
                }]


                    this.dataList = data;
                // })
            },
            /**
             * 查看，设置量表
             */
            detail(){
                this.$router.push('/paper/detail')
            },
            add() {
                this.paperForm={}
                this.opType='add'
                this.isShowPaperModal=true;
            },

            edit(params){
                this.opType='edit'
                this.paperForm=params.row;
                this.isShowPaperModal=true;

                // this.$router.push({
                //     path:'/paper/operate',
                //     query:{
                //         opType:'edit',
                //         id:'id',
                //         // id:params.row._id,
                //     }
                // })
            },
            publish(params){
                this.isShowUserGroupModal=true;
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
