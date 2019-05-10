<template>


    <div>
        <Row style="padding:5px;">
            <Col span="4" offset="20">
                <Button type="success" @click="add">创建子问卷</Button>
                <Button type="primary" @click="showSetEntranceModal">设置入口问卷</Button>
            </Col>
        </Row>
        <Table stripe :columns="columns" :data="dataList"></Table>
        <div style="text-align: center;margin-top: 1em;">
            <Page :total="100" @on-change="pageChange"/>
        </div>



        <!--创建和编辑问卷-->
        <Modal
                v-model="isShowPaperModal"
                :title="opType==='add'?'创建子问卷':'编辑子问卷'"
                :mask-closable="false"
        >
            <Form :model="paperForm" :label-width="80" :rules="paperFormRules" ref="paperForm">
                <FormItem label="名称" prop="name">
                    <Input v-model="paperForm.name" placeholder="请输入问卷名称"></Input>
                </FormItem>
                <FormItem label="别名" prop="aliasName">
                    <Input v-model="paperForm.aliasName" placeholder="请输入问卷别名"></Input>
                </FormItem>
                <h3>选择量表</h3>
                <br/>
                <FormItem label="" prop="measureTable">
                    <CheckboxGroup v-model="paperForm.measureTable">
                        <Checkbox label="香蕉"></Checkbox>
                        <Checkbox label="苹果"></Checkbox>
                        <Checkbox label="西瓜232"></Checkbox>
                        <Checkbox label="西瓜2323"></Checkbox>
                        <Checkbox label="西瓜2322222"></Checkbox>
                        <Checkbox label="西瓜2"></Checkbox>
                        <Checkbox label="西1"></Checkbox>
                        <Checkbox label="西2"></Checkbox>
                        <Checkbox label="西3"></Checkbox>
                        <Checkbox label="西4"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowPaperModal=false">取消</Button>
                <Button type="primary" size="large" @click="opPaper">确定</Button>
            </div>
        </Modal>


        <!--设置入口问卷-->
        <Modal
                v-model="isShowSetEntranceModal"
                title="设置入口问卷"
                :mask-closable="false"
        >
            <p>
                <Select v-model="entrancePaperId" >
                    <Option v-for="item in dataList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </p>
            <div slot="footer">
                <Button type="text" size="large" @click="isShowSetEntranceModal=false">取消</Button>
                <Button type="primary" size="large" @click="setEntrancePaper">确定</Button>
            </div>
        </Modal>


        <!--规则弹窗-->
        <Modal
                v-model="isShowRuleModal"
                title="规则设置"
                :mask-closable="false"
        >

            <!-- TODO 此处规则如何设置？此处的条目个数是指？共几条是用户随便添加的还是？-->
            <Form :model="ruleForm" :label-width="80" ref="ruleForm">
                <FormItem label="名称" prop="name">
                    <Input v-model="paperForm.name" placeholder="请输入问卷名称"></Input>
                </FormItem>
                <FormItem label="别名" prop="aliasName">
                    <Input v-model="paperForm.aliasName" placeholder="请输入问卷别名"></Input>
                </FormItem>
                <h3>选择量表</h3>
                <br/>
                <FormItem label="" prop="measureTable">
                    <CheckboxGroup v-model="paperForm.measureTable">
                        <Checkbox label="香蕉"></Checkbox>
                        <Checkbox label="苹果"></Checkbox>
                        <Checkbox label="西瓜232"></Checkbox>
                        <Checkbox label="西瓜2323"></Checkbox>
                        <Checkbox label="西瓜2322222"></Checkbox>
                        <Checkbox label="西瓜2"></Checkbox>
                        <Checkbox label="西1"></Checkbox>
                        <Checkbox label="西2"></Checkbox>
                        <Checkbox label="西3"></Checkbox>
                        <Checkbox label="西4"></Checkbox>
                    </CheckboxGroup>
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

    //TODO 父问卷多个子问卷，子问卷的规则是必须设置的吗？还是可选的？规则和对应的下一张试卷必须都有吗？

    export default {
        data() {
            return {
                fruit: ['苹果'],
                entrancePaperId:'',//入口子问卷id
                isShowSetEntranceModal:false,
                paperFormRules: {
                    name: [
                        {required: true, message: "问卷名称不能为空", trigger: "blur"}
                    ],
                    aliasName: [
                        {required: true, message: "问卷别名不能为空", trigger: "blur"}
                    ],
                    measureTable: [
                        {required: true, type:'array',min:1,message: "量表不能为空", trigger: "change"}
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
                        width:120,
                        key: 'createDt'
                    },
                    {
                        title: '状态',
                        width:120,
                        key: 'state',
                        render: (h, params) => {
                            return h('div', {}, params.row.state === 0 ? '已完成' : '未完成')
                        }
                    },
                    {
                        title: '入口问卷',
                        width:120,
                        key: 'isEntrance',
                        render: (h, params) => {
                            return h('div', {}, params.row.isEntrance ? '是' : '否')
                        }
                    },
                    {
                        title: '移动',
                        key: 'move',
                        render: (h, params) => {
                            return h('div', [
                                h(params.index===0?'':'Icon',{
                                    props:{
                                        type:'md-arrow-round-up',
                                        size:'small',
                                        size:20
                                    },
                                    style:{
                                        cursor:'pointer',
                                        marginRight:'6px',

                                    },
                                    on:{
                                        click:()=>{
                                            this.up(params)
                                        }
                                    }
                                },''),
                                h(params.index===this.dataList.length-1?'':'Icon',{
                                    props:{
                                        type:'md-arrow-round-down',
                                        size:20
                                    },
                                    style:{
                                        cursor:'pointer',
                                    },
                                    on:{
                                        click:()=>{
                                            this.down(params)
                                        }
                                    }
                                },''),


                            ])
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
                                            this.rule(params)
                                        }
                                    }
                                },'规则')

                            ])
                        }
                    }

                ],
                dataList: [],
                opType:'add',
                oldEntrancePaperId:null
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            //显示设置入口问卷弹窗
            showSetEntranceModal(){

                if(this.dataList){
                    this.isHasEntrancePaper();//显示弹窗前先执行此方法，获取入口问卷id
                    this.isShowSetEntranceModal=true;

                    this.oldEntrancePaperId=this.entrancePaperId


                }else{
                    this.$Message.warning("请先添加子问卷！")
                }
            },
            //设置入口问卷
            setEntrancePaper(){
                if(!this.entrancePaperId){
                    this.$Message.warning("请选择入口问卷！")
                }else{
                    //调用后台接口

                    if(this.entrancePaperId===this.oldEntrancePaperId){
                        this.$Message.warning("入口问卷没有改变！")
                        return;
                    }

                    this.isShowSetEntranceModal=false;
                    this.$Message.success("设置成功！")
                    this.realSetEntranceId();
                    this.getList()
                }
            },
            realSetEntranceId(){
                let d=JSON.parse(sessionStorage.dataList)

                //先找到新的入口试卷，从列表删除，存起来；然后将新试卷设置为入口试卷，老入口试卷去掉入口，新入口的nextId设置为老入口试卷的id



                let oldPaperIndex=-1,newPaperIndex=-1;

                for(let i=0;i<d.length;i++){
                    if(this.entrancePaperId===d[i].id){
                        newPaperIndex=i;
                    }

                    if(d[i].isEntrance){
                        oldPaperIndex=i;
                    }
                }

                let newTemp=JSON.parse(JSON.stringify(d[newPaperIndex]))

                //删除

                let params={
                    row:newTemp
                }

                if(!params.row.nextId){//如果删除的试卷没有nextId，则说明是最后一个，将nextId是此id的试卷的nextId变为空，同事删除当前试卷
                    let id=params.row.id;
                    this.deleteById(id);
                    this.setNextIdNullByNextId(id)
                }else{
                    if(params.row.isEntrance){//入口试卷不能删除，先设置其它试卷为入口试卷
                        alert("不会走到这里")
                    }else{//将上一张试卷的nextId换为本试卷的nextId，然后删除本试卷;
                        let id=params.row.id;
                        let nextId=params.row.nextId;
                        this.setNextIdTheValueWhereNextIdIsValue(nextId,id)
                        this.deleteById(id)
                    }
                }

                //新入口试卷设置，nextId设置为老的id
                d=JSON.parse(sessionStorage.dataList)

                let oldOne=null

                for(let i=0;i<d.length;i++){

                    if(d[i].isEntrance){
                        d[i].isEntrance=false;
                        oldOne=d[i]
                        break
                    }
                }

                newTemp.nextId=oldOne.id;
                newTemp.isEntrance=true;
                d.push(newTemp)

                sessionStorage.dataList=JSON.stringify(d)
            },
            /**
             * 在指定试卷后边添加试卷;在position位置的试卷后边添加paper
             * */
            insertAfterIdEqual(id,paper){

                let d=JSON.parse(sessionStorage.dataList)

                let index=-1;

                for(let i=0;i<d.length;i++){
                    if(id===d[i].id){
                        index=i;
                        break;
                    }
                }

                let oldNextId=d[index].nextId;
                if(oldNextId){
                    d[index].nextId=paper.id;
                }else{
                    d[index].nextId=paper.id;
                    paper.nextId='';

                }

                d.push(paper)
                sessionStorage.dataList=JSON.stringify(d)


            },

            findPaperByNextId(nextId){
                let d=JSON.parse(sessionStorage.dataList)

                let index=-1;

                for(let i=0;i<d.length;i++){
                    if(nextId===d[i].nextId){
                        index=i;
                        break;
                    }
                }

                return d[index]
            },

            up(params){
                if(params.index===1){//此时相当于将本试卷设置为入口试卷
                    this.entrancePaperId=params.row.id;
                    this.realSetEntranceId();
                    this.getList()
                }else{
                    //先删除上一个试卷，然后将删除的插入本试卷末尾
                    let toDeletePaper=this.findPaperByNextId(params.row.id)
                    this.deleteById(toDeletePaper.id)

                    this.setNextIdTheValueWhereNextIdIsValue(toDeletePaper.nextId,toDeletePaper.id)


                    this.insertAfterIdEqual(params.row.id,toDeletePaper)
                    this.getList()
                }
            },
            down(params){
                if(params.index===0){//此时相当于将本试卷2设置为入口试卷
                    this.entrancePaperId=params.row.nextId;
                    this.realSetEntranceId();
                    this.getList()
                }else{
                    //先删除本试卷，然后将删除的插入下个试卷末尾
                    let toDeletePaper=params.row
                    this.deleteById(toDeletePaper.id)

                    this.setNextIdTheValueWhereNextIdIsValue(toDeletePaper.nextId,toDeletePaper.id)

                    this.insertAfterIdEqual(params.row.nextId,toDeletePaper)
                    this.getList()
                }
            },
            /**
             * 是否设置了入口问卷，否则不能进行规则配置和问卷顺序调整
             * */
            isHasEntrancePaper(){
                let flag=false;
                for(let i=0;i<this.dataList.length;i++){
                    if(this.dataList[i].isEntrance){
                        this.entrancePaperId=this.dataList[i].id;
                        flag=true;
                        break;
                    }
                }
                return flag;

            },
            getMaxId(){
              if(this.dataList.length>0){
                let array=[]

                this.dataList.forEach(item=>{
                    array.push(item.id)
                })

                  return Math.max.apply(Math,array)+1;


              }  else{
                  return 1;
              }
            },
            opPaper(){
                this.$refs.paperForm.validate(valid=>{
                    if(valid){




                        this.isShowPaperModal=false;

                        if(this.opType==='add'){


                            if(sessionStorage.dataList && JSON.parse(sessionStorage.dataList).length>0){
                                let d=JSON.parse(sessionStorage.dataList)
                                let id=this.getMaxId()


                                //将此设置为库里没有nextId的试卷的nextId

                                for(let i=0;i<d.length;i++){
                                    if(!d[i].nextId){
                                        d[i].nextId=id;
                                    }
                                }


                                d.push({
                                    id:id,
                                    name:this.paperForm.name,
                                    aliasName:this.paperForm.aliasName,
                                    createDt:'2019/02/17',
                                    state:0,
                                    isEntrance:false,
                                    nextId:''
                                })

                                sessionStorage.dataList=JSON.stringify(d)
                            }else{
                                let id=this.getMaxId()
                                let d=[]
                                d.push({
                                    id:id,
                                    name:this.paperForm.name,
                                    aliasName:this.paperForm.aliasName,
                                    createDt:'2019/02/17',
                                    state:0,
                                    isEntrance:true,
                                    nextId:''
                                })

                                sessionStorage.dataList=JSON.stringify(d)
                            }




                            this.$Message.success("添加成功！")
                            this.getList()
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


                if(sessionStorage.dataList){
                    let dataList=JSON.parse(sessionStorage.dataList)

                    let newArray=[];

                    let entrance=null;

                    let nextId='';

                    for(let i=0;i<dataList.length;i++){
                        if(dataList[i].isEntrance){
                            entrance=dataList[i]
                            newArray.push(dataList[i])
                            nextId=entrance.nextId
                            break;
                        }
                    }
                    if(nextId){
                        while(true){
                            if(nextId){
                                for(let i=0;i<dataList.length;i++){
                                    if(dataList[i].id===nextId){

                                        newArray.push(dataList[i])
                                        nextId=dataList[i].nextId;
                                        break;
                                    }
                                }
                            }else{
                                break;
                            }

                        }
                    }





                    this.dataList=newArray;
                }else{
                    this.dataList=[]

                    // sessionStorage.dataList=JSON.stringify(this.dataList)
                }


            },
            /**
             * 查看，进入子问卷
             */
            detail(){

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
            rule(params){
                if(!this.isHasEntrancePaper()){
                    this.$Message.warning('请先设置入口子问卷！')
                }
            },
            deleteById(id){
                let d=JSON.parse(sessionStorage.dataList)

                let index=-1;

                for(let i=0;i<d.length;i++){
                    if(id===d[i].id){
                        index=i;
                        break;
                    }
                }

                d.splice(index,1);

                sessionStorage.dataList=JSON.stringify(d)
            },

            setNextIdNullByNextId(nextId){
                let d=JSON.parse(sessionStorage.dataList)


                for(let i=0;i<d.length;i++){
                    if(nextId===d[i].nextId){
                        d[i].nextId=''
                        break;
                    }
                }
                sessionStorage.dataList=JSON.stringify(d)

            },
            setNextIdTheValueWhereNextIdIsValue(theValue,value){
                let d=JSON.parse(sessionStorage.dataList)


                for(let i=0;i<d.length;i++){
                    if(value===d[i].nextId){
                        d[i].nextId=theValue
                        break;
                    }
                }
                sessionStorage.dataList=JSON.stringify(d)

            },

            delete(params){

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {


                        if(this.dataList.length===1){//只有一张时直接删除
                            this.deleteById(params.row.id)
                        }else{
                            if(!params.row.nextId){//如果删除的试卷没有nextId，则说明是最后一个，将nextId是此id的试卷的nextId变为空，同事删除当前试卷
                                let id=params.row.id;
                                this.deleteById(id);
                                this.setNextIdNullByNextId(id)
                            }else{
                                if(params.row.isEntrance){//入口试卷不能删除，先设置其它试卷为入口试卷
                                    this.$Message.error({
                                        content:"不能删除入口试卷，请先设置其它试卷为入口试卷！",
                                        duration:5
                                    })
                                    return;
                                }else{//将上一张试卷的nextId换为本试卷的nextId，然后删除本试卷;
                                    let id=params.row.id;
                                    let nextId=params.row.nextId;
                                    this.setNextIdTheValueWhereNextIdIsValue(nextId,id)
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
