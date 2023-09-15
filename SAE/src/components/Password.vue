<template>
  <h1>Mot de passe oublié : Coiffeton Shiny</h1>
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
    </form>
  </div>
</template>
  

  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';
  
  export default {
    data() {
      return {
        utilisateur: {
          email: '',
        },
      };
    },
    computed: {
      // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
      isAlreadyRegistered() {
        // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
        return Cookies.get('connexion') === 'Y';
      },
    },
    methods: {
      demandeMotDePasse() {
        
        const donneesMotDePasse = {
          email: this.utilisateur.email
        }
  
        axios
          .post('http://localhost:3000/users/motdepasse', donneesMotDePasse)
          .then(response => {
            console.log("Mail envoyé")
  
            // Réinitialisez le formulaire
            this.utilisateur = {
              email: '',
            };
  
            // if (response) {
            //   console.log(response);
  
            //   Cookies.set("connexion", "Y", { expires: 7 });
  
            //   // Redirigez l'utilisateur vers la page d'accueil
            //   window.location.href = "http://127.0.0.1:5173/accueil";
            // }
          })
          .catch(error => {
            console.log("Il y a une erreur :", error)
          });
      },
    },
  };
  </script>
  
  
  <style scoped>
    /* Styles pour l'en-tête */
  </style>