import Vue from 'vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import './styles/iconfont/iconfont.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from "@/utils/permission"; // 权限判断函数
import enterNumber from "@/directive/CheckInput/index"
import focus from "@/directive/focus/index"
import uploader from 'vue-simple-uploader'
Vue.use(uploader)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

Vue.use(Element, {
  size: 'small' // set element-ui default size
})
Vue.prototype.$checkPermission = checkPermission

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.directive('permission', permission)
Object.keys(enterNumber).forEach(item => {
  Vue.directive(item, enterNumber[item])
})
Object.keys(focus).forEach(item => {
  Vue.directive(item, focus[item])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
