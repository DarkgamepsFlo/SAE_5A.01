<template>
    <div id="blockInscription" v-if="!isAlreadyRegistered">
      <h1 class="titreBlock">INSCRIPTION</h1>
      <div v-if="codeSend">
        Veuillez indiquer le code reçu par mail :
        <form @submit.prevent="inscrireUtilisateur">
          <div>
            <label for="code" class="labelForm">Code:</label>
            <input type="password" id="code" class="inputForm" v-model="utilisateur.codeBase" required />
          </div>
          <div id="divBoutonVerifieCode" class="divBoutonPrincipal"><button type="submit" id="boutonVerifieCode" class="boutonPrincipal"><span id="spanVerifieCode" class="spanBoutonPrincipal">Vérifier le code</span> </button></div>
        </form>
      </div>
      <div v-else>
        <form @submit.prevent="verifInformationCode">
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