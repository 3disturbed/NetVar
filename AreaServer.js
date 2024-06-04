const WebSocket = require('ws');
const axios = require('axios');

const worldServerUrl = 'http://localhost:4000';

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'init') {
            // Handle initial connection setup
            console.log(`User ${data.userId} connected`);
        }
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Area server is running on port ${PORT}`);
});

// Notify World Server about changes
const reportCharacterChange = (character) => {
    axios.post(`${worldServerUrl}/characterChange`, { character })
        .then(response => {
            console.log('Character change reported:', response.data.message);
        })
        .catch(error => {
            console.error('Error reporting character change:', error.message);
        });
};
