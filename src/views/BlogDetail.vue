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

                  <p class="font-weight-bold text-no-wrap mb-0 ml-6 my-text">{{blog.userName}}</p>

                  <p class="font-weight-regular text-no-wrap text-truncate mb-0 ml-6 my-text">{{blog.updated}}</p>
                  
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

                  <span class="font-weight-light my-text">|</span>

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

              <v-row>
                <v-col cols="12">
                  <p class="font-weight-medium text-body-1 text-no-wrap mb-0">
                    文章专栏：{{blog.typeName}}
                  </p>
                </v-col>
              </v-row>

            </v-sheet>
          </v-col>
        </v-row>
        
        <!-- 博客内容 -->
        <v-row align="end">
          <v-col>
            <!-- <v-sheet
              class="content markdown-body pa-4"
              v-html="blog.content"
              v-highlight
            >
            </v-sheet> -->
            <mavonView
              v-model="blog.content"
              :defaultOpen="editor.defaultOpenDetail"
              :subfield="editor.subfieldDetail" 
              :toolbarsFlag="editor.toolbarsFlagDetail"
              :boxShadow="editor.boxShadow"
              :previewBackground="editor.previewBackground"
            />
          </v-col>
        </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import MavonView from '../components/MavonEditor/index.vue'
export default{
  name: 'BlogDetail',
  components: { MavonView },
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
      defaultOpenDetail: 'preview',
      previewBackground: '#FFFFFF',
      subfieldDetail: false,
      toolbarsFlagDetail: false,
      boxShadow: false
    },
    ownBlog: false,
    dialog: false,
    
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
        this.blog.userName = blog.user.userName
        this.blog.typeName = blog.type.typeName
        
        // const MarkdownIt = mavonEditor.markdownIt
        // console.log(this.$markdownIt);
        // const md = this.$markdownIt.set({ breaks: false });
        // const result = md.render(blog.content)

        // this.blog.content = result
        
        this.ownBlog = (blog.userId == this.$store.getters.getUser.id)
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
        const monitor = [
          {name : '访客', icon: 'mdi-account-multiple', number: 0},
          {name : '博客', icon: 'mdi-post-outline', number: 0}
        ]
        monitor.forEach(item =>{
          if(item.name == '访客') {
            item.number = monitorData.visitTotal
          } else if(item.name == '博客') {
            item.number = monitorData.blogTotal
          } else if(item.name == '留言') {
            item.number = monitorData.blessTotal
          }
        })
        this.$store.commit('SET_MONITOR', monitor)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.my-text{
  line-height: 30px;
}
.v-note-wrapper{
  border: none;
  ::v-deep .v-note-panel .v-note-show .v-show-content{
    padding: 8px 15px 10px 15px;
  }
}
</style>