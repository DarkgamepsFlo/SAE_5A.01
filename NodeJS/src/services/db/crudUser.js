// findUsers.js
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const conf = require('../../conf.json')
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
async function inscriptionUser(collectionName, donnee) {
  try {
    const querySelectUser = `SELECT * from $1:name where pseudo_uti like $2`;
    const resultSelectUser = await db.any(querySelectUser, [collectionName, donnee.pseudo]);

    console.log(resultSelectUser);

    const querySelectMail = `SELECT * from $1:name where adresse_mail_uti like $2`;
    const resultSelectMail = await db.any(querySelectMail, [collectionName, donnee.email]);

    console.log(resultSelectMail);

    if (resultSelectUser.length > 0) {
      // Si l'utilisateur existe déjà, retournez un objet avec "false" et un message d'erreur
      return {
        success: false,
        message: "Ce pseudo est déjà existant, veuillez réessayer !"
      };
    } 
    if (resultSelectMail.length > 0) {
      // Si l'utilisateur existe déjà, retournez un objet avec "false" et un message d'erreur
      return {
        success: false,
        message: "L'adresse mail est déjà associé à un compte, veuillez réessayer !"
      };
    }
    else {
      // Si l'utilisateur n'existe pas, insérez-le et retournez un objet avec "true"
      const queryInsertWishlist = `INSERT INTO wishlist (public) values (false)`;
      await db.any(queryInsertWishlist);

      const queryInsertCollection = `INSERT INTO collection (public) values (false)`;
      await db.any(queryInsertCollection);

      const queryInsertUser = `INSERT INTO $1:name (pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti) values ($2, $3, $4, $5, $6)`;
      await db.any(queryInsertUser, [collectionName, donnee.pseudo, donnee.email, donnee.motDePasse, false, true]);

      const querySelectIdUser = `SELECT id_uti from $1:name where pseudo_uti like $2 and adresse_mail_uti like $3`;
      const resultSelectIdUser = await db.any(querySelectIdUser, [collectionName, donnee.pseudo, donnee.email]);

      const queryInsertIdUser = `UPDATE $1:name set id_wishlist = $2, id_collec = $2 WHERE pseudo_uti like $3`;
      await db.any(queryInsertIdUser, [collectionName, resultSelectIdUser[0].id_uti, donnee.pseudo]);

      return {
        success: true
      };
    }
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction inscriptionUser : ${e}`);
    throw e;
  }
}

// 3 //
async function connexionUser(collectionName, donnee) {
  try {
    console.log(donnee);
    // On va récupérer l'ensemble des éléments dans la table users
    const queryInsertUser = `SELECT * from $1:name where pseudo_uti like $2`;
    const resultUser = await db.any(queryInsertUser, [collectionName, donnee.pseudo]);

    console.log(resultUser);

    // Utiliser une promesse pour comparer le mot de passe
    return new Promise((resolve, reject) => {
      if (resultUser.length > 0) { // Vérifie si resultUser n'est pas vide
        bcrypt.compare(donnee.motDePasse, resultUser[0].mot_de_passe_uti, (err, resultat) => {
          if (err) {
            // Gérer les erreurs
            console.error(err);
            resolve({
              success: false,
              message: err
            });
          } else {
            console.log(resultat);
            if (resultat === true) {
              // Cette fonction permet de renvoyer directement le résultat dans la partie data d'axios
              resolve({
                success: true
              });
            } else {
              resolve({
                success: false,
                message: "Le mot de passe ne correspond pas"
              });
            }
          }
        });
      } else {
        resolve({
          success: false,
          message: "Ce pseudo n'existe pas"
        });
      }
    });
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction connexionUser : ${e}`);
    throw e;
  }
}
  
// 4 //
async function motdepasseUser(collectionName, donnee) {
  try {
    console.log(donnee);

    const querySelectEmail = `SELECT * from $1:name where adresse_mail_uti like $2`;
    const resultSelectEmail = await db.any(querySelectEmail, [collectionName, donnee.email]);

    console.log(resultSelectEmail);

    return new Promise((resolve, reject) => {
      if (resultSelectEmail.length > 0) {
        var transport = nodemailer.createTransport({
          service: conf.Auth.host,
          auth: {
            user: conf.Auth.user,
            pass: conf.Auth.pass,
          },
        });

        const code = randomstring.generate({
          length: 6,
          charset: 'numeric', // Utilisez 'alphabetic'/'alphanumeric' si vous souhaitez inclure des lettres/ des chiffres et lettres.
        });

        const mailOptions = {
          from: conf.Auth.user, // Adresse e-mail de l'expéditeur
          to: donnee.email, // Adresse e-mail du destinataire
          cc: conf.Auth.user,
          subject: 'Demande de réinitialisation de mot de passe',
          text: 'Veuillez insérer ce code de confirmation pour pouvoir réinitialiser votre mot de passe : ' + code,
        };

        transport.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
            // Rejeter la promesse en cas d'erreur
            reject({
              success: false,
              message: 'Erreur lors de l\'envoi de l\'e-mail : ' + error.message,
            });
          } else {
            console.log('E-mail envoyé avec succès :', info.response);
            // Résoudre la promesse en cas de succès
            resolve({
              success: true,
              message: code
            });
          }
        });
      } else {
        // Rejeter la promesse en cas de résultat vide
        console.log('Personne');
        reject({
          success: false,
          message: 'Aucun utilisateur trouvé avec cette adresse e-mail.',
        });
      }
    });
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction motDePasseUser : ${e}`);
    // Rejeter la promesse en cas d'erreur
    throw e;
  }
}

// 5 //
async function changerpasswordUser(collectionName, donnee) {
  try {

    // Si l'utilisateur n'existe pas, insérez-le et retournez un objet avec "true"
    const queryUpdateUser = `UPDATE $1:name SET mot_de_passe_uti = $2 WHERE adresse_mail_uti = $3`;
    await db.any(queryUpdateUser, [collectionName, donnee.mdp, donnee.email]);

    return {
      success: true,
      message: "Le mot de passe est bien modifié"
    };
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction inscriptionUser : ${e}`);
    throw e;
  }
}
  
module.exports = {
  findUsers,
  inscriptionUser,
  connexionUser,
  motdepasseUser,
  changerpasswordUser
};