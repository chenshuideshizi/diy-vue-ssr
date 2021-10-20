const Koa = require('koa')
const fs = require('fs')
const staticMiddleware = require('koa-static')

const app = new Koa()

const { createBundleRenderer } = require('vue-server-renderer')

const template = fs.readFileSync("./public/index.ssr.html", "utf8")
const clientManifest = require("./dist/vue-ssr-client-manifest.json")
const serverBundle = require("./dist/vue-ssr-server-bundle.json")

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})

app.use(async (ctx, next) => {
  const context = { url: ctx.url }
  try {
    // 根据请求路径去返回给server-entry url路径
    ctx.body = await new Promise((resolve, reject) => {
      renderer.renderToString(context, (err, html) => {
        if (err) {
          resolve('Internal Server Error')
          return
        }
        resolve(html)
      })
    })
  } catch (err) {
    ctx.body = err.code
  }

  await next()
})

app.use(staticMiddleware('./dist'))

app.listen(3000, () => {
  console.log(`node serve run at port http://localhost:3000`)
})
