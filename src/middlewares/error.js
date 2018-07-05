exports.handlerError = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        let code = err.statusCode || 500;
        let msg = err.message;
        if (code === 500) {
            console.log(err.message);
            msg = '发生系统错误';
        }
        if(code===500){
            console.log('发生错误',err);
        }
        ctx.status = 200;
        if(ctx.path.indexOf('/api')===0){
            ctx.body = {
                code: code,
                msg: msg
            };
        }else{
            ctx.redirect('login');
        }
    }
};