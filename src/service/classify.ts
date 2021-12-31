import { request } from './index'
export const reqAddClassify = (data: any) =>
  request({
    url: 'classify',
    method: 'post',
    data
  })
export const reqDelClassify = (id: number) =>
  request({
    url: '/classify/' + id,
    method: 'DELETE'
  })
export const reqClassifyList = (params: any) =>
  request({
    url: '/classify',
    params
  })
