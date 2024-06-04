const { getUsers } = require('../config/db');
const Character = require('../models/characterModel');

let characters = [];

const loadCharacters = () => {
    // Load characters from a persistent storage if required
};

const saveCharacters = () => {
    // Save characters to a persistent storage if required
};

const getCharactersByAccountId = (accountId) => {
    return characters.filter(character => character.accountId === accountId);
};

const addCharacter = (character) => {
    characters.push(character);
};

loadCharacters();

module.exports = {
    getCharactersByAccountId,
    addCharacter,
    saveCharacters
};
