import { GetterTree } from 'vuex'
import {
  Configuration,
  ConfigurationParameters,
} from '@/scripts/api/configuration'
import { RootState } from '../types'
import { AuthState } from './types'

const getters: GetterTree<AuthState, RootState> = {
  loginStatus(state: AuthState): boolean {
    return state.isLoggedIn
  },
  token(state: AuthState): string {
    return state.token
  },
  config(state: AuthState): Configuration {
    return new Configuration({
      accessToken: state.token,
    } as ConfigurationParameters)
  },
}

export default getters
