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
        Swal.fire({
          title: 'Vous êtes déjà connecté !',
          icon: 'error',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          customClass: {
            container: 'custom-sweetalert-container',
            title: 'custom-sweetalert-title',
            content: 'custom-sweetalert-text',
          },
          background: 'var(--color-background)',
        }).then((result) => {
          if (result.isConfirmed) {
          window.location.href = '../accueil';
          }
        });
        return true
      }
      return false
    }
  },
  methods: {
    async connexionUtilisateur() {

      const result = this.isAlreadyAcceptCookie();

      if (result == true){
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
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: response.message
          });
          console.error(response.message);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Vous devez accepter les cookies nécessaire pour pouvoir vous connecter',
          showDenyButton: true,
          confirmButtonText: 'Accepter',
          denyButtonText: `En savoir plus`,
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
              Cookies.set("acceptCookie", true, { expires: 1/24 });
              window.location.href = "http://127.0.0.1:5173/connexion";
            } else if (result.isDenied) {
              window.location.href = "http://127.0.0.1:5173/cookies";
            }
        })
      }
    },
    isAlreadyAcceptCookie() {
      // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
      const cookieValue = Cookies.get('acceptCookie');
      if (cookieValue != undefined && cookieValue == "true") {
        return true
      }
      return false
    }
  },
};