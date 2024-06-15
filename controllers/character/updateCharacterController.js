const { updateCharacterName } = require('../../services/characterService');

const updateCharacter = (req, res) => {
    console.log('Updating character');
    const { id, name } = req.body;
    const updatedCharacter = updateCharacterName(id, name);
    res.status(200).json(updatedCharacter);
};

module.exports = updateCharacter;
