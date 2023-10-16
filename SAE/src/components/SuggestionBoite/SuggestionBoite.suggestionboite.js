import SuggestionService from "../../services/SuggestionService";
import Swal from 'sweetalert2';

export default {
    props: {
        suggestion: Object, //Objet user qui contient les données de la boite
    },
    methods: {
        async ajouterDansBDD() {
            Swal.fire({
                title: 'Voulez-vous valider cette suggestion ?',
                showDenyButton: true,
                confirmButtonText: 'Oui',
                denyButtonText: `Non`,
                allowOutsideClick: false,
                customClass: {
                    container: 'custom-sweetalert-container',
                    title: 'custom-sweetalert-title',
                    content: 'custom-sweetalert-text',
                },
                background: 'var(--color-background)',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const result = await SuggestionService.addSuggestion(this.suggestion)
                    if(result.success){
                        window.location.href = "http://127.0.0.1:5173/profil";
                    }
                } 
            })
            
        },
        async supprimerDeBDD() {
            Swal.fire({
                title: 'Voulez-vous vraiment supprimer cette suggestion ?',
                showDenyButton: true,
                confirmButtonText: 'Oui',
                denyButtonText: `Non`,
                allowOutsideClick: false,
                customClass: {
                    container: 'custom-sweetalert-container',
                    title: 'custom-sweetalert-title',
                    content: 'custom-sweetalert-text',
                },
                background: 'var(--color-background)',
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const result = await SuggestionService.removeSuggestion(this.suggestion)
                    if(result.success){
                        window.location.href = "http://127.0.0.1:5173/profil";
                    }
                }
            })
            
        },
    }
}