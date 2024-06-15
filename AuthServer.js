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
    console.log('NetVar Auth Server start time:', new Date(ServerStartTime).toLocaleTimeString(), ' Requests:', RequestCount); 

}
app.use(bodyParser.json());

// update DrawUI every time a request is made then direct to the authRoutes
app.use('/', (req, res, next) => {
    RequestCount++;
    DrawUI();
    next();
});
app.use('/', authRoutes);


app.listen(PORT, () => {
DrawUI();
});
