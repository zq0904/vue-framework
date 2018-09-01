'use strict'
// 若要执行build.js构建打包文件 必须先进行npm和node版本的检测 (版本不相对时，会出现无法打包，某些文件无法正常编译运行的情况)
const chalk = require('chalk') // 可以设置改变命令行中的字体颜色
const semver = require('semver') // 版本号的检查
const packageConfig = require('../package.json')
const shell = require('shelljs') // 执行Unix系统命令

function exec (cmd) { // 脚本可以通过child_process模块 新建子进程 从而执行Unix命令 cmd 是 npm --version 最后得到版本号 6.4.0
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), // 获取node的版本号
    versionRequirement: packageConfig.engines.node // 所需要的node版本号 条件
  }
]

if (shell.which('npm')) { // 存在npm
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), // 获取npm的版本号
    versionRequirement: packageConfig.engines.npm // 所需要的npm版本号 条件
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    // 进行版本监测 不符合 push 到警告信息数组中
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) { // 存在 警告信息数组 展示警告信息
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1) // process.exit方法用来退出当前进程 它可以接受一个数值参数 如果参数大于0 表示执行失败 如果等于0表示执行成功
  }
}
