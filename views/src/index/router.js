import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

const Index = resolve => require(['./view/index'], resolve)
const index = resolve => require(['./view/index/index'], resolve)
const article = resolve => require(['./view/index/article'], resolve)
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
    next()
})

router.afterEach(route => {
    Vue.prototype.$loading.success()
})

export default router
