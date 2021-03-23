import {request} from '../network/request'

export function searchOrder (order) { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/order/searchOrder',
    method: 'post',
    data: { // 提交的数据
      order
    }
  })
}
export function reqUserPageList (pageQuery) { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/order/findPage',
    method: 'post',
    data:{
      pageQuery
    }
  })
}
