let p1 = '' // mock 和 生产环境
let p2 = '/api' // 代理

// 生产环境
if (process.env.NODE_ENV === 'production') p2 = p1

// 接口地址
const state = {
  testPort: p1 + '/memberInfo' // 测试接口
}

const mutations = {}
const actions = {}

export default {
  state,
  mutations,
  actions
}
