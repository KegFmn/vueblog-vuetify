import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import message from './components/Message/index.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import "./axios"
import './permission'

Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$message = message

Vue.directive('highlight', (el) =>{
  const blocks = el.querySelectorAll('pre')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
