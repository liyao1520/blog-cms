import Request from './request'

import { getItem } from '@/utils/storage'
import { ElMessage } from 'element-plus'
export const request = new Request({
  baseURL: '/api',
  timeout: 5000,
  interceptors: {
    requestInterceptor(config) {
      console.log('__________请求拦截器_____')
      const token = getItem('token')
      if (config.headers) config.headers.Authorization = `Bearer ${token}`
      return config
    },
    requestInterceptorCatch(err) {
      console.log('请求错误拦截而器')
      return err
    },
    responseInterceptor(res) {
      console.log('____响应拦截器__________')
      if (res.status < 200 || res.status >= 300) {
        ElMessage.error(res.status + '--' + res.statusText)
      } else if (res.data.code !== 0) {
        ElMessage.error(res.data.msg)
      }
      return res.data
    },
    responseInterceptorCatch(err) {
      console.log('响应错误拦截器')
      return err
    }
  }
}).instrance
