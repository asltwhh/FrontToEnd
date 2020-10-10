// const {injectBabelPlugin} = require('react-app-rewired');
// module.exports = function override(config, env) {
//   config = injectBabelPlugin(['import', {libraryName: 'antd-mobile', style: 'css'}], config);
//   return config;
// };
const theme = require('./antd-theme');
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: theme,
    }),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: true,
    }),
);