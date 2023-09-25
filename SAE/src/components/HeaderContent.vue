<template>
  <header>
    <button type="submit" id="boutonMenu" @click="toggleMenuGauche"> <img src="../assets/img/menuButton.png" id="imgBoutonMenu"></button>
    <router-link to="/accueil"><a href="#" id="bouttonLogo"><div id="divImgLogo"><img src="../assets/img/logo.png" id="imgLogo"></div></a></router-link>
    <button type="submit" id="boutonProfil" @click="toggleMenuDroit"><img src="../assets/img/boutonCon.png" id="imgProfil"></button>
    <!-- <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" /> -->
    <!-- <button @click="sendMessage(message)">Envoyer un message</button> -->
    <!-- <button @click="toggleMenuGauche">Afficher/Masquer Menu Gauche</button>
    <router-link to="/accueil">Accueil</router-link>
    <router-link to="/connexion">Connectez-vous</router-link>
    <router-link to="/cookie">COOKIE TEST</router-link> -->
    <!-- <router-link to="/bddTest">BDD TEST</router-link> -->
    <!-- <button @click="toggleMenuDroit">Afficher/Masquer Menu Droit</button> -->
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
header{
    background-image: url("../assets/img/headerImg.png");
    height: 220px;
    width: 100%;
}

#imgProfil{
    float: right;
}

#boutonProfil{
    background: transparent;
    border-color: transparent;
}

#boutonMenu{
    background: transparent;
    border-color: transparent;
}
#imgBoutonMenu{
    height: 100px;
    margin-top: -50px;
}
#imgLogo{
    height: 220px;
}
#divImgLogo{
    display: inline-block;
    margin-left: 40%;
}
  /* Styles pour l'en-tête */
</style>