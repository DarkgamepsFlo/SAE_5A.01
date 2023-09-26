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
/**
 * Cette méthode permet de réaliser l'inscription d'un utilisateur
 * @param {*} collectionName Nom de la table pour insérer l'utilisateur
 * @param {*} donnee L'ensemble des données de l'utilisateur à insérer
 * @returns L'ensemble des informations utiles pour le site
 */
async function inscriptionUser(collectionName, donnee) {
  try {
    // On va vérifier si un utilisateur ne possède pas déjà le même pseudo
    const querySelectUser = `SELECT * from $1:name where pseudo_uti like $2`;
    const resultSelectUser = await db.any(querySelectUser, [collectionName, donnee.pseudo]);
    // On va vérifier si un utilisateur ne possède pas déjà la même adresse mail
    const querySelectMail = `SELECT * from $1:name where adresse_mail_uti like $2`;
    const resultSelectMail = await db.any(querySelectMail, [collectionName, donnee.email]);

    // Si jamais le mail ou/et le pseudo est/sont utilisé(s), on envoie une erreur
    if (resultSelectUser.length > 0) {
      return {
        success: false,
        message: "Ce pseudo est déjà existant, veuillez réessayer !"
      };
    } 
    if (resultSelectMail.length > 0) {
      return {
        success: false,
        message: "L'adresse mail est déjà associé à un compte, veuillez réessayer !"
      };
    }
    else {
      // On va insérer l'ensemble des informations dans la base de données et on va lui attribuer une wishlist ainsi qu'une collection vide
      const queryInsertWishlist = `INSERT INTO wishlist (public) values (false)`;
      await db.any(queryInsertWishlist);

      const queryInsertCollection = `INSERT INTO collection (public) values (false)`;
      await db.any(queryInsertCollection);

      const queryInsertUser = `INSERT INTO $1:name (pseudo_uti, adresse_mail_uti, mot_de_passe_uti, admin_uti, active_uti) values ($2, $3, $4, $5, $6)`;
      await db.any(queryInsertUser, [collectionName, donnee.pseudo, donnee.email, donnee.motDePasse, false, true]);

      const querySelectIdUser = `SELECT id_uti from $1:name where pseudo_uti like $2 and adresse_mail_uti like $3`;
      const resultSelectIdUser = await db.any(querySelectIdUser, [collectionName, donnee.pseudo, donnee.email]);

      const queryInsertIdUser = `UPDATE $1:name set id_wishlist = $2, id_collec = $2 WHERE id_uti = $2`;
      await db.any(queryInsertIdUser, [collectionName, resultSelectIdUser[0].id_uti]);

      const querySelectInfoUser = `SELECT * FROM $1:name WHERE id_uti = $2`;
      const resultSelectInfoUser = await db.any(querySelectInfoUser, [collectionName, resultSelectIdUser[0].id_uti]);

      // On renvoie l'ensemble des informations qui vont être utiles
      return {
        success: true,
        id_uti: resultSelectInfoUser[0].id_uti,
        pseudo_uti: resultSelectInfoUser[0].pseudo_uti,
        admin_uti: resultSelectInfoUser[0].admin_uti
      };
    }
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction inscriptionUser : ${e}`);
    throw e;
  }
}

// 3 //
/**
 * Cette fonction permet d'effectuer la connexion d'un utilisateur
 * @param {*} collectionName Nom de la table pour insérer l'utilisateur
 * @param {*} donnee L'ensemble des données de l'utilisateur à insérer
 * @returns L'ensemble des informations utiles pour le site
 */
async function connexionUser(collectionName, donnee) {
  try {
    // On va regarder si l'utilisateur est bien existant dans la base de donées
    const queryInsertUser = `SELECT * from $1:name where pseudo_uti like $2`;
    const resultUser = await db.any(queryInsertUser, [collectionName, donnee.pseudo]);

    // On va ensuite décrypter le mot de passe puis on va vérifier si les deux mots de passe correspond
    // Si il n'y a pas d'utilisateur ayant le même pseudo, on va renvoyer une erreur à l'utilisateur
    return new Promise((resolve, reject) => {
      if (resultUser.length > 0) {
        bcrypt.compare(donnee.motDePasse, resultUser[0].mot_de_passe_uti, (err, resultat) => {
          // Si ça ne marche pas, en renvoie une erreur
          if (err) {
            resolve({
              success: false,
              message: err
            });
          } else {
            // Si le mot de passe correspond, on va renvoyer un ensemble d'information utiles pour le site web
            // Sinon, on envoie une erreur
            if (resultat === true) {
              resolve({
                success: true,
                id_uti: resultUser[0].id_uti,
                pseudo_uti: resultUser[0].pseudo_uti,
                admin_uti: resultUser[0].admin_uti
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
    const querySelectEmail = `SELECT * from $1:name where adresse_mail_uti like $2`;
    const resultSelectEmail = await db.any(querySelectEmail, [collectionName, donnee.email]);

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
            reject({
              success: false,
              message: 'Erreur lors de l\'envoi de l\'e-mail : ' + error.message,
            });
          } else {
            resolve({
              success: true,
              message: code
            });
          }
        });
      } else {
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