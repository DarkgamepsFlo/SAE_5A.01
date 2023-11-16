import Cookies from 'js-cookie';
import RecupererInformationUser from '../../services/RecupererInformationUser';

export default {
  data(){
    return{
      isAdmin: false, // Contient si l'utilisateur est un administrateur du site ou non
    }
  },
    computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
        const cookieValue = Cookies.get('connexion');
        if (cookieValue) {
          return true
        }
        return false
      },
      isAdminFonc(){
        if (this.isAlreadyRegistered()){
          if (this.isAdmin){
            return true
          }
          return false
        }
      }
    },
    methods: {
      // Permet d'afficher le menu de gauche
      toggleMenuGauche() {
        // Émettre un événement vers le composant parent pour afficher ou masquer le menu
        this.$emit("toggle-menu-gauche");
      },
      // Permet d'afficher le menu de droite
      toggleMenuDroit() {
        // Émettre un événement vers le composant parent pour afficher ou masquer le menu
        this.$emit("toggle-menu-droit");
      }
    },
    async mounted() {
      const resultToken = await RecupererInformationUser.getToken();
      this.isAdmin = resultToken.info.admin_uti
    }
  };