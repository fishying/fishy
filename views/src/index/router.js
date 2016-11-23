import Vue from 'vue'
import Router from 'vue-router'

import store from '../store'

import config from '../../config/index.json'

const Index = resolve => require(['./view/index'], resolve)
const index = resolve => require(['./view/index/index'], resolve)
const none = resolve => require(['./view/404'], resolve)
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
                    meta:{title:`${config.title}`},
                    component: index
                },
                {
                    path: '/article/:id',
                    meta:{title:''},
                    component: article,
                },
                {
                    path: '/type/:alias',
                    meta:{title:''},
                    component: typeArticle,
                },
                { 
                    path: '*', 
                    meta:{title:`${config.title}-404`},
                    component: none 
                }
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
    if(route.meta.title != '') {
        document.title = route.meta.title
    }
})

export default router
