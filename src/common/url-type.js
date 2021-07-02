/**
 * reg: url匹配规则
 * type: 类型（主要用于 getRedirectData 转换小程序路径）
 */
export const urlRegList = [
  // 店铺主页
  { reg: /(v2|wscshop)(\/showcase)?\/home/, type: 'homepage' },
  // 商品搜索
  { reg: /wscshop\/showcase\/feature\/search/, type: 'goods_search' },
  // 普通微页面
  { reg: /(v2|wscshop)(\/showcase)?\/feature(?!(\/goods\/all|\/search|\/adv))/, type: 'feature' },
  // 微页面分类
  { reg: /(v2|wscshop)(\/showcase)?\/category/, type: 'category' },
  // 店铺笔记首页
  { reg: /wscshop\/shopnote\/list/, type: 'shopnote' },
  // 店铺笔记详情
  { reg: /wscshop\/shopnote\/detail/, type: 'shopnote_detail' },
  // 商品分组
  { reg: /(v2|wscshop)(\/showcase)?\/tag/, type: 'tag' },
  // 全部商品
  { reg: /(v2|wscshop)(\/showcase)?(\/feature)?\/goods\/all/, type: 'allgoods' },
  // 上架商品
  { reg: /wscgoods\/detail/, type: 'goods' },
  { reg: /v2\/seckill/, type: 'seckill' },
  { reg: /(v2|wscshop)(\/showcase)?\/goods/, type: 'goods' },
  // 购物车
  { reg: /(v2|wsctrade)(\/trade)?\/cart/, type: 'cart' },
  // 个人中心
  {
    reg: /(v2|wscuser)(\/showcase)?\/(usercenter|membercenter)(?!(\/setting))/,
    type: 'usercenter',
  },
  // 优惠券
  { reg: /wscump\/coupon/, type: 'coupon' },
  { reg: /v2\/ump\/promocard/, type: 'coupon' },
  // 刮刮卡
  { reg: /wscump\/apps\/cards/, type: 'guaguale' },
  // 疯狂猜
  { reg: /v2\/apps\/crazyguess/, type: 'crazyguess' },
  // 幸运大抽奖
  { reg: /wscump\/lottery\/scene/, type: 'wheel' },
  // 生效翻翻看
  { reg: /wscump\/apps\/zodiac/, type: 'zodiac' },
  // 课程商品
  { reg: /wscvis\/course\/detail/, type: 'course' },
  // 全部课程
  { reg: /wscvis\/edu\/goods-list/, type: 'allcourse' },
  // 课程分组
  { reg: /wscshop\/edu\/group/, type: 'course_group' },
  // 课程列表
  { reg: /wscvis\/knowledge\/index\?p=allcontent/, type: 'course_category' },
  // 我的课程
  { reg: /v2\/ump\/paidcontent\?page=mypay/, type: 'mypaidcontent' },
  { reg: /v2\/ump\/paidcontent\/index\?page=vipbenefit/, type: 'paidvipbenefit' },
  { reg: /v2\/ump\/paidcontent\/index/, type: 'paidcontent' },
  // 酒店列表
  { reg: /wscindustry\/hotel\/list/, type: 'hotellist' },
  // 投票调查
  { reg: /v2\/apps\/vote/, type: 'survey' },
  // 历史消息
  { reg: /v1\/s\/history/, type: 'history' },
  // 积分商城
  { reg: /(v2|wscump)(\/ump)?\/point(s)?store/, type: 'pointsstore' },
  // 签到
  { reg: /wscump\/checkin\/result/, type: 'calendar_checkin' },
  // 自定义链接只支持公众号文章 todo
  { reg: /mp.weixin.qq.com\/s/, type: 'link' },
  // 联系客服 待定
  { reg: /(v2|v3)\/im/, type: 'chat' },
  // 心愿单 直接toast提示 小程序不支持
  { reg: /wxpay\/wish/, type: 'wish' },
];
