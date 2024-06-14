const jwt = require('jsonwebtoken');
const { getUserById } = require('./services/userService');
const { getCharactersByAccountId } = require('./services/characterService');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// rest server for character changes
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let characters = [];

app.post('/create', (req, res) => {
    console.log('Creating character');
    const { accountId, name } = req.body;
    const character = { id: uuidv4(), accountId, name };
    characters.push(character);
    res.status(200).json(character);
});

app.get('/getCharacters', (req, res) => {
    console.log('Getting characters');
    const accountId = req.query.accountId;
    const characters = getCharactersByAccountId(accountId);
    res.status(200).json(characters);
});

app.post('/delete', (req, res) => {
    console.log('Deleting character');
    const { id } = req.body;
    characters = characters.filter(character => character.id !== id);
    res.status(200).json({ message: 'Character deleted' });
});

app.post('/update', (req, res) => {
    console.log('Updating character');
    const { id, name } = req.body;
    const character = characters.find(character => character.id === id);
    character.name = name;
    res.status(200).json(character);
});

// login 
app.post('/login', async (req, res) => {
    console.log('Logging in user');
    const { token } = req.body;
    const decoded = jwt.verify(token, 'NetVarSecret');
    const user = await getUserById(decoded.id);
    const characters = getCharactersByAccountId(user.id);
    res.status(200).json({ user, characters });
});

function DrawUI() {
    console.clear();
    console.log('----------------------------------------------');
    console.log('NetVar Character Server. Characters:', characters.length);
    console.log('----------------------------------------------');
}

function SaveCharacters() {
    console.log('Saving characters');
    // Save characters to a file in json format
    const userFile = fs.createWriteStream('characters.json');
    userFile.write(JSON.stringify(characters));
    userFile.end();
    console.log('Characters saved');



}
const PORT = 6000;
app.listen(PORT);
console.log(`Character server is running on port ${PORT}`);





console.log('Character server is running on port 8080');
