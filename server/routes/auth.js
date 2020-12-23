const Router = require('express-promise-router');
const router = new Router();
const { auth } = require('../controllers');
const {check} = require('express-validator')

router.post('/login', [
  check('email', 'Введите корректный email').normalizeEmail().isEmail(),
  check('password', 'Введите пароль').exists()
], auth.login);

router.post('/signup', [
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
], auth.signUp);

router.post('/refresh', auth.refreshToken);
router.post('/logout', auth.logout);

module.exports = router