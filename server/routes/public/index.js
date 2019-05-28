const R = require('koa-router')
const Router = new R()
const {startupPage} = require('client/marko/pages')

Router.get(
  '/',
  ctx => startupPage(ctx)
)

module.exports = Router
