<template>
  <v-main class="grey lighten-4 mt-2">
    <v-container fluid>
      <v-row no-gutters>

        <!-- 内容 -->
        <v-col :cols="viewCols" :offset="viewOffset">
          <v-sheet
              :color="color"
              min-height="85vh"
              rounded="xl"
            >
            <v-container fluid>
              <router-view :key="key"/>
            </v-container>
          </v-sheet>
        </v-col>

        <v-col :cols="asideCols" class="left-aside d-none d-lg-flex">
          <v-row>
            <!-- 网站监控 -->
            <v-col cols="12">
              <v-sheet rounded="xl" width="100%">
                <v-list color="transparent" rounded disabled>
                  <v-list-item-group
                    color="primary"
                  >
                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-account-multiple</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>
                          访客
                        </v-list-item-title>
                      </v-list-item-content>

                      <span class="font-weight-medium text-no-wrap">{{ monitor.visitTotal }}</span>
                    </v-list-item>

                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-thumb-up</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>
                          点赞
                        </v-list-item-title>
                      </v-list-item-content>

                      <span class="font-weight-medium text-no-wrap">{{ monitor.likeTotal }}</span>
                    </v-list-item>
                    
                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-post-outline</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>
                          博客
                        </v-list-item-title>
                      </v-list-item-content>

                      <span class="font-weight-medium text-no-wrap">{{ monitor.blogTotal }}</span>
                    </v-list-item>

                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon>mdi-bulletin-board</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>
                          留言
                        </v-list-item-title>
                      </v-list-item-content>

                      <span class="font-weight-medium text-no-wrap">{{ monitor.blessTotal }}</span>
                    </v-list-item>
                  </v-list-item-group>

                </v-list>
              </v-sheet>
            </v-col>

            <!-- 侧边栏 -->
            <v-col cols="12">
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
          </v-row>
        </v-col>

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
    color() {
      return this.$route.name == 'Blogs' || this.$route.name == 'Type' || this.$route.name == 'Search' ? 'grey lighten-4' : ''
    },
    key() {
      return this.$route.path
    },
    types() {
      return this.$store.getters.getBlogType
    },
    monitor() {
      return this.$store.getters.getMonitor
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
    viewCols () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 12
        case 'sm': return 12
        case 'md': return 12
        case 'lg': return 12
        case 'xl': return 7
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
    getMonitor() {
      return this.$axios.get('/monitor')
    },
    list() {
      return this.$axios.get('/types')
    },
    getData() {
      this.$axios.all([this.list(), this.getMonitor()]).then(this.$axios.spread((res1, res2) =>{
        const blogType = res1.data.data
        const monitorData = res2.data.data
        this.$store.commit('SET_BLOGTYPE', blogType)
        this.$store.commit('SET_MONITOR', monitorData)
      }))
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
  .left-aside{
    position: fixed;
    right: 7%;
  }
</style>
