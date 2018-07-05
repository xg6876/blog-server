exports.reqLog = async (ctx, next) => {
    let start = new Date();
    await next();
    let ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms} ms`);
}