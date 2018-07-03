const router = require('koa-router')();

const api = require('./api');
const admin = require('./admin');

router.use('/api', api.routes(), api.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());

module.exports = router;