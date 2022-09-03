<template>
  <v-md-editor
    v-model="content"
    style="min-height: 60vh"
    :mode="mode"
    :left-toolbar="leftToolbar"
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
    content(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      content: this.value,
      mode: this.model,
      leftToolbar: 'undo redo clear | h bold italic strikethrough quote emoji todo-list | ul ol table hr | link image code | save'
    }
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>

</style>