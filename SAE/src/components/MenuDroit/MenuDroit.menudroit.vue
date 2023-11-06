<template>
    <div>
      <h1>MENU</h1>
      <div v-if="isAlreadyRegistered">
        <!-- Contneu lorsque l'utilisateur est connecté -->
        <button @click="deconnexion">Déconnexion</button>
        <router-link to="/collection">Ma collection</router-link>
        <router-link to="/wishlist">Ma wishlist</router-link>
        <router-link to="/profil">Mon profil</router-link>
      </div>
      <div v-else>
        <router-link to="/connexion">Se connecter</router-link>
        <router-link to="/mdp">Mot de passe oublié</router-link> 
      </div>
    </div>
</template>
    
<style src="./MenuDroit.menudroit.scss"></style>
<script src="./MenuDroit.menudroit.js"></script>