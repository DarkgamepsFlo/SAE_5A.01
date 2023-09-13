// import
const { getCollection } = require('../../../src/services/db/connection');

/**
 * Cette fonction va permettre de récupérer la liste de m'ensemble des utilisateurs
 * @param {*} collectionName Nom de la collection 
 * @returns Du code HTML qui va être reconnu par pug
 */
async function findUsers(collectionName) {
    try {
  
      // On va récupérer l'ensemble des éléments dans la table users
      const collection = getCollection(collectionName);
      const query = {};
      const options = {
        sort: { name: 1 },
        projection: { _id: 0, name: 1 },
      };
      const cursor = collection.find(query, options);
  
      // On va ajouter chaque résultat dans une liste qu'on va afficher
      const result = [];
      await cursor.forEach((item) => {
        result.push(item);
      });

      console.log("oui")
  
      return result;
    } catch(e) {
      console.log(`Il y a une erreur dans la fonction findUsers : ${e}`)
      throw e;
      }
  }
  
  module.exports = {
    findUsers
};