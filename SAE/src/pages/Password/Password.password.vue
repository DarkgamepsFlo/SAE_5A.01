<template>
  <div class="block" id="blockPassword">
    <h1 class="titreBlock">MOT DE PASSE OUBLIE</h1>
    <div v-if="codeCorrect">
      <form @submit.prevent="changerPassword">
        <p>Veuillez définir un nouveau mot de passe</p>
        <div>
          <label for="motDePasse" class="labelForm">Mot de passe:</label>
          <input type="password" id="motDePasse" class="inputForm" v-model="utilisateur.motDePasse" required />
        </div>
        <div>
          <label for="confirmationMotDePasse" class="labelForm">Confirmation du mot de passe:</label>
          <input type="password" id="confirmationMotDePasse" class="inputForm" v-model="confirmationMotDePasse" required />
        </div>
        <div id="divBoutonChangePassword" class="divBoutonPrincipal"><button type="submit" id="boutonChangePassword" class="boutonPrincipal"><span id="spanChangePassword" class="spanBoutonPrincipal">Changer de mot de passe</span> </button></div>
      </form>
    </div>
    <div v-else>
      <div v-if="codeRecive">
        Veuillez indiquer le code reçu par mail :
        <form @submit.prevent="acceptCode">
          <div>
            <label for="code" class="labelForm">Code:</label>
            <input type="password" id="code" class="inputForm" v-model="utilisateur.codeBase" required />
          </div>
          <div id="divBoutonVerifieCode" class="divBoutonPrincipal"><button type="submit" id="boutonVerifieCode" class="boutonPrincipal"><span id="spanVerifieCode" class="spanBoutonPrincipal">Vérifier le code</span> </button></div>
        </form>
      </div>
      <div v-else>
        <div v-if="isAlreadyRegistered">
          Vous êtes déjà connecté.
        </div>
        <div v-else>
          <form @submit.prevent="demandeMotDePasse">
          <div>
            <label for="email" class="labelForm">Adresse e-mail:</label>
            <input type="email" id="email" class="inputForm" v-model="utilisateur.email" required />
          </div>
          <div id="divBoutonEnvoieMail" class="divBoutonPrincipal"><button type="submit" id="boutonEnvoieMail" class="boutonPrincipal"><span id="spanEnvoieMail" class="spanBoutonPrincipal">Envoyer un mail</span> </button></div>
          <p v-if="isAlreadyPressed">Veuillez patienter, votre demande de code est envoyé</p>
          </form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style src="./Password.password.scss"></style>
<script src="./Password.password.js"></script>