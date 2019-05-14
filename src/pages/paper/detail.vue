<template>


    <div>
        <Row style="padding:5px;">
            <Col span="4" offset="20">
                <Button type="success" @click="add">添加量表</Button>
                <Button type="primary" @click="go2TableGroup">量表组设置</Button>
            </Col>
        </Row>

        <Row>
            <Col span="16" offset="4">
                <Card style="width:100%;margin-bottom: 1em;" v-for="data in data.groupList">
                    <p slot="title">
                        {{data.tableGroupName}}
                    </p>
                    <Row v-for="item in data.tableList" style="margin-bottom: 5px;">
                        <Col span="18">
                            {{item.tableName}}
                        </Col>
                        <Col span="6">
                            <Button type="error" size="small" @click="remove">移除</Button>
                            <Button type="success" size="small" @click="setEntranceTable">设置为入口量表</Button>
                        </Col>
                    </Row>

                </Card>

                <Card style="width:100%;margin-bottom: 1em;" v-for="data in data.dataList">
                    <Row>
                        <Col span="18">
                            {{data.tableName}}
                        </Col>
                        <Col span="6">
                            <Button type="error" size="small" @click="remove">移除</Button>
                            <Button type="success" size="small" @click="showTableGroupModal">设置量表组</Button>
                        </Col>
                    </Row>

                </Card>
            </Col>
        </Row>


        <!--选择量表-->
        <Modal
                v-model="isShowModal"
                title="选择量表"
                :mask-closable="false"
        >
            <Form :model="formItem" :label-width="100">

                <FormItem label="请选择量表">
                    <Select v-model="formItem.tableId">
                        <Option v-for="item in tableList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>

            </Form>

            <div slot="footer">
                <Button type="text" size="large" @click="isShowModal=false">取消</Button>
                <Button type="primary" size="large" @click="save">确定</Button>
            </div>
        </Modal>

        <!--设置量表组-->
        <Modal
                v-model="isShowTableGroupModal"
                title="设置量表组"
                :mask-closable="false"
        >
            <Form :label-width="100">

                <FormItem label="请选择量表组">
                    <Select v-model="tableGroupId">
                        <Option v-for="item in tableGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>

            </Form>

            <div slot="footer">
                <Button type="text" size="large" @click="isShowTableGroupModal=false">取消</Button>
                <Button type="primary" size="large" @click="setTableGroup()">确定</Button>
            </div>
        </Modal>


    </div>


</template>

<script>

    export default {
        data() {
            return {

                formItem: {},
                entrancePaperId: '',//入口子问卷id
                isShowModal: false,
                isShowTableGroupModal:false,
                paperForm: {
                    name: '',
                    aliasName: ''
                },
                userGroup: '',
                isShowUserGroupModal: false,
                opType: 'add',
                oldEntrancePaperId: null,
                tableList: [{
                    id: 1,
                    name: '量表1',
                    createDt: '2019/02/17',
                }, {
                    id: 2,
                    name: '量表2',
                    createDt: '2019/02/17',
                }, {
                    id: 3,
                    name: '量表3',
                    createDt: '2019/02/17',
                }],
                tableGroupList: [{
                    id: 1,
                    name: '量表组1',
                    createDt: '2019/02/17',
                }, {
                    id: 2,
                    name: '量表组2',
                    createDt: '2019/02/17',
                }],
                data: {
                    groupList: [{
                        tableGroupId: 1,
                        tableGroupName: '量表组1',
                        tableList: [{
                            tableId: 1,
                            tableName: '量表1',

                        }, {
                            tableId: 2,
                            tableName: '量表2',

                        }, {
                            tableId: 3,
                            tableName: '量表3',

                        }]
                    }, {
                        tableGroupId: 2,
                        tableGroupName: '量表组2',
                        tableList: [{
                            tableId: 4,
                            tableName: '量表4',

                        }, {
                            tableId: 5,
                            tableName: '量表5',

                        }, {
                            tableId: 6,
                            tableName: '量表6',

                        }]
                    }],

                    dataList: [{
                        tableId: 7,
                        tableName: '量表7',

                    }, {
                        tableId: 8,
                        tableName: '量表8',

                    },],

                },
                tableGroupId:''
            }
        },
        mounted() {
            // this.getList()
        },
        methods: {
            showTableGroupModal(){
                this.isShowTableGroupModal=true;
            },
            setTableGroup(){
                if(!this.tableGroupId){
                    this.$Message.warning('请选择量表组！');
                    return;

                }

                this.isShowTableGroupModal=false;
                this.$Message.success('设置成功！');
            },

            remove(){
                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {
                        this.$Message.success('删除成功！');
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });
            },
            save() {


                if (!this.formItem.tableId) {
                    this.$Message.warning("请选择量表！")
                    return
                }

                this.$Message.warning("添加成功！")
                this.isShowModal = false;


            },
            /**
             * 量表组
             * */
            go2TableGroup() {
                this.$router.push('/table/group')
            },
            //显示设置入口问卷弹窗
            showSetEntranceModal() {

                if (this.dataList) {
                    this.isHasEntrancePaper();//显示弹窗前先执行此方法，获取入口问卷id
                    this.isShowSetEntranceModal = true;

                    this.oldEntrancePaperId = this.entrancePaperId


                } else {
                    this.$Message.warning("请先添加子问卷！")
                }
            },
            //设置入口量表
            setEntranceTable() {
                this.$Modal.confirm({
                    title: '您确认设置此量表为入口量表吗？',
                    content: '',
                    onOk: () => {
                        this.$Message.success('设置成功！');
                    },
                    onCancel: () => {
                        // this.$Message.info('Clicked cancel');
                    }
                });
            },
            realSetEntranceId() {
                let d = JSON.parse(sessionStorage.dataList)

                //先找到新的入口试卷，从列表删除，存起来；然后将新试卷设置为入口试卷，老入口试卷去掉入口，新入口的nextId设置为老入口试卷的id


                let oldPaperIndex = -1, newPaperIndex = -1;

                for (let i = 0; i < d.length; i++) {
                    if (this.entrancePaperId === d[i].id) {
                        newPaperIndex = i;
                    }

                    if (d[i].isEntrance) {
                        oldPaperIndex = i;
                    }
                }

                let newTemp = JSON.parse(JSON.stringify(d[newPaperIndex]))

                //删除

                let params = {
                    row: newTemp
                }

                if (!params.row.nextId) {//如果删除的试卷没有nextId，则说明是最后一个，将nextId是此id的试卷的nextId变为空，同事删除当前试卷
                    let id = params.row.id;
                    this.deleteById(id);
                    this.setNextIdNullByNextId(id)
                } else {
                    if (params.row.isEntrance) {//入口试卷不能删除，先设置其它试卷为入口试卷
                        alert("不会走到这里")
                    } else {//将上一张试卷的nextId换为本试卷的nextId，然后删除本试卷;
                        let id = params.row.id;
                        let nextId = params.row.nextId;
                        this.setNextIdTheValueWhereNextIdIsValue(nextId, id)
                        this.deleteById(id)
                    }
                }

                //新入口试卷设置，nextId设置为老的id
                d = JSON.parse(sessionStorage.dataList)

                let oldOne = null

                for (let i = 0; i < d.length; i++) {

                    if (d[i].isEntrance) {
                        d[i].isEntrance = false;
                        oldOne = d[i]
                        break
                    }
                }

                newTemp.nextId = oldOne.id;
                newTemp.isEntrance = true;
                d.push(newTemp)

                sessionStorage.dataList = JSON.stringify(d)
            },
            /**
             * 在指定试卷后边添加试卷;在position位置的试卷后边添加paper
             * */
            insertAfterIdEqual(id, paper) {

                let d = JSON.parse(sessionStorage.dataList)

                let index = -1;

                for (let i = 0; i < d.length; i++) {
                    if (id === d[i].id) {
                        index = i;
                        break;
                    }
                }

                let oldNextId = d[index].nextId;
                if (oldNextId) {
                    d[index].nextId = paper.id;
                } else {
                    d[index].nextId = paper.id;
                    paper.nextId = '';

                }

                d.push(paper)
                sessionStorage.dataList = JSON.stringify(d)


            },

            findPaperByNextId(nextId) {
                let d = JSON.parse(sessionStorage.dataList)

                let index = -1;

                for (let i = 0; i < d.length; i++) {
                    if (nextId === d[i].nextId) {
                        index = i;
                        break;
                    }
                }

                return d[index]
            },

            up(params) {
                if (params.index === 1) {//此时相当于将本试卷设置为入口试卷
                    this.entrancePaperId = params.row.id;
                    this.realSetEntranceId();
                    this.getList()
                } else {
                    //先删除上一个试卷，然后将删除的插入本试卷末尾
                    let toDeletePaper = this.findPaperByNextId(params.row.id)
                    this.deleteById(toDeletePaper.id)

                    this.setNextIdTheValueWhereNextIdIsValue(toDeletePaper.nextId, toDeletePaper.id)


                    this.insertAfterIdEqual(params.row.id, toDeletePaper)
                    this.getList()
                }
            },
            down(params) {
                if (params.index === 0) {//此时相当于将本试卷2设置为入口试卷
                    this.entrancePaperId = params.row.nextId;
                    this.realSetEntranceId();
                    this.getList()
                } else {
                    //先删除本试卷，然后将删除的插入下个试卷末尾
                    let toDeletePaper = params.row
                    this.deleteById(toDeletePaper.id)

                    this.setNextIdTheValueWhereNextIdIsValue(toDeletePaper.nextId, toDeletePaper.id)

                    this.insertAfterIdEqual(params.row.nextId, toDeletePaper)
                    this.getList()
                }
            },
            /**
             * 是否设置了入口问卷，否则不能进行规则配置和问卷顺序调整
             * */
            isHasEntrancePaper() {
                let flag = false;
                for (let i = 0; i < this.dataList.length; i++) {
                    if (this.dataList[i].isEntrance) {
                        this.entrancePaperId = this.dataList[i].id;
                        flag = true;
                        break;
                    }
                }
                return flag;

            },
            getMaxId() {
                if (this.dataList.length > 0) {
                    let array = []

                    this.dataList.forEach(item => {
                        array.push(item.id)
                    })

                    return Math.max.apply(Math, array) + 1;


                } else {
                    return 1;
                }
            },
            opPaper() {
                this.$refs.paperForm.validate(valid => {
                    if (valid) {


                        if (this.opType === 'add') {


                            if (sessionStorage.dataList && JSON.parse(sessionStorage.dataList).length > 0) {
                                let d = JSON.parse(sessionStorage.dataList)
                                let id = this.getMaxId()


                                //将此设置为库里没有nextId的试卷的nextId

                                for (let i = 0; i < d.length; i++) {
                                    if (!d[i].nextId) {
                                        d[i].nextId = id;
                                    }
                                }


                                d.push({
                                    id: id,
                                    name: this.paperForm.name,
                                    aliasName: this.paperForm.aliasName,
                                    createDt: '2019/02/17',
                                    state: 0,
                                    isEntrance: false,
                                    nextId: ''
                                })

                                sessionStorage.dataList = JSON.stringify(d)
                            } else {
                                let id = this.getMaxId()
                                let d = []
                                d.push({
                                    id: id,
                                    name: this.paperForm.name,
                                    aliasName: this.paperForm.aliasName,
                                    createDt: '2019/02/17',
                                    state: 0,
                                    isEntrance: true,
                                    nextId: ''
                                })

                                sessionStorage.dataList = JSON.stringify(d)
                            }


                            this.$Message.success("添加成功！")
                            this.getList()
                        } else {
                            this.$Message.success("编辑成功！")
                        }

                    }
                })
            },
            selectUserGroup() {

            },
            pageChange(page) {
                console.log(page)
            },
            getList() {
                // this.http.get('users/list', {}).then(data => {


                if (sessionStorage.dataList) {
                    let dataList = JSON.parse(sessionStorage.dataList)

                    let newArray = [];

                    let entrance = null;

                    let nextId = '';

                    for (let i = 0; i < dataList.length; i++) {
                        if (dataList[i].isEntrance) {
                            entrance = dataList[i]
                            newArray.push(dataList[i])
                            nextId = entrance.nextId
                            break;
                        }
                    }
                    if (nextId) {
                        while (true) {
                            if (nextId) {
                                for (let i = 0; i < dataList.length; i++) {
                                    if (dataList[i].id === nextId) {

                                        newArray.push(dataList[i])
                                        nextId = dataList[i].nextId;
                                        break;
                                    }
                                }
                            } else {
                                break;
                            }

                        }
                    }


                    this.dataList = newArray;
                } else {
                    this.dataList = []

                    // sessionStorage.dataList=JSON.stringify(this.dataList)
                }


            },
            /**
             * 查看，进入子问卷
             */
            detail() {

            },
            /**
             * 选择量表
             */
            add() {

                if (!this.tableGroupList.length) {
                    this.$Message.warning("请先设置量表组！")
                    return;
                }

                this.isShowModal = true;
            },

            edit(params) {
                this.opType = 'edit'
                this.paperForm = params.row;

                // this.$router.push({
                //     path:'/paper/operate',
                //     query:{
                //         opType:'edit',
                //         id:'id',
                //         // id:params.row._id,
                //     }
                // })
            },
            rule(params) {
                if (!this.isHasEntrancePaper()) {
                    this.$Message.warning('请先设置入口子问卷！')
                }
            },
            deleteById(id) {
                let d = JSON.parse(sessionStorage.dataList)

                let index = -1;

                for (let i = 0; i < d.length; i++) {
                    if (id === d[i].id) {
                        index = i;
                        break;
                    }
                }

                d.splice(index, 1);

                sessionStorage.dataList = JSON.stringify(d)
            },

            setNextIdNullByNextId(nextId) {
                let d = JSON.parse(sessionStorage.dataList)


                for (let i = 0; i < d.length; i++) {
                    if (nextId === d[i].nextId) {
                        d[i].nextId = ''
                        break;
                    }
                }
                sessionStorage.dataList = JSON.stringify(d)

            },
            setNextIdTheValueWhereNextIdIsValue(theValue, value) {
                let d = JSON.parse(sessionStorage.dataList)


                for (let i = 0; i < d.length; i++) {
                    if (value === d[i].nextId) {
                        d[i].nextId = theValue
                        break;
                    }
                }
                sessionStorage.dataList = JSON.stringify(d)

            },

            delete(params) {

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {


                        if (this.dataList.length === 1) {//只有一张时直接删除
                            this.deleteById(params.row.id)
                        } else {
                            if (!params.row.nextId) {//如果删除的试卷没有nextId，则说明是最后一个，将nextId是此id的试卷的nextId变为空，同事删除当前试卷
                                let id = params.row.id;
                                this.deleteById(id);
                                this.setNextIdNullByNextId(id)
                            } else {
                                if (params.row.isEntrance) {//入口试卷不能删除，先设置其它试卷为入口试卷
                                    this.$Message.error({
                                        content: "不能删除入口试卷，请先设置其它试卷为入口试卷！",
                                        duration: 5
                                    })
                                    return;
                                } else {//将上一张试卷的nextId换为本试卷的nextId，然后删除本试卷;
                                    let id = params.row.id;
                                    let nextId = params.row.nextId;
                                    this.setNextIdTheValueWhereNextIdIsValue(nextId, id)
                                    this.deleteById(id)
                                }
                            }
                        }


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
