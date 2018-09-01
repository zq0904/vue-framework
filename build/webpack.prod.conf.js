'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝static目录下静态资源
const HtmlWebpackPlugin = require('html-webpack-plugin') // 复制index.html 注入资源
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 提取css
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // 压缩js

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true, // 启用压缩
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot, // 绝对路径dist
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js') // 非主文件入口文件名
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/prod.env') // 设置生产环境变量
    }),
    new UglifyJsPlugin({ // 压缩js
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new ExtractTextPlugin({ // 提取css
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // codesplit组件中的css只存在于组件中，而不是主app.css文件中 但是CSS源映射是 “重复的” - codesplit块（例如0.js）包含该块的CSS的CSS源映射，并且代码拆分块（例如0.js.map）的映射文件也包含它。不好
      allChunks: true, // 将 codesplit 中的代码的css也提取出来
    }),
    new OptimizeCSSPlugin({ // 压缩css
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去除空格
        removeAttributeQuotes: true // 去除标签属性值的双引号
      },
      chunksSortMode: 'dependency' // 注入依赖的时候按照依赖先后顺序进行注入 例如先注入vendor.js（第三方包） 再注入app.js
    }),
    new webpack.HashedModuleIdsPlugin(), // 该插件会根据模块的相对路径生成一个四位数的散列作为模块id
    new webpack.optimize.ModuleConcatenationPlugin(), // 预编译所有模块到一个闭包中 提升你的代码在浏览器中的执行速度
    // 分离第三方包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) { // module.resource 需要打包文件的绝对文件路径 存在 以.js结尾 从属node_modules 都会打包到vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 将webpack引导程序逻辑提取到单独的文件中 ?
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({ // 这个实例从被分割的代码块中提取共享块并将它们捆绑在一起在一个单独的块中 类似于供应商块 ?
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new CopyWebpackPlugin([ // 拷贝静态资源
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*'] // 忽略类似.gitkeep这样的文件
      }
    ])
  ]
})

if (config.build.productionGzip) { // 提供带 Content-Encoding 编码的压缩版的资源
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]', // 目标资源名称
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, // 只处理比这个值大的资源
      minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
    })
  )
}

if (config.build.bundleAnalyzerReport) { // 分析 bundle 内容的插件及 CLI 工具 以便捷的、交互式、可缩放的树状图形式展现给用户
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
