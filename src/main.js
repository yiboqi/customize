import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import { addDateRange } from "./assets/js/common.js";

// 使用字体图标 ： https://www.jb51.net/article/141544.htm
// import './assets/fonts/iconfont.css';

Vue.prototype.$echarts = echarts
Vue.prototype.addDateRange = addDateRange

Vue.config.productionTip = false

Vue.use(ElementUI)

// 时间格式化 过滤器
// https://blog.csdn.net/Jackson23333/article/details/84944224
// https://blog.csdn.net/huangge1199/article/details/104630274/
Vue.filter('dateFormat',function(dateStr,time){
  //得到特定的时间
  var date = new Date(dateStr);
  var year = date.getFullYear();
  //ES6语法填充：var month = (date.getMonth()+1).toString().padStart(2, '0');
  var month = date.getMonth()+1<10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1;
  var day = date.getDate()<10 ? '0' + date.getDate() : date.getDate();
  var hh = date.getHours()<10 ? '0' + date.getHours() : date.getHours();
  var mm = date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes();
  var ss = date.getSeconds()<10 ? '0' + date.getSeconds() : date.getSeconds();

  //return `${year}-${month}-${day}`;
  
  if(time&&time.toLowerCase() === 'yyyy-mm-dd'){
      return `${year}-${month}-${day}`;
  }else if(time&&time.toLowerCase() === 'hh:mm:ss'){
      return `${hh}:${mm}:${ss}`;
  }else{
      return `${year}-${month}-${day} ${hh}:${mm}:${ss}`;
  }
});

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App)
})
