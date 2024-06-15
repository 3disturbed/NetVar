const express = require('express');
const createCharacter = require('../controllers/character/createCharacterController');
const getCharacters = require('../controllers/character/getCharactersController');
const deleteCharacter = require('../controllers/character/deleteCharacterController');
const updateCharacter = require('../controllers/character/updateCharacterController');


const router = express.Router();

router.post('/create', createCharacter);
router.get('/GetCharacters', getCharacters);
router.post('/delete', deleteCharacter);
router.post('/update', updateCharacter);


module.exports = router;
