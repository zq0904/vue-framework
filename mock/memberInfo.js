import Mock, { Random } from 'mockjs'

Mock.mock("/memberInfo", 'post', {
  "message": "查询成功",
  "status": "1",
  "data": {
    "applyStatus": "2", // 1审核中，2审核通过，3审核拒绝 0 提交申请（根据审核状态值跳转到不同的页面
    "memberInfo": {
      "memberId": "", // 会员编号
      "memberLevel": "0", // 当前卡的名字 0 普卡 1银卡 2金卡
      "memberName": "普卡会员", // 会员名字
      "expDate": "2017-03-09", // 会员有效期至 没有为null
      "nextmemberLevel": "1", // 下一级会员等级  0 普卡 1银卡 2金卡  没有为null
      "nextmemberName": "银卡会员", // 下一级会员等级名称  没有为null
      "isRenew": "0", // 是否可续费标志
      "gradeLevel": "4", // 彩虹等级
      "cardStatus": "1" // 卡状态 0临时卡1正式卡 判断会员有效期
    },
    "privileges": [ // 会员特权列表
      {
        "privilege": "额度分期1", // 特权名称
        "description": "1—48期不同的期限，不同的信用等级，不同的产品定价，信用越好，利率越低。" // 特权描述
      },
      {
        "privilege": "额度分期2", // 特权名称
        "description": "2—128期不同的期限，不同的信用等级，不同的产品定价，信用越好，利率越低。" // 特权描述
      }
    ],
    "price": [ // 开通会员价格列表
      {
        "paymemberLevel": "1", // 支付会员等级 ？
        "paymemberName": "银卡会员半年卡", // 支付会员等级名称 ？
        "priceCode": "WKM05006", // 会员价格标识
        "memberTerm": "6", // 支付会员期限(单位月 12月表示一年)
        "memberPrice": "158.00" // 支付会员价格
      },
      {
        "paymemberLevel": "1", // 支付会员等级 ？
        "paymemberName": "银卡会员半年卡", // 支付会员等级名称 ？
        "priceCode": "WKM05012", // 会员价格标识
        "memberTerm": "12", // 支付会员期限(单位月 12月表示一年)
        "memberPrice": "298.00" // 支付会员价格
      }
    ]
  }
})
