const fs = require('fs');


let characters = [];

const addCharacter = (character) => {
    characters.push(character);
};

const getCharactersByAccountId = (accountId) => {
    return characters.filter(character => character.accountId === accountId);
};

const deleteCharacterById = (id) => {
    characters = characters.filter(character => character.id !== id);
};

const updateCharacterName = (id, name) => {
    const character = characters.find(character => character.id === id);
    if (character) {
        character.name = name;
    }
    return character;
};

const saveCharactersToFile = (characters) => {
    const userFile = fs.createWriteStream('characters.json');
    userFile.write(JSON.stringify(characters));
    userFile.end();
};

module.exports = {
    addCharacter,
    getCharactersByAccountId,
    deleteCharacterById,
    updateCharacterName,
    saveCharactersToFile,
};
