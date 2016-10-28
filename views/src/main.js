// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import store from './store'

import App from './App'
import router from './router.js'
import 'whatwg-fetch';
import resource from "vue-resource"
import everyone from 'everyone'
import "everyone/dist/everyone.css"

Vue.use(everyone)
Vue.use(resource)
/* eslint-disable no-new */


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')