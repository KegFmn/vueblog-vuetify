<template>
  <v-row>
    <v-col cols="24">
      <!-- 循环博客卡片 -->
      <v-row v-for="(blog,index) in blogs" :key="index" align="start">
        <v-col>
          <v-card
            link
            height="170"
            rounded="xl"
            class="elevation-2"
            
          >
            <v-card-title class="text-h5 text-no-wrap text-truncate mr-4">
              <router-link class="blogTile" :to="{name:'BlogDetail', params: {blogId: blog.id}}">
               {{blog.title}}
              </router-link>
            </v-card-title>

            <v-card-subtitle>
              {{blog.updated}}
            </v-card-subtitle>

            <v-card-text class="text-no-wrap text-truncate">
                {{blog.description}}
            </v-card-text>

            <v-card-actions class="pt-1">
              <v-btn icon @click="giveLike">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon @click="collection">
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
              <v-btn icon @click="copyLink(blog.id)">
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
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
    collection() {
      this.$message.success("谢谢你的收藏")
    },
    copyLink(val) {
      const url = 'https://www.specialnn.top/#/blog/' + val
      this.$copyText(url).then(() => {
        this.$message.success("复制成功，快去分享给别人吧")
      }).catch(err => {
        this.$message.error("复制失败")
      })
    }
  },
  mounted() {
    
  },
  created() {
    this.page()
  },
};
</script>

<style lang="scss" scoped>
.blogTile {
  color: #000;
  text-decoration: none; //去掉原有链接文字下划线
}
.blogTile:hover{
  font-weight: 500;
  text-decoration:underline;
}
</style>
