const Router = require('koa-router');
const auth = require('../middlewares/auth');
const user = require('../controllers/user');
const tag = require('../controllers/tag');


const router = new Router();

router.post('/login',user.login)

router.get('/tag',auth.checkToken,tag.getTag)
router.post('/tag',auth.checkToken,tag.addTag)
// router.delete('/tag',auth.checkToken,tag.delTag)

module.exports = router;
/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/