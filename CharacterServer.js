const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const { getUserById } = require('./services/userService');
const { getCharactersByAccountId } = require('./services/characterService');
const { v4: uuidv4 } = require('uuid');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'getCharacters') {
                const decoded = jwt.verify(data.token, 'your_jwt_secret');
                const user = getUserById(decoded.id);

                if (user) {
                    const characters = getCharactersByAccountId(user.id);
                    ws.send(JSON.stringify({ type: 'characters', characters }));
                } else {
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid token' }));
                }
            } else {
                ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
            }
        } catch (error) {
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid token' }));
        }
    });
});

console.log('Character server is running on port 8080');
