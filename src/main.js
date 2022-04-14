import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import message from './components/Message/index.js'

import "./axios"
import './permission'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$message = message

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
