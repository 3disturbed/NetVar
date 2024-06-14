const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let replicationServers = [];
let onlineUsers = [];
function DrawUI() {
    console.clear();
    
    console.log('----------------------------------------------');
    console.log('NetVar World Server. Online users:', onlineUsers.length);
    console.log('Replication servers:', replicationServers.length);
    console.log('----------------------------------------------');
}

app.post('/login', (req, res) => {
    
    console.log('Logging in user', req.body);
    // Check if user is already logged in
    
    onlineUsers.push(req.body);
    res.status(200).json({ message: 'User logged in' });
    DrawUI();

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
