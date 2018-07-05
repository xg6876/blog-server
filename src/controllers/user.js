const {updateToken} = require('../middlewares/auth');
const {auth:authConfig} = require('../config');

const login=async (ctx)=>{
    const { username, password } = ctx.request.body;
    if(username==='admin'&&password==='1234'){
        let token = updateToken(ctx,{uid:1});
        return ctx.body={
            code:200,
            data: {
                uid: 1,
                username: 'admin',
                token
            }
        };
    }else{
        ctx.throw(401, '用户名或密码不正确!');
    }
}

module.exports={
    login
}
