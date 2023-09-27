import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      utilisateur: {
        pseudo: '',
        motDePasse: '',
      },
    };
  },
  computed: {
    // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
    isAlreadyRegistered() {
      // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
      return false
    }
  },
  methods: {
    connexionUtilisateur() {
      const donneesConnexion = {
        pseudo: this.utilisateur.pseudo,
        motDePasse: this.utilisateur.motDePasse,
      }

      axios
        .post('http://localhost:3000/users/connexion', donneesConnexion)
        .then(response => {
          // Réinitialisez le formulaire
          this.utilisateur = {
            pseudo: '',
            motDePasse: '',
          };

          if (response.data.success === true){

            Cookies.set("connexion", JSON.stringify(response.data), { expires: 1 });

            // Redirigez l'utilisateur vers la page d'accueil
            window.location.href = "http://127.0.0.1:5173/accueil";
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