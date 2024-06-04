const WebSocket = require('ws');
const axios = require('axios');

const worldServerUrl = 'http://localhost:4000';

const wss = new WebSocket.Server({ port: 7000 });

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

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Replication server is running on port ${PORT}`);
});

// Register with the World Server
axios.post(`${worldServerUrl}/registerReplicationServer`, { url: `ws://localhost:${PORT}` })
    .then(response => {
        console.log('Registered with World Server:', response.data.message);
    })
    .catch(error => {
        console.error('Error registering with World Server:', error.message);
    });
