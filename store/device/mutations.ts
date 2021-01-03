import { MutationTree } from 'vuex'
import { DeviceState } from './types'

const mutations: MutationTree<DeviceState> = {
  isMobile(state: DeviceState, isMobile: boolean) {
    state.isMobile = isMobile
  },
  windowWidth(state: DeviceState, width: number) {
    state.windowWidth = width
  },
}

export default mutations
