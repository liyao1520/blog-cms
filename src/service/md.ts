import { request } from './index'
export const reqGetMdByName = (name: string) =>
  request({
    url: '/md/name',
    params: { name }
  })
export const reqGetMdAll = (params: any) =>
  request({
    url: '/md',
    params
  })
export const reqAddMd = (data: any) =>
  request({
    url: '/md',
    method: 'POST',
    data
  })
export const reqUpdateMd = (data: any) =>
  request({
    url: '/md',
    method: 'PUT',
    data
  })
export const reqDelMd = (id: number) =>
  request({
    url: '/md/' + id,
    method: 'DELETE'
  })
