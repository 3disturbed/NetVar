class Spell {
    constructor(name, level, successStat, damageStat, manaCost, damage, hitStat, cooldown) {
        this.name = name;
        this.level = level;
        this.successStat = successStat;
        this.damageStat = damageStat;
        this.manaCost = manaCost;
        this.damage = damage;
        this.hitStat = hitStat;
        this.cooldown = cooldown;
    }

    cast(target) {
        console.log(`${this.name} is cast on ${target}`);
    }
}

module.exports = Spell;