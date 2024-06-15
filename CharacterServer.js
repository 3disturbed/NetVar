const express = require('express');
const bodyParser = require('body-parser');
const characterRoutes = require('./routes/characterRoutes');
const { saveCharactersToFile } = require('./services/characterService');
var characters = [];
const app = express();
app.use(bodyParser.json());

app.use('/', characterRoutes);

const PORT = 6000;
app.listen(PORT, () => {
    console.log(`Character server is running on port ${PORT}`);
    setInterval(saveCharactersToFile, 60000); // Save characters to file every minute
});

function DrawUI() {
    console.clear();
    console.log('----------------------------------------------');
    console.log('NetVar Character Server. Characters:', characters.length);
    console.log('----------------------------------------------');
}

DrawUI();