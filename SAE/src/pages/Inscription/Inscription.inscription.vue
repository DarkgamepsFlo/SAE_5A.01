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
          <label for="utilisateur" id="labelUtilisateur">Pseudo:</label>
          <input type="text" id="utilisateur" v-model="utilisateur.pseudo" required />
        </div>
        <div id="divadresseMail">
          <label for="adresseMail" id="labelAdresseMail">Adresse e-mail:</label>
          <input type="email" id="adresseMail" v-model="utilisateur.email" required />
        </div>
        <div id="divMdp">
          <label for="mdp" id="labelMdp">Mot de passe:</label>
          <input type="password" id="mdp" v-model="utilisateur.motDePasse" required />
        </div>
        <div id="divConfirmationMdp">
          <label for="confirmationMdp" id="labelConfirmationMdp">Confirmation du mot de passe:</label>
          <input type="password" id="confirmationMdp" v-model="confirmationMotDePasse" required />
        </div>
  
        <div id="divBoutonEnvoie"><button type="submit" id="boutonEnvoie"><span id="spanEnvoie">M'inscrire</span> </button></div>
      </form>
      </div>
    </div>
  </template>

<script src="./Inscription.inscription.js"></script>
<style src="./Inscription.inscription.scss"></style>