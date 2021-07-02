/* eslint-disable no-empty */
import buildUrlWithCtx from '@youzan/utils/url/buildUrlWithCtx';
import args from '@youzan/utils/url/args';

const {
  miniprogram = {},
  staticPageReg = [],
  staticPageUrlMiddle = '',
  showcase_type: showcaseType = '',
} = window._global;
const { isSwanApp = false, isWeapp = false } = miniprogram;

export function buildUrl(path, urlKey, kdtId, more = {}) {
  const func = buildUrlWithCtx({
    isSwanApp,
    isWeappWebview: isWeapp,
    staticPageReg: staticPageReg.map((it) => new RegExp(it)),
    staticPageUrlMiddle,
  });
  let fullUrl = path;
  if (Object.keys(more || {}).length > 0) {
    fullUrl = args.add(path, more);
  }
  return func(fullUrl, urlKey, kdtId);
}

export function getHomePageUrlByKdtId(kdtId, more = {}) {
  return buildUrl(`/wscshop/showcase/homepage?kdt_id=${kdtId}`, 'h5', kdtId, more);
}

// 微页面地址
// http://h5.youzan.com/v2/feature/nJDNtz2rl9
export function getFeatureUrlByAlias(alias, kdtId, more = {}) {
  return buildUrl(`/feature/${alias}`, 'wap', kdtId, more);
}

// 商品详情页地址
// https://h5.youzan.com/v2/goods/2frjoln3c5buf
export function getGoodsUrlByAlias(alias, kdtId, more = {}) {
  return buildUrl(`/goods/${alias}`, 'wap', kdtId, more);
}

// 商品分组页地址
// http://h5.youzan.com/wscshop/tag/uoh68zo01
export function getTagUrlByTagAlias(alias, kdtId, more = {}) {
  return buildUrl(`/wscshop/tag/${alias}`, 'h5', kdtId, more);
}

// 全部商品
// http://h5.youzan.com/v2/allgoods/55
export function getAllGoodsUrlByKdtId(kdtId, more = {}) {
  return buildUrl(`/allgoods/${kdtId}`, 'wap', kdtId, more);
}

// 新版本商品详情页地址
// https://h5.youzan.com/wscgoods/detail/2frjoln3c5buf
export function getNewGoodsUrlByAlias(alias, kdtId, more = {}) {
  return buildUrl(`/wscgoods/detail/${alias}`, 'h5', kdtId, more);
}

// 商品评价页面地址
// https://h5.youzan.com/wscshop/showcase/goodsEvaluation/list?alias=3nizgi3k2jimn
export function getGoodsEvaluationUrlByAlias(alias, kdtId, more = {}) {
  return buildUrl(
    `/wscshop/showcase/goodsEvaluation/list?alias=${alias}&kdt_id=${kdtId}`,
    'h5',
    kdtId,
    more
  );
}

const VIP_PATH_WHITE_LIST = ['v2/showcase/goods', 'wscshop/showcase/homepage'];

export function replaceVipDomain(url) {
  // 不是微页面 直接 return
  if (showcaseType !== 'feature' && showcaseType !== 'homepage') return url;

  try {
    const { hostname } = location;
    // 非vip域名 直接跳过
    if (hostname === 'h5.youzan.com' || /^shop[0-9]{6}[0-9]*(\.m)?\.youzan\.com$/.test(hostname))
      return url;
    // 解析 需要跳转的 链接
    const { hostname: _hostname, pathname } = new URL(url);
    // 跳转商品 替换成大客再跳
    if (VIP_PATH_WHITE_LIST.some((item) => pathname.indexOf(item) > -1)) {
      url = url.replace(_hostname, hostname);
    }
  } catch (error) {}

  return url;
}

/**
 * 2. /v2/goods/:alias
 * 3. /v2/showcase/goods
 * 4. /wscshop/goods/:alias
 * 5. /wscshop/showcase/goods
 * 6. /wscshop/goods/adv/:alias 暂时不考虑
 */
export function replaceOldGoodsUrl(url) {
  // 不是微页面 直接 return
  if (showcaseType !== 'feature' && showcaseType !== 'homepage') return url;

  // alias 格式
  const aliasReg = /\/(v2|wscshop)\/goods\/[a-zA-Z0-9]+$/;
  // query 格式
  const queryReg = /\/(v2|wscshop)\/showcase\/goods$/;

  try {
    // 解析 需要跳转的 链接
    const { hostname: _hostname, pathname } = new URL(url);

    // 不是商详页，直接返回
    const goodsMatches = aliasReg.test(pathname) || queryReg.test(pathname);

    if (!goodsMatches) {
      return url;
    }

    // 替换成location的hostname，也就是静态化链接
    const { hostname } = location;
    url = url.replace(_hostname, hostname);

    // 把老商详页地址替换成新商详页地址
    if (url.indexOf('/v2/goods/') >= 0) {
      url = url.replace('/v2/goods/', '/wscgoods/detail/');
    } else if (url.indexOf('/wscshop/goods/') >= 0) {
      url = url.replace('/wscshop/goods/', '/wscgoods/detail/');
    } else if (url.indexOf('/v2/showcase/goods') >= 0) {
      const alias = args.get('alias', url);
      url = url.replace('/v2/showcase/goods', `/wscgoods/detail/${alias}`);
    } else if (url.indexOf('/wscshop/showcase/goods') >= 0) {
      const alias = args.get('alias', url);
      url = url.replace('/wscshop/showcase/goods', `/wscgoods/detail/${alias}`);
    }
    return url;
  } catch (error) {}
  return url;
}
