<template>
  <h1>Mot de passe oublié : Coiffeton Shiny</h1>
  <div v-if="codeCorrect">
    <form @submit.prevent="changerPassword">
      <p>Veuillez définir un nouveau mot de passe</p>
      <div>
        <label for="motDePasse">Mot de passe:</label>
        <input type="password" id="motDePasse" v-model="utilisateur.motDePasse" required />
      </div>
      <div>
        <label for="confirmationMotDePasse">Confirmation du mot de passe:</label>
        <input type="password" id="confirmationMotDePasse" v-model="confirmationMotDePasse" required />
      </div>
      <button type="submit">Changer de mot de passe</button>
    </form>
  </div>
  <div v-else>
    <div v-if="codeRecive">
      Veuillez indiquer le code reçu par mail :
      <form @submit.prevent="acceptCode">
        <div>
          <label for="code">Code:</label>
          <input type="password" id="code" v-model="utilisateur.codeBase" required />
        </div>
        <button type="submit">Vérifier le code</button>
      </form>
    </div>
    <div v-else>
      <div v-if="isAlreadyRegistered">
        Vous êtes déjà connecté.
      </div>
      <div v-else>
        <form @submit.prevent="demandeMotDePasse">
        <div>
          <label for="email">Adresse e-mail:</label>
          <input type="email" id="email" v-model="utilisateur.email" required />
        </div>
        <button type="submit">Envoyer un mail</button>
        <p v-if="isAlreadyPressed">Veuillez patienter, votre demande de code est envoyé</p>
        </form>
      </div>
    </div>
  </div>
  
</template>

<style src="./Password.password.scss"></style>
<script src="./Password.password.js"></script>