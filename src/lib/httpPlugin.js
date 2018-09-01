// 简单封装 axios
import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'

const $httpPlugin = {}
// 初始化axios
let instance = axios.create({
  timeout: 120000 // 超时时间2分钟
})

$httpPlugin.install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get() {
        return ({ url, data = {}, type = 'post' }) => {
          let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          headers = _.merge(headers, { // 需要额外封装进请求头中的参数
            'version': '1.0',
            't': new Date().getTime(),
            'token': 'token' // token
          })
          return instance({
            method: type,
            url,
            data: qs.stringify(data),
            headers
          }).then(data => {
            const status = data.data.status
            if (Number(status) !== 1) { // 只要 status状态不为1 信息由后端指定
              window.alert(data.data.message)
              return false
            }
            return data // 没有问题返回data
          }).catch(err => { // 错误同一处理
            console.dir(err)
            window.alert('网络不给力，请重新尝试')
            return false
          })
        }
      }
    },
    // 处理一组http并发请求, 接回调
    axiosAll: {
      get() {
        return (httpArr) => {
          return axios.all(httpArr)
        }
      }
    }
  })
}

export default $httpPlugin
