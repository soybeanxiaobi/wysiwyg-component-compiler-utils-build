const { readdirSync, copySync, emptyDirSync } = require('fs-extra');
const path = require('path');

const complieSass = require('./complie-sass');
const complieJs = require('./complie-js');
const { isDir } = require('./common');

const ROOT_SRC_PATH = path.join(__dirname, '../../src');
const LIB_SRC_PATH = path.join(__dirname, '../../lib/src');

// 开始处理
function complieDir(dirPath) {
  // 读取src目录
  const dirFileList = readdirSync(dirPath) || [];
  console.log('==== dirFileList: ', dirFileList);
  dirFileList.forEach(filename => {
    // 文件路径
    const filePath = path.join(dirPath, filename);

    // 如果还是目录,则继续执行complieDir
    if (isDir(filePath)) {
      complieDir(filePath);
      return;
    }

    /**
     * build scss file
     */
    if (/\.(scss)$/.test(filename)) {
      complieSass(filePath);
      return;
    }

    /**
     * build normal js file
     */
    if (/\.(js)$/.test(filename)) {
      complieJs(filePath);
      return;
    }
  })
}

(() => {
  // 清空lib目录
  emptyDirSync(path.join(__dirname, '../../lib'));
  // 先把src目录同等复制到lib 再做操作
  copySync(ROOT_SRC_PATH, LIB_SRC_PATH);
  console.log('LIB_SRC_PATH: ', LIB_SRC_PATH);
  complieDir(LIB_SRC_PATH);
})()

