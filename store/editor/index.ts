import { Module } from 'vuex'
import { RootState } from '../types'
import { EditorState } from './types'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const namespaced: boolean = true

export const state: EditorState = {
  displayType: 2,
}

export const editor: Module<EditorState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
}
