// findUsers.js
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
const conf = require('../../conf.json')
const db = require('../../services/db/connection'); // Assurez-vous que le chemin est correct

// 1 //
/**
 * Cette fonction va permettre de récupérer un utilisateur à partir de son pseudo
 * @param {*} collectionName Nom de la collection 
 * @param {*} where WHERE de la requête
 * @returns Du code HTML qui va être reconnu par pug
 */
async function findUsers(collectionName, donnee) {
  try {
    
    // Utilisez une requête imbriquée pour sélectionner tous les utilisateurs
    const query = `SELECT U.id_uti, pseudo_uti, lien_img_pro FROM $1:name AS U INNER JOIN photo_profil AS P ON U.id_uti = P.id_uti WHERE LOWER(pseudo_uti) LIKE $2`;
    const users = await db.any(query, [collectionName, donnee.where]);

    // Vous pouvez retourner les données des utilisateurs si vous en avez besoin
    return users;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction findUsers : ${e}`);
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

      const queryInsertPhoto = `INSERT INTO photo_profil (lien_img_pro, id_uti) values ('https://media.istockphoto.com/id/1300845620/fr/vectoriel/appartement-dic%C3%B4ne-dutilisateur-isol%C3%A9-sur-le-fond-blanc-symbole-utilisateur.jpg?s=612x612&w=0&k=20&c=BVOfS7mmvy2lnfBPghkN__k8OMsg7Nlykpgjn0YOHj0=', $1)`;
      await db.any(queryInsertPhoto, [resultSelectIdUser[0].id_uti]);

      const queryInsertIdUser = `UPDATE $1:name set id_wishlist = $2, id_collec = $2 WHERE id_uti = $2`;
      await db.any(queryInsertIdUser, [collectionName, resultSelectIdUser[0].id_uti]);

      const querySelectInfoUser = `SELECT u.*, c.public as public_c, w.public as public_w, pp.lien_img_pro as lien_img_pro_pp FROM $1:name u inner join wishlist w on u.id_uti = w.id_wishlist inner join collection c on u.id_uti = c.id_collec inner join photo_profil pp on u.id_uti = pp.id_uti WHERE u.id_uti = $2`;
      const resultSelectInfoUser = await db.any(querySelectInfoUser, [collectionName, resultSelectIdUser[0].id_uti]);

      // On renvoie l'ensemble des informations qui vont être utiles
      return {
        success: true,
        id_uti: resultSelectInfoUser[0].id_uti,
        pseudo_uti: resultSelectInfoUser[0].pseudo_uti,
        adresse_mail_uti: resultSelectInfoUser[0].adresse_mail_uti,
        admin_uti: resultSelectInfoUser[0].admin_uti,
        active_uti: resultSelectInfoUser[0].active_uti,
        wishlist_id: resultSelectInfoUser[0].id_wishlist,
        collection_id: resultSelectInfoUser[0].id_collec,
        public_c: resultSelectInfoUser[0].public_c,
        public_w: resultSelectInfoUser[0].public_w,
        lien_img_pro_pp: resultSelectInfoUser[0].lien_img_pro_pp
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
    const queryInsertUser = `SELECT u.*, c.public as public_c, w.public as public_w, pp.lien_img_pro as lien_img_pro_pp FROM $1:name u inner join wishlist w on u.id_uti = w.id_wishlist inner join collection c on u.id_uti = c.id_collec inner join photo_profil pp on u.id_uti = pp.id_uti WHERE pseudo_uti like $2`;
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
                adresse_mail_uti: resultUser[0].adresse_mail_uti,
                admin_uti: resultUser[0].admin_uti,
                active_uti: resultUser[0].active_uti,
                wishlist_id: resultUser[0].id_wishlist,
                collection_id: resultUser[0].id_collec,
                public_c: resultUser[0].public_c,
                public_w: resultUser[0].public_w,
                lien_img_pro_pp: resultUser[0].lien_img_pro_pp
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
    console.error(`Il y a une erreur dans la fonction connexionUser : ${e}`);
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
    console.error(`Il y a une erreur dans la fonction motDePasseUser : ${e}`);
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
    console.error(`Il y a une erreur dans la fonction inscriptionUser : ${e}`);
    throw e;
  }
}

async function searchAllUsrs(collectionName) {
  try {
    const query = `SELECT U.id_uti, pseudo_uti, lien_img_pro FROM $1:name AS U INNER JOIN photo_profil AS P ON U.id_uti = P.id_uti`;
    const users = await db.any(query, [collectionName]);
    return users;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction findUsers : ${e}`);
    throw e;
  }
}

// 9 //
async function changerInfoAvecMdpUser(collectionName, donnee) {
  try {

    const queryUpdateWish = `UPDATE $1:name set public = $2 WHERE id_wishlist = $3`;
    await db.any(queryUpdateWish, ['wishlist', donnee.public_w, donnee.id_uti]);

    const queryUpdateCollec = `UPDATE $1:name set public = $2 WHERE id_collec = $3`;
    await db.any(queryUpdateCollec, ['collection', donnee.public_c, donnee.id_uti]);

    const queryUpdateUser = `UPDATE $1:name set pseudo_uti = $2, adresse_mail_uti = $3, mot_de_passe_uti = $4 WHERE id_uti = $5`;
    await db.any(queryUpdateUser, [collectionName, donnee.pseudo_uti, donnee.adresse_mail_uti, donnee.new_mdp, donnee.id_uti]);

    const querySelectInfoUser = `SELECT u.*, c.public as public_c, w.public as public_w, pp.lien_img_pro as lien_img_pro_pp FROM $1:name u inner join wishlist w on u.id_uti = w.id_wishlist inner join collection c on u.id_uti = c.id_collec inner join photo_profil pp on u.id_uti = pp.id_uti WHERE id_uti = $2`;
    const resultSelectInfoUser = await db.any(querySelectInfoUser, [collectionName, donnee.id_uti]);

    console.error(resultSelectInfoUser);

    // On renvoie l'ensemble des informations qui vont être utiles
    return {
      success: true,
      id_uti: resultSelectInfoUser[0].id_uti,
      pseudo_uti: resultSelectInfoUser[0].pseudo_uti,
      adresse_mail_uti: resultSelectInfoUser[0].adresse_mail_uti,
      admin_uti: resultSelectInfoUser[0].admin_uti,
      active_uti: resultSelectInfoUser[0].active_uti,
      wishlist_id: resultSelectInfoUser[0].id_wishlist,
      collection_id: resultSelectInfoUser[0].id_collec,
      public_c: resultSelectInfoUser[0].public_c,
      public_w: resultSelectInfoUser[0].public_w,
      lien_img_pro_pp: resultSelectInfoUser[0].lien_img_pro_pp
    };
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction changementinfosansmdpUser : ${e}`);
    throw e;
  }
}

// 10 //
async function changerInfoSansMdpUser(collectionName, donnee) {
  try {

    const queryUpdateWish = `UPDATE $1:name set public = $2 WHERE id_wishlist = $3`;
    await db.any(queryUpdateWish, ['wishlist', donnee.public_w, donnee.id_uti]);

    const queryUpdateCollec = `UPDATE $1:name set public = $2 WHERE id_collec = $3`;
    await db.any(queryUpdateCollec, ['collection', donnee.public_c, donnee.id_uti]);

    const queryUpdateUser = `UPDATE $1:name set pseudo_uti = $2, adresse_mail_uti = $3 WHERE id_uti = $4`;
    await db.any(queryUpdateUser, [collectionName, donnee.pseudo_uti, donnee.adresse_mail_uti, donnee.id_uti]);

    const querySelectInfoUser = `SELECT u.*, c.public as public_c, w.public as public_w, pp.lien_img_pro as lien_img_pro_pp FROM $1:name u inner join wishlist w on u.id_uti = w.id_wishlist inner join collection c on u.id_uti = c.id_collec inner join photo_profil pp on u.id_uti = pp.id_uti WHERE u.id_uti = $2`;
    const resultSelectInfoUser = await db.any(querySelectInfoUser, [collectionName, donnee.id_uti]);

    // On renvoie l'ensemble des informations qui vont être utiles
    return {
      success: true,
      id_uti: resultSelectInfoUser[0].id_uti,
      pseudo_uti: resultSelectInfoUser[0].pseudo_uti,
      adresse_mail_uti: resultSelectInfoUser[0].adresse_mail_uti,
      admin_uti: resultSelectInfoUser[0].admin_uti,
      active_uti: resultSelectInfoUser[0].active_uti,
      wishlist_id: resultSelectInfoUser[0].id_wishlist,
      collection_id: resultSelectInfoUser[0].id_collec,
      public_c: resultSelectInfoUser[0].public_c,
      public_w: resultSelectInfoUser[0].public_w,
      lien_img_pro_pp: resultSelectInfoUser[0].lien_img_pro_pp
    };
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction changementinfoavecmdpUser : ${e}`);
    throw e;
  }
}

// 11 //
//Cette méthode permet de sélectionner les données d'un utilisateur à partir de son id
async function profilUsr(collectionName, donnee) {
  try {
    const query = `SELECT U.id_uti, pseudo_uti, lien_img_pro, C.public FROM $1:name AS U INNER JOIN photo_profil AS PP ON U.id_uti = PP.id_uti INNER JOIN collection AS C ON U.id_collec = C.id_collec WHERE U.id_uti = $2;`;
    const result = await db.any(query, [collectionName, donnee]);
    return result;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction profilUsr : ${e}`);
  }
}

// 12 //
//Cette méthode permet de sélectionner les collections lié à un utilisateur à partir de son id
async function profilCollec(collectionName, donnee){
  try {
    const query = `SELECT B.nom_boite, PB.lien_img_boi FROM utilisateur AS U INNER JOIN lien_collection AS LC ON U.id_collec = LC.id_collec
                                                                        INNER JOIN boite AS B ON LC.id_boite = B.id_boite
                                                                        INNER JOIN photo_boite AS PB ON B.id_boite = PB.id_boite
                                                                        WHERE U.id_uti = $2`;
    const result = await db.any(query, [collectionName, donnee]);
    return result;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction profilCollec : ${e}`);
  }
}

// 13 //
//Cette méthode permet de retourner les boites et leurs données de la collection d'un utilisateur à partir de l'id de sa collection
async function getCollection(donnee){
  try {
    const query = `SELECT B.id_boite, B.nom_boite, B.numero_boi, univers, B.nbr_pieceboi, B.annee_sortie_boi, PB.lien_img_boi FROM lien_collection AS LC 
                                                                                                                              INNER JOIN boite as B ON LC.id_boite = B.id_boite 
                                                                                                                              INNER JOIN photo_boite AS PB ON B.id_boite = PB.id_boite
                                                                                                                              WHERE LC.id_collec = $1`;
    const result = await db.any(query, [donnee]);
    return result;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction getCollection : ${e}`);
  }
}

// 14 //
//Cette méthode permet de retourner la wishlist de l'utilisateur
async function getWishlist(donnee){
  try {
    const query = `SELECT B.id_boite, B.nom_boite, B.numero_boi, univers, B.nbr_pieceboi, B.annee_sortie_boi, PB.lien_img_boi FROM lien_wishlist AS LW 
                                                                                                                              INNER JOIN boite as B ON LW.id_boite = B.id_boite 
                                                                                                                              INNER JOIN photo_boite AS PB ON B.id_boite = PB.id_boite
                                                                                                                              WHERE LW.id_wishlist = $1`;
    const result = await db.any(query, [donnee]);
    return result;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction : ${e}`);
  }
}

// 15 //
async function contactUser(collectionName, donnee) {
  try {
    var transport = nodemailer.createTransport({
      service: conf.Auth.host,
      auth: {
        user: conf.Auth.user,
        pass: conf.Auth.pass,
      },
    });
    
    const mailOptions = {
      from: conf.Auth.user, // Adresse e-mail de l'expéditeur
      to: conf.Auth.user, // Adresse e-mail du destinataire
      cc: conf.Auth.user,
      subject: donnee.sujet,
      text: donnee.message + '\nCe message est de ' + donnee.pseudo + '. \nVeuillez lui répondre par mail sur : ' + donnee.email,
    };

    transport.sendMail(mailOptions);

    return {
      success: true,
      message: 'Votre message est bien envoyé à l\'adminsitrateur'
    }
    
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction contactUser : ${e}`);
    // Rejeter la promesse en cas d'erreur
    throw e;
  }
}

async function searchBestUsrs(collectionName) {
  try {
    const query = `SELECT U.id_uti, U.pseudo_uti, lien_img_pro FROM $1:name AS U INNER JOIN photo_profil AS P ON U.id_uti = P.id_uti INNER JOIN collection AS C ON C.id_collec = U.id_collec WHERE C.public = true GROUP BY U.id_uti, U.pseudo_uti, p.lien_img_pro ORDER BY max(C.id_collec) DESC LIMIT 5`;
    const users = await db.any(query, [collectionName]);
    return users;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction searchBestUsrsUsers : ${e}`);
    throw e;
  }
}

module.exports = {
  findUsers,
  searchAllUsrs,
  inscriptionUser,
  connexionUser,
  motdepasseUser,
  changerpasswordUser,
  changerInfoAvecMdpUser,
  changerInfoSansMdpUser,
  profilUsr,
  profilCollec,
  getCollection,
  getWishlist,
  contactUser,
  searchBestUsrs,
};