const Race = {
    HUMAN: { name: 'Human', passives: { extraSkillPoint: true } },
    ELF: { name: 'Elf', passives: { nightVision: true } },
    DWARF: { name: 'Dwarf', passives: { increasedStrength: true } },
    ORC: { name: 'Orc', passives: { berserkerRage: true } },
    HALFLING: { name: 'Halfling', passives: { luck: true } },
    GNOME: { name: 'Gnome', passive: { Engineering: true}},
    
};

module.exports = Race;
