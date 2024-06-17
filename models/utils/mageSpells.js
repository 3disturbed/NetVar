const Spell = require('../spell');
const Stats = require('../enums/stats');

function createMageSpells(character) {
    if (character.class !== 'Mage') {
        console.error('This character is not a Mage.');
        return;
    }

    const mageSpells = [[9[9-9]]
        new Spell('Fireball', 3, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 10, 30, Stats.AGILITY, 5),
        new Spell('Ice Lance', 2, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 8, 20, Stats.AGILITY, 3),
        new Spell('Arcane Blast', 1, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 5, 15, Stats.AGILITY, 2),
        new Spell('Frost Nova', 2, Stats.INTELLIGENCE, Stats.WISDOM, 12, 10, Stats.AGILITY, 6),
        new Spell('Pyroblast', 4, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 15, 50, Stats.AGILITY, 8),
        new Spell('Magic Missile', 1, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 5, 10, Stats.AGILITY, 2),
        new Spell('Teleport', 3, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 20, 0, Stats.AGILITY, 10),
        new Spell('Mana Shield', 2, Stats.INTELLIGENCE, Stats.WISDOM, 10, 0, Stats.AGILITY, 5),
        new Spell('Polymorph', 3, Stats.INTELLIGENCE, Stats.WISDOM, 12, 0, Stats.AGILITY, 6),
        new Spell('Meteor', 5, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 25, 60, Stats.AGILITY, 12),
        new Spell('Chain Lightning', 4, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 18, 35, Stats.AGILITY, 7),
        new Spell('Summon Elemental', 5, Stats.INTELLIGENCE, Stats.WISDOM, 30, 0, Stats.AGILITY, 15),
        new Spell('Arcane Explosion', 3, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 12, 25, Stats.AGILITY, 5),
        new Spell('Invisibility', 4, Stats.INTELLIGENCE, Stats.WISDOM, 25, 0, Stats.AGILITY, 10),
        new Spell('Flame Strike', 4, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 20, 45, Stats.AGILITY, 8),
        new Spell('Blizzard', 5, Stats.INTELLIGENCE, Stats.WISDOM, 30, 50, Stats.AGILITY, 12),
        new Spell('Mind Control', 5, Stats.INTELLIGENCE, Stats.WISDOM, 35, 0, Stats.AGILITY, 15),
        new Spell('Arcane Intellect', 1, Stats.INTELLIGENCE, Stats.WISDOM, 5, 0, Stats.AGILITY, 2),
        new Spell('Counterspell', 3, Stats.INTELLIGENCE, Stats.WISDOM, 10, 0, Stats.AGILITY, 5),
        new Spell('Mirror Image', 4, Stats.INTELLIGENCE, Stats.WISDOM, 20, 0, Stats.AGILITY, 10),
        new Spell('Cone of Cold', 2, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 12, 20, Stats.AGILITY, 6),
        new Spell('Scorch', 1, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 5, 10, Stats.AGILITY, 2),
        new Spell('Slow', 2, Stats.INTELLIGENCE, Stats.WISDOM, 8, 0, Stats.AGILITY, 4),
        new Spell('Firestorm', 5, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 28, 55, Stats.AGILITY, 10),
        new Spell('Lightning Bolt', 2, Stats.INTELLIGENCE, Stats.INTELLIGENCE, 10, 25, Stats.AGILITY, 4),
    ];

    mageSpells.forEach(spell => character.learnSpell(spell));
}

module.exports = { createMageSpells };