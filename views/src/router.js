import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['./view/index'], resolve)
const article = resolve => require(['./view/article'], resolve)
const login = resolve => require(['./view/login'], resolve)
const logon = resolve => require(['./view/logon'], resolve)

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/article',
            component: article
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/logon',
            component: logon
        }
    ]
})

router.beforeEach((to, from, next) => {

    Vue.prototype.$loading.open()

    next()
})
router.afterEach(route => {

    Vue.prototype.$loading.success()

})

export default router