import { Module } from 'vuex'
import { RootState } from '../types'
import { AuthState } from './types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const namespaced: boolean = true

export const state: AuthState = {
  isLoggedIn: false,
  token: '',
}

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
