import Request from './request'

import { getItem } from '@/utils/storage'

export const request = new Request({
  baseURL: '/api',
  timeout: 5000,
  interceptors: {
    requestInterceptor(config) {
      console.log('____________________请求拦截器__________________')
      const token = getItem('token')
      if (config.headers) config.headers.Authorization = `Bearer ${token}`
      return config
    },
    requestInterceptorCatch(err) {
      console.log('请求错误拦截而器')
      return err
    },
    responseInterceptor(res) {
      console.log('___________________响应拦截器_____________________')
      return res
    },
    responseInterceptorCatch(err) {
      console.log('响应错误拦截器')
      return err
    }
  }
}).instrance
