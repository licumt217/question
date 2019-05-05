/**
 * Created by liqiang on 2017/6/3.
 */
//require.config({
//    paths:{
//        'tjdModal':'../../common/js/tjd/tjd_modal',
//        'tjdPcModal':		'../../common/js/tjd_pc_modal',
//    }
//})
//
//define(['util','jquery','tjdModal','tjdPcModal'],function (util,$,tjdModal,tjdPcModal) {
    import {util} from './tjdUtils';

    var tjdServices={
        /**handleExpOwn
         * 通用ajax访问对象
         * @param obj
         * @returns {*}
         */
        commonAjax: function (obj) {
            var deferred = $.Deferred();
            var promise = deferred.promise();
            var myRandom="";
            if(!obj.noRandom){
                var myRandom="?"+Math.random();
            }


            var requestType='post',urlPrefix=util.constants.tcserverUrl+ "gateway"+myRandom;
            obj.params=util.isEmpty(obj.params)?{}:obj.params;
            if(!util.isEmpty(obj.requestType)){
                requestType=obj.requestType;
            }
            //区分是通用的还是大接口
            //默认是老接口
            if(!obj.isBigInterface){//老接口
                if(obj.isWxControl){
                    urlPrefix= util.constants.wxControlUrl+obj.method;
                }else{
                    urlPrefix= util.constants.tcserverUrl+obj.method;
                }
                if(urlPrefix.indexOf('?')!==-1){
                    urlPrefix=urlPrefix +"&xxx="+Math.random();
                }else{
                    urlPrefix=urlPrefix +myRandom;
                }


                var commonParam=util.getCommonMap();
                if(obj.data){
                    if(obj.data.hasOwnProperty('phone')){
                        commonParam.remove('phone')
                    }
                }


                obj.params={
                    common:commonParam.toJson(),
                    data:JSON.stringify(obj.data)
                }
                if(obj.isWxControl){
                    obj.params=JSON.parse(obj.params.data);
                }
                if(obj.data && obj.data.isParamRaw){//嘉宾那边接口需要直接传具体参数的key-value
                    obj.params=obj.data;
                }
            }

            $[requestType](urlPrefix,obj.params, function (data) {
                if(typeof obj.params =='string' && obj.params.indexOf('|')==-1){
                    var key=JSON.parse(obj.params).method;
                    util.removeSession(key);
                }else if(typeof obj.params =='object' ){
                    var key=obj.params.method;
                    util.removeSession(key);

                }


                if(obj.data && obj.data.successKey){//有些接口返回的成功失败值不是isSuccess
                    data.isSuccess=data[obj.data.successKey];
                }


                if(data.isSuccess==="0"){
                    deferred.resolve(data);
                }else if (data.isSuccess === "1") {
                    if(obj.isBigInterface){
                        if((obj.data && obj.data.handleExpOwn) || (obj.params && JSON.parse(obj.params).handleExpOwn)){
                            deferred.reject(data);
                        }else{
                            setTimeout(function () {
                                $.showTjdModal({
                                    errorMsg:data.errorMSG
                                });
                            },150)
                            deferred.reject(data);
                        }
                    }else{
                        if((obj.data && obj.data.handleExpOwn)){
                            deferred.reject(data);
                        }else{
                            setTimeout(function () {
                                $.showTjdModal({
                                    errorMsg:data.errorMSG
                                });
                            },150)
                            deferred.reject(data);
                        }
                    }

                }else{
                    deferred.reject(data);
                    setTimeout(function () {
                        $.showTjdModal({
                        });
                    },150)
                }
            });


            return promise;

        },
        /**
         * 前端通用请求接口
         */
        request : function(obj) {
            var beyondTime=5000;//超时时间，此时间内接口无返回可以重新请求
            //为了防止多次提交，每个方法进来后将在5秒内不能二次访问，除非回调已返回
            //不处理query,find,get,load开头的方法

            if(obj.method.indexOf('find')==0 || obj.method.indexOf('select')==0 || obj.method.indexOf('query')==0 || obj.method.indexOf('get')==0 || obj.method.indexOf('load')==0 ){
                return tjdServices[obj.method](obj);
            }else{

                if(util.getSession(obj.method) && (new Date().getTime()-Number(util.getSession(obj.method))<beyondTime)){
                    //如果已超过1.5秒则可以再次请求
                    return ;
                }else{
                    util.setSession(obj.method,String(new Date().getTime()));
                    return tjdServices[obj.method](obj);
                }
            }



        },
        /**
         * 登录验证
         */
        getLoginInfo : function() {
            var deferred = $.Deferred();
            var promise = deferred.promise();
            var result="";
            //分为微信、支付宝、百度地图（没有鉴权）
            //验证登录分两条线（从微信菜单和推送渠道）

            if(!util.isEmpty(sessionStorage.isLogin) && sessionStorage.isLogin==="1"){//已登录
                deferred.resolve(result);
            }else{
                //此处加if判断是因为：有些手机在上边代码resolve后还继续执行之后代码
                if(sessionStorage.isLogin!=="1" && result!=="unbind"){
                    //通过渠道获取授权码
                    var code = util.getUrlParam(util.getAuthCodeColumn());
                    //百度没有授权码
                    //code和openId都没有的话返回登录页面
                    if(util.isEmpty(code) && util.isEmpty(sessionStorage.openId)){
                        //没有授权码，可能是通过浏览器直接访问，需要特殊处理。。。。后期操作
                        result="unbind";
                        deferred.reject(result);
                    }
                    code = code||"baidu";
                    $.post(util.constants.wxControlUrl+'api/isLogin',{
                        code:code,
                        openId:util.getOpenId(),
                    }, function (data) {
                        if(data.isSuccess==="0"){
                            data=data.result;
                            sessionStorage.userId=data.cmUserId;
                            sessionStorage.phone=data.phone;
                            sessionStorage.openId=data.openId;
                            util.logined();
                            deferred.resolve(result);
                        }else{
                            deferred.reject(result);
                        }
                    })


                }
            }
            return promise;
        },



        /**
         * 查询指定车场是否参与支付立减活动
         * @param obj
         * @returns {*}
         */
        isPayDiscount:function(obj){

            var command='activity';
            var method1='isPayDiscount';
            var a=util.getCommonMap()
                .put('command',command)
                .put('method',method1)
                .put('parkId',obj.parkId)
                .toJson();
            return tjdServices.commonAjax({
                params:a,
                isBigInterface:true
            });
        },



    }

    export {tjdServices}