const express = require('express');
const bodyParser = require('body-parser');
const characterRoutes = require('./routes/characterRoutes');
const { saveCharactersToFile } = require('./services/characterService');
var characters = [];
const app = express();
app.use(bodyParser.json());

app.use('/', characterRoutes);
var ServerStartTime = Date.now();
var LastSave = Date.now();
function DrawUI() {
    saveCharactersToFile();
    LastSave = Date.now();
    console.clear();
    console.log('----------------------------------------------');
    console.log('NetVar Character Server. Characters:', characters.length);
    console.log('----------------------------------------------');
    console.log('Last save:', new Date(LastSave).toLocaleTimeString());
    console.log('Server start time:', new Date(ServerStartTime).toLocaleTimeString());
    console.log('----------------------------------------------');

}
const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Character server is running on port ${PORT}`);
    setInterval(DrawUI, 60000); // Save characters to file every minute
});

function DrawUI() {
    console.clear();
    console.log('----------------------------------------------');
    console.log('NetVar Character Server. Characters:', characters.length);
    console.log('----------------------------------------------');
}

DrawUI();