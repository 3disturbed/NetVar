class Spell {
    constructor(name, level = 1) {
        this.name = name;
        this.level = level;
    }

    cast(target) {
        console.log(`${this.name} is cast on ${target}`);
    }
}

module.exports = Spell;

