import { MutationTree } from 'vuex'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { AuthState } from './types'

const mutations: MutationTree<AuthState> = {
  login(state: AuthState, token: string) {
    state.isLoggedIn = true
    state.token = token
    const decoded = jwt_decode(token) as any
    state.uuid = decoded ? decoded.aud : ''
  },
  logout(state: AuthState) {
    state.isLoggedIn = false
    state.token = ''
  },
}

export default mutations
