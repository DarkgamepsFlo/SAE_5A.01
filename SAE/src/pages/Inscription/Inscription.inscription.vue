<template>
    <div id="blockInscription" v-if="!isAlreadyRegistered">
      <h1 class="titreBlock">INSCRIPTION</h1>
      <div>
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