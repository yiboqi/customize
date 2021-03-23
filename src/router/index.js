import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index/Index'
import Login from '../views/Login/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/',
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
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
