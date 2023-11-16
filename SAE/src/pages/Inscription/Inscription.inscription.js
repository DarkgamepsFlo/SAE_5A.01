import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import InscriptionService from '../../services/InscriptionService.js';
import DemandeMotDePasseService from '../../services/DemandeMotDePasseService.js';

export default {
  data() {
    return {
      utilisateur: {
        pseudo: '',
        motDePasse: '',
        email: '',
        codeBase: '',
        code: 0
      },
      confirmationMotDePasse: '',
      boutonPressed: false,
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
    },
    codeSend() {
      return this.boutonPressed;
    }
  },
  methods: {
    async verifInformationCode() {

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
        } else {
          this.boutonPressed = true;

          const donneesCode = {
            email: this.utilisateur.email,
            inscrpt: true
          }

          console.log("données qui vont être envoyé")
          console.log(donneesCode)

          const response = await DemandeMotDePasseService.demandeMotDePasse(donneesCode);

          if (response.success) {
            console.info("Mail envoyé avec succès")
              
            this.utilisateur.code = response.message;
            this.boutonPressed = true;
          }

          // Sinon on précise qu'il y a un problème au niveau de l'envoie et en refresh la page
          else{
            console.error('Problème au niveau de l\'envoie du mail');
            // Réinitialisez le formulaire
            this.utilisateur = {
              email: '',
              code: '',
              codeBase: '',
              motDePasse: '',
            };
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

    async inscrireUtilisateur() {
      if (this.utilisateur.codeBase === this.utilisateur.code){
        console.info('Votre code est validé');

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
      else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Veuillez recopier le code envoyé par mail !'
        });
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