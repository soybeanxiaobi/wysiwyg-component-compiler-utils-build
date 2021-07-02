/**
 * 处理归因相关逻辑
 */
import pickBy from 'lodash/pickBy';
import forIn from 'lodash/forIn';

import { pageId, pageAlias } from '../constants';
import { PAGE_SPM } from '../constants/ftv';

/**
 * 页面搭建-归因params参数新规范
 * https://doc.qima-inc.com/pages/viewpage.action?pageId=309431553
 * @param {string} pi - 必填, 已在方法内置 pageId, 用于标识页面, 对应页面链接中的 alias
 * @param {string} componentType - 必填 component, 是指组件类型, 默认自带, 应使用埋点系统 component. 在创建组件时组件名应尽可能与页面搭建系统中一致. 并带上组件当前索引值
 * @param {string} tabId - 非必填 tab类型组件特有, tabId, 标识 tab 类型组件中的当前tab,  一般使用 tab index 即可.
 * @param {string} {itemId} - 必填 是指唯一标识当前 item 的值, 比如商品 alias, 店铺 kdtId.
 * @param {string} is - 非必填 itemSub 是指 item 在列表中的下标.
 */
export const pageAscribeParams = ({
  componentType,
  tabId,
  itemSub,
  itemIdObj = {}
} = {}) => {
  const paramsObj = pickBy({
    sr: PAGE_SPM,
    pi: pageAlias,
    comp: componentType,
    ti: tabId,
    is: itemSub,
    ...itemIdObj
  }, item =>
    item !== undefined &&
    item !== null &&
    item !== '' &&
    // 这里要注意一定要使用ES6的Number.isNaN, window.isNaN存在bug会判定非空string为true
    !Number.isNaN(item)
  );

  let paramsStr = '';
  let mapIdx = 0;
  forIn(paramsObj, (value, key) => {
    paramsStr += `${mapIdx !== 0 ? '!' : ''}${key}~${value}`;
    mapIdx++;
  });

  return {
    // 返回对象格式供业务方使用
    paramsObj,
    // 返回文本格式供业务方使用,例如url拼接 ![key]~[value]
    paramsStr
  };
};

/**
 * 嗨购节-页面归因 hc~[hcId]!comp~[compId]
 * hcId: 会场ID
 * commpId: 组件Id ftv_[moduleId]_[itemId]
 * moduleId是页面模块Id，用于区分页面不同模块
 * itemId 是具体的商品、店铺或券的id
 */
export const ftvPageAscribeParams = (moduleId, itemId) => {
  const compId = `ftv_${moduleId}_${itemId}`;
  const fromParams = `hc~${pageId}!comp~${compId}`;
  return fromParams;
};