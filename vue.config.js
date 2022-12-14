module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        'src': '@',
        'assets': '@/assets',
        'component': '@/components',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
