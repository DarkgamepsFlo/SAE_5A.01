<template>
    <div>
      <h1>TEST DE BDD</h1>
      <button @click="envoyerRequete">Envoyer la requête</button>
      <div v-if="resultatRequete">
        <!-- Affichez le résultat ici -->
        <p>Résultat de la requête : {{ resultatRequete }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        resultatRequete: null, // Initialisez la variable de résultat à null
      };
    },
    methods: {
      envoyerRequete() {
        axios
          .get('http://localhost:3000/users/findUser')
          .then(response => {
            // Mettez à jour la variable de résultat avec la réponse
            this.resultatRequete = response.data;
          })
          .catch(error => {
            console.error('Erreur de requête :', error);
          });
      },
    },
  };
  </script>
  
    