// 客户端的webpack配置
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

function resolve(pathName) {
  return path.resolve(__dirname, pathName)
}


module.exports = merge(commonConfig, {
  entry: '/src/entry-client.js', 
  plugins: [
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('../public/index.html')
    })
  ]
});
