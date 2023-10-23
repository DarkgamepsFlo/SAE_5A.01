// boite.js
const conf = require('../../conf.json')
const db = require('../../services/db/connection'); // Assurez-vous que le chemin est correct

// 1 //
/**
 * Cette fonction va permettre de récupérer un utilisateur à partir de son pseudo
 * @param {*} collectionName Nom de la collection 
 * @param {*} where WHERE de la requête
 * @returns Le résultat de la requête
 */
async function findBoite(collectionName, donnee) {
  try {
    if(donnee.where === null){//Si la recherche est vide
      const boite = await searchAllBts('boite');
      return boite;
    }
    if (!isNaN(donnee.where)) {
        donnee.where = parseInt(donnee.where) + "%";
        const query = `SELECT B.id_boite, nom_boite, lien_img_boi, annee_sortie_boi, nbr_pieceboi, univers FROM $1:name AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite WHERE CAST(annee_sortie_boi AS TEXT) LIKE $2 OR CAST(nbr_pieceboi AS TEXT) LIKE $2`;
        const boite = await db.any(query, [collectionName, donnee.where]);
        return boite;   
    } else {
        donnee.where = "%" + donnee.where + "%"
        const query = `SELECT B.id_boite, nom_boite, lien_img_boi, annee_sortie_boi, nbr_pieceboi, univers FROM $1:name AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite WHERE LOWER(nom_boite) LIKE $2 OR LOWER(univers) LIKE $2`;
        const boite = await db.any(query, [collectionName, donnee.where]);
        return boite;
    }
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction findBoite : ${e}`);
    throw e;
  }
}

/**
 * Cette fonction va permettre de récupérer toutes les boites
 * @param {*} collectionName Nom de la collection
 * @returns Le résultat de la requête
 */
async function searchAllBts(collectionName) {
  try {
    const query = `SELECT B.id_boite, nom_boite, lien_img_boi, annee_sortie_boi, nbr_pieceboi, univers FROM $1:name AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite`;
    const boite = await db.any(query, [collectionName]);
    return boite;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction findUsers : ${e}`);
    throw e;
  }
}

/**
 * Cette fonction va permettre de récupérer les informations d'une boite à partir de son id
 * @param {*} collectionName Nom de la collection
 * @param {*} donnee Information pour le where
 * @returns Le résultat de la requête
 */
async function ficheBt(collectionName, donnee){
  try {
    const query = `SELECT B.id_boite, nom_boite, numero_boi, univers, descriptif_boi, annee_sortie_boi, nbr_pieceboi, P.lien_img_boi FROM $1:name AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite WHERE B.id_boite = $2`;
    const boite = await db.any(query, [collectionName, donnee.where]);
    return boite;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction ficheBt : ${e}`);
  }
}

/**
 * Cette fonction va permettre de récupérer les 10 dernières nouveautés
 * @param {*} collectionName Nom de la collection
 * @returns Du code HTML qui va être reconnu par pug
 */
async function getNouveaute(collectionName){
  try {
    const query = `SELECT B.id_boite, B.nom_boite, PB.lien_img_boi FROM $1:name AS B INNER JOIN photo_boite AS PB ON B.id_boite = PB.id_boite ORDER BY B.id_boite DESC LIMIT 10`;
    const nouveaute = await db.any(query, [collectionName]);
    return nouveaute;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction getNouveaute : ${e}`);
  }
}

/**
 * Cette fonction va permettre de supprimer une liste de boites
 * @param {*} collectionName Nom de la collection
 * @param {*} boites Liste de boites à supprimer
 * @returns
 */
async function deleteBts(collectionName, boite, id_collec){
  try {
    const query = 'DELETE FROM $1:name WHERE id_collec = $2 AND id_boite = $3';
    const result = await db.any(query, [collectionName, id_collec, boite]);
    return result;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction deleteBoite : ${e}`);
  }
}

async function addBts(collectionName, boite, id_collec){
  try {
    const query = 'INSERT INTO $1:name VALUES ($2, $3)';
    const result = await db.any(query, [collectionName, id_collec, boite]);
    return result;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction addBts : ${e}`);
  }
}

async function addWlh(collectionName, boite, id_wishlist){
  try {
    const query = 'INSERT INTO $1:name VALUES ($2, $3)';
    const result = await db.any(query, [collectionName, id_wishlist, boite]);
    return result;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction addWlh : ${e}`);
  }
}

async function deleteWlh(collectionName, boite, id_wishlist){
  try {
    const query = 'DELETE FROM $1:name VALUES WHERE id_wishlist = $2 AND id_boite = $3';
    const result = await db.any(query, [collectionName, id_wishlist, boite]);
    return result;
  } catch (e) {
    console.error(`Il y a une erreur dans la fonction deleteWlh : ${e}`);
  }
}

module.exports = {
  findBoite,
  searchAllBts,
  ficheBt,
  getNouveaute,
  deleteBts,
  addBts,
  addWlh,
  deleteWlh
};