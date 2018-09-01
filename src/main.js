// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' // E6 Api 转 E5
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $http from './lib/httpPlugin' // 封装$ftach
import sessionStorage from './lib/sessionStoragePlugin' // 兼容safari无痕模式
import formVerify from './lib/formVerify' // 自定义校验

import VueLazyload from 'vue-lazyload' // 使用 :src="" 换成 v-lazy=""

import './filters' // 全局注册过滤器
import './components/base/globalRegister' // 全局注册基础组件

import './assets/css/reset_m.css' // 初始化css
import './assets/font/iconfont.css' // 字体图标
import '../node_modules/moment/locale/zh-cn' // import 方式 moment国际化

if (process.env.NODE_ENV === 'development') require('../mock') // 开发环境 启用mockjs

Vue.use($http)
Vue.use(sessionStorage)
Vue.use(formVerify)
Vue.use(VueLazyload)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
