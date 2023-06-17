const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production' // 是否生产环境

let cdn = {
  css: [
    // vuetify
    'https://cdn.staticfile.org/vuetify/2.6.10/vuetify.min.css',
    // 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
    // 'https://cdn.staticfile.org/MaterialDesign-Webfont/4.9.95/css/materialdesignicons.min.css',
    // gitalk
    // 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css'
  ],
  js: [
    // vue
    'https://cdn.bootcdn.net/ajax/libs/vue/2.7.10/vue.min.js',
    // axios
    // 'https://cdn.bootcdn.net/ajax/libs/axios/0.24.0/axios.min.js',
    // vuex
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js',
    // vue-router
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.6.5/vue-router.min.js',
    // vutify
    'https://cdn.staticfile.org/vuetify/2.6.10/vuetify.min.js',
    // fingerprint2
    // 'https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.4/fingerprint2.min.js',
    // vditor
    // 'https://unpkg.com/vditor@3.9.3',
    // gitalk
    // 'https://cdn.bootcdn.net/ajax/libs/gitalk/1.8.0/gitalk.min.js'
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

  transpileDependencies: ['vuetify'],

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
              args[0].title = 'Special Blog';
              args[0].cdn = cdn;
              return args;
          });

      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end();
    }
  },

  configureWebpack: config => {
    const plugins = [];
    
    if (isProd) {
      // 用cdn方式引入
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        // 'axios': 'axios',
        'vue-router': 'VueRouter',
        'vuetify': 'Vuetify',
        // 'fingerprintjs2': 'Fingerprint2',
        // 'vditor': 'Vditor',
        // 'gitalk': 'Gitalk'
      }
      
      plugins.push(
        new UglifyJsPlugin({
            uglifyOptions: {
              output: {
                comments: false, // 去掉注释
              },
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']//移除console
              },
              warnings: false
            },
            sourceMap: false,
            parallel: true
        })
      )
      
      const gzipExtList = ['css', 'js'];
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    return { plugins }
  }
}
