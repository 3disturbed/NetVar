const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../../services/userService');
const fs = require('fs');

const secretFile = fs.readFileSync('secret.txt', 'utf8');
const secret = secretFile.trim();

const confirmEmail = (req, res) => {
    console.log('Confirming email', req.params.token);
    const token = req.params.token;

    try {
        const decoded = jwt.verify(token, secret);
        const user = getUserByEmail(decoded.email);

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        user.isConfirmed = true;
        res.status(200).json({ message: 'Email confirmed. You can now log in.' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = confirmEmail;
