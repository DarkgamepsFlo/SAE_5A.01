import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import DemandeMotDePasseService from '../../services/DemandeMotDePasseService';

export default {
    data() {
      return {
        utilisateur: {
          email: '',
          code: '',
          codeBase: '',
          motDePasse: '',
        },
        afficherForm: false,
        boutonPressed: false,
        afficherNewPassword: false,
        confirmationMotDePasse: ''
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
      // Cette fonction permet de savoir si on a valider son adresse mail
      isAlreadyPressed() {
        return this.boutonPressed;
      },
      // Cette fonction permet d'afficher le formulaire pour valider le code
      codeRecive() {
        return this.afficherForm;
      },
      // Cette fonction permet d'afficher le changement du mot de passe
      codeCorrect() {
        return this.afficherNewPassword;
      }
    },
    methods: {
      // Cette fonction permet de demander un code à partir d'une adresse mail
      async demandeMotDePasse() {

        this.boutonPressed = true;
        
        const donneesMotDePasse = {
          email: this.utilisateur.email,
          inscrpt: false
        }

        console.log("données qui vont être envoyé")
        console.log(donneesMotDePasse)

        const response = await DemandeMotDePasseService.demandeMotDePasse(donneesMotDePasse)
  
        // Si ça marche, on va modifier la page pour afficher le formulaire permettant de valider le code
        if (response.success) {
            console.info("Mail envoyé avec succès")
              
            this.utilisateur.code = response.message;
            this.afficherForm = true;
            this.boutonPressed = false;
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
      },

    // Cette fonction permet de vérifier si le code correspond avec celui par mail.
    acceptCode() {
        if (this.utilisateur.codeBase === this.utilisateur.code){
          console.info('Votre code est validé');

          this.afficherNewPassword = true;
          this.afficherForm = false;
          this.boutonPressed = false;
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez recopier le code envoyé par mail !'
          });
        }
      },

      // Cette fonction permet de changer le mot de passe de l'utilisateur
      async changerPassword() {

        // On va vérifier si les deux mots de passe sont identiques
        if (this.utilisateur.motDePasse !== this.confirmationMotDePasse) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Les mots de passe ne correspondent pas.',
          });
          return;
        }

        const donneeschangerPassword = {
          email: this.utilisateur.email,
          mdp: this.utilisateur.motDePasse,
        }

        const response = await DemandeMotDePasseService.changerMotDePasse(donneeschangerPassword);

        if (response.success) {
          window.location.href = "http://127.0.0.1:5173/connexion";
        }
        
        else{
          console.error('Problème au niveau du changement du mot de passe');
          // Réinitialisez le formulaire
          this.utilisateur.motDePasse = '';
          this.utilisateur.confirmationMotDePasse = '';
        }
      }
    },
  };
