import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

const Index = resolve => require(['./view/index'], resolve)
const index = resolve => require(['./view/index/index'], resolve)
const article = resolve => require(['./view/index/article'], resolve)
const login = resolve => require(['./view/index/login'], resolve)
const logon = resolve => require(['./view/index/logon'], resolve)


const admin = resolve => require(['./view/admin'], resolve)
const admin_index = resolve => require(['./view/admin/index'], resolve)
const admin_article = resolve => require(['./view/admin/article'], resolve)
const admin_addarticle = resolve => require(['./view/admin/addArticle'], resolve)
const admin_uparticle = resolve => require(['./view/admin/upArticle'], resolve)
const admin_type = resolve => require(['./view/admin/type'], resolve)
const admin_addtype = resolve => require(['./view/admin/addType'], resolve)

Vue.use(Router)

let router = new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {

        if (to.hash) {
            return {
                selector: to.hash
            }
        }else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: Index,
            children:[
                {
                    path: '',
                    name: 'index',
                    component: index
                },
                {
                    path: '/article/:id',
                    name: 'article',
                    component: article,
                },
                {
                    path: '/login',
                    name: 'login',
                    component: login,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/logon',
                    name: 'logon',
                    component: logon,
                    meta: { requiresAuth: true }
                },
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
            meta: { requiresAuth: true },
            children:[
                {
                    path: '',
                    name:"adminIndex",
                    component: admin_index
                },
                {
                    path: 'article',
                    name:"adminArticle",
                    component: admin_article
                },
                {
                    path: 'add/article',
                    name:"addArticle",
                    component: admin_addarticle
                },
                {
                    path: 'up/article/:id',
                    name:"upArticle",
                    component: admin_addarticle
                },
                {
                    path: 'type',
                    name:"adminType",
                    component: admin_type
                },
                {
                    path: 'add/type',
                    name:"addType",
                    component: admin_addtype
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    Vue.prototype.$loading.open()
    store.dispatch("checklogin")
    .then((login)=>{
        if (to.matched.some(record => record.meta.requiresAuth)) {
            if(login.status){
                Vue.prototype.$loading.success()
                if(to.name == "login" || to.name == "logon") {
                    next("/")
                }else {
                    next()
                }
            }else {
                Vue.prototype.$loading.success()
                if(to.name == "login" || to.name == "logon") {
                    next()
                }else {
                    Vue.prototype.$notify.warning("私人领域~请先登录~")
                    next("/login")
                }
            }
        }else {
            Vue.prototype.$loading.open()
            next()
        }
    })
})

router.afterEach(route => {
    Vue.prototype.$loading.success()
})

export default router
