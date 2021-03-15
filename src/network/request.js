import axios from 'axios'

export function request (config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8088/',
    timeout: 5000
  })
  // instance.interceptors.request.use(config => {
  //   console.log(config)
  //   return config
  // }, error => {
  //   console.log(error)
  // })
  // instance.interceptors.response.use(res => {
  //   console.log('res', res)
  //   return res.data
  // }, error => {
  //   console.log(error)
  // })
  // 2. 发送真正的网络请求   *****
  return instance(config)
}
