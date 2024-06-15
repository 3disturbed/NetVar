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
    console.log('NetVar Character Server. Characters:', characters.length, ' Last save:', new Date(LastSave).toLocaleTimeString(), ' Server start time:', new Date(ServerStartTime).toLocaleTimeString());

}
const PORT = 6000;
app.listen(PORT, () => {
   
    setInterval(DrawUI, 60000); // Save characters to file every minute
});



DrawUI();