const Router = require('express-promise-router');
const router = new Router();

const { product } = require('../controllers');
const upload = require('../middleware/uploader.middleware');
const auth = require('../middleware/auth.middleware');

router.get('/:id', product.get);
router.get('/', auth, product.getAll);
router.post('/', upload.single('file'), product.create);
router.put('/:id', upload.single('file'), product.update);
router.delete('/:id', product.delete);

module.exports = router