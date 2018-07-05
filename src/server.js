const path = require('path')
const Koa = require('koa')
const render = require('koa-art-template')
const serve = require('koa-static')
const router = require('./routes');
const bodyParser = require('koa-bodyparser');
const {reqLog} = require('./middlewares/log');
const {handlerError} = require('./middlewares/error');
//定义compose
// var compose = (...args) => x => args.reduceRight((value, item) => item(value), x);
// 命令式代码：命令“机器”如何去做事情(how)，这样不管你想要的是什么(what)，它都会按照你的命令实现。

// 声明式代码：告诉“机器”你想要的是什么(what)，让机器想出如何去做(how)。
const app = new Koa();


app.use(serve(path.join(__dirname, '../dist')));

render(app, {
  root: path.join(__dirname, '../dist/views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});


app.use(reqLog);
app.use(handlerError);
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000);
