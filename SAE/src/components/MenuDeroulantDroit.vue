<template>
    <div>
      <h1>C'est le menu de Droite !!!</h1>
      <div v-if="isAlreadyRegistered">
        <!-- Contneu lorsque l'utilisateur est connecté -->
        <button @click="deconnexion">Déconnexion</button>
        <router-link to="/collection">Ma collection</router-link>
        <router-link to="/wichlist">Ma WichList</router-link>
        <router-link to="/profil">Mon profil</router-link>
      </div>
      <div v-else>
        <router-link to="/connexion">Se connecter</router-link>
        <router-link to="/mdp">Mot de passe oublié</router-link> 
      </div>
    </div>
  </template>
    
  <script>
    // Import
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                isContentVisible: true // Ce sera plus tard le cookie permettant de savoir si l'utilisateur est connecté ou non, pour l'instant je le change manuellement
            };
        },
        computed: {
            // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
            isAlreadyRegistered() {
            // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
            return Cookies.get('connexion') === 'Y';
            },
        },
        methods: {
        // Cette fonction permet juste de regarder l'ensemble des cookies, elle permet de tester, elle ne va pas rester définitive
        deconnexion() {
            Cookies.remove("connexion");

            // Redirigez l'utilisateur vers la page d'accueil
            window.location.href = "http://127.0.0.1:5173/";
         },      
    }
  };
</script>
    
    
  