/**
 * Created by liqiang on 2017/5/25.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'
import store from '../store'

// Vue.use(iView)
Vue.use(VueRouter)

const login = resolve => require(['../pages/login/login'], resolve)
const signup = resolve => require(['../pages/signup/signup'], resolve)

const mainContent = resolve => require(['../pages/common/MainContent'], resolve)
const emptyContent = resolve => require(['../pages/common/EmptyContent'], resolve)
const home = resolve => require(['../pages/home/Home'], resolve)
// 超级管理员
const accountList = resolve => require(['../pages/account/accountList'], resolve)
const addAccount = resolve => require(['../pages/account/addAccount'], resolve)
const editAccount = resolve => require(['../pages/account/editAccount'], resolve)
const multiAddAccount = resolve => require(['../pages/account/multiAddAccount'], resolve)

const teamList = resolve => require(['../pages/team/teamList'], resolve)
const addTeam = resolve => require(['../pages/team/addTeam'], resolve)
const quitList = resolve => require(['../pages/team/quitList'], resolve)
const editTeam = resolve => require(['../pages/team/editTeam'], resolve)
const teamDetail = resolve => require(['../pages/team/teamDetail'], resolve)
const addTeamMember = resolve => require(['../pages/team/addTeamMember'], resolve)
const multiAddEmployee = resolve => require(['../pages/team/multiAddEmployee'], resolve)
const historyEmployee = resolve => require(['../pages/team/historyEmployee'], resolve)

// 推广任务管理
const taskList = resolve => require(['../pages/task/taskList'], resolve)
const addTask = resolve => require(['../pages/task/addTask'], resolve)
const taskDetail = resolve => require(['../pages/task/taskDetail'], resolve)

// 超管结算单
const billList = resolve => require(['../pages/bill/billList'], resolve)
const billDetail = resolve => require(['../pages/bill/billDetail'], resolve)
const postBill = resolve => require(['../pages/bill/postBill'], resolve)

// 团队管理员
const teamList_user = resolve => require(['../pages/team/teamList_user'], resolve)
const addTeamMember_user = resolve => require(['../pages/team/addTeamMember_user'], resolve)
const multiAddTeamMember_user = resolve => require(['../pages/team/multiAddTeamMember_user'], resolve)
const editTeamMember_user = resolve => require(['../pages/team/editTeamMember_user'], resolve)
const quitList_user = resolve => require(['../pages/team/quitList_user'], resolve)
const historyEmployee_user = resolve => require(['../pages/team/historyEmployee_user'], resolve)

// 推广任务管理
const taskList_user = resolve => require(['../pages/task/taskList_user'], resolve)
const taskDetail_user = resolve => require(['../pages/task/taskDetail_user'], resolve)

// 团队管理员结算单
const billList_user = resolve => require(['../pages/bill/billList_user'], resolve)
const billDetail_user = resolve => require(['../pages/bill/billDetail_user'], resolve)

const deptEdit = resolve => require(['../pages/depart/deptEdit'], resolve)
const deptDetail = resolve => require(['../pages/depart/deptDetail'], resolve)
const addMember = resolve => require(['../pages/depart/addMember'], resolve)

const performance_weixin = resolve => require(['../pages/performance/performanceList_weixin'], resolve)
const performance_aliPay = resolve => require(['../pages/performance/performanceList_aliPay'], resolve)
const performanceDetail_weixin = resolve => require(['../pages/performance/performanceDetail_weixin'], resolve)
const performanceDetail_aliPay = resolve => require(['../pages/performance/performanceDetail_aliPay'], resolve)
const performance_user_weixin = resolve => require(['../pages/performance/performanceList_user_weixin'], resolve)
const performance_user_aliPay = resolve => require(['../pages/performance/performanceList_user_aliPay'], resolve)
const performanceDetail_user_weixin = resolve => require(['../pages/performance/performanceDetail_user_weixin'], resolve)
const performanceDetail_user_aliPay = resolve => require(['../pages/performance/performanceDetail_user_aliPay'], resolve)

//管理员菜单
const router1 = [
  {
    path: '/home',
    component: mainContent,
    meta: {
      name: '首页',
      icon: 'ios-analytics',
      hidden: true
    },
    children: [
      {
        path: '',
        component: home,
        meta: {
          hidden: true,
          name: '首页'
        }
      }
    ]
  },
  {
    path: '/account',
    component: mainContent,
    meta: {
      name: '账户操作',
      icon: 'ios-keypad'
    },
    children: [
      {
        path: '',
        component: accountList,
        meta: {
          hidden: true,
          name: '推广账户管理'
        }
      },
      {
        path: 'addAccount',
        component: addAccount,
        meta: {
          name: '新增账户',
          icon: 'ios-crop-strong',
          showInNav: false,
        }
      },
      {
        path: 'multiAddAccount',
        component: multiAddAccount,
        meta: {
          name: '批量新增账户',
          icon: 'ios-copy-outline'
        }
      },
      {
        path: 'editAccount',
        component: editAccount,
        meta: {
          name: '编辑账户',
          icon: 'edit'
        }
      }
    ]
  },
  {
    path: '/team',
    component: mainContent,
    meta: {
      name: '团队管理',
      icon: 'android-compass'
    },
    children: [
      {
        path: '',
        component: teamList,
        meta: {
          hidden: true,
          name: '推广团队管理'
        }
      },
      {
        path: 'teamDetail',
        component: emptyContent,
        meta: {
          name: '团队详情',
          icon: 'ios-bookmarks'
        },
        children: [
          {
            path: '',
            component: teamDetail,
            meta: {
              name: '团队详情',
              hidden: true
            }
          },
          {
            path: 'deptEdit',
            component: emptyContent,
            meta: {
              name: '部门设置',
              icon: 'ios-people'
            },
            children: [{
              path: '',
              component: deptEdit,
              meta: {
                name: '部门设置',
                hidden: true
              },
            },
              {
                path: 'deptDetail',
                component: emptyContent,
                meta: {
                  name: '部门详情',
                  icon: 'ios-book'
                },
                children: [{
                  path: '',
                  component: deptDetail,
                  meta: {
                    name: '部门详情',
                    hidden: true
                  },
                },
                  {
                    path: 'addMember',
                    component: addMember,
                    meta: {
                      name: '添加部门成员',
                      icon: 'android-person-add'
                    },
                  }
                ]
              },
            ]
          },
          {
            path: 'addTeamMember',
            component: addTeamMember,
            meta: {
              name: '新增员工',
              icon: 'android-person-add'
            },
          },
          {
            path: 'multiAddEmployee',
            component: multiAddEmployee,
            meta: {
              name: '批量新增',
              icon: 'ios-copy-outline'
            },
          },
          {
            path: 'historyEmployee',
            component: historyEmployee,
            meta: {
              name: '历史员工',
              icon: 'android-contact'
            },
          }
        ]
      },
      {
        path: 'addTeam',
        component: addTeam,
        meta: {
          name: '新增团队',
          icon: 'android-contacts'
        }
      },
      {
        path: 'quitList',
        component: quitList,
        meta: {
          name: '退团申请',
          icon: 'ios-shuffle-strong'
        }
      }
    ]
  },
  {
    path: '/manageTask',
    component: mainContent,
    meta: {
      name: '推广任务管理',
      icon: 'android-checkmark-circle',
    },
    children: [
      {
        path: '',
        component: taskList,
        meta: {
          hidden: true,
          name: '推广任务管理',
        }
      },
      {
        path: 'addTask',
        component: addTask,
        meta: {
          icon: 'document-text',
          name: '新建推广任务'
        }
      },
      {
        path: 'taskDetail',
        component: taskDetail,
        meta: {
          name: '任务详情',
          icon: 'ios-paper',
        }
      }
    ]
  },
  {
    path: '/billsManagement',
    component: mainContent,
    meta: {
      name: '结算单管理',
      icon: 'clipboard',
    },
    children: [
      {
        path: '',
        component: billList,
        meta: {
          hidden: true,
          name: '结算单列表',
        }
      },
      {
        path: 'billDetail',
        component: billDetail,
        meta: {
          name: '结算单详情',
          icon: 'document-text'
        }
      },
      {
        path: 'postBill',
        component: postBill,
        meta: {
          name: '发送结算单',
          icon: 'document-text'
        }
      },
    ],
  },
  {
    path: '/performance',
    component: mainContent,
    meta: {
      name: '推广业绩查询',
      icon: 'arrow-graph-up-right',
      showSub: true,
    },
    children: [
      {
        path: 'performance_weixin',
        component: emptyContent,
        meta: {
          // hidden: true,
          name: '微信推广业绩',
          icon: 'ios-paperplane'
        },
        children: [
          {
            path: '',
            component: performance_weixin,
            meta: {
              hidden: true,
              name: '微信推广业绩',
            }
          },
          {
            path: 'performanceDetail',
            component: performanceDetail_weixin,
            meta: {
              name: '微信业绩详情',
              icon: 'android-list'
            }
          }]
      },
      {
        path: 'performance_aliPay',
        component: emptyContent,
        meta: {
          // hidden: true,
          name: '支付宝推广业绩',
          icon: 'ios-paperplane'
        },
        children: [{
          path: '',
          component: performance_aliPay,
          meta: {
            name: '支付宝推广业绩',
            hidden: true,
          }
        },
          {
            path: 'performanceDetail',
            component: performanceDetail_aliPay,
            meta: {
              name: '支付宝业绩详情',
              icon: 'android-list'
            }
          }]
      }]
  },
]
//非管理员菜单
const router2 = [
  {
    path: '/home',
    component: mainContent,
    meta: {
      name: '首页',
      icon: 'ios-analytics',
      hidden: true,
    },
    children: [{
      path: '',
      component: home,
      meta: {
        hidden: true,
        name: '首页'
      }
    }]
  },
  {
    path: '/team',
    component: mainContent,
    meta: {
      name: '团队管理',
      icon: 'android-compass'
    },
    children: [
      {
        path: '',
        component: teamList_user,
        meta: {
          hidden: true,
          name: '团队管理'
        }
      },
      {
        path: 'addTeamMember',
        component: addTeamMember_user,
        meta: {
          name: '新增团员',
          icon: 'android-person-add',
        }
      },
      {
        path: 'multiAddTeamMember',
        component: multiAddTeamMember_user,
        meta: {
          name: '批量新增',
          icon: 'ios-copy-outline',
        }
      },
      {
        path: 'editTeamMember',
        component: emptyContent,
        meta: {
          name: '编辑员工',
          icon: 'android-contacts',
          hidden: true
        },
        children: [{
          path: '',
          component: editTeamMember_user,
          meta: {
            name: '编辑员工',
            icon: 'android-contacts',
          },
        }]
      },
      {
        path: 'quitList',
        component: quitList_user,
        meta: {
          name: '退团申请',
          icon: 'ios-shuffle-strong'
        }
      },
      {
        path: 'historyEmployee',
        component: historyEmployee_user,
        meta: {
          name: '历史员工',
          icon: 'android-contact'
        }
      },
      {
        path: 'deptEdit',
        component: emptyContent,
        meta: {
          name: '部门设置',
          icon: 'ios-people'
        },
        children: [{
          path: '',
          component: deptEdit,
          meta: {
            name: '部门设置',
            hidden: true
          },
        },
          {
            path: 'deptDetail',
            component: emptyContent,
            meta: {
              name: '部门详情',
              icon: 'ios-book'
            },
            children: [{
              path: '',
              component: deptDetail,
              meta: {
                name: '部门详情',
                hidden: true,
              },
            },
              {
                path: 'addMember',
                component: addMember,
                meta: {
                  name: '添加部门成员',
                  icon: 'android-person-add'
                },
              }
            ]
          },
        ]
      },
    ]
  },
  {
    path: '/manageTask',
    component: mainContent,
    meta: {
      name: '推广任务管理',
      icon: 'android-checkmark-circle',
    },
    children: [
      {
        path: '',
        component: taskList_user,
        meta: {
          hidden: true,
          name: '推广任务管理',
        }
      },
      {
        path: 'taskDetail_user',
        component: taskDetail_user,
        meta: {
          name: '推广任务详情',
          icon: 'ios-paper',
        }
      },
    ]
  },
  {
    path: '/billsManagement',
    component: mainContent,
    meta: {
      name: '结算单管理',
      icon: 'clipboard',
    },
    children: [
      {
        path: '',
        component: billList_user,
        meta: {
          hidden: true,
          name: '结算单列表',
        }
      },
      {
        path: 'billDetail',
        component: billDetail_user,
        meta: {
          name: '结算单详情',
          icon: 'document-text'
        }
      },
    ],
  },
  {
    path: '/performance',
    component: mainContent,
    meta: {
      name: '推广业绩查询',
      icon: 'arrow-graph-up-right',
      showSub: true,
    },
    children: [
      {
        path: 'performance_user_weixin',
        component: emptyContent,
        meta: {
          // hidden: true,
          name: '微信推广业绩',
          icon: 'ios-paperplane'
        },
        children: [{
          path: '',
          component: performance_user_weixin,
          meta: {
            hidden: true,
            name: '微信推广业绩',
          }
        }, {
          path: 'performanceDetail',
          component: performanceDetail_user_weixin,
          meta: {
            name: '微信业绩详情',
            icon: 'android-list'
          }
        }]
      },
      {
        path: 'performance_user_aliPay',
        component: emptyContent,
        meta: {
          // hidden: true,
          name: '支付宝推广业绩',
          icon: 'ios-paperplane'
        },
        children: [{
          path: '',
          component: performance_user_aliPay,
          meta: {
            name: '支付宝推广业绩',
            hidden: true,
          }
        },
          {
            path: 'performanceDetail',
            component: performanceDetail_user_aliPay,
            meta: {
              name: '支付宝业绩详情',
              icon: 'android-list'
            }
          }]
      }]
  },
]

const loginPage = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      name: '登陆',
      hidden: true
    }
  },
  {
    path: '/login',
    component: login,
    meta: {
      name: '登陆',
      hidden: true
    },
  },
  {
    path: '/signup',
    component: signup,
    meta: {
      name: '注册',
      hidden: true
    }
  },
]
const selectRouter = (type = '0') => {
  return type === '0' ? loginPage.concat(router1) : loginPage.concat(router2)
}

const resetRouter = () => {
  router.options.routes = selectRouter(localStorage.roleType)
}
const router = new VueRouter({
  base: '',
  mode: '',
  saveScrollPosition: true,
  routes: selectRouter(localStorage.roleType)
})

router.beforeEach((to, from, next) => {
  resetRouter()
  iView.LoadingBar.start()

  if (location.protocol === 'http:' && location.host.indexOf('localhost') === -1) {
    location.href = 'https:' + location.href.substring(5)
  } else if (localStorage.isLogin || to.path === '/login' || to.path === '/signup') {
    next()
  } else {
    iView.LoadingBar.finish()
    next('/login')
  }

})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
  if (sessionStorage.reload === 'true') {
    setTimeout(() => {
      sessionStorage.setItem('reload', false)
      location.reload()
    }, 10)
  }
})

export default router