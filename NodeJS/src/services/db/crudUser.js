// findUsers.js
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const db = require('../../services/db/connection'); // Assurez-vous que le chemin est correct

// 1 //
/**
 * Cette fonction va permettre de récupérer la liste de m'ensemble des utilisateurs
 * @param {*} collectionName Nom de la collection 
 * @returns Du code HTML qui va être reconnu par pug
 */
async function findUsers(collectionName) {
  try {

    // Utilisez une requête imbriquée pour sélectionner tous les utilisateurs
    const query = `SELECT * FROM $1:name`;

    const users = await db.any(query, [collectionName]);

    // Utilisez les données des utilisateurs ici, par exemple, les afficher dans la console
    console.log(users);

    // Vous pouvez retourner les données des utilisateurs si vous en avez besoin
    return users;
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction findUsers : ${e}`);
    throw e;
  }
}


// 2 //
/**
 * Cette fonction va permettre de récupérer la liste de m'ensemble des utilisateurs
 * @param {*} collectionName Nom de la collection 
 * @returns Du code HTML qui va être reconnu par pug
 */
async function inscriptionUser(collectionName, donnee) {
    try {
  
      // On va récupérer l'ensemble des éléments dans la table users
      const queryInsertUser = `INSERT INTO $1:name (pseudo_uti, adresse_mail_uti, mot_de_passe_uti) values ($2, $3, $4)`;
      const resultUser = await db.any(queryInsertUser, [collectionName, donnee.pseudo, donnee.motDePasse, donnee.email]);

      const queryInsertWishlist = `INSERT INTO wishlist (active_wish) values (false)`;
      await db.any(queryInsertWishlist);

      const queryInsertCollection = `INSERT INTO collection (active_collec) values (false)`;
      await db.any(queryInsertCollection);
  
      return resultUser
    } catch(e) {
      console.log(`Il y a une erreur dans la fonction inscriptionUser : ${e}`)
      throw e;
      }
  }

// 3 //
  async function connexionUser(collectionName, donnee) {
    try {
      // On va récupérer l'ensemble des éléments dans la table users
      const queryInsertUser = `SELECT * from $1:name where pseudo_uti like $2`;
      const resultUser = await db.any(queryInsertUser, [collectionName, donnee.pseudo]);

      console.log(resultUser);
  
      // Utiliser une promesse pour comparer le mot de passe
      return new Promise((resolve, reject) => {
        bcrypt.compare(donnee.motDePasse, resultBdd.motDePasse, (err, resultat) => {
          if (err) {
            // Gérer les erreurs
            console.error(err);
            reject(err);
          } else {
            if (resultat === true) {
              // Cette fonction permet de renvoyer directement le résultat dans la partie data d'axios
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
      });
    } catch (e) {
      console.log(`Il y a une erreur dans la fonction connexionUser : ${e}`);
      throw e;
    }
  }

  
// 4 //
async function motdepasseUser(collectionName, donnee) {
    try {
      // On va récupérer l'ensemble des éléments dans la table users
      const collection = getCollection(collectionName);
  
      const options = { upsert: false };
  
      const search = {
        email: donnee.email
      };
  
      const resultBdd = await collection.findOne(search, options);
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          // users: 'votre_adresse_mail
          // pass: 'votre_mot_de_passe
          user: '',
          pass: ''
        }
      });
      
      
    } catch (e) {
      console.log(`Il y a une erreur dans la fonction connexionUser : ${e}`);
      throw e;
    }
  }
  
  module.exports = {
    findUsers,
    inscriptionUser,
    connexionUser,
    motdepasseUser
};