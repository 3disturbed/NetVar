// Purpose: Serve static files and proxy requests to AuthServer and CharacterServer

// 1. Import the required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

// 2. Create an Express app
const app = express();

// 3. Middleware
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// 4. Server metrics
let RequestCount = 0;
let ServerStartTime = Date.now();
let PagesServed = 0;

// 5. Draw the UI
function DrawUI() {
    console.clear();
    console.log('NetVar Web Server start time:', new Date(ServerStartTime).toLocaleTimeString(), ' Requests:', RequestCount, ' Pages served:', PagesServed);
}

// 6. Serve static files from 'public' directory and increment PagesServed
app.use((req, res, next) => {
    if (req.path.startsWith('/auth')) {
        next(); // Skip this middleware for /auth route
    } else {
        PagesServed++;
        DrawUI();
        next();
    }
});
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML5 game and forms
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle /auth route by proxying requests to AuthServer
app.use('/auth', (req, res) => {
    RequestCount++;
    DrawUI();

    const { method, url, headers, body } = req;
    const options = {
        hostname: '127.0.0.1',
        port: 3000,
        path: url,
        method,
        headers,
    };

    const proxy = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
    });

    proxy.on('error', (err) => {
        console.error('Proxy Error:', err);
        res.status(500).send('Proxy Error');
    });

    if (body && Object.keys(body).length > 0) {
        proxy.write(JSON.stringify(body));
    }

    req.pipe(proxy, { end: true });
});

const PORT = 5000;
app.listen(PORT, () => {
   
    DrawUI();
});
