<template>
  <div>
    <!-- Vérification de la présence du cookie "connexion" et de sa valeur -->
    <div id="blockConnexion" v-if="!isAlreadyRegistered">
      <h1 class="titreBlock" id="titreConnexion">CONNEXION</h1>
      <form @submit.prevent="connexionUtilisateur">
      <div>
        <label for="pseudo" id="labelPseudo" class="labelForm">Pseudo:</label>
        <input type="text" id="pseudo" class="inputForm" v-model="utilisateur.pseudo" required />
      </div>
      <div>
        <label for="motDePasse" id="labelMPD" class="labelForm">Mot de passe:</label>
        <input type="password" id="motDePasse" class="inputForm" v-model="utilisateur.motDePasse" required />
      </div>
      <div id="divBoutonConnexion" class="divBoutonPrincipal"><button type="submit" id="boutonConnexion" class="boutonPrincipal"><span id="spanConnexion" class="spanBoutonPrincipal">Se connecter</span> </button></div>
    </form>
    </div>
  </div>
  <div id="otherLink">
    <router-link to="/mdp"><h2>Mot de passe oublié</h2></router-link>
    <router-link to="/inscription"><h2>Pas encore de compte ?</h2></router-link>
  </div>
</template>

<style src="./Connexion.connexion.scss"></style>
<script src="./Connexion.connexion.js"></script>