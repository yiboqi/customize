import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
