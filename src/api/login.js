// import request from '@/utils/request' // 引入封装好的 axios 请求
import { request } from '../network/request'

export function login (username, password) { // 登录接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/login',
    method: 'post',
    data: { // 提交的数据
      username,
      password
    }
  })
}
export function getUserInfo () { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/user/index',
    method: 'get'
  })
}
