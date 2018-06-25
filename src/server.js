const path = require('path')
const Koa = require('koa')
const render = require('koa-art-template')
const serve = require('koa-static')

const app = new Koa();

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

app.use(serve(path.join(__dirname, 'views')));

app.use(async function (ctx) {
  await ctx.render('main');
});

app.listen(7788);