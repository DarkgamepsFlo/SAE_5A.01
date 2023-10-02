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
        return true
      }
      return false
    }
  },
  methods: {
    async inscrireUtilisateur() {
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

      if (response.success === true) {
        this.confirmationMotDePasse = '';
        Cookies.set("connexion", JSON.stringify(response), { expires: 1 });
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
    },
  },
};