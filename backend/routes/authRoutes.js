const express = require('express');
const router = express.Router();;

// Routes

const auth = require('../controllers/authController');

// Routes
router.get('/', auth.createToken);

router.get('/login/', auth.loginPage);

router.post('/check/', auth.checkLogin);

router.get('/logout/', auth.logout);

module.exports = router;