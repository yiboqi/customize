import axios from 'axios'

export function request (config) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-unused-vars
    // 1. 创建axios实例
    const instance = axios.create({
      baseURL: 'http://localhost:8088/',
      timeout: 5000
    })
    instance.interceptors.request.use(config => {
      console.log(config)
      return config
    }, error => {
      console.log(error)
    })
    // instance.interceptors.response.use(res => {
    //   return res.data
    // }, error => {
    //   console.log(error)
    // })
    // 2. 发送真正的网络请求
    return instance(config)
  })
}
