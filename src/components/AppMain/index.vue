<template>
  <v-main class="grey lighten-3 fill-height mt-2">
    <v-container fluid>
      <v-row no-gutters>
        
        <v-spacer></v-spacer>

        <!-- 侧边栏 -->
        <v-col :cols="asideCols" class="left-aside d-none d-lg-flex">
          <v-sheet rounded="xl" width="100%">
            <v-list color="transparent" rounded>
              <v-list-item-group
                color="primary"
              >
                <v-list-item
                  link
                  v-for="(type,index) in types"
                  :key="index"
                  :to="{name:'Type', params: {typeId: type.id}}"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-bookmark-multiple</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ type.typeName }}
                    </v-list-item-title>
                  </v-list-item-content>

                </v-list-item>
              </v-list-item-group>

            </v-list>
          </v-sheet>
        </v-col>

        <!-- 内容 -->
        <v-col :cols="viewCols" :offset="viewOffset">
          <v-sheet
              min-height="85vh"
              rounded="xl"
            >
            <v-container fluid>
              <router-view :key="key"/>
            </v-container>
          </v-sheet>
        </v-col>

        <v-spacer></v-spacer>

      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: 'AppMain',
  components: { },
  data: () => ({
    
  }),
  computed: {
    key() {
      return this.$route.path
    },
    types() {
      return this.$store.getters.getBlogType
    },
    asideCols () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 0
        case 'md': return 0
        case 'lg': return 0
        case 'xl': return 2
      }
    },
    asideOffsets() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 0
        case 'md': return 0
        case 'lg': return 0
        case 'xl': return 1
      }
    },
    viewCols () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 12
        case 'sm': return 12
        case 'md': return 12
        case 'lg': return 12
        case 'xl': return 8
      }
    },
    viewOffset () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 0
        case 'sm': return 0
        case 'md': return 0
        case 'lg': return 0
        case 'xl': return 2
      }
    },
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.left-aside{
  position: fixed;
  margin-left: 7%;
}
</style>
