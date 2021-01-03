import { GetterTree } from 'vuex'
import { RootState } from '../types'
import { DeviceState } from './types'

const getters: GetterTree<DeviceState, RootState> = {
  isMobile(state: DeviceState): boolean {
    return state.isMobile
  },
  windowWidth(state: DeviceState): number {
    return state.windowWidth
  },
}

export default getters
