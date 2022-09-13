<template>
  <v-row>
    <v-col cols="24">
      <!-- 循环博客卡片 -->
      <v-row v-for="(blog,index) in blogs" :key="index" align="start">
        <v-col>
          <v-card
            link
            rounded="xl"
            class="elevation-2"
            :to="{name:'BlogDetail', params: {blogId: blog.id}}"
          >
            <v-card-title class="text-h5 text-no-wrap text-truncate mr-4 blog-title">
              {{blog.title}}
            </v-card-title>

            <v-card-subtitle>
              {{blog.updated}}
            </v-card-subtitle>

            <v-card-text class="text-no-wrap text-truncate pb-0">
              {{blog.description}}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-2"
                    alt="likc"
                    src="/images/avatar.jpg"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>KegFmn</v-list-item-title>
                </v-list-item-content>

                <v-row
                  align="center"
                  justify="end"
                >
                  <!-- <v-icon class="mr-1">
                    mdi-heart
                  </v-icon> -->
                  <v-btn icon @click.prevent="giveLike">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <!-- <span class="subheading mr-2">256</span> -->

                  <v-btn icon @click.prevent="copyLink(blog.id)">
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                  <!-- <span class="subheading">45</span> -->
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row align="end">
        <!-- 分页 -->
        <v-col cols="24" align-self="end">
          <v-pagination
            circle
            v-model="currentPage"
            :length="length"
            :total-visible="paginationLengthLimit"
            @input="page()"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-col>

    <Dial></Dial>
  </v-row>
</template>

<script>
import Dial from '../components/Dial/index.vue'
export default {
  name: 'Blogs',
  components: { Dial },
  data: () => ({
    blogs: {},
    currentPage: 1,
    length: 0,
    total: 0,
    pageSize: 5,
  }),
  computed: {
    paginationLengthLimit() {
      switch(this.$vuetify.breakpoint.name){
        case 'xs': return 5
        case 'sm': return 8
        case 'md': return 10
        case 'lg': return 15
        case 'xl': return 18
      }
    }
  },
  
  methods: {
    page(){
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        typeId: this.$route.params.typeId ? this.$route.params.typeId : 0
      }

      this.$axios.get('/blogs', {params} ).then(res =>{
        this.blogs = res.data.data.records
        this.currentPage = res.data.data.current
        this.total = res.data.data.total
        this.pageSize = res.data.data.size
        this.length = Math.ceil(this.total/this.pageSize)
      })
    },
    giveLike() {
      this.$message.success("谢谢你的点赞")
    },
    copyLink(val) {
      const url = 'https://www.specialnn.top/#/blog/' + val
      this.$copyText(url).then(() => {
        this.$message.success("复制成功，快去分享给别人吧")
      }).catch(err => {
        this.$message.error("复制失败")
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
    }
  },
  mounted() {
    
  },
  created() {
    this.addTraffic()
    this.list()
    this.page()
  },
};
</script>

<style lang="scss" scoped>
.blog-title {
  color: #000;
}
</style>
