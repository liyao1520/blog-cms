import { request } from './index'

export const reqAddArticle = (data: any) =>
  request({
    url: '/article',
    method: 'post',
    data
  })
export const reqArticleList = (params: any) =>
  request({
    url: '/article',
    method: 'get',
    params
  })
export const reqUpdateArticle = (data: any) =>
  request({
    url: '/article',
    method: 'put',
    data
  })
export const reqDelArticle = (id: number) =>
  request({
    url: '/article/' + id,
    method: 'delete'
  })
export const reqArticleById = (id: number | string) =>
  request({
    url: '/article/' + id,
    method: 'get'
  })
