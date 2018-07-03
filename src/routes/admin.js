const Router = require('koa-router');
const auth = require('../middlewares/auth.js');

const router = new Router();

router.get('/login',async (ctx)=>{
    await ctx.render(`admin/login`);
})

router.get('/articles',auth.checkToken,async (ctx)=>{
    await ctx.render(`admin/articles`);
})

module.exports = router;