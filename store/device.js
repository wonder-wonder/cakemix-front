export default {
  namespaced: true,

  state: {
    isMobile: false,
  },
  getters: {
    isMobile: state => state.isMobile,
  },
  mutations: {
    isMobile(state, value) {
      state.isMobile = value
    },
  },
  actions: {},
}
