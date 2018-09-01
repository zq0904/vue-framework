import Vue from 'vue'
import Router from 'vue-router'
// 异步组件 懒加载路由
const Test = () => import('@/components/Test') // 测试文件

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Test',
      component: Test
    }
  ]
})
