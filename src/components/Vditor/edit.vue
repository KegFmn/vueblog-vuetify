<template>
    <div id="vditor" name="description"></div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default {
    name: 'Vditor',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            contentEditor: {}
        }
    },
    mounted() {
        this.initVditor()
    },
    methods: {
        initVditor() {
            const _this = this
            this.contentEditor = new Vditor('vditor', { 
            minHeight: 800,
            icon: "ant",                               
            placeholder: '此处为话题内容……',             
            theme: 'classic',
            counter: {
                enable: true,
                type: 'markdown'
            },
            preview: {
                delay: 0,
                hljs: {
                    style: 'github',
                    lineNumber: true
                }
            },
            input (md) {
                _this.$emit('input', md)
            },
            resize: {
                enable: true
            },
            tab: '\t',
            typewriterMode: true,
            toolbarConfig: {
                pin: true
            },
            cache: {
                enable: false
            },
            mode: 'sv',
            toolbar: [
                'emoji',
                'headings',
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'list',
                'ordered-list',
                'check',
                'outdent',
                'indent',
                '|',
                'quote',
                'line',
                'code',
                'inline-code',
                'insert-before',
                'insert-after',
                '|',
                // 'record',
                'table',
                '|',
                'undo',
                'redo',
                '|',
                'edit-mode',
                // 'content-theme',
                'code-theme',
                'export',
            {
                name: 'more',
                toolbar: [
                    'fullscreen',
                    'both',
                    'preview',
                    'info',
                    'help',
                ],
            }],
        })
        }
    }
}
</script>

<style>

</style>