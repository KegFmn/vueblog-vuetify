
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
  }

}
