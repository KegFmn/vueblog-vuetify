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
        class="grey lighten-4 py-4 block--text text-center"
        :cols="footerCols"
      > 
        <v-btn icon class="pb-1">
          <v-icon>mdi-forest</v-icon>
        </v-btn>
        <span>{{ new Date().getFullYear() }} — <strong>MyBlog</strong></span>
      </v-col>

      <v-col
        class="grey lighten-4 py-4 text-center"
        :cols="footerCols"
      >
        <v-btn icon class="pb-1">
          <v-icon>mdi-clipboard-text</v-icon>
        </v-btn>
        <span >备案号：<strong><a class="footer-a" href="https://beian.miit.gov.cn/#/Integrated/index">粤ICP备2022068901号-1</a></strong></span>
      </v-col>

      <v-col
        class="grey lighten-4 py-4 block--text text-center"
        :cols="footerCols"
      >
        <v-btn icon class="pb-1">
          <v-icon>mdi-police-badge</v-icon>
        </v-btn>
        <span>京公网安备 <strong><a class="footer-a" href="https://beian.miit.gov.cn/#/Integrated/index">待审核</a></strong></span>
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
</style>