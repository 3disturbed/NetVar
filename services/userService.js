const User = require('../models/userModel');
const { getUsers, setUsers } = require('../config/db');
const { sendEmail } = require('../config/email');
const jwt = require('jsonwebtoken');

const secret = 'NetVarSecret';

const getUserByEmail = (email) => {
    const users = getUsers();

    var userData = users.find(user => user.email === email);
    if (!userData) {
        return null;
    }
    var user = new User(userData.username, userData.email, userData.password, userData.isConfirmed);
    user.password = userData.password;
    user.id = userData.id;
    user.username = userData.username;
    user.email = userData.email;
    user.password = userData.password;
    user.isConfirmed = userData.isConfirmed;
    user.AuthLevel = userData.AuthLevel;
    return user;
};

const getUserByUsername = (username) => {
    const users = getUsers();
    
    var userData = users.find(user => user.username === username); 
    if (!userData)
        {
            return null;
        }
            var user = new User(userData.username, userData.email, userData.password, userData.isConfirmed);
            user.password = userData.password;
            user.id = userData.id;
            user.AuthLevel = userData.AuthLevel;
            return user;


};

const getUserById = (id) => {
    const users = getUsers();
    return users.find(user => user.id === id);
};

const addUser = (user) => {
    const users = getUsers();
    users.push(user);
    setUsers(users);
};

const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, email: user.email }, secret, { expiresIn: '1h' });
};

const sendConfirmationEmail = (user) => {
    const token = generateToken(user);
    const confirmationUrl = `http://localhost:5000/confirm/${token}`;
    return sendEmail(user.email, 'Confirm your email', `Click here to confirm your email: ${confirmationUrl}`);
};

const sendPasswordResetEmail = (user) => {
    const token = generateToken(user);
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    return sendEmail(user.email, 'Reset your password', `Click here to reset your password: ${resetUrl}`);
};

module.exports = {
    getUserByEmail,
    getUserByUsername,
    getUserById,
    addUser,
    generateToken,
    sendConfirmationEmail,
    sendPasswordResetEmail
};
