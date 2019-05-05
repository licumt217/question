<template>
    <div>
        <div class="layout-breadcrumb">
            <Row>
                <Col span="24">
                    <span class="nowPage" v-text="$route.meta.name"></span>
                </Col>
                <Col span="24" class="breadCrumb">
                    <Breadcrumb separator=">">
                        <Breadcrumb-item :to="route.path" :key="route.path" v-for="route in $route.matched"
                                         v-if="route.path != '/' && !route.meta.hidden && !route.meta.showSub">
                            <!--<Tag >-->
                            <Icon :type="route.meta.icon"></Icon>
                            {{route.meta.name}}
                            <!--</Tag>-->
                        </Breadcrumb-item>
                    </Breadcrumb>
                </Col>
            </Row>
        </div>
        <div class="router-content">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'MainContent',
    data () {
      return {}
    },
    mounted: function () {
      // console.log(this.$route)
      this.$Message.config({
        duration: 3
      })
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="less" scoped>
    .slide-fade-enter-active {
        transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    // .slide-fade-leave-active {
    //   transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    // }
    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateX(10px);
        opacity: 0;
    }

    .layout-breadcrumb {
        padding: 10px 15px 0px;
        background: #f5f7f9;
    }

    .breadCrumb {
        padding-left: 15px;
        background: #fff;
        line-height: 50px;
        border: 1px solid #eee;
        box-shadow: 0 1px 1px #ccc;
        margin-top: 1em;
    }

    .nowPage {
        font-size: 20px;
        padding: 1em 0 2em 15px;
        letter-spacing: 1px;
        color: #525c6c;
        font-weight: 600;
    }

    .router-content {
        min-height: 100px;
        margin: 15px;
        margin-bottom: 50px;
        background: #fff;
        border-radius: 4px;
    }
</style>

