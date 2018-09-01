<template>
  <div class="Test">
    <h1 class="Test-h1">Test</h1>
    <!-- 懒加载的使用 要么自己require加载 要么后台返回的线上链接 直接使用相对路径不会当成模块依赖 处理 -->
    <img v-lazy="require('@/assets/images/Aimer.jpg')" width="100"><br/>
    <img v-lazy="'https://cn.vuejs.org/images/logo.png'" width="100"><br/>
    <span class="iconfont icon--lingdang"></span>
    <!-- 全局注册过滤器 -->
    <p>{{ nowDate | time('LLLL') }}</p>
    <!-- 全局注册的基础组件 -->
    <BaseButton>全局注册的基础组件</BaseButton>
    <!-- 获取vuex中的响应式数据 -->
    <p>{{ test.testArr }}</p>
    <button @click="updateTest({ testArr: [9, 9] })">变更vuex中的数据</button>
    <!-- 正则验证类 -->
    <form @submit.prevent="verification" class="f1">
      <label>详细地址:<input type="text" v-model="site" reg="site"></label>
      <p>手机号: <span reg="phone">{{phone}}</span></p>
      <input type="text" v-model="phone">
      <button>正则验证类</button>
    </form>
    <!-- 设置sessionStorage -->
    <button @click="setset">设置 sessionStorage</button>
    <!-- 获取sessionStorage -->
    <button @click="getget">获取 sessionStorage</button>
    <!-- 删除sessionStorage -->
    <button @click="deldel">删除 sessionStorage</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      nowDate: Date.now(),
      site: '',
      phone: ''
    }
  },
  computed: {
    ...mapGetters({
      test: 'getTest',
      api: 'getApi',
      regexp: 'getRegexp'
    })
  },
  async created() {
    const {data} = await this.$fetch({
      url: this.api.testPort,
      data: {
        a: 1,
        b: '1,2,3,4'
      }
    })
    if (data) { // 如果接口报错 data为undefined
      console.log(data)
    }
  },
  methods: {
    ...mapActions([
      'updateTest'
    ]),
    verification() {
      // 校验通过 undefined 校验不通过 错误信息系
      const msg = this.check('.f1', 'span') // 根选择器 需额外包含的非表单元素选择器（默认只会检索 表单元素 包含自定义reg属性的）
      if (msg) return window.alert(msg)
      window.alert('校验通过')
    },
    setset() {
      this.sessionSetItem('asd', 123)
    },
    getget() {
      console.log(this.sessionGetItem('asd'))
    },
    deldel() {
      this.sessionRemoveItem('asd')
    }
  }
}
</script>

<style lang="scss">
.Test {
  &-h1 {
    @include wh(100, 100);
    line-height: px2rem(100);
    text-align: center;
  }
}
</style>
