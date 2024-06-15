const { v4: uuidv4 } = require('uuid');
const Class = require('./enums/class');
const Alignment = require('./enums/alignment');
const Race = require('./enums/race');
const Skills = require('./enums/skills');
const Stats = require('./enums/stats');
const Spell = require('./spell');
const Item = require('./item');

class Character {
    constructor(accountId, name, charClass, race, alignment, level = 1, experience = 0) {
        this.id = uuidv4();
        this.accountId = accountId;
        this.name = name;
        this.level = level;
        this.experience = experience;
        this.class = charClass;
        this.race = race;
        this.alignment = alignment;
        this.skills = this.initializeSkills();
        this.spells = [];
        this.inventory = [];
        this.passives = this.initializePassives();
        this.stats = this.initializeStats();
        this.availableSkillPoints = 5;  // Starting skill points
        this.availableStatPoints = 5;   // Starting stat points
    }

    // Initialize skills based on character class
    initializeSkills() {
        const skills = {};
        for (const skill in Skills) {
            skills[Skills[skill]] = 0;
        }
        
        switch (this.class) {
            case Class.WARRIOR:
                skills[Skills.SWORDSMANSHIP] = 10;
                break;
            case Class.MAGE:
                skills[Skills.MAGIC] = 10;
                break;
            case Class.ROGUE:
                skills[Skills.STEALTH] = 10;
                break;
            case Class.PRIEST:
                skills[Skills.HEALING] = 10;
                break;
            case Class.HUNTER:
                skills[Skills.ARCHERY] = 10;
                break;
            // Add additional initializations for other classes if needed
        }

        if (this.race.passives.extraSkillPoint) {
            this.availableSkillPoints += 1;
        }

        return skills;
    }

    // Initialize passive abilities based on race
    initializePassives() {
        return this.race.passives;
    }

    // Initialize primary stats
    initializeStats() {
        const stats = {};
        for (const stat in Stats) {
            stats[Stats[stat]] = 10; // Base value, can be customized
        }

        switch (this.race.name) {
            case 'Human':
                stats[Stats.CHARISMA] += 2;
                break;
            case 'Elf':
                stats[Stats.DEXTERITY] += 2;
                break;
            case 'Dwarf':
                stats[Stats.CONSTITUTION] += 2;
                break;
            case 'Orc':
                stats[Stats.STRENGTH] += 2;
                break;
            case 'Halfling':
                stats[Stats.LUCK] += 2;
                break;
            // Add additional initializations for other races if needed
        }

        return stats;
    }

    // Add a spell to the character's spell list
    learnSpell(spell) {
        if (spell instanceof Spell) {
            this.spells.push(spell);
            console.log(`${this.name} has learned the spell ${spell.name}`);
        } else {
            console.error('Invalid spell');
        }
    }

    // Add an item to the character's inventory
    addItem(item) {
        if (item instanceof Item) {
            this.inventory.push(item);
            console.log(`${this.name} has obtained ${item.name}`);
        } else {
            console.error('Invalid item');
        }
    }

    // Method to cast a spell
    castSpell(spellName, target) {
        const spell = this.spells.find(s => s.name === spellName);
        if (spell) {
            spell.cast(target);
        } else {
            console.error(`${this.name} doesn't know the spell ${spellName}`);
        }
    }

    // Gain experience and level up if applicable
    gainExperience(amount) {
        this.experience += amount;
        console.log(`${this.name} has gained ${amount} experience points`);

        const levelUpExperience = this.level * 100; // Example level up threshold
        while (this.experience >= levelUpExperience) {
            this.experience -= levelUpExperience;
            this.levelUp();
        }
    }

    // Level up the character
    levelUp() {
        this.level += 1;
        console.log(`${this.name} has leveled up to level ${this.level}!`);

        // Example skill increase on level up
        for (const skill in this.skills) {
            this.skills[skill] += 1;
        }

        // Example stat increase on level up
        for (const stat in this.stats) {
            this.stats[stat] += 1;
        }

        this.availableSkillPoints += 1;  // Award an extra skill point on level up
        this.availableStatPoints += 1;    // Award an extra stat point on level up
    }

    // Spend skill points
    spendSkillPoint(skillName) {
        if (this.availableSkillPoints > 0 && this.skills.hasOwnProperty(skillName)) {
            this.skills[skillName] += 1;
            this.availableSkillPoints -= 1;
            console.log(`${this.name} has spent a skill point on ${skillName}.`);
        } else {
            console.error(`Cannot spend skill point on ${skillName}.`);
        }
    }

    // Spend stat points
    spendStatPoint(statName) {
        if (this.availableStatPoints > 0 && this.stats.hasOwnProperty(statName)) {
            this.stats[statName] += 1;
            this.availableStatPoints -= 1;
            console.log(`${this.name} has spent a stat point on ${statName}.`);
        } else {
            console.error(`Cannot spend stat point on ${statName}.`);
        }
    }
}

module.exports = Character;
