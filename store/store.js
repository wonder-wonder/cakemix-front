import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    device: require('./device.js'),
    auth: require('./auth.js'),
    editor: require('./editor.js'),
  },
})
