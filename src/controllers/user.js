const db=require('../db');
const {updateToken} = require('../middlewares/auth');


const login=async (ctx)=>{
    const { username, password } = ctx.request.body;
    let result = await db.users.find({username,password});
    if(result.length){
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
