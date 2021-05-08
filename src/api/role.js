// import request from '@/utils/request' // 引入封装好的 axios 请求
import { request } from '../network/request'

export function searchRole (query) { // 获取用户接口
  return request({ // 使用封装好的 axiosfindrole 进行网络请求
    url: '/role/searchRole',
    method: 'get',
    params: query
  })
}
export function reqRoleList () { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/role/findrole',
    method: 'get',
  })
}
// 分页查询
export function reqRolePageList (pageQuery) { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/role/findPage',
    method: 'post',
    data:{
      pageQuery
    }
  })
}
export function updateStatus (role) { // 登录接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/role/updateStatus',
    method: 'put',
    data: { // 提交的数据
      role
    }
  })
}
// 单个删除
export function delRole (role) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/role/delrole',
    method: 'delete',
    data: { // 提交的数据
      role
    }
  })
}
// 添加用户
export function addRole (role) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/role/addRole',
    method: 'post',
    data: { // 提交的数据
      role
    }
  })
}
// 批量删除
export function delRoleArr (array) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/role/delRoleArr',
    method: 'delete',
    data: { // 提交的数据
      array
    }
  })
}
// 修改用户
export function updateRole (role) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/role/updateRole',
    method: 'put',
    data: { // 提交的数据
      role
    }
  })
}
