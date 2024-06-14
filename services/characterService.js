const { getUsers } = require('../config/db');
const bcrypt = require('bcryptjs');
const Character = require('../models/characterModel');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
let characters = [];
var previousLength = 0;
const filePath = './game/characters/characters.json';


const loadCharacters = () => {
    // Load characters from a persistent storage if required
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        characters = JSON.parse(data);
    } else {
        console.log('No characters found. Creating new file.');
        fs.writeFileSync(filePath, '[]', { encoding: 'utf8', flag: 'w' });
    }
};

const saveCharacters = () => {
    const currentData = JSON.stringify(characters);
    fs.writeFileSync(filePath, currentData, { encoding: 'utf8', flag: 'w' });
};

const getCharactersByToken = (accountId) => {
    return characters.filter(character => character.accountId === accountId);
    
};

const addCharacter = (character) => {
    characters.push(character);
};

loadCharacters();

module.exports = {
    getCharactersByToken,
    addCharacter,
    saveCharacters
};
