const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const WebSocket = require('ws');

const app = express();
app.use(bodyParser.json());

const worldServerUrl = 'http://localhost:4000';

app.post('/selectCharacter', async (req, res) => {
    const { token, characterId } = req.body;

    try {
        // Ask the WorldServer for an available ReplicationServer
        const response = await axios.post(`${worldServerUrl}/findReplicationServer`, { token, characterId });
        const replicationServerUrl = response.data.replicationServerUrl;

        res.status(200).json({ replicationServerUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to World Server', error: error.message });
    }
});

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Relay server is running on port ${PORT}`);
});
