const {
  lstatSync,
  existsSync,
  readdirSync,
  readFileSync,
  outputFileSync,
} = require('fs-extra');

// 是否是目录
function isDir(dir) {
  return lstatSync(dir).isDirectory();
}

// 修改文件名后缀 比如将.scss等转化成.css
function replaceExt(filename = '', ext = '') {
  if (!filename || !ext) {
    return filename;
  }
  const newFilename = filename.replace(/\.(.*)/, ext);
  return newFilename;
}

module.exports = {
  isDir,
  replaceExt
};