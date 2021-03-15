import {request} from '../network/request'

export function reqGoodsList () { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/goods/findgoods',
    method: 'get',
  })
}
