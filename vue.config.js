const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');

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
        secure: true, // 如果是https接口，需要配置这个参数
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
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'MyBlog'
        return args
      })
  },

  configureWebpack: config => {    
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
