const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/signup', authController.postSignup);

router.get('/signup', authController.getSignup);

module.exports = router;
