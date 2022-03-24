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
            autofocus
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
          <mavon-editor class="content" v-model="ruleForm.content"/>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet
      min-height="30h"
      rounded="xl"
      class="mt-6 py-8 px-6"
    >
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-select
          v-model="ruleForm.selectType"
          :items="types"
          :rules="typeRules"
          no-data-text="暂无数据"
          item-text="typeName"
          item-value="tid"
          validate-on-blur
          label="博客类型"
          single-line
        ></v-select>
        </v-col>

        <v-col cols="12">
          <v-radio-group
            row
            class="mt-0"
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

        <v-col cols="12">
          <v-btn @click="savaBlog()">
            按钮
          </v-btn>
        </v-col>

      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'BlogEdit',
  data: () => ({
    ruleForm: {
      id: '',
      title: '',
      description: '',
      content: '',
      selectType: {},
      original: null,
    },
    types: [],
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
    ]
  }),
  computed: {
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
      console.log(blogId);
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
        this.types = res.data.data
      })
    },
    savaBlog() {
      const blog = {
        id: this.ruleForm.id,
        title: this.ruleForm.title,
        description: this.ruleForm.description,
        content: this.ruleForm.content,
        typeId: this.ruleForm.selectType,
        original: this.ruleForm.original
      }
      console.log('dasdsadsadsa',blog);
      this.$axios.post('/blog/edit', blog, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res =>{
        console.log(res)
        this.$router.push("/blogs")
      })
    }
  },
  mounted() {
    this.getBlog()
    this.getType()
  }
}
</script>

<style lang="scss" scoped>

::v-deep .v-subheader{
  height: 70px;
  font-size: 18px;
  font-weight: 700;
}
.content{
  min-height: 60vh;
}
.v-note-wrapper{
   z-index:1 !important; 
}

</style>
