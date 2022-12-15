const router = require('express').Router();
const users = require('./users');
const recipes = require('./recipes');
const likes = require('./likes');
const saves = require('./saves');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/recipes', recipes);
router.use('/likes', likes);
router.use('/saves', saves);
router.use('/test', test);

module.exports = router;
