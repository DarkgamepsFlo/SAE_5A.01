<template>
    <header>
      <button type="submit" id="boutonMenu" @click="toggleMenuGauche"> <img src="../../assets/img/menuButton.png" id="imgBoutonMenu"></button>
      <router-link to="/accueil"><a href="#" id="bouttonLogo"><div id="divImgLogo"><img src="../../assets/img/logo.png" id="imgLogo"></div></a></router-link>
      <button type="submit" id="boutonProfil" @click="toggleMenuDroit">
        <img v-if='isAlreadyRegistered' src="../../assets/img/boutonCon.png" id="imgProfil">
        <img v-else src="../../assets/img/bouton.png" id="imgProfil">
      </button>
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

<style src="./HeaderContent.headercontent.scss"></style>
<script src="./HeaderContent.headercontent.js"></script>