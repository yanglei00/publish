const webpack = require('webpack')
const addEntries = require('./addEntries');

function updateCompiler(compiler, options) {
  let webpackConfig = compiler.options;
  addEntries(webpackConfig, options);
  const config = compiler.options;
  // 使entry修改生效
  compiler.hooks.entryOption.call(config.context, config.entry);
  const findHMRPlugin = (config) => {
    if (!config.plugins) {
      return undefined;
    }
    return config.plugins.find(
      (plugin) => plugin.constructor === webpack.HotModuleReplacementPlugin
    );
  };
  // 使plugins修改生效
  const plugin = findHMRPlugin(compiler.options);
  if (plugin) {
    plugin.apply(compiler);
  }
}

module.exports = updateCompiler;
