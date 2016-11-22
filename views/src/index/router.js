import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

const Index = resolve => require(['./view/index'], resolve)
const index = resolve => require(['./view/index/index'], resolve)
const article = resolve => require(['./view/index/article'], resolve)
const login = resolve => require(['./view/index/login'], resolve)
const logon = resolve => require(['./view/index/logon'], resolve)
const typeArticle = resolve => require(['./view/index/type-article'], resolve)

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
                    component: index
                },
                {
                    path: '/article/:id',
                    component: article,
                },
                {
                    path: '/login',
                    component: login,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/logon',
                    component: logon,
                    meta: { requiresAuth: true }
                },
                {
                    path: '/type/:id',
                    component: typeArticle,
                },
            ]
        },
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
