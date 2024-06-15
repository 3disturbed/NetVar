const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByEmail } = require('../services/userService');
const fs = require('fs');

const secretFile = fs.readFileSync('secret.txt', 'utf8');
const secret = secretFile.trim();

const resetPassword = async (req, res) => {
    console.log('Resetting password', req.body);
    const token = req.params.token;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, secret);
        const user = await getUserByEmail(decoded.email);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.password = bcrypt.hashSync(password, 10);
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = resetPassword;
