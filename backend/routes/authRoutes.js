const express = require('express');
const router = express.Router();;

const auth = require('../controllers/authController');

// Routes
router.get('/', auth.createToken);

router.get('/:token/', auth.createToken);

router.get('/login/:token/', auth.loginPage);

router.get('/loadUser/:token', auth.loadUser);

router.post('/check/:token/', auth.checkLogin);

router.get('/logout/:token/', auth.logout);


module.exports = router;