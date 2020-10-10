const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // 只实现按需打包，不更换主题
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: "css",
    }),
);  