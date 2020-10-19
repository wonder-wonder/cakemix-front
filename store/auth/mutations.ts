import { MutationTree } from 'vuex'
import { AuthState } from './types'

const mutations: MutationTree<AuthState> = {
  login(state: AuthState, token: string) {
    state.isLoggedIn = true
    state.token = token
  },
  logout(state: AuthState) {
    state.isLoggedIn = false
    state.token = ''
  },
}

export default mutations
