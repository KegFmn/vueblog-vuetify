<template>
  <v-md-editor
    v-model="content"
    class="md-editor"
    height="70vh"
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
      for(let i in files) {
        const reader = new FileReader();
        reader.readAsDataURL(files[i])
		    reader.onload = ()=>{
          const imageBase64 = reader.result
          insertImage({
            url: imageBase64,
            desc: files[i].name
          });
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.md-editor{
  
}
</style>
