// import request from '@/utils/request' // 引入封装好的 axios 请求
import { request } from '../network/request'

export function searchUser (query) { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/searchUser',
    method: 'get',
    params: query
  })
}
export function reqUserList () { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/finduser',
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
export function updateStatus (user) { // 登录接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/updateStatus',
    method: 'put',
    data: { // 提交的数据
      user
    }
  })
}
// 单个删除
export function delUser (user) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/deluser',
    method: 'delete',
    data: { // 提交的数据
      user
    }
  })
}
// 添加用户
export function addUser (user) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/addUser',
    method: 'post',
    data: { // 提交的数据
      user
    }
  })
}
// 批量删除
export function delUserArr (array) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/delUserArr',
    method: 'delete',
    data: { // 提交的数据
      array
    }
  })
}
// 修改用户
export function updateUser (user) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/updateUser',
    method: 'put',
    data: { // 提交的数据
      user
    }
  })
}

// 导出用户
export function exportUser () { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/exportUser',
    method: 'post',
    responseType: 'blob'
  })
}


