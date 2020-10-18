import { MutationTree } from 'vuex'
import { EditorState } from './types'

const mutations: MutationTree<EditorState> = {
  displayType(state, type: number) {
    state.displayType = type
  },
}

export default mutations
