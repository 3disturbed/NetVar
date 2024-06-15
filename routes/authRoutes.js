const express = require('express');
const register = require('../controllers/registerController');
const confirmEmail = require('../controllers/confirmEmailController');
const login = require('../controllers/loginController');
const requestPasswordReset = require('../controllers/requestPasswordResetController');
const resetPassword = require('../controllers/resetPasswordController');

const router = express.Router();

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
