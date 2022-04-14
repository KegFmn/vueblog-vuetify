const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  publicPath: '/', 
  outputDir: 'dist', // 输出文件目录

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'MyBlog'
        return args
      })
  },
  
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([{
          from: 'node_modules/mavon-editor/dist/highlightjs',
          to: path.resolve(__dirname, '../dist/highlightjs'), // 插件将会把文件导出于/dist/highlightjs之下
      }, {
          from: 'node_modules/mavon-editor/dist/markdown',
          to: path.resolve(__dirname, '../dist/markdown'), // 插件将会把文件导出于/dist/markdown之下
      }, {
          from: 'node_modules/mavon-editor/dist/katex', // 插件将会把文件导出
          to: path.resolve(__dirname, '../dist/katex')
      }]),
    ],
  }
}
