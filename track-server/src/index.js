require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

// const mongoURI = 'mongodb+srv://admin:<password>@cluster0.17ap2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoURI = 'mongodb+srv://scontractor6:Smitguddu95@cluster0.17ap2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoURI);

mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance');
});

mongoose.connection.on('error', (error) => {
    console.error('Error connecting to mongo', error);
});

app.get('/', requireAuth, (req, res) => {
    console.log('user', req.user);
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

