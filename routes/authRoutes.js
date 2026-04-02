const router = require('express').Router();
const { user_login } = require('../controllers/authController');

router.post('/login', user_login);

module.exports = router;