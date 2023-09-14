<template>
  <div>
    <h1>Inscription</h1>
    <form @submit.prevent="inscrireUtilisateur">
      <div>
        <label for="pseudo">Pseudo:</label>
        <input type="text" id="pseudo" v-model="utilisateur.pseudo" required />
      </div>
      <div>
        <label for="motDePasse">Nouveau mot de passe:</label>
        <input type="password" id="motDePasse" v-model="utilisateur.motDePasse" required />
      </div>
      <div>
        <label for="confirmationMotDePasse">Confirmation du mot de passe:</label>
        <input
          type="password"
          id="confirmationMotDePasse"
          v-model="confirmationMotDePasse"
          required
        />
      </div>
      <div>
        <label for="email">Adresse e-mail:</label>
        <input
          type="email"
          id="email"
          v-model="utilisateur.email"
          required
        />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      utilisateur: {
        pseudo: '',
        motDePasse: '',
        email: '',
      },
      confirmationMotDePasse: '',
    };
  },
  methods: {
    inscrireUtilisateur() {
      // Validez les données du formulaire ici
      if (this.utilisateur.motDePasse !== this.confirmationMotDePasse) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
      
      const donneesInscription = {
        pseudo: this.utilisateur.pseudo,
        motDePasse: this.utilisateur.motDePasse,
        email: this.utilisateur.email
      }

      axios
        .post('http://localhost:3000/users/inscription', donneesInscription)
        . then(response => {

          console.log("Inscription réussi")

          // Réinitialisez le formulaire
          this.utilisateur = {
            pseudo: '',
            motDePasse: '',
            email: '',
          };
          this.confirmationMotDePasse = '';

          if (response){
            console.log(response);
            window.location.href = "http://127.0.0.1:5173/accueil";
          }
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