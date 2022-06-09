<template>
  <v-app class="index">
    <Header/>
    <AppMain/>
    <Footer/>
  </v-app>
</template>

<script>
import Header from '@/components/Header/index.vue'
import AppMain from '@/components/AppMain/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  name: 'Layout',
  components: { Header, AppMain, Footer },
  data: () => ({
    
  }),

  methods: {
    addTraffic() {
      this.$axios.get('/monitor/addVisitTotal')
    },
    list() {
      this.$axios.get('/types').then(res =>{
        const blogType = res.data.data
        this.$store.commit('SET_BLOGTYPE', blogType)
      })
    }
  },

  created() {
    this.addTraffic()
    this.list()
  },
}
</script>

<style lang="scss" scoped>
.index{
  height: 100%;
}
</style>