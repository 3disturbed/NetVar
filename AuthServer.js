// Auth Server Entry Point

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const PORT = 3000;
const app = express();
var requestCount = 0;
var serverStartTime = Date.now();
const LoggedInUsers = [];
const LoggedInUser = {
    userId: 1,
    username: 'test',
    token: 'test'
};
function drawUI() {
    console.clear();
    console.log('NetVar Auth Server start time:', new Date(serverStartTime).toLocaleTimeString(), ' Requests:', RequestCount); 

}
app.use(bodyParser.json());

// update DrawUI every time a request is made then direct to the authRoutes
app.use('/', (req, res, next) => {
    requestCount++;
    DrawUI();
    next();
});
app.use('/', authRoutes);


app.listen(PORT, () => {
drawUI();
});
