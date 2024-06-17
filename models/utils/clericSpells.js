const Spell = require('../spell');
const Stats = require('../enums/stats');

function createClericSpells(character) {
    if (character.class !== 'Cleric') {
        console.error('This character is not a Cleric.');
        return;
    }

    const clericSpells = [
        // Lesser Versions
        new Spell('Lesser Cure Wounds', 1, Stats.WISDOM, Stats.WISDOM, 3, -15, Stats.AGILITY, 1),
        new Spell('Lesser Sacred Flame', 1, Stats.WISDOM, Stats.INTELLIGENCE, 4, 10, Stats.AGILITY, 1),
        new Spell('Lesser Revive', 3, Stats.WISDOM, Stats.WISDOM, 15, 0, Stats.AGILITY, 7),

        // Regular Versions
        new Spell('Cure Wounds', 2, Stats.WISDOM, Stats.WISDOM, 5, -25, Stats.AGILITY, 2),
        new Spell('Sacred Flame', 3, Stats.WISDOM, Stats.INTELLIGENCE, 8, 20, Stats.AGILITY, 3),
        new Spell('Revive', 5, Stats.WISDOM, Stats.WISDOM, 20, 0, Stats.AGILITY, 10),
        
        // Greater Versions
        new Spell('Greater Cure Wounds', 6, Stats.WISDOM, Stats.WISDOM, 15, -75, Stats.AGILITY, 7),
        new Spell('Greater Sacred Flame', 6, Stats.WISDOM, Stats.INTELLIGENCE, 12, 40, Stats.AGILITY, 5),
        new Spell('Greater Revive', 8, Stats.WISDOM, Stats.WISDOM, 25, 0, Stats.AGILITY, 15),

        // Master Versions
        new Spell('Master Cure Wounds', 10, Stats.WISDOM, Stats.WISDOM, 20, -100, Stats.AGILITY, 10),
        new Spell('Master Sacred Flame', 10, Stats.WISDOM, Stats.INTELLIGENCE, 20, 60, Stats.AGILITY, 8),
        new Spell('Master Revive', 10, Stats.WISDOM, Stats.WISDOM, 30, 0, Stats.AGILITY, 20),

        // Other Spells
        new Spell('Bless', 1, Stats.WISDOM, Stats.WISDOM, 5, 0, Stats.AGILITY, 2),
        new Spell('Shield of Faith', 2, Stats.WISDOM, Stats.WISDOM, 6, 0, Stats.AGILITY, 3),
        new Spell('Healing Word', 1, Stats.WISDOM, Stats.WISDOM, 4, -10, Stats.AGILITY, 1),
        new Spell('Guiding Bolt', 2, Stats.WISDOM, Stats.INTELLIGENCE, 6, 15, Stats.AGILITY, 2),
        new Spell('Spiritual Weapon', 3, Stats.WISDOM, Stats.INTELLIGENCE, 8, 20, Stats.AGILITY, 3),
        new Spell('Prayer of Healing', 4, Stats.WISDOM, Stats.WISDOM, 15, -40, Stats.AGILITY, 8),
        new Spell('Spirit Guardians', 5, Stats.WISDOM, Stats.INTELLIGENCE, 18, 50, Stats.AGILITY, 10),
        new Spell('Divine Intervention', 10, Stats.WISDOM, Stats.WISDOM, 30, 0, Stats.AGILITY, 20),
        new Spell('Beacon of Hope', 3, Stats.WISDOM, Stats.WISDOM, 10, 0, Stats.AGILITY, 5),
        new Spell('Holy Aura', 8, Stats.WISDOM, Stats.WISDOM, 25, 0, Stats.AGILITY, 15),
        new Spell('Mass Cure Wounds', 7, Stats.WISDOM, Stats.WISDOM, 20, -60, Stats.AGILITY, 12),
        new Spell('Mass Healing Word', 6, Stats.WISDOM, Stats.WISDOM, 15, -50, Stats.AGILITY, 10),
        new Spell('Flame Strike', 5, Stats.WISDOM, Stats.INTELLIGENCE, 20, 40, Stats.AGILITY, 10),
        new Spell('Daylight', 3, Stats.WISDOM, Stats.WISDOM, 8, 0, Stats.AGILITY, 5),
        new Spell('Banishment', 4, Stats.WISDOM, Stats.WISDOM, 12, 0, Stats.AGILITY, 6),
        new Spell('Harm', 6, Stats.WISDOM, Stats.INTELLIGENCE, 18, 60, Stats.AGILITY, 10),
        new Spell('Heal', 6, Stats.WISDOM, Stats.WISDOM, 15, -70, Stats.AGILITY, 10),
        new Spell('Resurrection', 9, Stats.WISDOM, Stats.WISDOM, 25, 0, Stats.AGILITY, 15),
        new Spell('True Resurrection', 10, Stats.WISDOM, Stats.WISDOM, 30, 0, Stats.AGILITY, 20),
    ];

    clericSpells.forEach(spell => character.learnSpell(spell));
}

module.exports = { createClericSpells };
