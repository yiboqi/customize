// import request from '@/utils/request' // 引入封装好的 axios 请求
import { request } from '../network/request'

export function login (user) { // 登录接口
  console.log("==>",user)
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/login',
    // url: '/user/login',
    method: 'post',
    data: user // 提交的数据

  })
}
export function getUserInfo () { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/user/index',
    method: 'get'
  })
}
