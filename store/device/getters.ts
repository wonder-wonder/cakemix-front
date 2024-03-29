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
}

export default getters
