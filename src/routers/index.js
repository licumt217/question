import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)



const homepage = r => require.ensure([], () => r(require('../pages/homepage')), 'homepage')



const book_list = r => require.ensure([], () => r(require('../pages/book/list')), 'book_list')
const book_operate = r => require.ensure([], () => r(require('../pages/book/operate')), 'book_operate')

const borrow_list = r => require.ensure([], () => r(require('../pages/borrow/list')), 'borrow_list')
const borrow_operate = r => require.ensure([], () => r(require('../pages/borrow/operate')), 'borrow_operate')


const resource_list = r => require.ensure([], () => r(require('../pages/resource/list')), 'resource_list')
const resource_operate = r => require.ensure([], () => r(require('../pages/resource/operate')), 'resource_operate')

const role_list = r => require.ensure([], () => r(require('../pages/role/list')), 'role_list')
const role_operate = r => require.ensure([], () => r(require('../pages/role/operate')), 'role_operate')
const role_auth = r => require.ensure([], () => r(require('../pages/role/auth')), 'role_auth')


const user_list = r => require.ensure([], () => r(require('../pages/user/list')), 'user_list')
const user_login = r => require.ensure([], () => r(require('../pages/user/login')), 'user_login')
const user_register = r => require.ensure([], () => r(require('../pages/user/register')), 'user_register')
const user_detail = r => require.ensure([], () => r(require('../pages/user/detail')), 'user_detail')
const user_operate = r => require.ensure([], () => r(require('../pages/user/operate')), 'user_operate')

const userGroup_list = r => require.ensure([], () => r(require('../pages/userGroup/list')), 'userGroup_list')
const userGroup_operate = r => require.ensure([], () => r(require('../pages/userGroup/operate')), 'userGroup_operate')


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

        //userGroup
        {
            path:'/userGroup/list',
            component:userGroup_list
        },{
            path:'/userGroup/operate',
            component:userGroup_operate
        },





        //book
        {
            path:'/book/list',
            component:book_list,
            meta:{
                activeName:'/book/list'
            }
        },{
            path:'/book/operate',
            component:book_operate,
            meta:{
                activeName:'/book/list'
            }
        },


        //borrow
        {
            path:'/borrow/list',
            component:borrow_list,
            meta:{
                activeName:'/borrow/list'
            }
        },{
            path:'/borrow/operate',
            component:borrow_operate,
            meta:{
                activeName:'/borrow/list'
            }
        },


        {
            path:'/resource/list',
            component:resource_list,
            meta:{
                activeName:'/resource/list'
            }
        },{
            path:'/resource/operate',
            component:resource_operate,
            meta:{
                activeName:'/resource/list'
            }
        },


        {
            path:'/role/list',
            component:role_list,
            meta:{
                activeName:'/role/list'
            }
        },{
            path:'/role/operate',
            component:role_operate,
            meta:{
                activeName:'/role/list'
            }
        },{
            path:'/role/auth',
            component:role_auth,
            meta:{
                activeName:'/role/list'
            }
        },


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
