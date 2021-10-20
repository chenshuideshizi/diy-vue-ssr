// 客户端的webpack配置
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

function resolve(pathName) {
  return path.resolve(__dirname, pathName)
}

module.exports = merge(commonConfig, {
  entry: '/src/entry-server.js',
  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，  
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: 'node',
  // 给node使用的代码要遵守commonjs规范，也就是将export default 转变为 module.exports, 配置 libraryTarget: 'commonjs2' 会将文件最终导出的结果，放到 module.exports上
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new VueSSRServerPlugin(),
    new HtmlWebpackPlugin({ // TODO: ？不知道为什么不会生成 html 文件
      filename: 'index.ssr.html',
      template: resolve('../public/index.ssr.html')
    })
  ]
})
