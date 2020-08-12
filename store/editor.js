export default {
  namespaced: true,

  state: {
    displayType: 2,
  },
  getters: {
    getDisplayType: state => state.displayType,
  },
  mutations: {
    displayType(state, type) {
      state.displayType = type
    },
  },
  actions: {},
}
