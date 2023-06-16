<template>
  <div id="view"></div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default {
    name: 'Vditor-View',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    watch: {
        value(val) {
            this.renderMarkdown(val)
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        
    },
    methods: {
        renderMarkdown(md) {
            Vditor.preview(document.getElementById('view'), md, {
                theme: 'dark',
                hljs: {
                    "lineNumber": true,
                    "style": "github"
                }
            })
        }
    }
}
</script>

<style>
    #view {
        margin-left: 8px;
        margin-right: 8px;
    }
</style>