const conf = require('../../conf.json')
const db = require('../../services/db/connection'); // Assurez-vous que le chemin est correct

//1//
//Cette fonction va permettre d'insérer une suggestion dans la base de données
async function insertSuggestion(donnee){
    try {
        const queryInsert = "INSERT INTO suggestion(nom_boite_sugg, numero_boite_sugg, univers_sugg, nbr_piece_sugg, description_sugg, annee_sortie_sugg, id_uti) VALUES ($1, $2, $3, $4, $5, $6, $7)";
        const resultInsert = await db.any(queryInsert, [donnee.nomBoite, donnee.numBoite, donnee.univers, donnee.NbrPiece, donnee.descriptif, donnee.anneeSortie, 1]);
        console.log(resultInsert);
        return{
            success: true
        };
    } catch (e) {
        console.log(`Il y a une erreur dans la fonction insertSuggestion : ${e}`);
        throw e;
    }
}

module.exports = {
    insertSuggestion,
  };