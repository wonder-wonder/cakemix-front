import { GetterTree } from 'vuex'
import { RootState } from '../types'
import { DeviceState } from './types'

const getters: GetterTree<DeviceState, RootState> = {
  isSmallWidth(state: DeviceState): boolean {
    return state.windowWidth < 551
  },
  isMobile(state: DeviceState): boolean {
    return state.windowWidth < 901
  },
  windowWidth(state: DeviceState): number {
    return state.windowWidth
  },
  theme(state: DeviceState): number {
    if (state.theme === -1) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 0 : 1
    } else {
      return state.theme
    }
  },
}

export default getters
