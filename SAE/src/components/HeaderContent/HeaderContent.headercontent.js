export default {
    // data() {
    //   return {
    //     message: "SUUUUUUUUU"
    //   };
    // },
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