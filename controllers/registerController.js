const { getUserByEmail, getUserByUsername, addUser, sendConfirmationEmail } = require('../services/userService');
const User = require('../models/userModel');

const register = async (req, res) => {
    console.log('Registering user', req.body);
    const { username, email, password } = req.body;

    if (await getUserByUsername(username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    if (await getUserByEmail(email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User(username, email, password);
    await addUser(newUser);

    await sendConfirmationEmail(newUser);

    res.status(201).json({ message: 'User registered. Please check your email to confirm.', id: newUser.id });
};

module.exports = register;
