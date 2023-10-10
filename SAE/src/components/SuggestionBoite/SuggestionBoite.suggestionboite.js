import SuggestionService from "../../services/SuggestionService";

export default {
    props: {
        suggestion: Object, //Objet user qui contient les données de la boite
    },
    methods: {
        async ajouterDansBDD() {
            const result = await SuggestionService.addSuggestion(this.suggestion)
            if(result.success){
                window.location.href = "http://127.0.0.1:5173/profil";
            }
        },
        async supprimerDeBDD() {
            const result = await SuggestionService.removeSuggestion(this.suggestion)
            if(result.success){
                window.location.href = "http://127.0.0.1:5173/profil";
            }
        },
        async modifierDansBDD() {
            const result = await SuggestionService.modifSuggestion(this.suggestion)
            if(result.success){
                window.location.href = "http://127.0.0.1:5173/profil";
            }
        }
    }
}