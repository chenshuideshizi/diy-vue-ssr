const Vue = require('vue')
const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')

const template = fs.readFileSync("./public/index.ssr.html", "utf8")
const clientManifest = require("./dist/vue-ssr-client-manifest.json")
const serverBundle = require("./dist/vue-ssr-server-bundle.json")
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})


server.get('*', (req, res) => {
  const context = { url: req.url }

  res.setHeader('Content-type','text/html;charset=utf-8')
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})

server.listen(8080, () => {
  console.log(`server is listen on http://localhost:8080`)
})