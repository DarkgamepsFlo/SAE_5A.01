<template>
    <div id="blockMenuDroit">
      <h1 id="titreMenuDroit">MENU</h1>
      <div v-if="isAlreadyRegistered">
        <!-- Contneu lorsque l'utilisateur est connecté -->
        <div class="boutonMenuDroit"><router-link to="/collection">Ma collection</router-link></div>
        <div class="boutonMenuDroit"><router-link to="/wishlist">Ma wishlist</router-link></div>
        <div class="boutonMenuDroit"><router-link to="/profil">Mon profil</router-link></div>
        <button @click="deconnexion" id="boutonDeco">Déconnexion</button>
      </div>
      <div v-else>
        <div class="boutonMenuDroit"><router-link to="/inscription">S'inscrire</router-link></div>
        <div class="boutonMenuDroit"><router-link to="/connexion">Se connecter</router-link></div>
        <div class="boutonMenuDroit"><router-link to="/mdp">Mot de passe oublié</router-link> </div>
      </div>
    </div>
</template>
    
<style src="./MenuDroit.menudroit.scss"></style>
<script src="./MenuDroit.menudroit.js"></script>