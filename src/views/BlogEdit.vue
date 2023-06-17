<template>
  <v-container>
    <v-sheet
      min-height="85vh"
      rounded="xl"
      class="py-8 px-4"
    >
      <v-row align="center" no-gutters class="flex-column">
        <v-col 
          :cols="titleCols"
        >
          <v-text-field
            label="标题"
            v-model="ruleForm.title"
            placeholder="请输入博客标题"
            :rules="titleRules"
            validate-on-blur
            clearable
            rounded
            filled
          ></v-text-field>
        </v-col>

        <v-col 
          :cols="abstractCols"
        >
          <v-textarea
            label="摘要"
            v-model="ruleForm.description"
            placeholder="请输入博客摘要"
            :rules="abstractRules"
            validate-on-blur
            clearable
            rows="3"
            counter
            filled
          ></v-textarea>
        </v-col>

        <v-col :cols="contentCols">
          <!-- <mdEditor
            v-model="ruleForm.content"
            :model="editor.model"
          /> -->
          <vditor v-if="ruleForm.content != ''" v-model="ruleForm.content"></vditor>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet
      min-height="30h"
      rounded="xl"
      class="py-8 px-4"
    >
      <v-row align="center" no-gutters class="flex-column">
        <v-col :cols="contentCols" class="pb-0">
          <v-row no-gutters style="flex-wrap: nowrap">
            <v-col :cols="11" style="min-width: 100px; max-width: 100%" class="flex-grow-0 flex-shrink-1">
              <v-select
                v-model="ruleForm.selectType"
                :items="types"
                :rules="typeRules"
                no-data-text="暂无数据"
                item-text="typeName"
                item-value="id"
                validate-on-blur
                label="博客类型"
                single-line
                outlined
                solo
              >
              </v-select>
            </v-col>
            <v-col :cols="1" style="min-width: 100px;" class="ml-2 flex-grow-0 flex-shrink-1">
              <v-btn
                block
                outlined
                height="55"
                @click.stop="dialog2 = true"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            <!-- 博客类型弹出框 -->
            <v-dialog
              v-model="dialog2"
              max-width="350"
              @click:outside="onClickOutside"
              
            >
            
              <v-list shaped>
                <v-subheader>博客类型</v-subheader>
                <v-col>
                  <v-row no-gutters>
                    <v-col cols="8" offset="1">
                      <v-text-field
                        label="输入新类型"
                        append-outer-icon="mdi-close"
                        @click:append-outer="onClickOutside"
                        v-model="type.typeName"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="1" class="pt-3 ml-3">
                      <v-btn
                        v-show="type.id == null"
                        @click.stop="dialog3 = true"
                      >
                        <v-icon>mdi-check-bold</v-icon>
                      </v-btn>
                      <v-btn
                        v-show="type.id != null"
                        @click.stop="dialog3 = true"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <!-- 博客类型确认框 -->
                      <v-dialog
                        v-model="dialog3"
                        max-width="450"
                      >
                        <v-card>
                          <v-card-title class="text-h5" v-show="type.id==null">
                            确认增加博客类型吗?
                          </v-card-title>

                          <v-card-title class="text-h5" v-show="type.id!=null">
                            确认修改/删除博客类型吗?
                          </v-card-title>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              color="red darken-3"
                              text
                              @click="dialog3 = false"
                              v-show="type.id==null"
                            >
                              取消
                            </v-btn>

                            <v-btn
                              color="blue darken-3"
                              v-show="type.id==null"
                              text
                              @click="saveType()"
                            >
                              确定
                            </v-btn>

                            <v-btn
                              color="red darken-3"
                              text
                              @click.stop="dialog4 = true , dialog3 = false"
                              v-show="type.id != null"
                            >
                              删除
                            </v-btn>
                            <!-- 确认删除弹出框 -->
                            <v-dialog
                              v-model="dialog4"
                              max-width="450"
                            >
                              <v-card>
                                <v-card-title class="text-h5">
                                  确认删除类型及博客吗?
                                </v-card-title>

                                <v-card-actions>
                                  <v-spacer></v-spacer>

                                  <v-btn
                                    color="red darken-3"
                                    text
                                    @click="dialog4 = false"
                                  >
                                    取消
                                  </v-btn>

                                  <v-btn
                                    color="blue darken-3"
                                    text
                                    @click="deleteType()"
                                  >
                                    确认
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>

                            <v-btn
                              color="blue darken-3"
                              v-show="type.id!=null"
                              text
                              @click="saveType()"
                            >
                              修改
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                  
                </v-col>
              
                <v-list-item-group
                  v-model="selectedItem"
                  color="primary"
                >
                  <v-list-item
                    v-for="(item, index) in types"
                    :key="index"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-bookmark-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{item.typeName}}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon @click="assignment(item, $event)">
                        <v-icon>mdi-arrow-top-left</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-dialog>
            </v-col>
          </v-row>
        </v-col>

        <!-- 原创转载 -->
        <v-col :cols="contentCols">
          <v-radio-group
            row
            class="mt-0 mb-1"
            v-model="ruleForm.original"
            :rules="radioRules"
            validate-on-blur
          >
            <v-radio
              label="原创"
              :value="0"
            ></v-radio>
            <v-radio
              label="转载"
              :value="1"
            ></v-radio>
          </v-radio-group>
        </v-col>

        <v-col :cols="contentCols">
          <v-btn
            color="primary"
            dark
            @click.stop="dialog1 = true"
          >
            发表
          </v-btn>
        </v-col>

        <v-dialog
          v-model="dialog1"
          max-width="450"
        >
          <v-card>
            <v-card-title class="text-h5">
              确认发表博客吗?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="red darken-3"
                text
                @click="dialog1 = false"
              >
                取消
              </v-btn>

              <v-btn
                color="blue darken-3"
                text
                @click="saveBlog()"
              >
                发表
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import vditor from '../components/Vditor/edit.vue'
// import mdEditor from '../components/VMdEditor/index.vue'
export default {
  name: 'BlogEdit',
  components: { vditor },
  data: () => ({
    ruleForm: {
      id: 0,
      title: '',
      description: '',
      content: '',
      selectType: {},
      original: null
    },
    type:{
      id: null,
      typeName: null
    },
    titleRules: [
      v => !!v || '不能为空',
      v => v.length <= 50 || '最多50字'
    ],
    abstractRules: [
      v => !!v || '不能为空',
      v => v.length <= 250 || '最多250字'
    ],
    typeRules: [
      v => !!v || '不能为空'
    ],
    radioRules: [
      v => !!v || '不能为空'
    ],
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    selectedItem: null
  }),
  computed: {
    types() {
      return this.$store.getters.getBlogType
    },
    titleCols() {
      switch(this.$vuetify.breakpoint.name){
        case 'xs': return 10
        case 'sm': return 10
        case 'md': return 8
        case 'lg': return 6
        case 'xl': return 6
      }
    },
    abstractCols() {
      switch(this.$vuetify.breakpoint.name){
        case 'xs': return 11
        case 'sm': return 11
        case 'md': return 10
        case 'lg': return 8
        case 'xl': return 8
      }
    },
    contentCols() {
      switch(this.$vuetify.breakpoint.name){
        case 'xs': return 12
        case 'sm': return 12
        case 'md': return 11
        case 'lg': return 11
        case 'xl': return 11
      }
    }
  },
  methods: {
    getBlog() {
      const blogId = this.$route.params.blogId
      if(blogId){
        this.$axios.get('/blog/' + blogId).then(res =>{
          const blog = res.data.data
          this.ruleForm.id = blog.id
          this.ruleForm.title = blog.title
          this.ruleForm.description = blog.description
          this.ruleForm.content = blog.content
          this.ruleForm.selectType = blog.typeId
          this.ruleForm.original = blog.original
        })
      }
    },
    getType() {
      this.$axios.get('/types').then(res =>{
        const blogType = res.data.data
        this.$store.commit('SET_BLOGTYPE', blogType)
      })
    },
    saveBlog() {
      this.dialog1 = false
      const blog = {
        id: this.ruleForm.id ? this.ruleForm.id : null,
        title: this.ruleForm.title ? this.ruleForm.title : null,
        description: this.ruleForm.description ? this.ruleForm.description : null,
        content: this.ruleForm.content ? this.ruleForm.content : null,
        typeId: isNaN(this.ruleForm.selectType) ? null : this.ruleForm.selectType,
        original: isNaN(this.ruleForm.original) ? null : this.ruleForm.original
      }
      
      if(blog.title != null && blog.description != null && blog.content != null && blog.typeId != null && blog.original != null){
        this.$axios.post('/blog/edit', blog).then(res =>{
          if(blog.id == null) {
            console.log('新增');
            this.getMonitor()
          }
          this.$router.push("/")
          this.$message.success("发表成功")
        })
      } else{
        this.$message.error('内容请填写完整哦')
      }
    },
    saveType(){
      this.dialog3 = false
      if(this.type.typeName != null){
        this.$axios.post('/type/save', this.type).then(res =>{
          this.getType()
          this.type.id = null
          this.type.typeName = null
          this.$message.success("操作成功")
        })
      }else {
        this.$message.error("请填写类型名称")
      }
    },
    assignment(item, event){
      this.type.id = item.id
      this.type.typeName = item.typeName
    },
    onClickOutside(){
      this.selectedItem = null
      this.type.id = null
      this.type.typeName = null
    },
    deleteType(){
      this.dialog3 = false
      this.$axios.post('type/delete?typeName=', this.type).then(res =>{
        this.getType()
        this.dialog4 = false
        this.type.id = null
        this.type.typeName = null
        this.$message.success("删除成功")
      })
    },
    async getMonitor() {
      this.$axios.get('/monitor').then(res =>{
        const monitorData = res.data.data
        this.$store.commit('SET_MONITOR', monitorData)
      })
    },
  },
  mounted() {
    this.getBlog()
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .v-subheader{
    height: 70px;
    font-size: 18px;
    font-weight: 700;
  }
</style>
