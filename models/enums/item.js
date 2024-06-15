const { v4: uuidv4 } = require('uuid');

class Item {
    constructor(name, description) {
        this.id = uuidv4();
        this.name = name;
        this.description = description;
    }
}

module.exports = Item;
