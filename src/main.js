import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Message from './components/Message/index.js'
import VueClipboard from 'vue-clipboard2'

import "./axios"
import './permission'

Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
