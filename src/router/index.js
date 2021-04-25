import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index/Index'
import Login from '../views/Login/Login'
import { getToken } from '../assets/js/auth'
import store from '../store/index'//引入store

Vue.use(VueRouter)

// 解决：https://blog.csdn.net/weixin_43242112/article/details/107595460
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    redirect: '/home',
    component: Index,
    children: [
      {
        path: '/home',
        component: () => import("../views/Index/children/Home/Home")
      },
      {
        path: '/goods',
        component: () => import("../views/Index/children/GoodsManage/goods/Goods")
      },
      {
        path: '/device',
        component: () => import("../views/Index/children/DeviceManage/DeviceList/DeviceList")
      },
      {
        path: '/user',
        component: () => import("../views/Index/children/UserManage/User/User")
      },
      {
        path: '/role',
        component: () => import("../views/Index/children/UserManage/Role/Role")
      },
      {
        path: '/order',
        component: () => import("../views/Index/children/OrderManage/order/Order")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  // mode:'hash',
  routes
})

// 定义白名单
const whiteList = ['/login']
  // 导航守卫： https://www.cnblogs.com/shenjianping/p/11458261.html
router.beforeEach((to,from, next) => {
  if( getToken() ){
    /* has token*/
    if (to.path == '/login') {
      next("/home")
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

export default router
