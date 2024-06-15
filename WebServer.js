const express = require('express');
const path = require('path');
// add body parser
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
// Use body-parser middleware
app.use(bodyParser.json()); // to parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // to parse application/x-www-form-urlencoded

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML5 game and forms
app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle /auth route by sending rest requests to AuthServer
app.use('/auth/', (req, res) => {
    console.log('Proxying request to AuthServer @', req.url);
    console.log('Request body:', req.body);

    const { method, url, headers, body } = req;

    const options = {
        hostname: '127.0.0.1',
        port: 3000,
        path: url,
        method,
        headers,
    };

    // Create a new request to AuthServer
    const proxy = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });

    // Handle errors on the proxy request
    proxy.on('error', (err) => {
        console.error('Error proxying request:', err);
        res.status(500).send('Proxy Error');
    });

    // Write the body to the proxy request
    if (body) {
        proxy.write(JSON.stringify(body));
    }

    req.pipe(proxy);

    console.log('Request proxied');
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`NetVar Web server is running on port ${PORT}`);
});
