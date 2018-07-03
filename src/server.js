const path = require('path')
const Koa = require('koa')
const render = require('koa-art-template')
const serve = require('koa-static')
const router = require('./routes');
const bodyParser = require('koa-bodyparser');


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
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let code=err.statusCode||500;
    let msg=err.message;
    if(code===500){
      console.log(err.message);
      msg='发生系统错误';
    }
    ctx.status=200;
    ctx.body = {
      code: code,
      msg: msg
    };
  }
};

//输出请求的方法，url,和所花费的时间
app.use(async (ctx, next) => {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms} ms`);
});
app.use(handler);
app.use(bodyParser());

//使用路由中间件
app.use(router.routes()).use(router.allowedMethods());



app.listen(3000);
