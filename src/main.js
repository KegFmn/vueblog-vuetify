import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import Message from './components/Message/index.js'
import Fingerprint2 from 'fingerprintjs2'

import "./axios"
import './permission'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$message = Message

const options = {
	fonts:{
    extendedJsFonts:true
  },
	excludes: {
    language: true,
    colorDepth: true,
    deviceMemory: true,
    pixelRatio: true,
    availableScreenResolution: true,
    timezoneOffset: true,
    timezone: true,
    sessionStorage: true,
    localStorage: true,
    indexedDb: true,
    addBehavior: true,
    openDatabase: true,
    cpuClass: true,
    doNotTrack: true,
    plugins: true,
    canvas: true,
    webglVendorAndRenderer: true,
    adBlock: true,
    hasLiedLanguages: true,
    hasLiedResolution: true,
    hasLiedOs: true,
    hasLiedBrowser: true,
    touchSupport: true,
    audio: false,
    enumerateDevices: true,
    hardwareConcurrency: true,
  }
}

new Vue({
  router,
  store,
  vuetify,
  created() {
    this.generateFingerprint()
  },
  methods: {
    generateFingerprint() {
      Fingerprint2.get({options},(components) => {
        const values = components.map((component, index) => {
          //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
          if (index === 0) { return component.value.replace(/\bNetType\/\w+\b/, '')}
          return component.value
        })
        // 生成最终id murmur   
        const murmur = Fingerprint2.x64hash128(values.join(''), 31)
        store.commit('SET_MURMUR', murmur)
      })
    },
  },
  render: h => h(App)
}).$mount('#app')
