// import Vuex from 'vuex'
// import { RootState } from './types'
import { auth } from './auth'
import { device } from './device'
import { editor } from './editor'

export default {
  modules: {
    auth,
    device,
    editor,
  },
}
