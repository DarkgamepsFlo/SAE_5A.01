// findUsers.js
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
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
      const queryInsertUser = `INSERT INTO $1:name (pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti) values ($2, $3, $4, $5, $6)`;
      await db.any(queryInsertUser, [collectionName, donnee.pseudo, donnee.email, donnee.motDePasse, 'f', 't']);

      const queryInsertWishlist = `INSERT INTO wishlist (public) values (false)`;
      await db.any(queryInsertWishlist);

      const queryInsertCollection = `INSERT INTO collection (public) values (false)`;
      await db.any(queryInsertCollection);

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

    if (resultUser.length > 0) {
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: conf.Auth.user,
          pass: conf.Auth.pass,
        },
      });

      const mailOptions = {
        from: conf.Auth.user, // Adresse e-mail de l'expéditeur (doit être une adresse Mailtrap)
        to: donnee.email, // Adresse e-mail du destinataire
        cc: conf.Auth.user,
        subject: 'Sujet de l\'e-mail',
        text: 'Contenu de l\'e-mail',
      };

      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Erreur lors de l\'envoi de l\'e-mail :', error);
          // Retourne un objet indiquant une erreur
          return {
            success: false,
            message: 'Erreur lors de l\'envoi de l\'e-mail : ' + error.message,
          };
        } else {
          console.log('E-mail envoyé avec succès :', info.response);
          // Retourne un objet indiquant le succès
          return {
            success: true,
          };
        }
      });
    } else {
      // Retourne un objet indiquant une erreur car le résultat est vide
      console.log('Personne');
      return {
        success: false,
        message: 'Aucun utilisateur trouvé avec ce pseudo.',
      };
    }
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction motDePasseUser : ${e}`);
    throw e;
  }
}
  
  module.exports = {
    findUsers,
    inscriptionUser,
    connexionUser,
    motdepasseUser
};