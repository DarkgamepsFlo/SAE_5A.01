const express = require('express');
const app = express();

const users = require('./users');
const suggestion = require('./suggestion');

const cors = require('cors');
const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/users', users);

app.use('/suggestion', suggestion);

// Lien qui nous mène sur le Menu principal
app.get('/', (req, res, next) => {
    res.send("Hello World!");
});
// Lien qui nous mène sur la page de la gestion d'Users
app.get('/users', (req, res, next) => {
    res.send("Hello Users!");
});
// Lien qui nous mène sur la page de suggestion
app.get('/suggestion', (req, res, next) => {
    res.send("Hello Suggest!");
});

module.exports = app