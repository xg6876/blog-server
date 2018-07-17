const Router = require('koa-router');
const auth = require('../middlewares/auth');
const tag = require('../controllers/tag');

const router = new Router();

router.get('/login',async (ctx)=>{
    await ctx.render(`admin/login`);
})

router.get('/articles',auth.checkToken,async (ctx)=>{
    let tags=await tag.getTag();
    await ctx.render(ctx.path.substr(1),{
        tags
    });
})

router.get('/tags',auth.checkToken,async (ctx)=>{
    let tags=await tag.getTag();
    await ctx.render(ctx.path.substr(1),{
        tags
    });
})

module.exports = router;