import Vuex from 'vuex'
import { RootState } from './types'
import { auth } from './auth'
import { device } from './device'
import { editor } from './editor'

export default new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
  modules: {
    auth,
    device,
    editor,
  },
})
