const { v4: uuidv4 } = require('uuid');
const { addCharacter } = require('../../services/characterService');

const createCharacter = (req, res) => {
    console.log('Creating character');
    const { accountId, name } = req.body;
    const character = { id: uuidv4(), accountId, name };
    addCharacter(character);
    res.status(200).json(character);
};

module.exports = createCharacter;
