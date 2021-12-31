import { request } from './index'
export const reqTagList = (params: any) =>
  request({
    url: '/tag',
    params
  })
export const reqAddTag = (data: any) =>
  request({
    url: '/tag',
    method: 'POST',
    data
  })
export const reqDelTag = (id: number) =>
  request({
    url: '/tag/' + id,
    method: 'DELETE'
  })
