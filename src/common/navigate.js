import { ZNB } from '@youzan/znb';

// 初始化 ZNB 环境依赖
ZNB.init({ kdtId: '19346375' });

/**
 * 页面统一跳转
 * 跳转方法 type: 'navigateTo' | 'redirectTo' | 'switchTab' | 'reLaunch' | 'openWebView'
 * switchTab解决小程序跳转一级页面的情况
 */
export function navigatePage(links, type = 'navigateTo') {
  ZNB.navigate({
    ...links,
    type,
  });
}

// 商详页统一跳转
export function navigateGoods(alias) {
  const links = {
    url: `https://h5.youzan.com/v2/showcase/goods?alias=${alias}`,
    swanUrl: `/packages/goods/detail/index?alias=${alias}`,
    weappUrl: `/packages/goods/detail/index?alias=${alias}`
  }
  ZNB.navigate(links);
}
