// boite.js
const conf = require('../../conf.json')
const db = require('../../services/db/connection'); // Assurez-vous que le chemin est correct

// 1 //
/**
 * Cette fonction va permettre de récupérer un utilisateur à partir de son pseudo
 * @param {*} collectionName Nom de la collection 
 * @param {*} where WHERE de la requête
 * @returns Du code HTML qui va être reconnu par pug
 */
async function findBoite(collectionName, donnee) {
  try {
    if (typeof donnee.where === "number") {
        const query = `SELECT B.id_boite, nom_boite, lien_img_boi, annee_sortie_boi, nbr_pieceboi, univers FROM $1:name AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite WHERE annee_sortie_boi = $2 OR nbr_pieceboi = $2`;
        const boite = await db.any(query, [collectionName, donnee.where]);
        console.log(boite);
        return boite;   
    } else {
        const query = `SELECT B.id_boite, nom_boite, lien_img_boi, annee_sortie_boi, nbr_pieceboi, univers FROM $1:name AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite WHERE LOWER(nom_boite) LIKE $2 OR LOWER(univers) LIKE $2`;
        const boite = await db.any(query, [collectionName, donnee.where]);
        console.log(boite);
        return boite;
    }
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction findBoite : ${e}`);
    throw e;
  }
}

async function searchAllBts(collectionName) {
  try {
    const query = `SELECT B.id_boite, nom_boite, lien_img_boi, annee_sortie_boi, nbr_pieceboi, univers FROM $1:name AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite`;
    const boite = await db.any(query, [collectionName]);
    return boite;
  } catch (e) {
    console.log(`Il y a une erreur dans la fonction findUsers : ${e}`);
    throw e;
  }
}
module.exports = {
  findBoite,
  searchAllBts,
};