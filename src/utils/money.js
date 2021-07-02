import { isNaN } from 'lodash';

/**
 * 给大数字添加逗号分隔符
 * @memberof module:money
 * @param {number} value  待格式化的值
 * @returns {string} 格式化后的值
 * @example
 * const formatLargeNumber = require('@youzan/utils/money/formatLargeNumber');
 * formatLargeNumber(1000000);
 * // => '1,000,000'
 */
export function moneyFormatLargeNumber(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 格式化商品价格
 * @param {*} value 待格式化的金额数字
 * @param {*} precision 精度位数
 * @param {boolean} showComma 是否显示千分位逗号
 */
export function moneyFormat({ value, precision, isCent = true, showComma = false }) {
  // 去除小数点多余的0
  let formatValue = parseFloat(value);
  if (isNaN(formatValue)) {
    return '';
  }
  // if(isNumber(formatValue) && formatValue)
  if (isCent) {
    formatValue /= 100;
  }
  if (precision) {
    formatValue = formatValue.toFixed(precision);
  }
  if (showComma) {
    return moneyFormatLargeNumber(formatValue);
  }
  return parseFloat(formatValue);
}