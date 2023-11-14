import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import InscriptionService from '../../services/InscriptionService.js';

export default {
  data() {
    return {
      utilisateur: {
        pseudo: '',
        motDePasse: '',
        email: '',
      },
      confirmationMotDePasse: '',
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
    async inscrireUtilisateur() {

      const result = this.isAlreadyAcceptCookie();

      if (result == true){
        // Validez les données du formulaire ici
        if (this.utilisateur.motDePasse !== this.confirmationMotDePasse) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Les mots de passe ne correspondent pas.',
          });
          return;
        }

        const donneesInscription = {
          pseudo: this.utilisateur.pseudo,
          motDePasse: this.utilisateur.motDePasse,
          email: this.utilisateur.email,
        };

        const response = await InscriptionService.inscrireUtilisateur(donneesInscription);

        // Réinitialisez le formulaire
        this.utilisateur = {
          pseudo: '',
          motDePasse: '',
          email: '',
        };
        this.confirmationMotDePasse = '';

        if (response.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error 400',
            text: response.message
          });
        }
        else {
          if (response.success === true) {
            this.confirmationMotDePasse = '';
            Cookies.set("connexion", JSON.stringify(response), { expires: 1/24 });
            // Redirigez l'utilisateur vers la page d'accueil
            window.location.href = "http://127.0.0.1:5173/accueil";
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: response?.message,
              customClass: {
                container: 'custom-sweetalert-container',
                title: 'custom-sweetalert-title',
                content: 'custom-sweetalert-text',
              },
              background: 'var(--color-background)',
            });
            console.error(response?.message);
          }
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
              window.location.href = "http://127.0.0.1:5173/inscription";
            } else if (result.isDenied) {
              window.location.href = "http://127.0.0.1:5173/cookies";
            }
        })
      }
    },
    // Cette méthode permet de vérifier si l'utilisateur a déjà accepté les cookies
    isAlreadyAcceptCookie() {
      try{
        const cookieValue = Cookies.get('acceptCookie');
        if (cookieValue != undefined && cookieValue == "true") {
          return true
        }
        return false
      } catch(e) {
        Swal.fire({
          icon: 'error',
          title: 'Error 400',
          text: 'Une erreur interne du serveur s\'est produite lors de la vérification des cookies acceptés. Veuillez réessayer plus tard.'
        });
        console.error(e);
      }
    }
  },
};