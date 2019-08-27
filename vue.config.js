module.exports = {
  outputDir: './dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : './',
  // 配置调用不同环境的接口
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const argv = process.argv
      const itoo = argv[argv.indexOf('--itoo-mode') + 1]

      args[0]['process.env'].MODE = `"${itoo}"`
      return args
    })
  },
  configureWebpack: {
    externals: {
      SDK: 'SDK',
      NETCALL: 'NETCALL'
    },
    devServer: {
      // port:8081,
      open: true,
      host: 'localhost',
      proxy: {
        '/auth-web': {
          target: 'http://192.168.22.52:8081/',
          changeOrigin: true
        }
      }
    }
  }
}
