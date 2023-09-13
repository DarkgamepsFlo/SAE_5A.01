<template>
    <div>
      <h1>C'est le menu de Droite !!!</h1>
      <!-- Contneu lorsque l'utilisateur est connecté -->
        <div v-if="isContentVisible">
            <button>Déconnexion</button>
            <router-link to="/collection">Ma collection</router-link>
            <router-link to="/wichlist">Ma WichList</router-link>
            <router-link to="/profil">Mon profil</router-link>
        </div>
        <!-- Contenu lorsque l'utilisateur n'est pas connecté -->
        <div v-else>
            <router-link to="/connexion">Se connecter</router-link>
            <router-link to="/mdp">Mot de passe oublié</router-link>       
        </div>
      
    </div>
  </template>
    
  <script>
    // Import
    export default {
        data() {
            return {
                isContentVisible: true // Ce sera plus tard le cookie permettant de savoir si l'utilisateur est connecté ou non, pour l'instant je le change manuellement
            };
        }
    };
  </script>
    
    
  