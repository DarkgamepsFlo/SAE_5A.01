<template>
  <header>
    <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />

    <h1>Mon application</h1>
    <!-- <button @click="sendMessage(message)">Envoyer un message</button> -->
    <button @click="toggleMenuGauche">Afficher/Masquer Menu Gauche</button>
    <router-link to="/accueil">Accueil</router-link>
    <router-link to="/connexion">Connectez-vous</router-link>
    <router-link to="/cookie">COOKIE TEST</router-link>
    <!-- <router-link to="/bddTest">BDD TEST</router-link> -->
    <button @click="toggleMenuDroit">Afficher/Masquer Menu Droit</button>
  </header>
</template>
  
<script>
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
</script>
  
<style scoped>
  /* Styles pour l'en-tête */
</style>