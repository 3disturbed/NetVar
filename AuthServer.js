const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Netvar AuthServer is running on port ${PORT}`);
});
