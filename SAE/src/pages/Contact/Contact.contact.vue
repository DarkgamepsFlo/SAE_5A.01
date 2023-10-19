<template>
    <div id="blockContact">
        <h1 class="titreBlock">CONTACT</h1>
        <form @submit.prevent="contact"> <!-- Changer le contact en un nom de fonction -->
        <div id="divSujet">
          <label for="sujet" id="labelSujet" class="labelForm">Sujet:</label>
          <!-- GARDE CA SINON PAS COIFFETON SHINY : v-model="utilisateur.sujet" required -->
          <input type="text" id="sujet" class="inputForm" v-model="contact.sujet" required />
        </div>
        <div id="divMessage">
          <label for="message" id="labelMessage" class="labelForm">Message:</label>
          <input type="text" id="message" class="inputForm" v-model="contact.message" required />
        </div>
        <div id="divBoutonContact" class="divBoutonPrincipal"><button type="submit" id="boutonContact" class="boutonPrincipal"><span id="spanContact" class="spanBoutonPrincipal">Envoyer</span> </button></div>
      </form>
    </div>
  </template>

<style src="./Contact.contact.scss"></style>
<script src="./Contact.contact.js"></script>