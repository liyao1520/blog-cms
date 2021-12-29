import { request } from './index'
export const reqUploadImg = () => request({})
export const reqUploadImgHistory = (page: number) =>
  request({
    url: '/upload/img',
    params: { page }
  })
