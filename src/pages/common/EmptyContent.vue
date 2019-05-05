<template>
    <div>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
  export default {
    name: 'EmptyContent',
    data () {
      return {}
    },
    mounted: function () {

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
        padding: 10px 15px 0;
        background: #f5f7f9;
    }

    .breadCrumb {
        padding-left: 15px;
        background: #fff;
        line-height: 38px;
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
        min-height: 200px;
        margin: 15px;
        background: #fff;
        border-radius: 4px;
    }
</style>

