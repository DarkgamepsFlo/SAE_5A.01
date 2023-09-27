import axios from 'axios';
  import Cookies from 'js-cookie';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        suggestion: {
          nomBoite: '',
          numBoite: '',
          univers: '',
          NbrPiece: '',
          anneeSortie: '',
          descriptif: '',
        },
      };
    },
    computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
       // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
        return Cookies.get('connexion') === 'Y';
      },
    },
    methods: {
      submitSuggestion() {
        const donneesSuggestion = {
          nomboite: this.nomBoite,
          numBoite: this.numBoite,
          univers: this.univers,
          NbrPiece: this.NbrPiece,
          anneeSortie: this.anneeSortie,
          descriptif: this.descriptif,
        }
  
        axios
          .post('http://localhost:3000/suggestion/add', donneesSuggestion)
          .then(response => {
            // Réinitialisez le formulaire
            this.suggestion = {
              nomBoite: '',
              numBoite: '',
              univers: '',
              NbrPiece: '',
              anneeSortie: '',
              descriptif: '',
            };

            if (response.data.success === true){
              console.log("MARCHE !!!")
  
              // Redirigez l'utilisateur vers la page d'accueil
              //window.location.href = "http://127.0.0.1:5173/accueil";
            }
  
            else{
              Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: response.data.message
              });
              console.error(response.data.message);
            }
          })
          .catch(error => {
            console.error("Il y a une erreur :", error);
          });
      },
    },
  };