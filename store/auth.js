export default {
  namespaced: true,

  state: {
    isLogin: false,
    token: '',
  },
  getters: {
    getIsLogin: state => state.isLogin,
    getToken: state => state.token,
  },
  mutations: {
    login(state, token) {
      state.isLogin = true
      state.token = token
    },
    logout(state) {
      state.isLogin = false
      state.token = ''
    },
  },
  actions: {},
}
