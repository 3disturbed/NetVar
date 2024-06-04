const { v4: uuidv4 } = require('uuid');

class Character {
    constructor(accountId, name, level = 1, experience = 0) {
        this.id = uuidv4();
        this.accountId = accountId;
        this.name = name;
        this.level = level;
        this.experience = experience;
    }
}

module.exports = Character;
