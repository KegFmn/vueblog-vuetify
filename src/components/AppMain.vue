<template>
  <v-main class="grey lighten-3 fill-height mt-2">
    <v-container fluid>
      <v-row>
        <!-- 侧边栏 -->
        <Aside/>

        <!-- 内容 -->
        <v-col :offset="offset" :cols="cols" class="">
          <v-sheet
              min-height="85vh"
              rounded="xl"
            >
            <v-container>
              <router-view :key="key"/>
            </v-container>
          </v-sheet>
        </v-col>

      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import Aside from '@/components/Aside'
export default {
  name: 'AppMain',
  components: {Aside},
  data: () => ({

  }),
  computed: {
    key() {
      return this.$route.path
    },
    offset () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 0
        case 'md': return 3
        case 'lg': return 3
        case 'xl': return 3
      }
    },
    cols () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 12
        case 'sm': return 12
        case 'md': return 8
        case 'lg': return 8
        case 'xl': return 8
      }
    }
  },
  methods: {

  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>

</style>
