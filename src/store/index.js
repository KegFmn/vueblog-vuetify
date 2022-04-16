import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
    blogType: []
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
    REMOVE_INFO: (state) => {
      state.token = ''
      state.blogType = []
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
    }
  },
  actions: {
  },
  modules: {
  }
})
