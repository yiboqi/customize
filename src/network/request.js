import axios from 'axios'
// axios.defaults.withCredentials = true
export function request (config) {
  // 1. 创建axios实例
  const instance = axios.create({
    baseURL: 'http://localhost:8088/',
    timeout: 5000
  })
  // 2. 发送真正的网络请求   *****
  return instance(config)
}
