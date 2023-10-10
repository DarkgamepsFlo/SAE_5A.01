const conf = require('../../conf.json')
const db = require('../../services/db/connection'); // Assurez-vous que le chemin est correct

//1//
//Cette fonction va permettre d'insérer une suggestion dans la base de données
async function insertSuggestion(donnee){
    try {
        console.log("DONNNNEEEE : ");
        console.log(donnee)

        const querySelectDejaPresent = "SELECT id_suggestion FROM suggestion WHERE lower(nom_boite_sugg) like lower($1) and numero_boite_sugg = $2 and univers_sugg like $3 and nbr_piece_sugg = $4 and annee_sortie_sugg = $5";
        const resultSelectDejaPresent = await db.any(querySelectDejaPresent, [donnee.nomBoite, donnee.numBoite, donnee.univers, donnee.NbrPiece, donnee.anneeSortie]);
        
        if(!resultSelectDejaPresent.length){

            const queryInsert = "INSERT INTO suggestion(nom_boite_sugg, numero_boite_sugg, univers_sugg, nbr_piece_sugg, description_sugg, annee_sortie_sugg, type_sugg, id_uti) VALUES ($1, $2, $3, $4, $5, $6, 'ajout', $7)";
            await db.any(queryInsert, [donnee.nomBoite, donnee.numBoite, donnee.univers, donnee.NbrPiece, donnee.descriptif, donnee.anneeSortie, donnee.id_uti]);
            
            const querySelectAddImg = "SELECT id_suggestion FROM suggestion WHERE nom_boite_sugg like $1 and numero_boite_sugg = $2 and univers_sugg like $3 and nbr_piece_sugg = $4 and description_sugg like $5 and annee_sortie_sugg = $6";
            const resultSelectAddImg = await db.any(querySelectAddImg, [donnee.nomBoite, donnee.numBoite, donnee.univers, donnee.NbrPiece, donnee.descriptif, donnee.anneeSortie]);

            const queryInsertImage = "INSERT INTO image_suggestion(lien_img_sugg, id_suggestion) VALUES ($1, $2)";
            await db.any(queryInsertImage, [donnee.imgBoite, resultSelectAddImg[0].id_suggestion]);
        
            return{
                success: true
            };
        }
        else{
            console.log("Il est déjà présent")
            return{
                success: false,
                message: "La boite que vous voulez ajouter est déjà présente !"
            };
        }
    } catch (e) {
        console.log(`Il y a une erreur dans la fonction insertSuggestion : ${e}`);
        throw e;
    }
}

// 2 //
async function findSuggestions(){
    try {

        const querySelectSuggestion = "SELECT s.*, imgs.lien_img_sugg FROM suggestion s inner join image_suggestion imgs on imgs.id_suggestion = s.id_suggestion";
        const resultSelectSuggestion = await db.any(querySelectSuggestion);

        console.log(resultSelectSuggestion)
        
        if(!resultSelectSuggestion.length){
            console.log("Il n'y a pas de suggestion")
            return{
                success: false,
            };
        }
        else{
            console.log("Il y a des / une suggestion(s)")
            return {
                success: true,
                suggest: resultSelectSuggestion
            }
        }
    } catch (e) {
        console.log(`Il y a une erreur dans la fonction findSuggestions : ${e}`);
        throw e;
    }
}

// 3 //
async function addSuggestions(donnee){
    try {
        const queryInsertSuggestion = "INSERT INTO boite(nom_boite, numero_boi, univers, nbr_pieceboi, descriptif_boi, annee_sortie_boi) VALUES ($1, $2, $3, $4, $5, $6)";
        await db.any(queryInsertSuggestion, [donnee.nom_boite_sugg, donnee.numero_boite_sugg, donnee.univers_sugg, donnee.nbr_piece_sugg, donnee.description_sugg, donnee.annee_sortie_sugg]);

        const querySelectSuggestionInsert = "SELECT id_boite FROM boite WHERE nom_boite like $1 and numero_boi = $2 and univers like $3 and nbr_pieceboi = $4 and descriptif_boi like $5 and annee_sortie_boi = $6"
        const resultSelectSuggestionInsert = await db.any(querySelectSuggestionInsert, [donnee.nom_boite_sugg, donnee.numero_boite_sugg, donnee.univers_sugg, donnee.nbr_piece_sugg, donnee.description_sugg, donnee.annee_sortie_sugg])

        const queryInsertImage = "INSERT INTO photo_boite(lien_img_boi, id_boite) VALUES ($1, $2)";
        await db.any(queryInsertImage, [donnee.lien_img_sugg, resultSelectSuggestionInsert[0].id_boite]);

        const queryDeleteImage = "DELETE FROM image_suggestion WHERE id_suggestion = $1"
        await db.any(queryDeleteImage, [donnee.id_suggestion])

        const queryDeleteSugg = "DELETE FROM suggestion WHERE id_suggestion = $1"
        await db.any(queryDeleteSugg, [donnee.id_suggestion])

        return{
            success: true,
        };

    } catch (e) {
        console.log(`Il y a une erreur dans la fonction findSuggestions : ${e}`);
        throw e;
    }
}


// 4 //
async function removeSuggestions(donnee){
    try {
        const queryDeleteImage = "DELETE FROM image_suggestion WHERE id_suggestion = $1"
        await db.any(queryDeleteImage, [donnee.id_suggestion])

        const queryDeleteSugg = "DELETE FROM suggestion WHERE id_suggestion = $1"
        await db.any(queryDeleteSugg, [donnee.id_suggestion])

        return{
            success: true,
        };

    } catch (e) {
        console.error(`Il y a une erreur dans la fonction findSuggestions : ${e}`);
        throw e;
    }
}

// 5 //
async function updateSuggestions(donnee){
    try {










        
        const queryDeleteImage = "DELETE FROM image_suggestion WHERE id_suggestion = $1"
        await db.any(queryDeleteImage, [donnee.id_suggestion])

        const queryDeleteSugg = "DELETE FROM suggestion WHERE id_suggestion = $1"
        await db.any(queryDeleteSugg, [donnee.id_suggestion])

        return{
            success: true,
        };

    } catch (e) {
        console.error(`Il y a une erreur dans la fonction findSuggestions : ${e}`);
        throw e;
    }
}

module.exports = {
    insertSuggestion,
    findSuggestions,
    addSuggestions,
    removeSuggestions,
    updateSuggestions,
  };