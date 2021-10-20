// 客户端的webpack配置
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');


module.exports = merge(commonConfig, {
  entry: '/src/entry-client.js', 
  
  plugins: [
    new VueSSRClientPlugin()
  ]
});
