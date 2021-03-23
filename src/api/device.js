import {request} from '../network/request'

export function reqDeviceList () { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/device/findDevice',
    method: 'get',
  })
}
// 分页
export function reqDevicePageList (pageQuery) { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/device/findPage',
    method: 'post',
    data:{
      pageQuery
    }
  })
}
// 单个删除
export function delDevice (device) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/device/delDid',
    method: 'delete',
    data: { // 提交的数据
      device
    }
  })
}
// 添加设备
export function addDevice (device) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/device/addDevice',
    method: 'post',
    data: { // 提交的数据
      device
    }
  })
}
// 修改用户
export function updateDevice (device) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/device/updateDevice',
    method: 'put',
    data: { // 提交的数据
      device
    }
  })
}
// 批量删除
export function delDeviceArr (array) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/device/delDeviceArr',
    method: 'delete',
    data: { // 提交的数据
      array
    }
  })
}

