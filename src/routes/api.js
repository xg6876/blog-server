const Router = require('koa-router');
const auth = require('../middlewares/auth');
const user = require('../controllers/user');
const tag = require('../controllers/tag');
const article = require('../controllers/article');

const router = new Router();

router.post('/login',user.login)

router.get('/tag',auth.checkToken,tag.getTag)
router.post('/tag',auth.checkToken,tag.addTag)
router.delete('/tag',auth.checkToken,tag.delTag)

router.get('/articles',auth.checkToken,article.getArticles)
router.get('/articles/:id',auth.checkToken,article.getArticle)
router.post('/articles',auth.checkToken,article.addArticle)
router.put('/articles',auth.checkToken,article.updateArticle)

module.exports = router;
/* HTTP动词
    GET     //查询
    POST    //新建
    PUT     //替换
    PATCH   //更新部分属性
    DELETE  //删除指定ID的文档
*/