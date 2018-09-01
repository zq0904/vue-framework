'use strict'
require('./check-versions')() // 进行node和npm的版本检查 不符合直接退出当前进程

process.env.NODE_ENV = 'production'

const ora = require('ora') // 进度条 loading
const rm = require('rimraf') // 用于删除文件或者文件夹的插件
const path = require('path')
const chalk = require('chalk') // 可以设置改变命令行中的字体颜色
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf') // 生产环境配置项

const spinner = ora('building for production...')
spinner.start() // 开启loading动画

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => { // 删除 绝对路径/dist/static
  if (err) throw err
  webpack(webpackConfig, (err, stats) => { // 去执行 生产环境配置项 出错执行回调
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({ // 这一串是控制打包后详细文件的输出情况
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) { // 打包失败 显示错误信息 并退出程序
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }
    // 打包成功在控制台上显示打包成功提示信息
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
