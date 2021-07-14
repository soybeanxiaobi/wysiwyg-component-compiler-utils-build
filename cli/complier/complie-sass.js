const { outputFileSync } = require('fs-extra');
const { renderSync } = require('sass');

const { replaceExt } = require('./common');

function compileSass(filePath) {
  const { css } = renderSync({ file: filePath });
  const newFilePath = replaceExt(filePath, '.css');
  // 写入新文件 xx.css
  outputFileSync(newFilePath, css);
}

module.exports = compileSass;