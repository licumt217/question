<template>
    <div>
        <Menu :active-name="setActive" :open-names="setOpen" theme="dark" width="auto" @on-select="routeTo"
              ref="leftMenu">
            <div class="logo">
                <Row type="flex" justify="center" align="middle">
                    <Col span="24" style="text-align:center">
                        <img width="100" style="margin-right:14px" src="../../assets/images/logo2.png" alt="">
                    </Col>
                </Row>
            </div>
            <template v-for="route in $router.options.routes" v-if="!route.meta.hidden">
                <Menu-item v-if="!route.meta.showSub" :name="route.path">
                    <Icon :size="18" :type="route.meta.icon"></Icon>
                    <span class="layout-text">{{ route.meta.name }}</span>
                </Menu-item>
                <Submenu v-else :name="route.path">
                    <template slot="title">
                        <Icon :size="18" :type="route.meta.icon"></Icon>
                        <span class="layout-text">{{ route.meta.name}}</span>
                    </template>
                    <Menu-item v-for="(child,$index) in route.children" :key="$index" v-if="!child.meta.hidden"
                               :name="route.path + '/' + child.path">
                        <span class="layout-text">&nbsp;&nbsp;{{ child.meta.name }}</span>
                    </Menu-item>
                </Submenu>
            </template>
        </Menu>
    </div>
</template>
<script>
  export default {
    name: 'Nav',
    props: {
      spanLeft: {
        type: Number,
        defautlt: 4,
      }
    },
    data () {
      return {
        name: 'Admin',
        setActive: ''
      }
    },
    mounted () {
    },
    updated () {
      this.$nextTick(() => {
        this.$refs.leftMenu.updateActiveName()
      })
    },
    watch: {
      $route (to, from) {
        if (this.$route.path.split('/').length >= 3 && this.$route.path.split('/')[1] === 'performance') {
          this.setActive = '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
        } else {
          this.setActive = '/' + this.$route.path.split('/')[1]
        }
      }
    },
    computed: {
      setOpen () {
        // 初始化时打开所有一级菜单
        return this.$router.options.routes.map(function (route) {
          return route.path
        })
      },
    },
    methods: {
      routeTo (page) {
        this.$router.push(page)
      },
      routeItemIndex (page) {
        this.$router.push(page)
      }
    }
  }
</script>
<style lang="less">
    .layout-logo-left {
        padding: 2em 0;
        text-align: center;
        vertical-align: middle;
        height: auto;
    }

    .layout-text {
        margin-left: 8px;
    }

    .layout-hide-text .ivu-menu-submenu-title-icon {
        top: -20px !important;
        right: -18px !important;
    }

    .logo {
        padding: 2.5em 0 2em;
        border-bottom: 2px solid #1c2438;
        cursor: pointer;
    }
</style>
