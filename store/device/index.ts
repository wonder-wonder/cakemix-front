import { Module } from 'vuex'
import { RootState } from '../types'
import { DeviceState } from './types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const namespaced: boolean = true

export const state = (): DeviceState => {
  return { isMobile: false, windowWidth: 1000, theme: -1 }
}

export const device: Module<DeviceState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
