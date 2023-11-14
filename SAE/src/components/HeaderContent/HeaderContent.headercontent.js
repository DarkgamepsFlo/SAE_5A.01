import Cookies from 'js-cookie';

export default {
    computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
        const cookieValue = Cookies.get('connexion');
        if (cookieValue) {
          return true
        }
        return false
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
    }
  };