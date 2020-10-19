import { GetterTree } from 'vuex'
import { RootState } from '../types'
import { EditorState } from './types'

const getters: GetterTree<EditorState, RootState> = {
  displayType(state: EditorState): number {
    return state.displayType
  },
}

export default getters
