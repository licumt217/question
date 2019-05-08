import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)



const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')

const user_list = r => require.ensure([], () => r(require('../pages/user/list')), 'user_list')
const user_login = r => require.ensure([], () => r(require('../pages/user/login')), 'user_login')
const user_register = r => require.ensure([], () => r(require('../pages/user/register')), 'user_register')
const user_detail = r => require.ensure([], () => r(require('../pages/user/detail')), 'user_detail')
const user_operate = r => require.ensure([], () => r(require('../pages/user/operate')), 'user_operate')

const userGroup_list = r => require.ensure([], () => r(require('../pages/userGroup/list')), 'userGroup_list')
const userGroup_operate = r => require.ensure([], () => r(require('../pages/userGroup/operate')), 'userGroup_operate')

const statistics_list = r => require.ensure([], () => r(require('../pages/statistics/list')), 'statistics_list')

const paper_list = r => require.ensure([], () => r(require('../pages/paper/list')), 'paper_list')
const paper_operate = r => require.ensure([], () => r(require('../pages/paper/operate')), 'paper_operate')

const table_list = r => require.ensure([], () => r(require('../pages/table/list')), 'table_list')
const table_operate = r => require.ensure([], () => r(require('../pages/table/operate')), 'table_operate')


const questiontype_list = r => require.ensure([], () => r(require('../pages/questiontype/list')), 'questiontype_list')
const questiontype_operate = r => require.ensure([], () => r(require('../pages/questiontype/operate')), 'questiontype_operate')





const router=new VueRouter({
    base:'question',
    // mode:'history',
    routes:[
        {
            path:'/',
            component:homepage
        },

        //user
        {
            path:'/user/list',
            component:user_list
        },
        {
            path:'/user/login',
            component:user_login
        },{
            path:'/user/register',
            component:user_register
        },{
            path:'/user/detail',
            component:user_detail
        },{
            path:'/user/operate',
            component:user_operate
        },

        //统计管理
        {
            path:'/statistics/list',
            component:statistics_list
        },

        //问卷管理
        {
            path:'/paper/list',
            component:paper_list
        },{
            path:'/paper/operate',
            component:paper_operate
        },

        //量表管理
        {
            path:'/table/list',
            component:table_list
        },{
            path:'/table/operate',
            component:table_operate
        },

        //userGroup
        {
            path:'/userGroup/list',
            component:userGroup_list
        },{
            path:'/userGroup/operate',
            component:userGroup_operate
        },




        //试题类型
        {
            path:'/questiontype/list',
            component:questiontype_list,
            meta:{
                activeName:'/role/list'
            }
        },{
            path:'/questiontype/operate',
            component:questiontype_operate,
            meta:{
                activeName:'/questiontype/operate'
            }
        },

    ]
})

router.afterEach((to,from,next)=>{




    //切换路由时菜单动态跟随切换
        store.commit('activeMenuName',to.meta.activeName)

})

export default router
