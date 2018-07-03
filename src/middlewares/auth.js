const jwt = require('jsonwebtoken');
const config = require('../config');
//Bearer 
const auth = {
    createToken(data) {
        let authConfig=config.auth;
        return jwt.sign(data, authConfig.jwt.secret, {
            expiresIn: authConfig.jwt.exprisesIn
        });
    },
    async checkToken(ctx, next) {
        const authorization = ctx.get('authorization')||ctx.cookies.get('authorization');
        if (authorization === '') {
            ctx.throw(401, 'token invalid');
        }
        const token = authorization.split(' ')[1];
        let tokenContent;
        try {
            tokenContent = await jwt.verify(token, config.auth.jwt.secret);
        } catch (err) {
            if ('TokenExpiredError' === err.name) {
                ctx.throw(401, 'token expired,请及时本地保存数据！');
            }
            ctx.throw(401, 'token expired');
        }
        ctx.token = tokenContent;
        await next();
    }
}

module.exports = auth;
