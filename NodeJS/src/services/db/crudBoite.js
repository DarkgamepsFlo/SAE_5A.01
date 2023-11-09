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
async function findBoite(donnee) {
  try {
    if(donnee.where === null || donnee.where === ''){//Si la recherche est vide
      const boite = await searchAllBts('boite');
      return boite;
    }

    var searchTerms = [];
    var searchInt = [];
    var searchString = [];

    if(donnee.where.includes(" ")){
      searchTerms = donnee.where.split(' '); //On sépare les mots-clés par les espaces
    } else{
      searchTerms = [donnee.where]
    }

    searchTerms.forEach(element => {
      if(element !== ""){
        if(!isNaN(element)){//Si c'est un nombre
          searchInt.push(element);
        } else{//Si c'est un mot
          searchString.push(element);
        }
      }
    });

    //On rajoute des % entre les mots-clés pour chercher les valeurs comprenant ces termes
    const paramsInt = searchInt.map((term) => {
      return `'%${term}%'`;
    });

    const paramsString = searchString.map((term) => {
      return `'%${term}%'`;
    });  

    var query = `SELECT B.id_boite, nom_boite, lien_img_boi, annee_sortie_boi, nbr_pieceboi, univers , numero_boi
                    FROM boite AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite 
                    WHERE `;
    var termString = [];
    var termInt = [];
    var nom = "";
    var univers = "";
    var piece = "";
    var annee = "";
    var numero = "";

    if(!(paramsInt.length == 0 && paramsString.length > 1)){//Cas où les mots clés sont un mélange de nombres et de mots, dans ce cas on traite les mots
      for (let index = 0; index < paramsString.length; index++) {
          if(index === paramsString.length-1){//Dernier critère de recherche, pour ne pas rajouter un OR à la fin de la requête
              nom = nom.concat("LOWER(nom_boite) LIKE ").concat(paramsString[index]);
              univers = univers.concat("LOWER(univers) LIKE ").concat(paramsString[index]);
          } else{
              nom = nom.concat("LOWER(nom_boite) LIKE ").concat(paramsString[index]).concat(" OR ");
              univers = univers.concat("LOWER(univers) LIKE ").concat(paramsString[index]).concat(" OR ");
          }
      }
    } else{//Cas où il n'y a que des mots
      paramsString.forEach(element => {
        termString.push(("(LOWER(nom_boite) LIKE ").concat(element).concat(" OR LOWER(univers) LIKE ").concat(element).concat(") "));
      });
    }

    if(!(paramsInt.length > 1 && paramsString.length == 0)){//Cas où les mots clés sont un mélange de nombres et de mots, dans ce cas on traite les nombres
      for (let index = 0; index < paramsInt.length; index++) {
          if(index === paramsInt.length-1){//Dernier critère de recherche, pour ne pas rajouter un OR à la fin de la requête
            annee = annee.concat("CAST(annee_sortie_boi AS TEXT) LIKE ").concat(paramsInt[index]);
            numero = numero.concat("CAST(numero_boi AS TEXT) LIKE ").concat(paramsInt[index]);
            piece = piece.concat("CAST(nbr_pieceboi AS TEXT) LIKE ").concat(paramsInt[index]);
          } else{
            annee = annee.concat("CAST(annee_sortie_boi AS TEXT) LIKE ").concat(paramsInt[index]).concat(" OR ");
            numero = numero.concat("CAST(numero_boi AS TEXT) LIKE ").concat(paramsInt[index]).concat(" OR ");
            piece = piece.concat("CAST(nbr_pieceboi AS TEXT) LIKE ").concat(paramsInt[index]).concat(" OR ");
          }        
      }
    } else{//Cas où il n'y a que des nombres
      paramsInt.forEach(element => {
        termInt.push(("(CAST(annee_sortie_boi AS TEXT) LIKE ").concat(element).concat(" OR CAST(numero_boi AS TEXT) LIKE ").concat(element).concat(" OR CAST(nbr_pieceboi AS TEXT) LIKE ").concat(element).concat(") "));
      });
    }

    if(paramsInt.length > 0){//Cas où il y a un chiffre dans la recherche
      if (paramsInt.length > 1 && paramsString.length == 0) {//Cas où il y a n'y a que des nombres
        var clause = "";
        termInt.forEach(element => {//Construction du WHERE
          if(termInt.indexOf(element) === termInt.length-1){
              clause = clause.concat(element);
          } else{
              clause = clause.concat(element).concat("AND ");
          }
        });
        query = query.concat(clause);
      } else{//Construction du WHERE, on traite d'abord les nombres
        query = query.concat("(").concat(annee).concat(" OR ").concat(numero).concat(" OR ").concat(piece).concat(")");
      }
    }

    if(paramsString.length > 0){//Cas où il y a un string dans la recherche
      if(paramsInt.length > 0){//Cas où il y a un string et un int dans la recherche
        query = query.concat(" AND ");
      }
      if (paramsInt.length == 0 && paramsString.length > 1) {//Cas où il y a n'y a que des string
        var clause = "";
        termString.forEach(element => {//Construction du WHERE
          if(termString.indexOf(element) === termString.length-1){
              clause = clause.concat(element);
          } else{
              clause = clause.concat(element).concat("AND ");
          }
        });
        query = query.concat(clause);
      } else {//Cas où il y a un string et un int dans la recherche, on ajoute les mots (Fait suite à la query où on a d'abord traité les nombres)
        query = query.concat("(").concat(nom).concat(" OR ").concat(univers).concat(")");
      }
    }
    const boite = await db.any(query);
    return boite;   
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
    const query = `SELECT B.id_boite, nom_boite, lien_img_boi, annee_sortie_boi, nbr_pieceboi, univers, numero_boi FROM $1:name AS B INNER JOIN photo_boite AS P ON B.id_boite = P.id_boite`;
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