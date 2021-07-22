const compiler = require('vue-template-compiler');
const compileUtils = require('@vue/component-compiler-utils');
const { remove, readFileSync, outputFileSync } = require('fs-extra');
const path = require('path');

const { replaceExt } = require('./common');
const compileJs = require('./complie-js');
const compileSass = require('./complie-sass');

function fillRenderIntoContent(scriptContent) {
  const newContent = scriptContent.replace('export default {', 'export default { \n  render,')
  return newContent;
}

function generateSfcContent({
  stylesContent = '',
  templateContent = '',
  scriptContent = ''
}) {
  /**
   * 需要把render拼到导出内容里 因为是
   * template----html的方式做渲染
   * render----js的方式做渲染
   */
  const fillScriptContent = fillRenderIntoContent(scriptContent.trim())
  const mergeContent = `${stylesContent.trim()}\n${templateContent.trim()}\n${fillScriptContent}`;
  return mergeContent;
}


function compileVue(filePath) {
  const source = readFileSync(filePath, 'utf-8');

  const complierParseData = compileUtils.parse({
    source,
    compiler,
    needMap: false
  });
  const { template = {}, styles = [], script = {} } = complierParseData || {};
  console.log('==== complierParseData: ', complierParseData);

  // 生成编译后代码
  const complieTemplateResult = compileUtils.compileTemplate({
    compiler,
    source: template.content,
    isProduction: false,
  }) || {};

  /**
   * 需要把拆分出去的style文件引入进来
   */
  let stylesContent = '';

  // 样式另外生成一个文件,然后在js里引入
  if (styles instanceof Array && styles.length) {
    // 文件路径以lang为准 e.g. lang="scss" 则文件后缀为.scss
    styles.forEach(({ content = '', lang = 'css' }, index) => {
      let cssFilePath = '';
      // 如果存在多个<style>,则需要用index区分
      if (styles.length > 1) {
        cssFilePath = replaceExt(filePath, `-${index}.${lang}`);
      } else {
        cssFilePath = replaceExt(filePath, `.${lang}`);
      }

      /**
       * 1. 用parse.base去拿到文件名
       * 2. 所有后缀更改为css, 因为最后都会编译成css文件
       */
      stylesContent = `${stylesContent}\nimport './${replaceExt(path.parse(cssFilePath).base, '.css')}';`

      outputFileSync(cssFilePath, content.trim());
      if (lang === 'scss') {
        // 如果是scss 需要二次编译
        compileSass(cssFilePath);
      }
    })
  }

  // 生成新的以js为后缀的路径
  const jsFilePath = replaceExt(filePath, '.js');

  const outputFileContent = generateSfcContent({
    stylesContent,
    templateContent: complieTemplateResult.code,
    scriptContent: script.content
  });

  // 移除旧的vue文件
  remove(filePath);

  outputFileSync(jsFilePath, outputFileContent);

  // 对新生成js文件进行complier
  // compileJs(jsFilePath);
}

module.exports = compileVue;