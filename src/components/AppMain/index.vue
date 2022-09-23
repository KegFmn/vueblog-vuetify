<template>
  <v-main class="grey lighten-4 mt-2">
    <v-container fluid>
      <v-row no-gutters>
        
        <v-spacer></v-spacer>

        <v-col :cols="asideCols" class="left-aside d-none d-lg-flex">
          <v-row>
            <!-- 网站监控 -->
            <v-col cols="24">
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
            <v-col cols="24">
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
import Fingerprint2 from 'fingerprintjs2'
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
    getMonitor() {
      this.$axios.get('/monitor').then(res =>{
        const monitorData = res.data.data
        this.$store.commit('SET_MONITOR', monitorData)
      })
    },
    addTraffic() {
      this.$axios.get('/monitor/addVisitTotal')
    },
    list() {
      this.$axios.get('/types').then(res =>{
        const blogType = res.data.data
        this.$store.commit('SET_BLOGTYPE', blogType)
      })
    },
    createFingerprint() {
      Fingerprint2.get((components) => {
        const values = components.map(function(component,index) {
          if (index === 0) { //把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样
            return component.value.replace(/\bNetType\/\w+\b/, '')
          }
          return component.value
        })
        // 生成最终id murmur 
        const murmur = Fingerprint2.x64hash128(values.join(''), 31)
        this.$store.commit('SET_MURMUR', murmur)
      })
    }
  },

  mounted() {
    
  },
  created() {
    this.addTraffic()
    this.getMonitor()
    this.list()
    this.createFingerprint()
  }
}
</script>

<style lang="scss" scoped>
.left-aside{
  position: fixed;
  left: 7%;
}
</style>
