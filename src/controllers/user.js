const auth = require('../middlewares/auth.js');
const config = require('../config');

const login=async (ctx)=>{
    const { username, password } = ctx.request.body;
    if(username==='admin'&&password==='1234'){
        let authConfig=config.auth;
        let token = auth.createToken({uid:1});
        ctx.cookies.set('authorization',`Bearer ${token}`,{
            maxAge:authConfig.jwt.exprisesIn*1000,
            path:'/',
            httpOnly:true
            // domain:'.baidu.com'
        });
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
