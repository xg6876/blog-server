const path = require('path')
const Koa = require('koa')
const render = require('koa-art-template')
const serve = require('koa-static')


const app = new Koa();


app.use(serve(path.join(__dirname, '../dist')));

render(app, {
  root: path.join(__dirname, '../dist/views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});



app.use(async function (ctx) {
  await ctx.render('admin/articles');
});

app.listen(3000);
