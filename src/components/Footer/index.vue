<template>
  <v-footer
    class="pt-8"
    color="grey lighten-4"
    padless
  >
    <v-row
      class="footer-top"
      justify="center"
      no-gutters
    >
      <v-col
        class="grey lighten-4 py-2 block--text text-center"
        :cols="footerCols"
      > 
        <v-btn icon class="pb-1">
          <v-icon>mdi-forest</v-icon>
        </v-btn>
        <span>{{ new Date().getFullYear() }} — <strong>MyBlog</strong></span>
      </v-col>

      <v-col
        class="grey lighten-4 py-2 text-center"
        :cols="footerCols"
      >
        <v-btn icon class="pb-1">
          <v-icon>mdi-clipboard-text</v-icon>
        </v-btn>
        <span ><strong><a class="footer-a" href="https://beian.miit.gov.cn/#/Integrated/index">粤ICP备2022068901号-1</a></strong></span>
      </v-col>

      <v-col
        class="grey lighten-4 py-2 block--text text-center"
        :cols="footerCols"
      >
        <!-- <v-btn icon class="pb-1">
          <v-icon>mdi-police-badge</v-icon>
        </v-btn> -->
        <img src="/images/record.png" class="img">
        <span>
          <strong>
            <a class="footer-a" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44010602010820">粤公网安备 44010602010820号</a>
          </strong>
        </span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  computed: {
    footerCols() {
      switch(this.$vuetify.breakpoint.name){
        case 'xs': return 12
        case 'sm': return 12
        case 'md': return 12
        case 'lg': return 4
        case 'xl': return 4
      }
    }
  },
  data: () => ({
    
  }),
}
</script>

<style lang="scss" scoped>
.footer-top{
  margin: 0 12% 0 12%;
  border-top: 1px solid rgb(207, 211, 214);
}
.footer-a{
  text-decoration:none;
  color: #000;
}
.footer-a:hover{
  text-decoration:underline;
}
.img {
  position: relative;
  top: 4px;
}
</style>
