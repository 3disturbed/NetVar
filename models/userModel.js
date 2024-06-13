const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class User {
    constructor(username, email, password, isConfirmed = false) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.password = bcrypt.hashSync(password, 10);
        this.isConfirmed = isConfirmed;
        this.AuthLevel = 0;
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = User;
