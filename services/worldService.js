const WebSocket = require('ws');

const worldServerUrl = 'ws://world-server-address:port';
let ws;

const connect = () => {
    ws = new WebSocket(worldServerUrl);

    ws.on('open', () => {
        console.log('Connected to world server');
    });

    ws.on('close', () => {
        console.log('Disconnected from world server');
        setTimeout(connect, 1000); // Reconnect after 1 second
    });

    ws.on('message', (message) => {
        console.log('Received:', message);
    });
};

const sendToken = (token) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'login', token }));
    } else {
        console.log('World server is not connected');
    }
};

const sendUserId = (id) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'login', id }));
    } else {
        console.log('World server is not connected');
    }
};

connect();

module.exports = { sendToken, sendUserId };
