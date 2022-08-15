const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production' // 是否生产环境

let cdn = {
  css: [
    // vuetify css
    'https://cdn.bootcss.com/vuetify/2.4.0/vuetify.min.css',
    // 富文本框插件样式
    'https://unpkg.com/@mdi/font@latest/css/materialdesignicons.min.css'
  ],
  js: [
    // vue must at first!
    'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
    // vue-router js
    'https://cdn.bootcss.com/vue-router/3.2.0/vue-router.min.js',
    // axios
    'https://cdn.bootcss.com/axios/0.24.0/axios.min.js',
    // vue-clipboard
    'https://cdn.bootcss.com/vue-clipboard2/0.3.3/vue-clipboard.min.js'
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
  },

  configureWebpack: config => {
    
    if (isProd) {
      // 用cdn方式引入
      config.externals = {
          'vue': 'Vue',
          'vue-router': 'VueRouter',
          'axios': 'axios',
          'vueClipboard': 'VueClipboard'
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

    return { plugins }
  }
}
