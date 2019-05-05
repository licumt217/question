<template>
    <div class="tjd-dialog-wrapper">
        <div class="tjd-dialog-contianer">
            <div class="tjd-dialog-window">
                <div class="tjd-dialog-header"></div>
                <div class="tjd-dialog-content">
                    <p class="modal_info_top"></p>
                    <p class="modal_info_bottom"></p>
                </div>
                <div class="tjd-dialog-footer">
                    <button class="tjd_cancel"></button>
                    <button class="tjd_confirm"></button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default{
        data(){
            return {
            }
        },
        mounted: function () {
            this.init();
        },
        methods:{
            init() {
                var tjdModalEntity={
                    defaultErrorMsg:"网络繁忙请稍等",
                    fadeOutTime:200,//模态窗关闭的动画时间
                    messageBottom:"您确定吗？",//底部提示信息的默认值
                    oneButtonMessage:"确定",//底部只有一个按钮时，按钮的默认文字
                    cancelButtonMessage:"取消",//取消按钮的默认文字
                    autoCloseTime:2200,//弹出窗多久后自动关闭
                    modalWidth:'80%',//模态窗默认宽度
                    errorImgUrl:'../../assets/images/dialog/list_box_fail.png',
                    successImgUrl:'../../assets/images/dialog/success.png',
                    noticeImgUrl:'../../assets/images/dialog/list_box_notice.png',
                    maskClass:'.tjd_modal_mask',//遮罩类
                    modalImgClass:'.tjd_modal_img',
                    messageTopClass:".modal_info_top",
                    messageBottomClass:".modal_info_bottom",
                    tjd_modal_class:'.tjd-dialog-wrapper',
                    modal_body_class:'.tjd_modal_body',
                    button_color_class:'.tjd_modal_footer input',
                    one_button_class:'only',
                    headerClass:'.tjd-dialog-header',
                    okHeaderClass:'ok',
                    failHeaderClass:'fail',
                    noticeHeaderClass:'notice',

                };
                var tjd_modal_footer=".tjd-dialog-footer";
                var modal_cancel_btn=".modal_cancel_btn";
                var modal_confirm_btn=".tjd_confirm";
                var modal_cancel_btn=".tjd_cancel";
                var headerRate=640/110;//header的背景图像长宽比
                /**
                 * 提示弹出窗，失败、成功、警告
                 *  errorMsg:可以自定义第一行的提示信息,
                 messageBottom:自定义第二行的提示信息,
                 type:0,//0是错误信息，1是成功信息，2是警告信息。对应不同的提示图标
                 withTwoButtons:0,//是否带有关闭和确定两个按钮
                 buttonColor:"#4EA8B1",按钮的颜色
                 bodyColor:"#FFF",弹出窗主体的颜色
                 withMessageBottom:0,是否显示第二行的提示信息
                 withOneButton:1,是否只显示一个确定按钮，0否，1是。默认1
                 oneButtonMessage:oneButtonMessage,只显示一个按钮时此按钮上的信息
                 width:""弹出窗的宽度，可以百分比或em或px
                 */
                $.extend({
                    showTjdModal:function(options){
                        /**
                         * 调整头部背景图像长宽比
                         */
                        function adjustHeaderImgRate(){
                            setTimeout(function () {
                                var width=$(tjdModalEntity.headerClass).width();
                                var height=width/headerRate;

                                $(tjdModalEntity.headerClass).css({
                                    height:height,
                                    top:-(height-3)
                                });
                            })
                        }
                        function showOkHeader(){
                            $(tjdModalEntity.headerClass)
                                    .addClass(tjdModalEntity.okHeaderClass)
                                    .removeClass(tjdModalEntity.failHeaderClass)
                                    .removeClass(tjdModalEntity.noticeHeaderClass);

                            adjustHeaderImgRate();

                        }
                        function showFailHeader(){
                            $(tjdModalEntity.headerClass)
                                    .addClass(tjdModalEntity.failHeaderClass)
                                    .removeClass(tjdModalEntity.okHeaderClass)
                                    .removeClass(tjdModalEntity.noticeHeaderClass);

                            adjustHeaderImgRate();
                        }
                        function showNoticeHeader(){
                            $(tjdModalEntity.headerClass)
                                    .addClass(tjdModalEntity.noticeHeaderClass)
                                    .removeClass(tjdModalEntity.okHeaderClass)
                                    .removeClass(tjdModalEntity.failHeaderClass);

                            adjustHeaderImgRate();
                        }


                        function showTwoButtons(){
                            $(tjd_modal_footer).show();
                            $(modal_cancel_btn).show().text(opts.cancelButtonMessage);
                            $(modal_confirm_btn).show().text(opts.oneButtonMessage);
                        }
                        function showConfirmBtnOnly(){
                            $(tjd_modal_footer).show();
                            $(modal_cancel_btn).hide();
                            $(modal_confirm_btn).show()
                                    .text(opts.oneButtonMessage)
                                    .addClass(tjdModalEntity.one_button_class);
                        }
                        function showCancelBtnOnly(){

                        }
                        function showNoButtons(){
                            $(tjd_modal_footer).hide();
                        }


                        function showButtons(opts){
                            if(opts.withTwoButtons){//带确定和取消按钮
                                showTwoButtons();
                            }else if(opts.noButton==1){//没有按钮，2.2秒后自动关闭
                                setTimeout(function(){
                                    $.hideTjdModal();
                                },opts.autoCloseTime|| tjdModalEntity.autoCloseTime);
                            }else{//默认只有一个确定按钮
                                showConfirmBtnOnly();
                                $(modal_cancel_btn).hide();
                                $(modal_confirm_btn).text(opts.oneButtonMessage);
                            }
                        }
                        function reset(){
                            showNoButtons();
                            $(tjdModalEntity.messageTopClass).text("");
                            $(tjdModalEntity.messageBottomClass).text("");
                            $(modal_confirm_btn).removeClass(tjdModalEntity.one_button_class);
                            $(tjdModalEntity.messageBottomClass).hide();
                            $(modal_cancel_btn).text(tjdModalEntity.cancelButtonMessage);
                            $(modal_confirm_btn).unbind('touchend');
                            $(modal_cancel_btn).unbind('touchend');

                        }
                        function setColors(opts){
                            //$(tjdModalEntity.button_color_class).css('backgroundColor',opts.buttonColor);
                            //$(tjdModalEntity.modal_body_class).css('backgroundColor',opts.bodyColor);
                        }
                        function showModalDom(){
                            //设置样式让弹窗垂直居中
                            //var webViewTopHeight=48;//微信支付宝等顶部容器标题栏的高度
                            //var clientHeight=document.body.clientHeight*1;
                            //var modalHeight=$(tjdModalEntity.tjd_modal_class).height()*1;
                            //var absoluteTop=(clientHeight-modalHeight)/2-webViewTopHeight;
                            //$(tjdModalEntity.maskClass).show();
                            $(tjdModalEntity.tjd_modal_class).css("visibility","hidden").show();
                            setTimeout(function () {
                                $(tjdModalEntity.tjd_modal_class).css("visibility","visible")
                            },10)


                        }
                        function bindTjdModalEvent(opts){
                            if(opts.callBack){
                                if(opts.withTwoButtons=="1"){
                                    $(modal_confirm_btn).bind('touchend',function(e){
                                        e.preventDefault();
                                        e.stopPropagation();
                                        $.hideTjdModal();
                                        setTimeout(function(){
                                            if(opts.scope){
                                                opts.scope[opts.callBack]();
                                            }else{
                                                try{
                                                    eval(opts.callBack+"()");
                                                }catch(e){
                                                    opts.callBack();
                                                }

                                            }
                                        });
                                    }).bind('touchstart', function () {
                                        //$(this).css('background','#E3E3E3');
                                    });
                                    if(sessionStorage.isTest){
                                        $(modal_confirm_btn).bind('click', function () {
                                            $(this).trigger('touchend')
                                        });
                                    }
                                    if(opts.callBackForCancel){
                                        $(modal_cancel_btn).bind('touchend',function(e){
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $.hideTjdModal();
                                            setTimeout(function(){
                                                if(opts.scope){
                                                    opts.scope[opts.callBackForCancel]();
                                                }else if(typeof opts.callBackForCancel=='function'){
                                                    opts.callBackForCancel();
                                                }else{
                                                    try{
                                                        eval(opts.callBackForCancel+"()");
                                                    }catch(e){
                                                        opts.callBackForCancel();
                                                    }
                                                }
                                            });
                                        });
                                        if(sessionStorage.isTest){
                                            $(modal_cancel_btn).bind('click', function () {
                                                $(this).trigger('touchend')
                                            });
                                        }
                                    }else{
                                        //如果有取消按钮，则绑定关闭弹出窗事件n
                                        $(modal_cancel_btn).bind('touchend',function(e){
                                            e.preventDefault();
                                            e.stopPropagation();
                                            $.hideTjdModal();
                                        });
                                        if(sessionStorage.isTest){
                                            $(modal_cancel_btn).bind('click', function () {
                                                $(this).trigger('touchend')
                                            });
                                        }
                                    }


                                }else{
                                    $(modal_confirm_btn).bind('touchend',function(e){
                                        e.preventDefault();
                                        e.stopPropagation();
                                        $.hideTjdModal();
                                        setTimeout(function(){
                                            if(opts.scope){
                                                opts.scope[opts.callBack]();
                                            }else{
                                                try{
                                                    eval(opts.callBack+"()");
                                                }catch(e){
                                                    opts.callBack();
                                                }
                                            }
                                        });
                                    });
                                    if(sessionStorage.isTest){
                                        $(modal_confirm_btn).bind('click', function () {
                                            $(this).trigger('touchend')
                                        });
                                    }
                                }
                            }else{
                                //如果有取消按钮，则绑定关闭弹出窗事件n
                                $(modal_confirm_btn).bind('touchend',function(e){
                                    e.preventDefault();
                                    e.stopPropagation();
                                    $.hideTjdModal();
                                });
                                if(sessionStorage.isTest){
                                    $(modal_confirm_btn).bind('click', function () {
                                        $(this).trigger('touchend')
                                    });
                                }
                            }


                        }
                        function showModalImg(opts){
                            if(opts.type==1){
                                showOkHeader();
                            }else if(opts.type==2){
                                showNoticeHeader();
                            }else if(opts.type==0){
                                showFailHeader();
                            }else if(opts.type == 3){
                                showFailHeader();
                            }
                        }
                        function showModalMessages(opts){
                            $(tjdModalEntity.messageTopClass).html(opts.errorMsg);
                            //判断是否显示第二条信息
                            if(opts.withMessageBottom==1){
                                $(tjdModalEntity.messageBottomClass).html(opts.messageBottom).show();
                            }
                        }
                        function adjustModalWidth(opts){//判断是否需要调整弹出窗的宽度
                            //if(opts.width){
                            //	var toAdjustWidth=0;
                            //	var toCal="0";
                            //	if(opts.width.indexOf('%')!=-1){
                            //		toAdjustWidth=opts.width.substring(0,opts.width.length-1);
                            //		toCal=toAdjustWidth/2+"%";
                            //	}else{
                            //		toAdjustWidth=opts.width.substring(0,opts.width.length-2);
                            //		toCal=toAdjustWidth/2+opts.width.substring(opts.width.length-2);
                            //	}
                            //	$(tjdModalEntity.tjd_modal_class).css({
                            //		width:opts.width,
                            //		left: document.body.clientWidth*0.1+"px"
                            //	});
                            //}
                        }

                        var defaults={
                            errorMsg:tjdModalEntity.defaultErrorMsg,
                            type:0,//0是错误信息，1是成功信息，2是警告信息  3自定义图片信息
                            titleimg:"",
                            imgdivcss:"",
                            withTwoButtons:0,//是否带有关闭按钮
                            buttonColor:"#FFF",
                            bodyColor:"#FFF",
                            withMessageBottom:0,//是否有底部提示信息，默认没有
                            messageBottom:tjdModalEntity.messageBottom,//底部提示信息
                            withOneButton:1,//是否只有一个按钮，默认是。0不是，1是
                            oneButtonMessage:tjdModalEntity.oneButtonMessage,//只有一个按钮时，按钮的文字
                            width:tjdModalEntity.modalWidth,
                            noButton:0,//是否不显示按钮，1不显示按钮,
                            callBack:'',
                            callBackForCancel:'',//有取消和确定按钮时给取消按钮添加回调函数
                            scope:''
                        };
                        reset();
                        var opts=$.extend(defaults,options);
                        showModalImg(opts);
                        showModalMessages(opts);
                        adjustModalWidth(opts);
                        showButtons(opts);
                        setColors(opts);
                        $(modal_cancel_btn).bind('touchstart',function(e){//
                            //$(this).css('background','#E3E3E3');
                            e.preventDefault();
                        });
                        setTimeout(function(){
                            bindTjdModalEvent(opts);
                        },17);//直接绑定事件的话，有可能点击某按钮弹出弹窗时，直接出发弹窗的关闭事件！
                        //},500);//直接绑定事件的话，有可能点击某按钮弹出弹窗时，直接出发弹窗的关闭事件！
                        showModalDom();
                        if(opts.imgdivcss){
                            $(tjdModalEntity.modalImgClass).css(opts.imgdivcss);
                        }
                    },

                    hideTjdModal:function(){
                        //$(tjdModalEntity.maskClass).fadeOut(tjdModalEntity.fadeOutTime);
                        //关闭时直接关掉，否则底部页面会闪亮一下，应该是过渡动画导致的色彩叠加
                        $(tjdModalEntity.tjd_modal_class).hide();
                    },

                    showTjdMask:function(){
                        $(tjdModalEntity.maskClass).show();
                    },
                    hideTjdMask:function(){
                        $(tjdModalEntity.maskClass).hide();
                    },


                });
            },

        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    .tjd-dialog-wrapper{
        display: none;
    }
    .tjd-dialog-contianer{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
        display: -webkit-flex;
        display: flex;
        display: -webkit-box;
        display: -moz-box;
        align-items: center;
        -webkit-align-items: center;
        -moz-align-items:center;
        -ms-align-items:center;
        -webkit-box-align: center;
        -moz-box-align: center;
        -webkit-box-pack: center;
        -moz-box-pack: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        z-index: 999;
    }
    .tjd-dialog-window{
        padding: 10px 0;
        border-radius:0 0 2px 2px;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px #D6DBE1;
        width:80%;
    }
    .tjd-dialog-header{
        width: 100%;
        height: 55px;
        margin: 0 auto;
        background: url("../../assets/images/dialog/list_box_fail.png") no-repeat 0 0;
        background-size: 100%;
        position: absolute;
        top: -46px;
    }
    .tjd-dialog-header.ok{
        background: url("../../assets/images/dialog/success.png") no-repeat 0 0;
        background-size: 100%;
    }
    .tjd-dialog-header.fail{
        background: url("../../assets/images/dialog/list_box_fail.png") no-repeat 0 0;
        background-size: 100%;
    }
    .tjd-dialog-header.notice{
        background: url("../../assets/images/dialog/list_box_notice.png") no-repeat 0 0;
        background-size: 100%;
    }
    .tjd-dialog-content{
        padding: 1em 1em 1em;
        line-height: 180%;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 1px;
    }
    .tjd-dialog-footer{
        font-size: 14px;
        width:100%;
        text-align: center;
    }
    .tjd-dialog-footer button{
        -webkit-appearance:normal;
        background-color: rgba(255,255,255,0.8);
        padding: 3% 12%;
        overflow: hidden;
        color: #797F8B;
        border-radius: 4px;
        margin: 0.3em 1em;
        font-size: 14px;
        outline: none;
        font-family: "Microsoft YaHei";
        letter-spacing: 1px;
        background-color: #fff;
        border: solid 1px #C0C3C8;
    }
    .tjd-dialog-footer button.only{
        width: 60%;
        background-color: #79808A;
        color: #fff;
        box-shadow: 0 3px 3px #e0e0e0;
        border: none;
    }
    .tjd-dialog-footer button.tjd_cancel{
        background-color: #79808A;
        color: #fff;
        box-shadow: 0 3px 3px #e0e0e0;
        border: none;
    }
</style>