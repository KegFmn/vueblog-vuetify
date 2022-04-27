<template>
    <mavon-editor
      :placeholder="'开始创作···'"
      :toolbars="toolbars"
      :external-link="externalLink"
      :codeStyle="codeStyle"
      :boxShadow="boxShadowView"
      :defaultOpen="defaultView"
      :subfield="subfieldView"
      :toolbarsFlag="toolbarsFlagView"
      :previewBackground="previewBackgroundView"
      @change="change"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
      ref="md"
      style="min-height: 60vh"
      v-model="content"
    />
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Editor',
  components: { mavonEditor },
  props: {
    // 内容
    value: {
      type: String,
      default: ''
    },
    // edit： 默认展示编辑区域 ， preview： 默认展示预览区域 , 其他 = edit
    defaultOpen: {
      type: String,
      default: null
    },
    // true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)
    subfield: {
      type: Boolean,
      default: true
    },
    // 工具栏是否显示
    toolbarsFlag: {
      type: Boolean,
      default: true
    },
    // 边框阴影
    boxShadow: {
      type: Boolean,
      default: true
    },
    // 预览框颜色
    previewBackground: {
      type: String,
      default: '#fbfbfb'
    }
  },

  computed: {
    content: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    defaultView: {
      get() {
        return this.defaultOpen
      }
    },
    subfieldView: {
      get() {
        return this.subfield
      }
    },
    toolbarsFlagView: {
      get() {
        return this.toolbarsFlag
      }
    },
    boxShadowView: {
      get() {
        return this.boxShadow
      }
    },
    previewBackgroundView: {
      get() {
        return this.previewBackground
      }
    }
  },

  data() {
    return {
      // 工具栏
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: false, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      // 高亮文件
      externalLink: {
        hljs_js: () => '/mavon-editor/highlightjs/highlight.min.js',
        hljs_css: (css) => '/mavon-editor/highlightjs/styles/' + css + '.min.css',
        hljs_lang: (lang) => '/mavon-editor/highlightjs/languages/' + lang + '.min.js',
        katex_css: () => '/mavon-editor/katex/katex.min.css',
        katex_js: () => '/mavon-editor/katex/katex.min.js',
      },
      // 代码风格
      codeStyle: 'stackoverflow-dark'
    }
  },

  mounted() {
    
  },

  methods: {
    imgAdd(pos, file) {
      this.img_file[pos] = file
    },
    imgDel(pos){
      delete this.img_file[pos];
    },
    change (value, render) {
      this.html = render
    }
  },
};
</script>

<style lang="scss" scoped>
.v-note-wrapper{
  z-index:1 !important; 
}
</style>