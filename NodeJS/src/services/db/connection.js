const pgp = require('pg-promise')();
const conf = require("../../conf.json")

const connection = {
    user: conf.NodeJS.user,
    host: conf.NodeJS.localhost, // ou l'adresse IP de votre serveur PostgreSQL
    database: conf.NodeJS.database,
    password: conf.NodeJS.password,
    port: 5432, // Port par défaut de PostgreSQL
  };

console.info('Trying to access the db...');
// Connect the client to the server (optional starting in v4.7)
const db = pgp(connection);

// Utilisez la méthode connect pour vérifier la connexion
db.connect()
  .then(obj => {
    console.info('Connected successfully to server !');
    obj.done(); // Libère le client pool
      })
    .catch(error => {
      console.error('Error connecting to the database:', error);
      // Gérez l'erreur de connexion ici
});

module.exports = db;

