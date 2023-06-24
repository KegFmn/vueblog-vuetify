import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import zhHans from 'vuetify/es5/locale/zh-Hans' 

Vuetify.config.silent = true
Vue.use(Vuetify);

const opts = {
  rtl: false,   // true 从右到左显示页面
  breakpoint: {
    thresholds: {
      xs: 600, 
      sm: 960, 
      md: 1280, 
      lg: Infinity
    },
    scrollBarWidth: 24,
  },
  lang:{
    locales: {zhHans},
    current: 'zhHans'
  },
  icons: {
    iconfont: 'mdi'
  }
}

export default new Vuetify(opts);
