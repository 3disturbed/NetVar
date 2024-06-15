const { deleteCharacterById } = require('../services/characterService');

const deleteCharacter = (req, res) => {
    console.log('Deleting character');
    const { id } = req.body;
    deleteCharacterById(id);
    res.status(200).json({ message: 'Character deleted' });
};

module.exports = deleteCharacter;
