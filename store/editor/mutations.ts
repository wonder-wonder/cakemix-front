import { MutationTree } from 'vuex'
import { EditorState } from './types'

const mutations: MutationTree<EditorState> = {
  displayType(state: EditorState, type: number) {
    state.displayType = type
  },
}

export default mutations
