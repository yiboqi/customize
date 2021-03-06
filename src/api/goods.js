import {request} from '../network/request'

export function reqGoodsList () { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/goods/findgoods',
    method: 'get',
  })
}
// 分页
export function reqGoodsPageList (pageQuery) { // 获取用户接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/goods/findPage',
    method: 'post',
    data:{
      pageQuery
    }
  })
}
// 单个删除
export function delGoods (goods) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/goods/delGid',
    method: 'delete',
    data: { // 提交的数据
      goods
    }
  })
}
// 批量删除
export function delGoodsArr (array) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/goods/delGoodsArr',
    method: 'delete',
    data: { // 提交的数据
      array
    }
  })
}
// 添加用户
export function addGoods (goods) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/goods/addGoods',
    method: 'post',
    data: { // 提交的数据
      goods
    }
  })
}
// 修改商品
export function updateGoods (goods) { // 获取信息接口
  return request({ // 使用封装好的 axios 进行网络请求
    url: '/goods/updateGoods',
    method: 'put',
    data: { // 提交的数据
      goods
    }
  })
}
