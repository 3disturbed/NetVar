const Spell = require('../spell');
const Stats = require('../enums/stats');

function createPriestSpells(character) {
    if (character.class !== 'Priest') {
        console.error('This character is not a Priest.');
        return;
    }

    const priestSpells = [
        // Lesser Versions
        new Spell('Lesser Heal', 1, Stats.WISDOM, Stats.WISDOM, 3, -15, Stats.AGILITY, 1),
        new Spell('Lesser Holy Smite', 1, Stats.WISDOM, Stats.INTELLIGENCE, 4, 10, Stats.AGILITY, 1),
        new Spell('Lesser Resurrection', 3, Stats.WISDOM, Stats.WISDOM, 15, 0, Stats.AGILITY, 7),

        // Regular Versions
        new Spell('Heal', 2, Stats.WISDOM, Stats.WISDOM, 5, -25, Stats.AGILITY, 2),
        new Spell('Holy Smite', 3, Stats.WISDOM, Stats.INTELLIGENCE, 8, 20, Stats.AGILITY, 3),
        new Spell('Resurrection', 5, Stats.WISDOM, Stats.WISDOM, 20, 0, Stats.AGILITY, 10),
        
        // Greater Versions
        new Spell('Greater Heal', 6, Stats.WISDOM, Stats.WISDOM, 15, -75, Stats.AGILITY, 7),
        new Spell('Greater Holy Smite', 6, Stats.WISDOM, Stats.INTELLIGENCE, 12, 40, Stats.AGILITY, 5),
        new Spell('Greater Resurrection', 8, Stats.WISDOM, Stats.WISDOM, 25, 0, Stats.AGILITY, 15),

        // Master Versions
        new Spell('Master Heal', 10, Stats.WISDOM, Stats.WISDOM, 20, -100, Stats.AGILITY, 10),
        new Spell('Master Holy Smite', 10, Stats.WISDOM, Stats.INTELLIGENCE, 20, 60, Stats.AGILITY, 8),
        new Spell('Master Resurrection', 10, Stats.WISDOM, Stats.WISDOM, 30, 0, Stats.AGILITY, 20),

        // Other Spells
        new Spell('Divine Shield', 5, Stats.WISDOM, Stats.WISDOM, 12, 0, Stats.AGILITY, 6),
        new Spell('Renew', 2, Stats.WISDOM, Stats.WISDOM, 6, -15, Stats.AGILITY, 4),
        new Spell('Prayer of Healing', 4, Stats.WISDOM, Stats.WISDOM, 15, -40, Stats.AGILITY, 8),
        new Spell('Mind Blast', 2, Stats.WISDOM, Stats.INTELLIGENCE, 6, 15, Stats.AGILITY, 3),
        new Spell('Shadow Word: Pain', 1, Stats.WISDOM, Stats.INTELLIGENCE, 4, 10, Stats.AGILITY, 2),
        new Spell('Holy Fire', 4, Stats.WISDOM, Stats.INTELLIGENCE, 15, 40, Stats.AGILITY, 6),
        new Spell('Dispel Magic', 2, Stats.WISDOM, Stats.WISDOM, 6, 0, Stats.AGILITY, 3),
        new Spell('Power Word: Shield', 3, Stats.WISDOM, Stats.WISDOM, 10, 0, Stats.AGILITY, 5),
        new Spell('Mass Dispel', 5, Stats.WISDOM, Stats.WISDOM, 18, 0, Stats.AGILITY, 10),
        new Spell('Flash Heal', 2, Stats.WISDOM, Stats.WISDOM, 6, -20, Stats.AGILITY, 3),
        new Spell('Holy Nova', 3, Stats.WISDOM, Stats.INTELLIGENCE, 12, 20, Stats.AGILITY, 5),
        new Spell('Holy Wrath', 5, Stats.WISDOM, Stats.INTELLIGENCE, 20, 50, Stats.AGILITY, 10),
        new Spell('Divine Hymn', 5, Stats.WISDOM, Stats.WISDOM, 25, -60, Stats.AGILITY, 12),
        new Spell('Shadow Mend', 4, Stats.WISDOM, Stats.INTELLIGENCE, 15, -35, Stats.AGILITY, 7),
        new Spell('Lightwell', 4, Stats.WISDOM, Stats.WISDOM, 18, -30, Stats.AGILITY, 8),
        new Spell('Leap of Faith', 3, Stats.WISDOM, Stats.WISDOM, 10, 0, Stats.AGILITY, 5),
        new Spell('Power Word: Fortitude', 1, Stats.WISDOM, Stats.WISDOM, 5, 0, Stats.AGILITY, 2),
        new Spell('Spirit of Redemption', 5, Stats.WISDOM, Stats.WISDOM, 20, 0, Stats.AGILITY, 10),
        new Spell('Light of T’uure', 4, Stats.WISDOM, Stats.WISDOM, 15, -45, Stats.AGILITY, 8),
        new Spell('Power Infusion', 4, Stats.WISDOM, Stats.WISDOM, 15, 0, Stats.AGILITY, 8),
        new Spell('Purify', 2, Stats.WISDOM, Stats.WISDOM, 5, 0, Stats.AGILITY, 3),
        new Spell('Vampiric Embrace', 3, Stats.WISDOM, Stats.INTELLIGENCE, 12, 0, Stats.AGILITY, 5),
        new Spell('Guardian Spirit', 5, Stats.WISDOM, Stats.WISDOM, 25, 0, Stats.AGILITY, 12),
        new Spell('Shackle Undead', 2, Stats.WISDOM, Stats.INTELLIGENCE, 8, 0, Stats.AGILITY, 4),
        new Spell('Holy Word: Serenity', 4, Stats.WISDOM, Stats.WISDOM, 20, -50, Stats.AGILITY, 8),
        new Spell('Holy Word: Sanctify', 5, Stats.WISDOM, Stats.WISDOM, 25, -55, Stats.AGILITY, 10),
        new Spell('Desperate Prayer', 2, Stats.WISDOM, Stats.WISDOM, 10, -30, Stats.AGILITY, 4),
        new Spell('Smite', 1, Stats.WISDOM, Stats.INTELLIGENCE, 5, 15, Stats.AGILITY, 2),
        new Spell('Binding Heal', 3, Stats.WISDOM, Stats.WISDOM, 12, -35, Stats.AGILITY, 6),
        new Spell('Mind Sear', 3, Stats.WISDOM, Stats.INTELLIGENCE, 15, 40, Stats.AGILITY, 7),
    ];

    priestSpells.forEach(spell => character.learnSpell(spell));
}