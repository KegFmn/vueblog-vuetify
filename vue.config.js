const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production' // 是否生产环境

let cdn = {
  css: [
    // vuetify css
    'https://cdn.bootcdn.net/ajax/libs/vuetify/2.4.0/vuetify.min.css',
    // gitalk
    'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css'
  ],
  js: [
    // vue must at first!
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
    // vuex
    'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    // vue-router js
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
    // vutify
    'https://cdn.bootcdn.net/ajax/libs/vuetify/2.4.0/vuetify.min.js',
    // axios
    'https://cdn.bootcdn.net/ajax/libs/axios/0.24.0/axios.min.js',
    // mavon-editor
    'https://fastly.jsdelivr.net/npm/mavon-editor@2.10.4/dist/mavon-editor.min.js',
    // vue-clipboard
    'https://cdn.bootcdn.net/ajax/libs/vue-clipboard2/0.3.3/vue-clipboard.min.js',
    // gitalk
    'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js'
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
          chunks: 'all'
      })
      // 生产环境注入cdn
      config.plugin('html')
          .tap(args => {
              args[0].title= 'MyBlog',
              args[0].cdn = cdn;
              return args;
          });
    }

    config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
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
          'mavon-editor': 'MavonEditor',
          'vue-clipboard2': 'VueClipboard',
          'gitalk': 'Gitalk'
      }
    }

    const plugins = [];

    plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false, // 去掉注释
          },
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log']//移除console
          }
        }
      })
    )
    
    plugins.push(
      new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/,// 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
      })
    )

    plugins.push(
      new BundleAnalyzerPlugin({
          analyzerMode: 'static', //可选值有server static disabled
          generateStatsFile: false,
          statsOptions: { source: false },
          openAnalyzer: false
      })
    )

    return { plugins }
  }
}
