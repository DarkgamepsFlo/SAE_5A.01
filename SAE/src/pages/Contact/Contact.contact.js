// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!! NE PAS mettre axios ici mais dans un service !!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import RecupererInformationUser from '../../services/RecupererInformationUser';
import ContactService from '../../services/ContactService';

export default {
  data() {
    return {
      contact: {
        sujet: '',
        message: '',
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
      Swal.fire({
        title: 'Erreur',
        text: 'Vous devez être connecté pour accéder à cette page',
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
        window.location.href = '../Connexion';
        return false
        }
      });
      return false
    }
  },
  methods: {
    async envoyerMessage() {
      // Validez les données du formulaire ici

      const tokenDecoded = await RecupererInformationUser.getToken();

      const donneesMessage = {
        sujet: this.contact.sujet,
        message: this.contact.message,
        email: tokenDecoded.info.adresse_mail_uti,
        pseudo: tokenDecoded.info.pseudo_uti
      };

      const result = await ContactService.contact(donneesMessage);
      
      if (result.success === true){

        Swal.fire({
          title: result.message,
          icon: 'success',
          allowOutsideClick: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Accueil',
          customClass: {
            container: 'custom-sweetalert-container',
            title: 'custom-sweetalert-title',
            content: 'custom-sweetalert-text',
          },
          background: 'var(--color-background)',

        }).then((result) => {

        if (result.isConfirmed) {

          this.contact = {
            sujet: '',
            message: '',
          };
          this.image = null
          
          window.location.href = '../accueil';
          return;
        }});
      } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: result.message
          });
          console.error(result.message);
      }
    },
  },
};