const express = require('express');
const register = require('../controllers/auth/registerController');
const confirmEmail = require('../controllers/auth/confirmEmailController');
const login = require('../controllers/auth/loginController');
const requestPasswordReset = require('../controllers/auth/requestPasswordResetController');
const resetPassword = require('../controllers/auth/resetPasswordController');

const router = express.Router();

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
