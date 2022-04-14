<template>
  <v-container>
    <v-sheet
      min-height="85vh"
      rounded="xl"
    >
        <!-- 标题 -->
        <v-row align="start">
          <v-col cols="12">
            <p class="mb-0 ml-4 font-weight-black text-lg-h4">{{blog.title}}</p>
          </v-col>
        </v-row>
        
        <!-- 作者、时间 -->
        <v-row align="center">
          <v-col cols="12">
            <v-sheet
              rounded="xl"
              class="grey lighten-5 d-flex"
            >
              <v-col cols="7">
                  <v-row class="pl-2">
                    <v-col cols="12" class="d-flex flex-nowrap">
                      <v-btn small text rounded :class="{'mr-2' : true, 'orange lighten-2' : blog.original == 0, 'green lighten-2' : !blog.original == 0}">
                        {{blog.original == 0 ? '原创' : '转载'}}
                      </v-btn>
                      <p class="mb-0 font-weight-bold text-xs-h4 mr-8 ml-5 text-p text-no-wrap">{{blog.userName}}</p>
                      <p class="mb-0 ml-0 font-weight-regular text-xs-h6 text-p text-no-wrap text-truncate">{{blog.created}}</p>
                    </v-col>
                  </v-row>

                  <v-row class="pl-2">
                    <v-col cols="12">
                      <p class="mb-0 font-weight-medium text-xs-h4 text-p text-no-wrap">
                        文章专栏：{{blog.typeName}}
                      </p>
                    </v-col>
                  </v-row>
              </v-col>

              <v-col align-self="center" cols="5" class="d-flex justify-end flex-wrap">
                <v-btn 
                  link
                  class="mr-3" 
                  rounded small
                  v-if="ownBlog"
                  :to="{name: 'BlogEdit', params: {blogId: blog.id}}"
                >
                  编辑
                  <v-icon
                    right
                    text
                    outlined
                  >
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn
                  :class="{'mr-3' : $vuetify.breakpoint.xs, 'mt-4': $vuetify.breakpoint.xs}" 
                  rounded small
                  v-if="ownBlog"
                  @click.stop="dialog = true"
                >
                  删除  
                  <v-icon
                    right
                    text
                    outlined
                  >
                    mdi-delete
                  </v-icon>
                </v-btn>

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
            <mavonView v-model="blog.content"
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
    const blogId = this.$route.params.blogId
    this.$axios.get('/blog/' + blogId).then(res =>{
      const blog = res.data.data
      this.blog.id = blog.id
      this.blog.original = blog.original
      this.blog.title = blog.title
      this.blog.created = blog.created
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
  methods: {
    blogDele() {
      this.$axios.post('/blog/delete', this.blog, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res =>{
        this.$router.push("/")
        this.$message.success("删除成功")
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.text-p{
  margin: auto;
}
.v-note-wrapper{
  border: none;
}
</style>