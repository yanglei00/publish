
const webpack = require('webpack');

function addEntries(config, options = {}) {
  config.entry.app.import.unshift(require.resolve('../../client/index.js'))
  config.entry.app.import.unshift(require.resolve('../../../webpack/hot/dev-server.js'))
  if (options.hot || options.hotOnly) {
    config.plugins = config.plugins || [];
    if (
      !config.plugins.find(
        // Check for the name rather than the constructor reference in case
        // there are multiple copies of webpack installed
        (plugin) => plugin.constructor.name === 'HotModuleReplacementPlugin'
      )
    ) {
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
  }
}

module.exports = addEntries;
