const conf = require('../conf.json');
const { insertSuggestion } = require("../services/db/crudSuggestion");

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
            anneeSortie: body.anneeSortie
        }
        const result = await insertSuggestion(donnee);
        console.log("RESULT : ", result);

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
        console.log(`Il y a une erreur dans la fonction ajoutBoite : ${e}`);
        throw e;
    }
}

module.exports = {
    ajoutBoite,
  };