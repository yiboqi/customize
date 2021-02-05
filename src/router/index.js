import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from '../views/Index/Index'
import Home from '../components/content/Home/Home'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '',
  //   redirect: '/'
  // },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router
