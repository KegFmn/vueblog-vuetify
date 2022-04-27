import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
    blogType: [],
    monitor: {}
  },
  mutations: {
    //set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token",token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    SET_BLOGTYPE: (state, blogType) => {
      state.blogType = blogType
    },
    SET_MONITOR: (state, monitor) => {
      state.monitor = monitor
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.blogType = []
      state.monitor = []
      state.userInfo = {}
      localStorage.setItem('token', '')
      sessionStorage.setItem('userInfo', JSON.stringify(''))
    }
  },
  getters: {
    //get
    getUser: state => {
      return state.userInfo
    },
    getBlogType: state => {
      return state.blogType
    },
    getMonitor: state => {
      return state.monitor
    }
  },
  actions: {},
  modules: {}
})
