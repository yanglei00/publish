
const webpack = require('webpack')
const config = require('../../../webpack.config')
const port = 9001
async function startDevServer() {
    let Server;
    Server = require('../../../webpack-dev-server/lib/Server');
    const servers = [];
    let compiler = webpack(config)
    const server = new Server(compiler, config.devServer);
    server.listen(port, '127.0.0.1', (error) => {
        console.log(port + '服务启动成功');
    });
    servers.push(server);
    return servers;
}
module.exports = startDevServer;
