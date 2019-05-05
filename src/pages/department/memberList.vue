<template>
    <Row>
        <Row>
            <Row>
                <Col span="8">
                    全部<span>356</span>人
                </Col>
                <Col span="16">
                    <Row>
                        <Col span="3">部门</Col>
                        <Col span="14">
                            <Select v-model="model1" >
                                <Option v-for="item in deptList" :value="item.value" :key="item">{{ item.label }}</Option>
                            </Select>
                        </Col>
                        <Col span="3">
                            <span>20</span>人
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Table :columns="columns1" :data="data1"></Table>
        </Row>
    </Row>
</template>
<script type="text/ecmascript-6">
    import {util} from 'util'
    import {tjdServices} from 'tjdServices'

    export default {
        data () {
            return {
                todayCount:'18',
                phone:'18601965856',
                team:'北京停简单信息技术有限公司',
                value2: ['2016-01-01', '2016-02-15'],
                deptList: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                model1:'chongqing',
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道'
                    }
                ]
            }
        },
        mounted: function () {
        },
        methods: {
            transCarnum2Parent: function(carNum) {
                this.queryOrderByCarNum(carNum)
            },
            setCarnum2Child: function (carNum) {
                this.$broadcast('setCarnum2Child',carNum)
            },
            /**
             * 根据车牌号查询在场订单
             * 带车场id的话可以模糊查询，不带车场id的话不会模糊查询
             */
            queryOrderByCarNum:function(carNum){
                if(carNum.length<this.minCarNumLength ){
                    $.showTjdModal({
                        errorMsg:'请输入完整的车牌号!',
                        type:2
                    })
                }else{//查询操作
                    tjdServices.request({

                        method:'insideGetOrder',
                        carNum:carNum,
                        parkId:util.getSession('prePayPmParkId'),
                        deviceId:util.getSession('deviceId'),
                        prePayType:util.prePayTypes.inScan,

                    }).then((data)=>{
                        util.setSession('carNum',carNum);


                        if(data.parkInfos.length==0){
                            $.showTjdModal({
                                errorMsg:"未找到该车辆！",
                                type:2
                            });
                        }else{
                            //isLike是否模糊查询出来的
                            if(data.isLike=="true"){//调到订单列表页面
                                sessionStorage.prePayInPark_carList=JSON.stringify(data.parkInfos);
                                location.href="orderList.html";
                            }else{//
                                var orderInfo=data.parkInfos[0];

                                localStorage.prePayInPark_toPayOrderId=orderInfo.parkInfoId;
                                this.$router.push({ path: '/prePayCouponPage' })
                            }
                        }
                    })
                }
            },
            insideQrTrigger: function (parkId) {
                tjdServices.request({
                    method:'insideQrTrigger',
                    parkId:parkId,
                    deviceId:util.getSession('deviceId'),
                    scanRecordId:util.getScanRecordId()
                }).then(function(data){
                });
            },
            init: function () {
                //一般的场内扫码支付不带车场id，但是重庆玖玺台的需要带，为了记录用户扫码来源
                var pmParkId="",imgNum="";
                if(!util.isEmpty(util.getUrlArray())){
                    pmParkId=util.getUrlArray()[0];
                    if(util.getUrlArray().length>1){
                        imgNum=util.getUrlArray()[1];
                    }

                    pmParkId=(pmParkId==='xxx'?'':pmParkId);
                    imgNum=(imgNum==='xxx'?'':imgNum);
                }
                util.setSession('prePayPmParkId',pmParkId);
                util.setSession('deviceId',imgNum);
                vue.isShow8Discount();
            },
            /**
             * 是否显示线上支付享受8折优惠
             */
            isShow8Discount: function () {

                if(!util.isEmpty(util.getSession('prePayPmParkId'))){
                    tjdServices.request({
                        method:'isPayDiscount',
                        parkId:util.getSession('prePayPmParkId')
                    }).then(function (data) {
                        if(data.isDiscount=='true'){
                            vue.is8Discount=true;
                            util.setSession('is8Discount','1');
                        }
                    })

                }
            },
            test: function () {
                $('body').show();
                vue.init();
                vue.insideQrTrigger(util.getSession('prePayPmParkId'));
                localStorage.prePayInPark_openId=sessionStorage.openId;
            },
            initial: function () {
                util.removeCookie('deviceId')
                util.removeCookie('scanRecordId')
                tjdServices.getLoginInfo().then(function(data){
                    $('body').show();
                    vue.init();
                    vue.insideQrTrigger(util.getSession('prePayPmParkId'));
                    localStorage.prePayInPark_openId=sessionStorage.openId;
                },function(data){
                    $("body").show();
                    vue.init();
                    vue.insideQrTrigger(util.getSession('prePayPmParkId'));
                    localStorage.prePayInPark_openId=sessionStorage.openId;
                });
            }
        }
    }

</script>
<style lang="less" scoped>
    @import '../../assets/css/reset.less';

    body{
        background: red;
    }
</style>