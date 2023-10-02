import axios from 'axios';
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
          return true
        }
        return false
      },
      isAlreadyPressed() {
        return this.boutonPressed;
      },
      codeRecive() {
        return this.afficherForm;
      },
      codeCorrect() {
        return this.afficherNewPassword;
      }
    },
    methods: {
      async demandeMotDePasse() {

        this.boutonPressed = true;
        
        const donneesMotDePasse = {
          email: this.utilisateur.email
        }

        const response = await DemandeMotDePasseService.demandeMotDePasse(donneesMotDePasse)
  
        if (response.success) {
            console.info("Mail envoyé avec succès")
              
            this.utilisateur.code = response.message;
            this.afficherForm = true;
            this.boutonPressed = false;
        }

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

    acceptCode() {
        console.log("AAAAAAAAAAAAAAAAAAAAA");
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

      async changerPassword() {

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
