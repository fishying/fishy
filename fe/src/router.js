import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['./view/index'], resolve)

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: index
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