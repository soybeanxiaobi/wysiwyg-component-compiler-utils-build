
const { transformSync } = require('@babel/core');
const { readFileSync, removeSync, outputFileSync } = require('fs-extra');

const { replaceExt } = require('./common');

function compileJs(filePath) {
  let code = readFileSync(filePath, 'utf-8');

  const result = transformSync(code, { filename: filePath })
  if (result) {
    const jsFilePath = replaceExt(filePath, '.js');
    removeSync(filePath);
    outputFileSync(jsFilePath, result.code);
  }
}

module.exports = compileJs;