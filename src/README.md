# 页面搭建系统组件库

## 新增组件

为了避免与`page-design-showcase`与`captain-showcase`组件重名导致冲突, 要求`page-design-showcase`应该尽量遵守下面规范:

1. 组件文件夹默认带**case**后缀
2. 组件名前缀带**page-design**前缀

```vue
<template>
  <cap-white :height="height" />
</template>

<script>
import { White } from '@youzan/captain-showcase';

export default {
  name: 'page-design-white',

  components: {
    [White.name]: White,
  },

  props: {
    height: Number
  },
};
</script>
```

## 本地开发

1. 切换node >= 10.20.0

2. 执行npm link

3. 在业务工程里执行npm link @youzan/page-design-showcase(node版本一致)

## 组件名与对应文件夹

```js
[
  {
    type: 'config',
    title: '页面配置'
  },
  {
    type: 'content_item',
    title: '内容摘要'
  },
  {
    type: 'countdown',
    title: '倒计时'
  },
  {
    type: 'coupon',
    title: '优惠券'
  },
  {
    type: 'float_modal',
    title: '悬浮窗'
  },
  {
    type: 'cube_v3',
    title: '图片魔方'
  },
  {
    type: 'goods_weapp',
    title: '商品列表'
  },
  {
    type: 'image_ad',
    title: '图片广告'
  },
  {
    type: 'tag_list_top',
    title: '商品分组'
  },
  {
    type: 'goods-tabs',
    title: '商品分组(新)'
  },
  {
    type: 'goods-list',
    title: '商品列表(新)'
  },
  {
    type: 'relate-list',
    title: '关联推荐'
  },
  {
    type: 'rich_text_weapp',
    title: '富文本'
  },
  {
    type: 'single_goods',
    title: '单商品'
  },
  {
    type: 'tag_list_hash',
    title: '锚点商品'
  },
  {
    type: 'video_item',
    title: '小视频'
  },
  {
    type: 'ka_shop_list',
    title: 'KA店铺列表'
  },
  {
    type: 'group_goods_shop_list',
    title: 'KA店铺拼团商品'
  },
  {
    type: 'ka-shop-coupon-list',
    title: 'KA店铺优惠券'
  },
  {
    type: 'coupon-list',
    title: '优惠券分组'
  },
  {
    type: 'recommendation',
    title: '猜你喜欢'
  },
  {
    type: 'page-tab',
    title: '页面菜单'
  },
  {
    type: 'festival-goods-list',
    title: '商品分组'
  },
  {
    type: 'theme-shop-page',
    title: '特色主题会场'
  },
  {
    type: 'personal-center',
    title: '个人中心'
  },
  {
    type: 'multi-platform-live-list',
    title: '多平台直播列表'
  },
  {
    type: 'kuaishou-live-list',
    title: '快手直播列表'
  }
];
```
