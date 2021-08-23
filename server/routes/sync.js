const Router = require('express-promise-router');
const router = new Router();

const { sync } = require('../controllers');

router.post('/', sync.auth);
router.post('/teacher', sync.teacher);

module.exports = router
