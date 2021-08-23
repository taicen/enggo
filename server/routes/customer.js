const Router = require('express-promise-router');
const router = new Router();
const { customer } = require('../controllers');
// const {check} = require('express-validator')

router.post('/generate', customer.generateRoom);
// router.post('/adduser', customer.addStudent);
router.post('/clearroom', customer.clearRoom);

// router.post('/signup', [
//   check('email', 'Некорректный email').isEmail(),
//   check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
// ], auth.signUp);

// router.post('/refresh', auth.refreshToken);
// router.post('/logout', auth.logout);

module.exports = router
