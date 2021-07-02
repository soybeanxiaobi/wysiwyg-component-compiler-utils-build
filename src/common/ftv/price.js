import { moneyFormat } from '../utils';

const ftvGoodsType = {
  // 拼团商品
  grouponGoods: 0,
  // 券商品
  couponGoods: 1,
}

// 嗨购节-获取商品价格
export const getGoodsPrice = ({
  // 商品类型 0拼团 1券
  goodsType,
  // 商品原价
  goodsPrice,
  // 商品拼团价
  groupGoodsPrice,
  // 价格是否为分
  isCent = true,
  // 是否需要格式化(价格为分默认格式化)
  isFormat = true,
  showComma = false,
  precision,
}) => {
  let resultPrice;
  const formatGroupGoodsPrice = parseFloat(groupGoodsPrice);
  // 如果非拼团商品 或 拼团商品未返回活动价/返回活动价低于0 则返回原价
  if (goodsType !== ftvGoodsType.grouponGoods || isNaN(formatGroupGoodsPrice) || formatGroupGoodsPrice < 0) {
    resultPrice = goodsPrice;
  } else {
    resultPrice = groupGoodsPrice;
  }
  if (isCent && isFormat) {
    resultPrice = moneyFormat({ value: resultPrice, precision, showComma })
  }
  return resultPrice;
}