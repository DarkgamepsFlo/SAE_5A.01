<template>
    <div id="blockInscription">
      <h1>INSCRIPTION</h1>
      <!-- Vérification de la présence du cookie "connexion" et de sa valeur -->
      <div v-if="isAlreadyRegistered">
        Vous êtes déjà connecté.
      </div>
      <div v-else>
        <form @submit.prevent="inscrireUtilisateur">
        <div id="divUtilisateur">
          <label for="utilisateur" id="labelUtilisateur" class="labelForm">Pseudo:</label>
          <input type="text" id="utilisateur" class="inputForm" v-model="utilisateur.pseudo" required />
        </div>
        <div id="divadresseMail">
          <label for="adresseMail" id="labelAdresseMail" class="labelForm">Adresse e-mail:</label>
          <input type="email" id="adresseMail" class="inputForm" v-model="utilisateur.email" required />
        </div>
        <div id="divMdp">
          <label for="mdp" id="labelMdp" class="labelForm">Mot de passe:</label>
          <input type="password" id="mdp" class="inputForm" v-model="utilisateur.motDePasse" required />
        </div>
        <div id="divConfirmationMdp">
          <label for="confirmationMdp" id="labelConfirmationMdp" class="labelForm">Confirmation du mot de passe:</label>
          <input type="password" id="confirmationMdp" class="inputForm" v-model="confirmationMotDePasse" required />
        </div>
  
        <div id="divBoutonEnvoie" class="divBoutonPrincipal"><button type="submit" id="boutonEnvoie" class="boutonPrincipal"><span id="spanEnvoie" class="spanBoutonPrincipal">M'inscrire</span> </button></div>
      </form>
      </div>
    </div>
  </template>

<script src="./Inscription.inscription.js"></script>
<style src="./Inscription.inscription.scss"></style>