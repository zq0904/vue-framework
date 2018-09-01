'use strict'
const utils = require('./utils') // 工具函数
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge') // webpack-merge 有自己的merge规则
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf') // 基础webpack配置文件
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝静态资源目录 static
const HtmlWebpackPlugin = require('html-webpack-plugin') // 自动拷贝index.html 并注入依赖
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 处理程序在编译过程中出现的错误 并在桌面进行错误信息的提示
const portfinder = require('portfinder') // 查看空闲端口位置 默认情况下搜索8000这个端口

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // rules: [{test:/\.css$/, use:[]}, {test:/\.postcss$/, use:[]}]
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning', // 当使用内联模式(inline mode)时 会在开发工具(DevTools)的控制台(console)显示消息 可以设置none
    historyApiFallback: { // 当使用 HTML5 History API 时 任意的 404 响应都可能需要被替代为 /index.html
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, // 启用热更新
    contentBase: false, // 因为我们使用CopyWebpackPlugin
    compress: true, // 一切服务都启用 gzip 压缩
    host: HOST || config.dev.host, // IP 默认是localhost
    port: PORT || config.dev.port, // 端口 8080
    open: config.dev.autoOpenBrowser, // 自动打开浏览器
    overlay: config.dev.errorOverlay // 当出现编译器错误或警告时 在浏览器中显示全屏覆盖层 默认禁用
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, // 公开资源路径
    proxy: config.dev.proxyTable, // 配置代理
    quiet: true, // FriendlyErrorsPlugin 所必需
    watchOptions: { // 监视文件相关改动的通知 在某些情况下不会正常工作 这时可以启用轮询
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({ // 允许在编译时(compile time)配置的全局常量
      'process.env': require('../config/dev.env') // 'process.env': { NODE_ENV: '"development"' }  ->  process.env.NODE_ENV = 'development'
    }),
    new webpack.HotModuleReplacementPlugin(), // 启用模块热替换
    new webpack.NamedModulesPlugin(), // 启用HMR时 此插件将显示模块的相对路径
    new webpack.NoEmitOnErrorsPlugin(), // 跳过编译时出错的代码并记录 使编译后运行时的包不会发生错误
    new HtmlWebpackPlugin({ // 拷贝index.html 自动注入外链
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([ // 拷贝静态资源 static目录
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'] // 要忽略此模式的其他全局变量
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port // 设置查找的默认 端口
  portfinder.getPort((err, port) => { // 这个方法会监测 portfinder.basePort 是否被占用了 被占用了 往后取值
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port // 发布e2e测试所必需的新端口
      devWebpackConfig.devServer.port = port // 覆盖devServer port 配置
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: { // 编译成功的信息
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
