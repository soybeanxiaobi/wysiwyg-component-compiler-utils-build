/* eslint-disable prefer-destructuring */
import { Toast } from 'vant';
import { stringify } from 'qs';
import Args from '@youzan/utils/url/args';
import { action } from '@youzan/zan-jsbridge';

import { couponTypeMap } from './coupon';
import { navigatePage } from '../navigate';
import { takeCoupon } from '../../model/api';
import { ftvPageAscribeParams } from '../ascribe';
import { fromSource as from_source } from '../../constants';
import { isInApp, isMarsApp, isLoginInMarsApp } from '../constant';

/**
 * h5: https://h5.youzan.com
 * maijia: https://maijia.youzan.com/v3
 */
const { h5, maijia } = window._global.url;

export const MINI_PROGRAM_LIST = {
  mars: 'mars'
};

// 小程序的tabbar配置, 用于h5跳小程序方式判断
export const MINI_PROGRAM_TABBAR_LIST = {
  // 精选小程序tabbar配置, 如果变更需要及时更新
  [MINI_PROGRAM_LIST.mars]: [
    // 精选
    '/pages/home/dashboard/index',
    // 直播
    '/pages/guang-live/index',
    // 购物车
    '/pages/cart/index',
    // 我的
    '/pages/user/index'
  ]
};

/**
 * 支持精选小程序tabBar跳转
 * 注意tabBar页面的跳转不支持带参数
 */
export const navigateTabbarPage = (links, type) => {
  const { weappUrl = '' } = links;
  if (type && MINI_PROGRAM_TABBAR_LIST[type].includes(weappUrl)) {
    navigatePage({
      ...links,
      type: 'switchTab'
    });
  } else {
    navigatePage(links);
  }
};

// 嗨购节-优惠券列表h5页面
export const ftvCouponListUrl = `${maijia}/festival/user#/coupon`;

/**
 * 跳转店铺主页
 * @param {string} moduleId 页面模块id
 * @param {number} kdtId 店铺ID
 */
export const navigateToShopHome = (moduleId, kdtId) => {
  const from_params = ftvPageAscribeParams(moduleId, kdtId);
  const query = {
    kdt_id: kdtId,
    // 小程序参数
    kdtId,
    from_source,
    from_params
  };
  navigatePage({
    url: `${h5}/wscshop/showcase/homepage?${stringify(query)}`,
    swanUrl: `/packages/shop/home/index?${stringify(query)}`,
    weappUrl: `/packages/shop/home/index?${stringify(query)}`
  });
};

/**
 * 跳转商详
 * @param {string} moduleId 页面模块id
 * @param {string} alias 商品alias
 */
export const navigateToGoodsDetail = (moduleId, alias) => {
  const from_params = ftvPageAscribeParams(moduleId, alias);

  const query = {
    alias,
    from_source,
    from_params
  };
  if (isInApp) {
    // 商详存在二次302情况,为避免回退路由异常,在有赞精选app里则使用webview打开
    action.gotoWebview({
      url: `${h5}/v2/showcase/goods?${stringify(query)}`,
      page: 'web'
    });
  } else {
    navigatePage({
      url: `${h5}/v2/showcase/goods?${stringify(query)}`,
      swanUrl: `/packages/goods/detail/index?${stringify(query)}`,
      weappUrl: `/packages/goods/detail/index?${stringify(query)}`
    });
  }
};

// 满减券领取成功跳转逻辑
export const handleNormalCouponNav = async ({ kdtId, id, couponGroupId, from_params = '' }) => {
  const channelQuery = {
    from_params,
    youzanmars: 1,
    from_source
  };
  // 跳转券可用商品列表
  navigatePage({
    url: Args.add(`${maijia}/user/coupons/good/page`, {
      kdtId,
      couponId: id,
      couponGroupId,
      ...channelQuery
    }),
    weappUrl: Args.add('/packages/user/coupons/goods/index', {
      kdt_id: kdtId,
      coupon_id: id,
      coupon_group_id: couponGroupId,
      ...channelQuery
    })
  });
};

// 点击分享优惠券
export const handleShareCoupon = async ({ kdtId, alias, from_params }) => {
  const query = {
    alias,
    kdtId,
    from_source,
    youzanmars: 1,
    from_params
  };
  navigatePage({
    url: Args.add(`${h5}/wscump/split-coupon-friend/detail`, query),
    weappUrl: Args.add('/packages/ump/split-coupon-friend/index', query)
  });
};

/**
 * 嗨购节-优惠券跳转逻辑
 * @param {number} kdtId 店铺ID
 * @param {string} moduleId 页面模块id
 * @param {string} couponAlias 券alias
 * @param {number} couponActId 券活动id 用于领券
 * @param {number} denominations 券金额
 * @param {number} couponType 券类型  1 满减券  10 分享券
 */
export const navigateToCouponDetail = async ({ moduleId, kdtId, couponAlias, couponActId, denominations, couponType }) => {
  if (!kdtId || !couponAlias || !couponType) {
    return;
  }
  const from_params = ftvPageAscribeParams(moduleId, couponActId);
  const { user_info, user_id } = window._global;

  /**
   * 领券要求用户登录,登录需要区分环境.不同环境判断是否登录也不一致
   * h5: 302到passport页面
   * app: 走app登录页
   * 小程序: 静默登录 默认不处理
   */
  if (isMarsApp) {
    const isLogin = isLoginInMarsApp();
    if (!isLogin) {
      // 跳转app登录页
      action.gotoNative({
        page: 'login'
      });
      return;
    }
  } else if (!user_info && !user_id) {
    window.location.href = Args.add('https://passport.youzan.com/login/password', { redirectUrl: window.location.href });
    return;
  }
  // 满减券 -> 领券 -> 跳转可用券列表
  if (couponType === couponTypeMap.reward) {
    // 用户开始领券
    return takeCoupon({
      kdtId,
      groupId: couponActId
    }).then(result => {
      if (result) {
        Toast({
          message: '领券成功，正在前往优惠券可用商品列表',
          duration: 1000,
          onClose: () => handleNormalCouponNav({ from_params, ...result })
        });
      }
    }).catch((err = {}) => {
      const { code, msg } = err;
      /**
       * 过滤掉中台错误, 我们业务接口超时等特殊错误
       */
      if (msg === '参数错误' || code === 410010015) {
        Toast('网络错误，请稍后再试');
        return;
      }
      Toast(msg || '领券失败');
    });
  }
  // 分享券 -> 跳转ump分享券页面
  if (couponType === couponTypeMap.shared) {
    await handleShareCoupon({ kdtId, from_params, alias: couponAlias, denominations });
  }
};

// 跳转可用券列表
export const navAvailableCouponList = () => {
  const url = Args.add(ftvCouponListUrl, {
    from_source
  });
  navigatePage({
    url,
    weappUrl: `/packages/activity/festival/subset/index?src=${encodeURIComponent(url)}`
  });
};

