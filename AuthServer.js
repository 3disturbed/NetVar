// Auth Server Entry Point

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const PORT = 3000;
const app = express();
var RequestCount = 0;
var ServerStartTime = Date.now();
function DrawUI() {
    console.clear();
    console.log('----------------------------------------------');
    console.log('NetVar Auth Server');
    console.log('----------------------------------------------');
    console.log('Server start time:', new Date(ServerStartTime).toLocaleTimeString());
    console.log('Requests:', RequestCount); 
    console.log('----------------------------------------------');
}
app.use(bodyParser.json());

console.log("Darks Netvar AuthServer");
// update DrawUI every time a request is made then direct to the authRoutes
app.use('/', (req, res, next) => {
    DrawUI();
    next();
});
app.use('/', authRoutes);


app.listen(PORT, () => {
    console.log(`Netvar AuthServer is running on port ${PORT}`);
});
DrawUI();