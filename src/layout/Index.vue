<template>
  <section class="index">
    <Header/>
    <AppMain/>
  </section>
</template>

<script>
import Header from '@/components/Header'
import AppMain from '@/components/AppMain'
export default {
  name: 'Home',
  components: {Header,AppMain},
  data: () => ({
    //
    items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
  })
}
</script>

<style lang="scss" scoped>
.index{
  height: 100%;
}
</style>