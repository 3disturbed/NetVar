const axios = require('axios');
const { getUserByEmail, getUserByUsername, addUser, generateToken, sendConfirmationEmail, sendPasswordResetEmail } = require('../services/userService');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = 'NetVarSecret';
const worldServerUrl = 'http://localhost:4000';
const characterServerUrl = 'http://localhost:6000';

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
        await fetch(`${characterServerUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });

    } catch (error) {
        return res.status(500).json({ message: 'Error contacting World Server', error: error.message });
    }

    res.status(200).json({ token, id: user.id });
};

const requestPasswordReset = async (req, res) => {
    console.log('Requesting password reset', req.body);
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await sendPasswordResetEmail(user);

    res.status(200).json({ message: 'Password reset email sent' });
};

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

module.exports = {
    register,
    confirmEmail,
    login,
    requestPasswordReset,
    resetPassword
};
