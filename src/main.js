// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
// import Axios from 'axios'
import layer from 'vue-layer'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import './assets/css/style.css'
import App from './App'

// window.$ = window.jQuery = require('jquery') // 引入jquery

Vue.use(ElementUI, { size: 'medium' })
// Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(Select)
// Vue.use(Axios)

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
