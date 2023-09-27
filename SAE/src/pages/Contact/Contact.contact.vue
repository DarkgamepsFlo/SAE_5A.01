<template>
    <div id="blockContact">
        <h1>CONTACT</h1>
        <form @submit.prevent="contact">
        <div id="divSujet">
          <label for="sujet" id="labelSujet">Sujet:</label>
          <!-- GARDE CA SINON PAS COIFFETON SHINY : v-model="utilisateur.sujet" required -->
          <input type="text" id="sujet" v-model="contact.sujet" required />
        </div>
        <div id="divMessage">
          <label for="message" id="labelMessage">Message:</label>
          <input type="text" id="message" v-model="contact.message" required />
        </div>
        <div id="divBoutonContact"><button type="submit" id="boutonContact"><span id="spanContact">Envoyer</span> </button></div>
      </form>
    </div>
  </template>

<style src="./Contact.contact.scss"></style>
<script src="./Contact.contact.js"></script>