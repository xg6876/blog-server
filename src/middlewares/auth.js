const jwt = require('jsonwebtoken');
const { auth: authConfig } = require('../config');
//Bearer 
const createToken = (data) => {
    let iat=Date.now();
    data.iat=iat
    data.exp=iat+authConfig.jwt.exprisesIn;
    return jwt.sign(data, authConfig.jwt.secret);
    // return jwt.sign(data, authConfig.jwt.secret, {
    //     expiresIn: authConfig.jwt.exprisesIn
    // });
}
const checkToken = async (ctx, next) => {
    const authorization = ctx.get('authorization') || ctx.cookies.get('authorization');
    if (!authorization) {
        ctx.throw(401, 'token invalid');
    }
    let token = authorization.split(' ')[1];
    let tokenContent;
    try {
        tokenContent = await jwt.verify(token, authConfig.jwt.secret);
    } catch (err) {
        // if ('TokenExpiredError' === err.name) {
        //     ctx.throw(401, 'token expired,请及时本地保存数据！');
        // }
        ctx.throw(401, 'token expired');
    }
    token = createToken(tokenContent);
    updateToken(ctx, token, authConfig);
    ctx.token = token;
    await next();
}
const updateToken = (ctx, token) => {
    if (typeof token !== 'string') {
        token = this.createToken(token)
    }
    ctx.cookies.set('authorization', `Bearer ${token}`, {
        maxAge: authConfig.jwt.exprisesIn * 1000,
        path: '/',
        httpOnly: true
    });
    return token
}

exports.createToken=createToken;
exports.checkToken=checkToken;
exports.updateToken=updateToken;
