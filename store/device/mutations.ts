import { MutationTree } from 'vuex'
import { RootState } from '../types'
import { DeviceState } from './types'

const mutations: MutationTree<DeviceState> = {
  isMobile(state, isMobile: boolean) {
    state.isMobile = isMobile
  },
}

export default mutations
