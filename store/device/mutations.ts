import { MutationTree } from 'vuex'
import { DeviceState } from './types'

const mutations: MutationTree<DeviceState> = {
  isMobile(state: DeviceState, isMobile: boolean) {
    state.isMobile = isMobile
  },
}

export default mutations
