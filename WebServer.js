const express = require('express');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML5 game and forms
app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle /auth route by sending rest requests to AuthServer
app.use('/auth/', (req, res) => {
    console.log('Proxying request to AuthServer');
    const http = require('http');
    console.log('Proxying request to AuthServer');
    const { method, url, headers } = req;
    const options = {
        hostname: 'localhost',
        port: 3000,
        method,
        headers,
    };
    console.log(options);

    // Create a new request to AuthServer
    const proxy = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });

    req.pipe(proxy);
    console.log('Request proxied');

});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`NetVar Web server is running on port ${PORT}`);
});
