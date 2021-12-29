import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { loginModule } from './modules/login'
export interface IRootState {
  counter: number
}

export default createStore<IRootState>({
  state: {
    counter: 0
  },
  mutations: {},
  actions: {},
  modules: { loginModule }
})
export const key: InjectionKey<Store<IRootState>> = Symbol()
export function useStore() {
  return baseUseStore(key)
}
