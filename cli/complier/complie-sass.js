const { writeFileSync } = require('fs');
const { renderSync } = require('sass');

const { replaceExt } = require('./common');

function compileSass(filePath) {
  const { css } = renderSync({ file: filePath });
  const newFilePath = replaceExt(filePath, '.css');
  console.log('newFilePath: ', newFilePath);
  writeFileSync(newFilePath, css);
}

module.exports = compileSass;