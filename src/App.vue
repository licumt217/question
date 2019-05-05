<template>
    <div class="appWrapper">
        <div class="login" v-if="isLogin">
            <router-view></router-view>
        </div>
        <div class="layout" v-if="!isLogin" style="display: none">
            <div class="layout-mian app-wrapper" :class="{hideSidebar:isActive}">
                <div class="sidebar-wrapper">
                    <v-nav class="sidebar-container"></v-nav>
                </div>
                <div class="main-container">
                    <v-header @toggle="toggleNav"></v-header>
                    <router-view></router-view>
                    <div class="layout-copy">
                        <span>2017 &copy; tingjiandan All Rights Reserved</span>
                    </div>
                    <Back-top :height="100" :bottom="50" :right="50"></Back-top>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import vNav from './pages/common/Nav.vue'
  import vHeader from './pages/common/Header.vue'
  import mainContent from './pages/common/MainContent.vue'

  export default {
    name: 'app',
    data () {
      return {
        isActive: false,
        isLogin: false,
      }
    },
    components: {
      vNav,
      vHeader,
      mainContent
    },
    watch: {
      $route (to, from) {
        if (to.path === '/login' || to.path === '/signup') {
          this.isLogin = true
        } else {
          $('.layout').show()
          this.isLogin = false
        }
      },
    },
    mounted () {
      this.$store.commit({
        type: 'changeName',
        userName: localStorage.getItem('ms_username')
      })
    },
    computed: {
      roleType () {
        return this.$store.roleType
      }
    },
    methods: {
      toggleNav (obj) {
        this.isActive = obj.isActive
      }
    }
  }
</script>
<style lang="less" scoped>
    .layout {
        background: #f5f7f9;
        overflow-x: hidden;
    }

    .layout-mian {
        min-height: 100vh;
        flex-wrap: nowrap;
    }

    .layout-menu-left {
        background: #464c5b;
    }

    .layout-copy {
        color: #50a9b1;
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 1.5em;
    }

    .app-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        min-width: 1366px;

        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-204px, 0);

                .sidebar-container {
                    transform: translate(195px, 0);
                }

                &:hover {
                    transform: translate(0, 0);

                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }

            .main-container {
                margin-left: 48px;

                .layout-copy span {
                    margin-left: -10px;
                }
            }
        }

        .sidebar-wrapper {
            width: 251px;
            position: fixed;
            background: #464c5b;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 999;
            overflow: hidden;
            transition: all .28s ease-out;
        }

        .sidebar-container {
            transition: all .28s ease-out;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -14px;
            overflow-y: scroll;
        }

        .main-container {
            min-height: 100%;
            transition: all .28s ease-out;
            margin-left: 251px;

            .layout-copy span {
                margin-left: -240px;
            }
        }
    }

</style>
<style lang="less">
    ::-webkit-scrollbar {
        width: 14px;
        height: 14px;
    }

    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb {
        border-radius: 999px;
        border: 5px solid transparent;
    }

    ::-webkit-scrollbar-track {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, .2) inset;
    }

    ::-webkit-scrollbar-thumb {
        min-height: 20px;
        background-clip: content-box;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, .2) inset;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }
</style>