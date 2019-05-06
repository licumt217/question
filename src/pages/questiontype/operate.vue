<template>
    <Row  style="margin-top:3em;">
        <Col span="8" offset="8">
            <Form ref="addForm" :model="formItem" :label-width="80" :rules="rules">

                <FormItem label="试题类型" prop="type">
                    <Select v-model="formItem.type">
                        <Option v-for="type in typeArray" :value="type.key">{{type.desc}}</Option>
                    </Select>
                </FormItem>


                <FormItem>
                    <Button type="primary" @click="operate">确定</Button>
                    <Button style="margin-left: 8px" @click="go2List">返回</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                typeArray:[{
                    key:0,
                    desc:'填空题'
                },{
                    key:1,
                    desc:'单选题'
                },{
                    key:2,
                    desc:'问答题'
                },],
                isEdit:this.$route.query.opType==='edit',
                formItem: {
                    type: 0,
                    author: '',

                },
                rules:{
                    type:[
                        {required:true,message:'试题类型不能为空',trigger:'blur'},
                    ]
                }
            }
        },
        mounted(){
          console.log(this.opType)
            if(this.isEdit){

                this.formItem={
                    type:0
                };
            }
        },
        methods:{
            operate(){
                this.$refs.addForm.validate(valid=>{
                    if(valid){


                        this.$Message.success("添加成功")

                        this.$router.push('/questiontype/list')

                        return;


                        let url='books/add';
                        if(this.isEdit){
                            url='books/update'
                        }

                        this.http.post(url,this.formItem).then(()=>{
                            this.$router.push('/book/list')
                        }).catch(err=>{
                            this.$Message.error(err)
                        })

                    }
                });
            },
            go2List(){
                this.$router.push('/questiontype/list')
            }
        }
    }
</script>
