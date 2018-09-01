'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // 路径
    assetsSubDirectory: 'static', // 静态资源目录
    assetsPublicPath: '/', // 资源公开路径
    proxyTable: { // 配置代理
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''} // 路径重写规则
      }
    },

    // 各种开发服务器设置
    host: 'localhost', // IP 可以被process.env.HOST覆盖
    port: 4000, // 端口 可以通过process.env覆盖
    autoOpenBrowser: true, // 自动打开浏览器
    errorOverlay: true, // devServer.overlay 当出现编译器错误或警告时 在浏览器中显示全屏覆盖层
    notifyOnErrors: true, // 处理程序在编译过程中出现的错误 并在桌面进行错误信息的提示
    poll: false, // devServer.watchOptions 不启用轮询

    useEslint: true, // 是否启用Eslint
    showEslintErrorsInOverlay: false, // 如果使用了eslint 违反eslint规则的错误和警告也将被显示在浏览器的透明黑色层上面

    // 源映射

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    cacheBusting: true, // 如果你在devtools中调试vue-files有问题 将这个设置为false -可能会有帮助

    cssSourceMap: true // 是否启用css源映射
  },

  build: {
    // 模板
    index: path.resolve(__dirname, '../dist/index.html'),

    // 路径
    assetsRoot: path.resolve(__dirname, '../dist'), // 打包输出根路径
    assetsSubDirectory: 'static', // 静态资源目录
    assetsPublicPath: '/', // 资源公开路径

    // 源映射

    productionSourceMap: true, // 是否启用 生产环境 devtool
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    productionGzip: false, // 设置为true 需先安装 npm install --save-dev compression-webpack-plugin
    productionGzipExtensions: ['js', 'css'], // 如果启用这个压缩 只会对js css压缩

    bundleAnalyzerReport: process.env.npm_config_report // npm run build --report 将启用 打包之后的分析报告
  }
}
