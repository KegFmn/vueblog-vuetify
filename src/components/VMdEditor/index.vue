<template>
  <v-md-editor
    v-model="content"
    class="md-editor"
    :mode="mode"
    :disabled-menus="[]"
    :left-toolbar="leftToolbar"
    :right-toolbar="rightToolbar"
    @upload-image="handleUploadImage"
  >
  </v-md-editor>
</template>

<script>
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
VMdEditor.use(VMdTheme, { Prism, extend(md) {}});
VMdEditor.use(createLineNumbertPlugin());
VMdEditor.use(createCopyCodePlugin());
VMdEditor.use(createEmojiPlugin());
VMdEditor.use(createTodoListPlugin());
export default {
  name: 'MdEditor',
  components: { VMdEditor },
  props: {
    value: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      default: 'editable'
    }
  },
  watch: {
    value(val) {
      this.content = val;
    },
    content(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      content: '',
      mode: this.model,
      leftToolbar: 'undo redo clear | h bold italic strikethrough quote emoji todo-list | ul ol table hr | link image code | save',
      rightToolbar: 'preview toc sync-scroll'
    }
  },
  mounted() {

  },
  methods: {
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      // console.log(files);

      // 此处只做示例
      // insertImage({
      //   url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg',
      //   desc: '七龙珠',
      //   // width: 'auto',
      //   // height: 'auto',
      // });
    }
  },
};
</script>

<style lang="scss" scoped>
.md-editor{
  min-height: 60vh
}
</style>