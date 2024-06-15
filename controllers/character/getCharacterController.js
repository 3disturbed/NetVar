const { getCharactersByAccountId } = require('../../services/characterService');

const getCharacters = (req, res) => {
    console.log('Getting characters');
    const accountId = req.query.accountId;
    const characters = getCharactersByAccountId(accountId);
    res.status(200).json(characters);
};

module.exports = getCharacters;
