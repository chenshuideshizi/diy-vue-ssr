const path = require("path");
const { VueLoaderPlugin } = require('vue-loader')

const resolve = dir => {
  return path.resolve(__dirname, dir);
};

module.exports = {
  output: {
    filename: "[name].bundle.js",
    path: resolve("../dist")
  },
  resolve: {
    // 引用文件的时候扩展名的寻找顺序
    extensions: [".js", ".vue"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        // 注意： ssr 中使用的 vue-style-loader, vue项目中使用的 style-loader,效果相同，只是前者支持服务端渲染
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
