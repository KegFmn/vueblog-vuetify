import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vuetify.config.silent = true
Vue.use(Vuetify);

const opts = {
  rtl: false,   // true 从右到左显示页面
  breakpoint: {
    thresholds: {
      // xs: 340,
      // sm: 540,
      // md: 800,
      // lg: 1280,
      xs: 600, 
      sm: 960, 
      md: 1280, 
      lg: Infinity
    },
    scrollBarWidth: 24,
  },
  icons: {
    iconfont: 'mdi',
    values: {},
  }
}

export default new Vuetify(opts);
