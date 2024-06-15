const { getUserByUsername, generateToken } = require('../../services/userService');
const fetch = require('node-fetch');
const characterServerUrl = 'http://localhost:6000';

const login = async (req, res) => {
    console.log('Logging in user', req.body);
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user || !user.checkPassword(password)) {
        console.log('Invalid credentials', req.body);
        return res.status(401).json({ message: 'Invalid credentials!' });
    }

    if (!user.isConfirmed) {
        console.log('Email not confirmed', req.body);
        return res.status(403).json({ message: 'Email not confirmed' });
    }

    const token = generateToken(user);

    try {
        // Notify Character Server of login
        await fetch(`${characterServerUrl}/GetCharacters`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        console.log('Notified Character Server of login');
    } catch (error) {
        return res.status(500).json({ message: 'Error contacting World Server', error: error.message });
    }

    res.status(200).json({ token, id: user.id });
};

module.exports = login;
