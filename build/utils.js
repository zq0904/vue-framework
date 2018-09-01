'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 从js中提取css
const packageConfig = require('../package.json')

// 得到 static/_path
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path) // path.posix兼容写法
}

// 得到 { css: ['vue-style-loader', { loader: 'css-loader', options: { sourceMap: true } }, ...] ... } | { css: ExtractTextPlugin, ... }
// 使用于vue-loader
exports.cssLoaders = function (options) { // { sourceMap: true, usePostCSS: true }
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // 得到 ['vue-style-loader', { loader: 'css-loader', options: { sourceMap: true } }, ...] | ExtractTextPlugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader] // 需要前缀loader加前缀loader

    if (loader) { // 添加传递过来的这个loader
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 生产环境 options.extract 存在 仅返回 提取css插件
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass').concat({ // 全局引入scss
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(__dirname, '../src/assets/scss/_app.scss')
      }
    }),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 得到 [{test:/\.css$/, use:[]}, {test:/\.postcss$/, use:[]}] 用于加载不在.vue文件中的单独存在的样式文件
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options) // {css: [], postcss: []}

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

// 处理程序在编译过程中出现的错误 并在桌面进行错误信息的提示
exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return
    const error = errors[0] // 每次捕获第一个错误

    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name, // 错误项目名
      message: severity + ': ' + error.name, // 错误类型
      subtitle: filename || '', // 错误提示副标题
      icon: path.join(__dirname, 'logo.png') // 错误提示图示标
    })
  }
}
