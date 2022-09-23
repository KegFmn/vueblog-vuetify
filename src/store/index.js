import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')),
    token: localStorage.getItem("token"),
    like: localStorage.getItem('like'),
    blogType: [],
    monitor: {},
    murmur: ''
  },
  mutations: {
    //set
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_LIKE: (state, like) =>{
      state.like = like
      localStorage.setItem("like", like)
    },
    SET_BLOGTYPE: (state, blogType) => {
      state.blogType = blogType
    },
    SET_MONITOR: (state, monitor) => {
      state.monitor = monitor
    },
    SET_MURMUR: (state, murmur) => {
      state.murmur = murmur
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      // state.blogType = []
      // state.monitor = [] 
      state.userInfo = {}
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
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
    },
    getLike: state => {
      return state.like
    },
    getMurmur: state => {
      return state.murmur
    }
  },
  actions: {},
  modules: {}
})
