const router = require('express').Router();
const { create_user } = require('../controllers/userController');

router.post('/add-user', create_user);

module.exports = router;