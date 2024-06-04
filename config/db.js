const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

let users = [];
let previousHash = '';

// Load users from file
const loadUsers = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        users = JSON.parse(data);
        previousHash = getHash(data); // Store initial state hash
    }
};

// Save users to file if there has been a change
const saveUsers = () => {
    const currentData = JSON.stringify(users);
    const currentHash = getHash(currentData);
    if (currentHash !== previousHash) {
        fs.writeFileSync(filePath, currentData, { encoding: 'utf8', flag: 'w' });
        previousHash = currentHash; // Update previous hash
        console.log('Users saved to file.');
    }
};

// Generate hash for given data
const getHash = (data) => {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
};

loadUsers();

setInterval(saveUsers, 5 * 60 * 1000); // Save every 5 minutes if there has been a change

process.on('exit', saveUsers);
process.on('SIGINT', () => {
    saveUsers();
    process.exit();
});

module.exports = {
    getUsers: () => users,
    setUsers: (newUsers) => {
        users = newUsers;
    }
};

