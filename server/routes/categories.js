const Router = require('express-promise-router');
const router = new Router();

const { category } = require('../controllers');

router.get('/:id', category.get);
router.get('/', category.getAll);
router.post('/', category.create);
router.put('/:id', category.update);
router.delete('/:id', category.delete);

module.exports = router