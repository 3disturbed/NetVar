const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let replicationServers = [];
let onlineUsers = [];

app.post('/login', (req, res) => {
    console.log("Logging in user", req.body);
});
app.post('/findReplicationServer', (req, res) => {
    const { token, characterId } = req.body;

    // Logic to find a replication server with a free slot
    const availableServer = replicationServers.find(server => server.hasFreeSlot());

    if (availableServer) {
        res.status(200).json({ replicationServerUrl: availableServer.url });
    } else {
        res.status(500).json({ message: 'No available replication servers' });
    }
});

app.post('/registerReplicationServer', (req, res) => {
    const { url } = req.body;
    replicationServers.push({ url, hasFreeSlot: () => true });
    res.status(200).json({ message: 'Replication server registered' });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`World server is running on port ${PORT}`);
});
