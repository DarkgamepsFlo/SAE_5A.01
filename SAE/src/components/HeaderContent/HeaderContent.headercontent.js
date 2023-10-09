import Cookies from 'js-cookie';

export default {
    // data() {
    //   return {
    //     message: "SUUUUUUUUU"
    //   };
    // },
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
      // sendMessage(message) {
      //   // Mettez à jour la propriété message avec le message à envoyer
      //   this.$emit("message-updated", message);
      // },
      toggleMenuGauche() {
        // Émettre un événement vers le composant parent pour afficher ou masquer le menu
        this.$emit("toggle-menu-gauche");
      },
      toggleMenuDroit() {
        // Émettre un événement vers le composant parent pour afficher ou masquer le menu
        this.$emit("toggle-menu-droit");
      }
    }
  };