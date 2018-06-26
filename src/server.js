const path = require('path')
const Koa = require('koa')
const render = require('koa-art-template')
const serve = require('koa-static')

const app = new Koa();

render(app, {
  root: path.join(__dirname, '../dist/views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

app.use(serve(path.join(__dirname, '../dist')));

app.use(async function (ctx) {
  await ctx.render('index');
});

app.listen(3000);