import { request } from './index'
export interface ILoginData {
  user_name: string
  password: string
}
export const reqLogin = (data: ILoginData) =>
  request({
    method: 'POST',
    url: '/user/login',
    data
  })
export const reqUpdatePassword = (data: { password: string }) =>
  request({
    method: 'patch',
    url: '/user/',
    data
  })
export const reqUserList = (params: any) =>
  request({
    method: 'get',
    url: '/user/',
    params
  })
