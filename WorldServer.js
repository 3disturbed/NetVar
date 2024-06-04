const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const characterServerUrl = 'ws://localhost:8080';

app.post('/login', async (req, res) => {
    const { token } = req.body;

    try {
        const characterWs = new WebSocket(characterServerUrl);

        characterWs.on('open', () => {
            characterWs.send(JSON.stringify({ type: 'getCharacters', token }));
        });

        characterWs.on('message', (message) => {
            const data = JSON.parse(message);

            if (data.type === 'characters') {
                res.status(200).json(data.characters);
                characterWs.close();
            } else if (data.type === 'error') {
                res.status(400).json({ message: data.message });
                characterWs.close();
            }
        });

        characterWs.on('error', (err) => {
            res.status(500).json({ message: 'Error connecting to Character Server', error: err.message });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`World server is running on port ${PORT}`);
});
