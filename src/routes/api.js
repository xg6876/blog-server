const Router = require('koa-router');
const user = require('../controllers/user');
const auth = require('../middlewares/auth');


const router = new Router();

router.post('/login',user.login)


module.exports = router;
/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/