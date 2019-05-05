<template>
    <div class="prePayKbdCmpContainer">
    <p class="bgShadow"></p>
    <div>
        <div class="prePayKbdCarInput">
            <input type="button"  value="京" class="prePayKbdFirst prePayActiveFirst prePayKbdBeginCarNumInput"/>
            <input type="button" class="prePayKbdSecond" value=""/>
            <input type="button" class="prePayKbdThird" value=""/>
            <input type="button" class="prePayKbdForth" value=""/>
            <input type="button" class="prePayKbdFivth" value=""/>
            <input type="button" class="prePayKbdSixth" value=""/>
            <input type="button" value="" class="prePayKbdSeventh"/>
        </div><!--输入车牌号-->
        <div class="prePayKbdCarDiv">
            <div></div>
            <div>
                <img src="../../assets/images/kbdPrePay/marquee_middle_right.png"  class="prePayRightImg">
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div><!---->
    </div>
    <div class="prePayKbdMainArea">
        <div class="prePayKbdMainCarnum">
            <div class="prePayKbdMainRow">
                <input type="button" class="prePayKbdZhBtn" value="京"/>
                <input type="button" class="prePayKbdZhBtn" value="津"/>
                <input type="button" class="prePayKbdZhBtn" value="冀"/>
                <input type="button" class="prePayKbdZhBtn" value="鲁"/>
                <input type="button" class="prePayKbdZhBtn" value="晋"/>
                <input type="button" class="prePayKbdZhBtn" value="蒙"/>
                <input type="button" class="prePayKbdZhBtn" value="辽"/>
                <input type="button" class="prePayKbdZhBtn" value="吉"/>
                <input type="button" class="prePayKbdZhBtn" value="黑"/>
                <input type="button" class="prePayKbdZhBtn" value="沪"/>
                </div>
            <div class="prePayKbdMainRow">
                <input type="button" class="prePayKbdZhBtn" value="苏"/>
                <input type="button" class="prePayKbdZhBtn" value="浙"/>
                <input type="button" class="prePayKbdZhBtn" value="皖"/>
                <input type="button" class="prePayKbdZhBtn" value="闽"/>
                <input type="button" class="prePayKbdZhBtn" value="赣"/>
                <input type="button" class="prePayKbdZhBtn" value="豫"/>
                <input type="button" class="prePayKbdZhBtn" value="鄂"/>
                <input type="button" class="prePayKbdZhBtn" value="湘"/>
                <input type="button" class="prePayKbdZhBtn" value="粤"/>
                <input type="button" class="prePayKbdZhBtn" value="桂"/>
                </div>
            <div class="prePayKbdMainRow">
                <span class="none">&nbsp;&nbsp;&nbsp;</span>
                <input type="button" class="prePayKbdZhBtn" value="渝"/>
                <input type="button" class="prePayKbdZhBtn" value="川"/>
                <input type="button" class="prePayKbdZhBtn" value="贵"/>
                <input type="button" class="prePayKbdZhBtn" value="云"/>
                <input type="button" class="prePayKbdZhBtn" value="藏"/>
                <input type="button" class="prePayKbdZhBtn" value="陕"/>
                <input type="button" class="prePayKbdZhBtn" value="甘"/>
                <input type="button" class="prePayKbdZhBtn" value="青"/>
                <span class="none">&nbsp;&nbsp;&nbsp;</span>
                </div>
            <div class="prePayKbdMainRow">
                <span class="none">&nbsp;&nbsp;&nbsp;</span>
                <input type="button" class="prePayKbdZhBtn" value="琼"/>
                <input type="button" class="prePayKbdZhBtn" value="新"/>
                <input type="button" class="prePayKbdZhBtn" value="港"/>
                <input type="button" class="prePayKbdZhBtn" value="澳"/>
                <input type="button" class="prePayKbdZhBtn" value="台"/>
                <input type="button" class="prePayKbdZhBtn" value="宁"/>
                <span class="none">&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
        <div class="prePayKbdMainBottomCarnum prePayKbdMainBottomCarnum" style="display:none;" >
            <div class="keyboard_main_en_row">
                <input type="button" class="keyboard_en_btn" value="1"/>
                <input type="button" class="keyboard_en_btn" value="2"/>
                <input type="button" class="keyboard_en_btn" value="3"/>
                <input type="button" class="keyboard_en_btn" value="4"/>
                <input type="button" class="keyboard_en_btn" value="5"/>
                <input type="button" class="keyboard_en_btn" value="6"/>
                <input type="button" class="keyboard_en_btn" value="7"/>
                <input type="button" class="keyboard_en_btn" value="8"/>
                <input type="button" class="keyboard_en_btn" value="9"/>
                <input type="button" class="keyboard_en_btn" value="0"/>
                </div>
            <div class="keyboard_main_en_row">
                <input type="button" class="keyboard_en_btn" value="Q"/>
                <input type="button" class="keyboard_en_btn" value="W"/>
                <input type="button" class="keyboard_en_btn" value="E"/>
                <input type="button" class="keyboard_en_btn" value="R"/>
                <input type="button" class="keyboard_en_btn" value="T"/>
                <input type="button" class="keyboard_en_btn" value="Y"/>
                <input type="button" class="keyboard_en_btn" value="U"/>
                <input type="button" class="keyboard_en_btn" value="I"/>
                <input type="button" class="keyboard_en_btn" value="O"/>
                <input type="button" class="keyboard_en_btn" value="P"/>
                </div>
            <div class="keyboard_main_en_row">
                <span class="none">&nbsp;&nbsp;&nbsp;</span>
                <input type="button" class="keyboard_en_btn" value="A"/>
                <input type="button" class="keyboard_en_btn" value="S"/>
                <input type="button" class="keyboard_en_btn" value="D"/>
                <input type="button" class="keyboard_en_btn" value="F"/>
                <input type="button" class="keyboard_en_btn" value="G"/>
                <input type="button" class="keyboard_en_btn" value="H"/>
                <input type="button" class="keyboard_en_btn" value="J"/>
                <input type="button" class="keyboard_en_btn" value="K"/>
                <input type="button" class="keyboard_en_btn" value="L"/>
                <span class="none">&nbsp;&nbsp;&nbsp;</span>
                </div>

            <div class="keyboard_main_en_row">
                <span class="none">&nbsp;&nbsp;&nbsp;</span>
                <input type="button" class="keyboard_en_btn" value="Z"/>
                <input type="button" class="keyboard_en_btn" value="X"/>
                <input type="button" class="keyboard_en_btn" value="C"/>
                <input type="button" class="keyboard_en_btn" value="V"/>
                <input type="button" class="keyboard_en_btn" value="B"/>
                <input type="button" class="keyboard_en_btn" value="N"/>
                <input type="button" class="keyboard_en_btn" value="M"/>
                <span class="prePayDelButton">
            <img src="../../assets/images/kbdPrePay/buttondelete.png" width="30em"/>
            </span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
        <input type="button" value="确定" class="prePayKbdSure" v-on:touchend="getCarnum()"/>
        </div>
    </div>
</template>


<script>
    export default{
        data(){
            return {
                curActiveInput:null,
                _eventType:"touchend",
            }
        },
        events: {
            //接收父组件的传值
            setCarnum2Child: function(carNum) {
                this.setTjdKbdCarnum(carNum);
            }
        },
        created: function () {

            var self=this;
            setTimeout(function () {
                self.curActiveInput=$(".prePayKbdCarInput input:eq(1)");
                $(".prePayKbdCarInput input:eq(0)").bind('touchend',function(e){
                    $(".prePayKbdMainCarnum").show();
                    $(".prePayKbdMainBottomCarnum").hide();
                    $(this).addClass("prePayActiveFirst").siblings().removeClass("prePayActiveCommon prePayActiveLast");
                    self.addImg(0);
                    e.stopPropagation();
                });

                $(".prePayKbdCarInput input:gt(0)").bind('touchend',function(e){
                    $(".prePayKbdMainBottomCarnum").show();
                    $(".prePayKbdMainCarnum").hide();
                    if($(this).index() == 6){
                        $(this).addClass("prePayActiveLast").siblings().removeClass("prePayActiveCommon prePayActiveFirst");
                    }else{
                        $(this).addClass("prePayActiveCommon").siblings().removeClass("prePayActiveCommon prePayActiveFirst prePayActiveLast");
                    }

                    self.addImg($(this).index());
                    self.curActiveInput=$(this);
                    e.stopPropagation();
                });

                //英文键盘选择事件
                $(".keyboard_en_btn").bind("touchend",function(e){
                    self.curActiveInput.val($(this).val());

                    if(!self.curActiveInput.hasClass("prePayActiveLast")){
                        self.curActiveInput=self.curActiveInput.next();
                        if($(self.curActiveInput).index() == 6){
                            $(self.curActiveInput).addClass("prePayActiveLast").siblings().removeClass("prePayActiveCommon prePayKbdInputActive");
                        }else if($(self.curActiveInput).index() ==0){
                            $(self.curActiveInput).addClass("prePayKbdInputActive").siblings().removeClass("prePayActiveCommon prePayActiveLast");
                        }else{
                            $(self.curActiveInput).addClass("prePayActiveCommon").siblings().removeClass("prePayActiveCommon prePayActiveLast prePayKbdInputActive");
                        }
                        self.addImg($(self.curActiveInput).index());
                    }

                    e.stopPropagation();
                    return false;
                });
                //防止自带键盘自动弹出
                $(".prePayKbdCarInput input").bind('focus', function () {
                    $(this).blur();
                });

                $(".prePayKbdMainCarnum input").bind('touchend',function(e){

                    $(".prePayKbdMainCarnum").hide();
                    $(".prePayKbdFirst").val($(this).val());
                    $(".prePayKbdMainBottomCarnum").show();
                    self.resetActiveState();
                    e.stopPropagation();
                    return false;

                });

                $(".keyboard_en_btn").parent().parent().bind("touchend",function(e){
                    e.stopPropagation();
                    return false;
                });

                $(".prePayKbdMainCarnum input").parent().parent().bind('touchend',function(e){
                    e.stopPropagation();
                    return false;
                });

                $(".prePayDelButton").bind('touchend',function(e){
                    self.curActiveInput.val("");

                    if(!self.curActiveInput.hasClass("prePayKbdBeginCarNumInput")){
                        self.curActiveInput=self.curActiveInput.prev();
                    }if (self.curActiveInput.hasClass("prePayKbdBeginCarNumInput")) {

                        $(".prePayKbdMainCarnum").show();
                        $(".prePayKbdMainBottomCarnum").hide();
                    };
                    if($(self.curActiveInput).index() == 6){
                        $(self.curActiveInput).addClass("prePayActiveLast").siblings().removeClass("prePayActiveCommon prePayActiveFirst");
                    }else if($(self.curActiveInput).index() ==0){
                        $(self.curActiveInput).addClass("prePayActiveFirst").siblings().removeClass("prePayActiveCommon prePayActiveLast");
                    }else{
                        $(self.curActiveInput).addClass("prePayActiveCommon").siblings().removeClass("prePayActiveCommon prePayActiveFirst prePayActiveLast");
                    }
                    self.addImg($(self.curActiveInput).index());
                    e.stopPropagation();
                    return false;
                });
            })

        },
        methods:{
            //将车牌号传给父组件
            getCarnum: function () {
                this.$emit('transCarnum2Parent',this.getTjdKbdCarnum())
            },

            getTjdKbdCarnum:function(){
                return $(".prePayKbdFirst").val()+ $(".prePayKbdSecond").val()+ $(".prePayKbdThird").val()+ $(".prePayKbdForth").val()+ $(".prePayKbdFivth").val()+ $(".prePayKbdSixth").val()+ $(".prePayKbdSeventh").val();
            },
            setTjdKbdCarnum:function(carNum){
                if(carNum){
                    $(".prePayKbdFirst").val(carNum[0]);
                    $(".prePayKbdSecond").val(carNum[1]);
                    $(".prePayKbdThird").val(carNum[2]);
                    $(".prePayKbdForth").val(carNum[3]);
                    $(".prePayKbdFivth").val(carNum[4]);
                    $(".prePayKbdSixth").val(carNum[5]);
                    $(".prePayKbdSeventh").val(carNum[6]);
                }
            },

            resetActiveState:function(){
                this.curActiveInput=$(".prePayKbdCarInput input:eq(1)");
                this.curActiveInput.addClass("prePayActiveCommon").siblings().removeClass("prePayActiveFirst prePayActiveLast ");
                this.addImg($(this.curActiveInput).index());
            },

            addImg:function(num){
                $('.prePayKbdCarDiv img').remove();
                var obj;
                if(num == 0){
                    obj= $(".prePayKbdCarDiv").find("div:eq(1)");
                    this.setImg(obj,'right');
                }else if(num == 6){
                    obj= $(".prePayKbdCarDiv").find("div:eq(5)");
                    this.setImg(obj,'left');
                }else{
                    obj= $(".prePayKbdCarDiv").find("div:eq("+(num)+")");
                    this.setImg(obj,'center');
                }
            },
            setImg:function(obj,lr){
                //js分钟直接动态引用图片地址需要require进来
//                if(lr == 'left'){
//                    $(obj).html('<img src="'+require('../../assets/images/kbdPrePay/marquee_middle_left.png')+'"  class="prePayLeftImg">');
//                }else if(lr == 'right'){
//                    $(obj).html('<img src="'+require('../../assets/images/kbdPrePay/marquee_middle_right.png')+'"  class="prePayRightImg">');
//                }else{
//                    $(obj).prev().html('<img src="'+require('../../assets/images/kbdPrePay/marquee_middle_left.png')+'"  class="prePayLeftImg">');
//                    $(obj).next().html('<img src="'+require('../../assets/images/kbdPrePay/marquee_middle_right.png')+'"  class="prePayRightImg">');
//                }
            }

        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/reset.less';
    /*车牌键盘输入区域总体样式*/
    .tjd_carnum_input_div{
        width:90%;
        margin:0 auto;
    }
    .tjd_carnum_input_div_one {
        background: #ffffff;
        height: 2.5em;
        width: 100%;
        margin: 1em auto;
        display: -moz-box;
        display: -webkit-box;
        border-radius: 6px;
        border: solid 1px #e0e0e0;
        text-align: center;
        /*float:left;*/
    }
    /*车牌键盘输入区域按钮样式*/
    .tjd_carnum_input_div_one  input {
        border: none;
        background: transparent;
        text-align: center;
        line-height: 1em;
        outline: none;
        margin: 0.4em 0em;
        -webkit-box-flex: 1;
        -moz-box-flex:1.0;
        width: 2.5em;
        display: block;
        border-radius: 0.1em;
        font-size: 18px;
        color: #000;
    }
    .tjd_carnum_input_div_one input:not(:last-child):not(:first-child) {

        background: url('../../assets/images/common/line_vertical.png') no-repeat right center;
    }

    section article b{
        line-height:2.5em;
        font-size:30px;
        padding-left: 3%;
    }
    .tjd_carnum_input_div_two {
        background: #ffffff;
        height: 2.5em;
        float: right;
        width:62.5%;
        margin: 1em auto;
        display: -moz-box;
        display: -webkit-box;
        border-radius: 6px;
        border: solid 1px #e0e0e0;
        text-align: center;
    }
    /*车牌键盘输入区域按钮样式*/
    .tjd_carnum_input_div_two input {
        border: none;
        background: #FFF;
        text-align: center;
        line-height: 1em;
        outline: none;
        margin: 0.4em 0.4em;
        -webkit-box-flex: 1;
        width: 2.5em;
        display: block;
        border-radius: 0.1em;
        font-size: 18px;
        color: #000;
    }

    /*车牌键盘输入区域按钮激活样式*/
    .tjd_keyboard_input_active {
        border-bottom: solid 2px #4bc1cd;
        padding-top:2px;
        text-align: center;
        line-height: 1em;
        outline: none;
        -webkit-box-flex: 1;
        display: block;
        /*width:2em!important;*/
        /*padding-left:0.2em;*/
        /*background: -webkit-gradient(linear, center top,center bottom, from(transparent), color-stop(0.93, transparent), color-stop(0.931, #4bc1cd),  to(#4bc1cd))!important;*/
    }

    /* 键盘样式 */
    .tjd_carnum_one, .tjd_carnum_two {
        height: auto;
        width: 100%;
        background: #e5e6e8;
        position: absolute;
        padding-top: 0.5em;
        z-index: 9999;
        bottom: 0;
        display: none;
        left: 0;
    }
    /*键盘每行的样式*/
    .tjd_carnum_one_row, .tjd_carnum_two_row {
        width: 98%;
        height: 36px;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 0.5em;
        display: -moz-box;
        display: -webkit-box;
    }
    /*键盘每行具体按钮的样式*/
    .tjd_carnum_one_row input, .tjd_carnum_two_row input {
        border: none;
        background: none;
        color: #000;
        outline: none;
        height: 36px;
        background: #fcfcfc;
        margin: 0 0.3%;
        line-height: 36px;
        border-radius: 3px;
        -webkit-box-flex: 1;
        display: block;
        font-size: 18px;
        -moz-box-flex:1.0;
    }

    /*字母数字键盘的删除按钮*/
    .tjd_keyboard_del_btn {
        height: 36px;
        line-height: 36px;
        -webkit-box-flex: 1;
        display: block;
        background: #ccc;
        margin: 0 0.3%;
        border-radius: 3px;
    }
    /*删除按钮的图片*/
    .tjd_keyboard_del_btn img {
        width: 1.6em;
        vertical-align: middle;
        padding-bottom: 0.2em;
    }
    /*不可见，但是仍占据空间*/
    .tjd_no_visible {
        visibility: hidden;
    }
    /*键盘按钮激活时样式*/
    .tjd_keyboard_one_btn:active, .tjd_keyboard_two_btn:active {
        /*background: #4EA8B1 !important;*/
        /*color: #fff;*/
        /*height: 36px;*/
    }
    /*禁用系统默认键盘*/
    .ime-disabled {
        ime-mode: disabled;
    }

    .tjd_carnum_input_div .tjd_carnum_seventh {
        border-right: none;
    }

    .tjd_carnum_first{
        color: #FFF!important;
    }
    /**/
    .tjd_carnum_input_div_one{
        background-image: -moz-linear-gradient(to right, #4bc1cd 0%,#4bc1cd 14.4%,#fff 14.5%, #fff);
        background: -webkit-gradient(linear, left top, right top, from(#4bc1cd), color-stop(0.144, #4bc1cd), color-stop(0.145, transparent),  to(transparent));
    }
    /*首字中文无边框（边框和背景色一致时，pc和安卓都看不到边框，但是iphone却能看到，不知什么原因，暂时这样处理）*/
    /*.tjd_carnum_first{*/
    /*border-bottom: none!important;*/
    /*}*/
    /*L键特别对待，部分iphone6上边，L键经常选不中*/
    .tjd_l{
        padding-right: 0.12em;
        padding-left: 0.12em;
    }

    .eightDiscount{
        width: 45%;
        position: absolute;
        right: 3%;
        bottom: 21.3em;
        z-index: 999;
    }
    .bgShadow{
        width: 90%;
        height:2.5em;
        margin: 3em auto 0 auto;
        background: #705818;
        border-radius: 10px;
        text-align: center;
        line-height: 2.5em;
    }
    /*车牌键盘输入区域总体样式*/
    .prePayKbdCmpContainer{
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
    }
    .prePayKbdCarInput{
        background: #e4af2b;
        height: 60px;
        width: 99%;
        margin: -1em auto 0 auto;
        display: -webkit-box;
        border-radius:12px;
        border:none;
        text-align: center;
        border-bottom: dashed 1px #504120;
    }
    .prePayKbdCarDiv{
        height: 0;
        width: 99%;
        margin: -1em auto 0 auto;
        display: -webkit-box;
        border-radius:12px;
        border:none;
        text-align: center;

    }
    .prePayKbdCarDiv img{
        height: 65px!important;
        position: absolute!important;
        top: -50px!important;
    }
    .prePayLeftImg{
        position: absolute;
        right: -1px;
    }
    .prePayRightImg{
        position: absolute;
        left: -2px;
    }
    /*车牌键盘输入区域按钮样式*/
    .prePayKbdCarInput input {
        border: none;
        text-align: center;
        line-height: 2em;
        outline: none;
        -webkit-box-flex: 1;
        width: 2.5em;
        display: block;
        font-size: 18px;
        color: #323234;
        font-family: "microsoft yahei";
        background: url("../../assets/images/kbdPrePay/line2.png") no-repeat right center;
    }
    .prePayKbdCarDiv div {
        border: none;
        text-align: center;
        line-height: 2em;
        outline: none;
        -webkit-box-flex: 1;
        width: 2.5em;
        display: block;
        font-size: 18px;
        color: #323234;
        font-family: "microsoft yahei";
        position: relative;
    }
    .prePayKbdCarInput input:last-child{
        background: none;
    }


    /*车牌键盘输入区域按钮激活样式*/
    .prePayActiveCommon {
        background: #D09D21!important;
        background-size: 100% 100%!important;
        text-align: center;
        margin: 0 0!important;
        line-height: 2em;
        outline: none;
        -webkit-box-flex: 1;
        display: block;
        border-top-left-radius: 12px!important;
        border-top-right-radius: 12px!important;
        margin-left: -1px!important;
    }
    .prePayActiveFirst {
        background: #D09D21!important;
        background-size: 100% 100%!important;
        text-align: center;
        margin: 0 0!important;
        line-height: 2em;
        outline: none;
        -webkit-box-flex: 1;
        display: block;
        border-top-left-radius: 12px!important;
        border-top-right-radius: 12px!important;
        border-bottom-left-radius: 12px!important;
        /*border-bottom-right-radius: 12px!important;*/
        /*margin-left: -1px!important;*/
    }

    .prePayActiveLast{
        background: #D09D21!important;
        background-size: 100% 100%!important;
        text-align: center;
        margin: 0 0!important;
        line-height: 2em;
        outline: none;
        -webkit-box-flex: 1;
        display: block;
        border-top-left-radius: 12px!important;
        border-top-right-radius: 12px!important;
        border-bottom-right-radius: 12px!important;
        margin-left: -1px!important;
    }
    /*
    键盘样式*/
    .prePayKbdMainArea{
        height: auto;
        width: 99%;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        margin: 12px auto 0 auto;
        background: url("../../assets/images/kbdPrePay/bg_local.png") repeat-x;
    }
    .prePayKbdMainCarnum,.prePayKbdMainBottomCarnum{
        height: auto;
        padding: 0.5em 0 0.5em 0;
        z-index: 9999;
        margin: 0 auto;
        border-radius: 5px;
    }
    .prePayKbdMainRow,.keyboard_main_en_row{
        width: 98%;
        height: 40px;
        margin: 0 auto;
        text-align: center;
        margin-bottom: 2%;
        display: -webkit-box;

    }
    .prePayKbdMainRow input,.keyboard_main_en_row input{
        border: none;
        background: none;
        color: #504120;
        outline: none;
        height: 40px;
        background: #d29f20;
        margin: 0 0.3%;
        line-height: 40px;
        border-radius: 3px;
        -webkit-box-flex: 1;
        display: block;
        font-size: 18px;
        font-family: "microsoft yahei";
    }
    .prePayKbdZhBtn:active,.keyboardbtn_row:active{
        background: #D09D21!important;
        color: #fff;
        height: 40px;
    }
    .prePayDelButton img{
        vertical-align: middle;
        padding: 0 8px;
    }
    .prePayDelButton{
        line-height:40px;
        display: block;
        height: 40px;
        background: #d29f20;
    }
    .prePayDelButton:active{
        background: #D09D21!important;
    }
    .prePayKbdSure{
        text-align: center;
        color: #504120;
        border: none;
        width: 90%;
        line-height: 45px;
        border-radius: 5px;
        font-size: 18px;
        margin:0 5% 1em 5%;
        outline: none;
        background: #d29f20;
        height: 45px;
        font-family: "Microsoft YaHei";
        letter-spacing: 1px;
    }
    .prePayKbdSure:active{
        background: #D09D21;
    }


</style>