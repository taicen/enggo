const Router = require('express-promise-router');
const router = new Router();

const { sync } = require('../controllers');

router.post('/', sync.fetchProduct);

module.exports = router