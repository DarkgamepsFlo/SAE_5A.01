import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import ConnexionService from '../../services/ConnexionService';

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
    async connexionUtilisateur() {
      const donneesConnexion = {
        pseudo: this.utilisateur.pseudo,
        motDePasse: this.utilisateur.motDePasse,
      }

      const response = await ConnexionService.connexionUtilisateur(donneesConnexion)
      
      this.utilisateur = {
        pseudo: '',
        motDePasse: '',
      };

      if (response.success === true) {
          // Réinitialisez le formulaire
          Cookies.set("connexion", JSON.stringify(response), { expires: 1/24 });
          // Redirigez l'utilisateur vers la page d'accueil
          window.location.href = "http://127.0.0.1:5173/accueil";
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: response.message
          });
          console.error(response.message);
        }
      }
  },
};