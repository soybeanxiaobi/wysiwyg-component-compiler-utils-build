/**
 * 处理优惠券相关逻辑
 */
import { moneyFormat } from '../../utils/money';

// 嗨购节优惠券类型
export const couponTypeMap = {
  // 满减券
  reward: 1,
  // 折扣券(嗨购节猜你喜欢不涉及)
  discount: 2,
  // 裂变券(分享)
  shared: 10
};

export const couponActionText = {
  [couponTypeMap.reward]: '立即领券',
  [couponTypeMap.shared]: '分享领券'
};

export const getCouponText = ({
  // 券类型: 1满减券 2折扣券 10裂变券
  couponType,
  // 优惠券门槛
  couponThreshold,
  // 优惠券金额
  denominations,
  // 是否为分
  isCent = true,
  // 文案是否需要展示金额单位
  isShowUnit = true
}) => {
  const [formatThreshold, formatDenominations] = [
    couponThreshold,
    denominations
  ].map(value => isCent ? moneyFormat({ value }) : value);
  // 门槛文案
  let thresholdText = '';
  // 优惠文案
  let denominationsText = '';
  if (Number(couponThreshold) === 0) {
    thresholdText = '无门槛';
  } else {
    thresholdText = `满${formatThreshold}`;
  }
  // 折扣券(本期嗨购节暂不支持)
  if (couponType === couponTypeMap.discount) {
    denominationsText = `打${formatDenominations}折`;
  } else {
    // 满减券和裂变券
    denominationsText = `减${formatDenominations}${isShowUnit ? '元' : ''}`;
  }
  return `${thresholdText}${denominationsText}`;
};
