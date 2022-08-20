import Vue from 'vue';
import Vuetify from 'vuetify';
// import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);


export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
    scrollBarWidth: 24,
  },
  
  icons: {
    iconfont: 'mdi', // 默认值 - 仅用于展示目的
  },
});
