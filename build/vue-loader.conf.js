'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction // true
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  // 开发 | 生产
  // { css: ['vue-style-loader', { loader: 'css-loader', options: { sourceMap: true } }, ...] ... } | { css: ExtractTextPlugin, ... }
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction // 生产 使用ExtractTextPlugin
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: { // 标签: [属性]  在模板编译过程中 这些属性交由webpack处理 规则 1.绝对路径原样保留 2.相对路径使用require()加载 3. ~ @ 别名 也都使用require()加载
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
