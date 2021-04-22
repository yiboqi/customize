// import request from '@/utils/request' // 引入封装好的 axios 请求
import { request } from '../network/request'

export function reqUserList () { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/find',
    method: 'get',
  })
}
export function reqUserPageList (pageQuery) { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/findPage',
    method: 'post',
    data:{
      pageQuery
    }
  })
}
