<template>
  <v-container>
    <v-sheet
      min-height="85vh"
      rounded="xl"
    >
        <!-- 标题 -->
        <v-row align="start">
          <v-col cols="12">
            <p class="mb-0 ml-4 font-weight-black text-h4">{{blog.title}}</p>
          </v-col>
        </v-row>
        
        <!-- 作者、时间 -->
        <v-row align="center">
          <v-col cols="12">
            <v-sheet
              rounded="xl"
              class="grey lighten-5 pl-5 mt-3"
            >
              <v-row>
                <v-col cols="5" class="d-flex">

                  <v-btn small text rounded :class="{'orange lighten-2' : blog.original == 0, 'green lighten-2' : !blog.original == 0}">
                    {{blog.original == 0 ? '原创' : '转载'}}
                  </v-btn>

                  <p class="font-weight-bold text-no-wrap mb-0 ml-6 my-text-1">{{blog.userName}}</p>

                  <p class="font-weight-regular text-no-wrap text-truncate mb-0 ml-6 my-text-1">{{blog.updated}}</p>
                  
                </v-col>

                <v-col class="ml-auto d-flex justify-end" v-if="ownBlog">
                  <v-btn 
                    link
                    text
                    plain
                    small
                    rounded
                    color="black"
                    class="px-0 pt-1"
                    :to="{name: 'BlogEdit', params: {blogId: blog.id}}"
                  >
                    <span class="font-weight-black text-subtitle-2">编辑</span>
                  </v-btn>

                  <span class="font-weight-light my-text-1">|</span>

                  <v-btn
                    text
                    plain
                    small
                    rounded
                    color="red darken-4"
                    @click.stop="dialog = true"
                    class="px-0 pt-1 mr-2"
                  >
                    <span class="font-weight-black text-subtitle-2">删除</span>
                  </v-btn>
                  <!-- 删除弹出框 -->
                  <v-dialog
                    v-model="dialog"
                    max-width="450"
                  >
                    <v-card>
                      <v-card-title class="text-h5">
                        确认删除博客吗?
                      </v-card-title>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          color="blue darken-4"
                          text
                          @click="dialog = false"
                        >
                          取消
                        </v-btn>

                        <v-btn
                          color="red darken-4"
                          text
                          @click="blogDele()"
                        >
                          删除
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>

              <v-row class="mt-0">
                <v-col cols="6">
                  <p class="font-weight-medium text-body-1 text-no-wrap mb-0 my-text-2">
                    文章专栏：{{blog.typeName}}
                  </p>
                </v-col>
                <v-col cols="6" class="ml-auto d-flex justify-end">
                  <v-btn icon @click="giveLike(blog.id)" :color="color">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon class="mr-2" @click="copyLink(blog.id)">
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

            </v-sheet>
          </v-col>
        </v-row>
        
        <!-- 博客内容 -->
        <v-row align="end">
          <v-col>
            <mdEditor
              v-model="blog.content"
              :model="editor.model"
            />
          </v-col>
        </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import mdEditor from '../components/VMdEditor/index.vue'
export default{
  name: 'BlogDetail',
  components: { mdEditor },
  data: () =>({
    blog: {
      id: '',
      original: "",
      title: '',
      userName: '',
      typeName:'',
      created: '',
      updated:'',
      content: ''
    },
    editor: {
      model: 'preview'
    },
    ownBlog: false,
    dialog: false,
    color: '',
    likeFalse: true
  }),
  mounted() {
    this.getBlog()
  },
  methods: {
    getBlog() {
      const blogId = this.$route.params.blogId
      this.$axios.get('/blog/' + blogId).then(res =>{
        const blog = res.data.data
        this.blog.id = blog.id
        this.blog.original = blog.original
        this.blog.title = blog.title
        this.blog.created = blog.created
        this.blog.updated = blog.updated
        this.blog.content = blog.content
        this.blog.userName = blog.userName
        this.blog.typeName = blog.typeName
        this.ownBlog = (this.$store.getters.getUser == null ? false : blog.userId == this.$store.getters.getUser.id)
        const like = this.$store.getters.getLike
        const likeKey = '|' + blog.id + '|blog'
        if(like.indexOf(likeKey) != -1) {
          this.likeFalse= false
          this.color = 'red'
        }
      })
    },
    giveLike(val) {
      let like = this.$store.getters.getLike == null ? '' : this.$store.getters.getLike
      if(this.likeFalse) {
        const newLike = like + '|' + val+ '|blog'
        this.$store.commit('SET_LIKE', newLike)
        this.color = 'red'
        this.likeFalse = false
        this.$message.success("谢谢你的点赞")
      } else {
        const likeKey = '|' + val+ '|blog'
        const newLike = like.replace(likeKey, '')
        this.$store.commit('SET_LIKE', newLike)
        this.color = ''
        this.likeFalse = true
        this.$message.success("取消点赞")
      }
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
    },
    blogDele() {
      this.$axios.post('/blog/delete', this.blog, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res =>{
        this.getMonitor()
        this.$router.push("/")
        this.$message.success("删除成功")
      })
    },
    async getMonitor() {
      this.$axios.get('/monitor').then(res =>{
        const monitorData = res.data.data
        this.$store.commit('SET_MONITOR', monitorData)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.my-text-1{
  line-height: 30px;
}
.my-text-2{
  line-height: 40px;
}
.v-note-wrapper{
  border: none;
  ::v-deep .v-note-panel .v-note-show .v-show-content{
    padding: 8px 12px 10px 12px;
  }
}
</style>
