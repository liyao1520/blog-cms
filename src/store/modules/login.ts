import { setItem } from '@/utils/storage'
import { Module } from 'vuex'
import { IRootState } from '../index'
interface ILoginState {
  token: string
  userInfo: {
    name?: string
    id?: number
  }
}
export const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {}
  }),
  actions: {},
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem('userInfo', userInfo)
    }
  }
}
