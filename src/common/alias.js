import args from '@youzan/utils/url/args';

/**
 * 收拢一下获取商品alias的方法
 * 1. 旧商品url goods/detail?alias=xxx
 * 2. 新商品url https://xxx.m.youzan.com/wscgoods/detail/home/:alias
 */
export const getGoodsAlias = (goodsUrl = '') => {
  let alias = args.get('alias', goodsUrl);
  if (!alias) {
    const path = goodsUrl.split('?')[0];
    // 匹配英文字母，去除'/',然后取最后一个元素
    const pathMatch = path.match(/\b\w+\b/g);
    alias = pathMatch.pop();
  }
  return alias;
};
