/**
 * Created by liqiang on 2017/6/2.
 */
/**
 * Created by liqiang on 2017/5/26.
 */

import {util} from 'util';;
var wx=require('weixin-js-sdk');


var wxUtil={

};
wxUtil.closeWindow = function(){
    var isAlipay=util.isAlipayBrowser();
    var isWeixin=util.isWeixinBrowser();
    util.clearAllCookies();//因为清除后缓存中信息都清空了，所以需要先将平台信息存到变量中去
    if(isAlipay){
        AlipayJSBridge.call('closeWebview');
    }else if(isWeixin){
        if(util.isWxReady()){
            wx.closeWindow();
        }else{
            wxUtil.initWxJsAPI().then(function(){
                wx.closeWindow();
            });
        }

    }
}
/**
 * 初始化微信jsAPI
 * @param array ：要使用的微信js方法数组
 * @returns {*}
 */
wxUtil.initWxJsAPI=function(){
    var array=['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','openLocation','getLocation','closeWindow','scanQRCode'];
    var deferred = $.Deferred();
    var promise = deferred.promise();
    //支付宝等非微信浏览器直接resolve
    if(util.isWeixinBrowser()){
        if(util.isWxReady()){
            deferred.resolve();
        }else{
            $.post(util.constants.wxControlUrl+'api/findWxJsSignature',{
                url : location.href,
                timestamp : '20150907',
                noncestr : 'liqiang'
            }, function (data) {
                if(data.isSuccess==="0"){
                    data=data.result;
                    wx.config({
                        debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId : data.appId, // 必填，公众号的唯一标识
                        timestamp : data.timestamp, // 必填，生成签名的时间戳
                        nonceStr : data.noncestr, // 必填，生成签名的随机串
                        signature : data.signature,// 必填，签名，见附录1
                        jsApiList : array// 必填，需要使用的JS接口列表
                    });
                    wx.ready(function () {
                        //util.setWxReady();
                        deferred.resolve(data);
                    })
                }else if (data.isSuccess === "1") {
                    $.showTjdModal({
                        errorMsg:data.errorMSG
                    });
                    deferred.reject();
                }else{
                    deferred.reject();
                    $.showTjdModal({
                    });
                }
            });
        }
    }else{
        deferred.resolve();
    }

    return promise;

}
/**
 * 分享朋友圈监控事件
 * @param array
 * @returns {*|{then, fail, end}}
 */
wxUtil.onShareFriendsZone=function(obj){
    obj=obj||{
            title:'title',
            link:util.constants.tcweixinUrl+'login/login.html',
            imgUrl:'',
        }
    var deferred = $.Deferred();
    var promise = deferred.promise();
    wx.onMenuShareTimeline({
        title: obj.title, // 分享标题
        link: obj.link, // 分享链接
        imgUrl: obj.imgUrl, // 分享图标
        // 用户确认分享后执行的回调函数
        success: function () {
            deferred.resolve({
                type:'success'
            });
        },
        // 用户取消分享后执行的回调函数
        cancel: function () {
            deferred.resolve({
                type:'cancel'
            });
        }
    });
    return promise;

}
/**
 * 分享朋友监控事件
 * @param array
 * @returns {*|{then, fail, end}}
 */
wxUtil.onShareFriends=function(obj){
    obj=obj||{
            title:'title',
            link:util.constants.tcweixinUrl+'login/login.html',
            imgUrl:'',
            desc:''
        }
    var deferred = $.Deferred();
    var promise = deferred.promise();
    wx.onMenuShareAppMessage({
        title: obj.title, // 分享标题
        desc: obj.desc, // 分享描述
        link: obj.link, // 分享链接
        imgUrl: obj.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        // 用户确认分享后执行的回调函数
        success: function () {
            deferred.resolve({
                type:'success'
            });
        },
        // 用户取消分享后执行的回调函数
        cancel: function () {
            deferred.resolve({
                type:'cancel'
            });
        }
    });
    return promise;

}
/**
 * 获取地理位置接口
 * @param array
 * @returns {*|{then, fail, end}}
 */
wxUtil.getLocation=function(obj){
    obj=obj||{
            type:'wgs84',// 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        }
    var deferred = $.Deferred();
    var promise = deferred.promise();
    wx.getLocation({
        type:obj.type,
        success: function (data) {
            var res={
                lat:data.latitude,
                lng:data.longitude,
                speed:data.speed,
                accuracy :data.accuracy
            }
            deferred.resolve(res);
        },
    });
    return promise;

}






export {wxUtil}