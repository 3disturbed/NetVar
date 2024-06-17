const express = require('express');
const bodyParser = require('body-parser');
const characterRoutes = require('./routes/characterRoutes');
const { saveCharactersToFile } = require('./services/characterService');
var characters = [];
const app = express();
app.use(bodyParser.json());

app.use('/', characterRoutes);
var serverStartTime = Date.now();
var lastSave = Date.now();
function drawUI() {
    saveCharactersToFile(characters)
        lastSave = Date.now(); 
        console.log(`NetVar Character Server. Characters: ${characters.length}. Last save: ${new Date(lastSave).toLocaleTimeString()}, Server start time: ${new Date(serverStartTime).toLocaleTimeString()}`); 
   
}
const PORT = 6000;
app.listen(PORT, () => {
   
    setInterval(drawUI, 60000); // Save characters to file every minute
});



drawUI();