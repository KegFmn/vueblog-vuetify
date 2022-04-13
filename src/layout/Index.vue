<template>
  <v-app class="index">
    <Header/>
    <AppMain/>
  </v-app>
</template>

<script>
import Header from '@/components/Header/index.vue'
import AppMain from '@/components/AppMain/index.vue'
export default {
  name: 'Home',
  components: { Header, AppMain },
  data: () => ({
    
  })
}
</script>

<style lang="scss" scoped>
.index{
  height: 100%;
}
</style>