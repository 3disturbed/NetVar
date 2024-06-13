const express = require('express');
const { register, confirmEmail, login, requestPasswordReset, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
