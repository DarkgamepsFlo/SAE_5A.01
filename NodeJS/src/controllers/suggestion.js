const conf = require('../conf.json');
const { insertSuggestion, findSuggestions, addSuggestions, removeSuggestions, updateSuggestions } = require("../services/db/crudSuggestion");

//1//
//Cette fonction permet de faire appel à la fonction insertSuggestion lorsqu'on se situe sur la bonne URL
async function ajoutBoite(req, res, next){
    try {
        const body = req.body;
        const donnee = {
            nomBoite: body.nomBoite,
            numBoite: body.numBoite,
            univers: body.univers,
            NbrPiece: body.NbrPiece,
            descriptif: body.descriptif,
            anneeSortie: body.anneeSortie,
            imgBoite: body.imgBoite,
            id_uti: body.id_uti,
            num_boite_base: body.num_boite_base
        }
        
        if (!!body.id_boite){
          const type = "modif";
          const id_boite = body.num_boite_base;
          result = await insertSuggestion(donnee, type, id_boite);
        }

        else {
          result = await insertSuggestion(donnee);
        }

        if (result.success) {
          return res.send({
            success: true
          });
        } else {
          return res.send({
            success: false,
            message: result.message
          });
        }
    } catch (e) {
        console.error(`Il y a une erreur dans la fonction ajoutBoite : ${e}`);
        throw e;
    }
}

// 2 // Cette fonction permet de récupérer l'ensemble des suggestions des utilisateurs

async function findSuggestion(req, res, next){
  try {
      
      const result = await findSuggestions();

      if (result.success) {
        return res.send({
          success: true,
          suggest: result
        });
      } else {
        return res.send({
          success: false,
        });
      }
  } catch (e) {
      console.error(`Il y a une erreur dans la fonction findSuggestion : ${e}`);
      throw e;
  }
}

// 3 // Permet d'ajouter une suggestion dans la vraie table de boite
async function addSuggestion(req, res, next){
  try {
      const body = req.body

      const result = await addSuggestions(body);
      console.errpr("RESULT : ", result);

      if (result.success) {
        return res.send({
          success: true
        });
      } else {
        return res.send({
          success: false
        });
      }
  } catch (e) {
      console.error(`Il y a une erreur dans la fonction findSuggestion : ${e}`);
      throw e;
  }
}


// 4 // Permet d'enlever une suggestion dans la vraie table de boite
async function removeSuggestion(req, res, next){
  try {
      const body = req.body
      const result = await removeSuggestions(body);
      console.error("RESULT : ", result);

      if (result.success) {
        return res.send({
          success: true
        });
      } else {
        return res.send({
          success: false
        });
      }
  } catch (e) {
      console.error(`Il y a une erreur dans la fonction findSuggestion : ${e}`);
      throw e;
  }
}

module.exports = {
    ajoutBoite,
    findSuggestion,  
    addSuggestion,
    removeSuggestion,
  };
