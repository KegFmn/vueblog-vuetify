const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production' // 是否生产环境

let cdn = {
  css: [
    // vuetify
    // 'https://cdn.bootcdn.net/ajax/libs/vuetify/2.4.0/vuetify.min.css',
    // gitalk
    // 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css',
    // v-md-editor
    // 'https://cdn.jsdelivr.net/npm/@kangc/v-md-editor@1.7.11/lib/style/base-editor.css',
    // 'https://cdn.jsdelivr.net/npm/@kangc/v-md-editor@1.7.11/lib/theme/style/vuepress.css',
    // 'https://cdn.jsdelivr.net/npm/@kangc/v-md-editor@1.7.11/lib/plugins/copy-code/copy-code.css',
    // 'https://cdn.jsdelivr.net/npm/@kangc/v-md-editor@1.7.11/lib/plugins/emoji/emoji.css',
    // 'https://cdn.jsdelivr.net/npm/@kangc/v-md-editor@1.7.11/lib/plugins/todo-list/todo-list.css'
  ],
  js: [
    // vue
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
    // axios
    'https://cdn.bootcdn.net/ajax/libs/axios/0.24.0/axios.min.js',
    // vuex
    'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
    // vue-router js
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.3/vue-router.min.js',
    // axios
    'https://cdn.bootcdn.net/ajax/libs/axios/0.24.0/axios.min.js',
    // vutify
    'https://cdn.bootcdn.net/ajax/libs/vuetify/2.6.1/vuetify.min.js',
    // vue-clipboard
    'https://cdn.bootcdn.net/ajax/libs/vue-clipboard2/0.3.3/vue-clipboard.min.js',
    // gitalk
    'https://cdn.bootcdn.net/ajax/libs/gitalk/1.8.0/gitalk.min.js',
    // v-md-editor
    'https://unpkg.com/@kangc/v-md-editor@1.7.11/lib/base-editor.js',
    // 'https://cdn.jsdelivr.net/npm/@kangc/v-md-editor@1.7.11/lib/theme/vuepress.js',
    // prism
    // 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js'
  ]
}

cdn = isProd ? cdn : { css: [], js: [] }

module.exports = {
  publicPath: './', 
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录  默认为‘’没有单独目录js/css/img在根目录中。

  //去除生产环境的productionSourceMap
  productionSourceMap: false,
  // 关闭eslint
  lintOnSave: false,

  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //支持跨域
        ws: true, //是否代理websockets
        pathRewrite: {
          // 路径重写
          '/api': '' // 用'/api'代替target里面的地址
        }
      }
    }
  },

  chainWebpack: config => {

    if (isProd) {
      // 删除预加载
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
         cacheGroups: {
            vendor: {
                chunks: 'all',
                test: /node_modules/,
                name: 'vendor',
                minChunks: 1,
                maxInitialRequests: 5,
                minSize: 0,
                priority: 100
            },
            common: {
                chunks: 'all',
                test: /[\\/]src[\\/]js[\\/]/,
                name: 'common',
                minChunks: 2,
                maxInitialRequests: 5,
                minSize: 0,
                priority: 60
            },
            styles: {
                name: 'styles',
                test: /\.(sa|sc|c)ss$/,
                chunks: 'all',
                enforce: true
            },
            runtimeChunk: {
                name: 'manifest'
            }
        }
      })
      // 生产环境注入cdn
      config.plugin('html')
          .tap(args => {
              args[0].title= 'MyBlog',
              args[0].cdn = cdn;
              return args;
          });
    }

  },

  configureWebpack: config => {
    
    if (isProd) {
      // 用cdn方式引入
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'vuetify': 'Vuetify',
        'axios': 'axios',
        'vue-clipboard2': 'VueClipboard',
        'gitalk': 'Gitalk',
        '@kangc/v-md-editor': 'VMdEditor',
        // '@kangc/v-md-editor/lib/theme/vuepress': 'VMdTheme',
        // 'prismjs': 'Prism'
      }
    }

    const plugins = [];

    plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false, // 去掉注释
          },
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log']//移除console
          },
          warnings: false
        },
        sourceMap: false,
        parallel: true
      })
    )
    
    plugins.push(
      new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(html|js|css)$/,// 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 删除源文件
          minRatio: 0.8 // 压缩比
      })
    )

    return { plugins }
  }
}
