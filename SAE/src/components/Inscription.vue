<template>
  <div>
    <h1>Inscription</h1>
    <!-- Vérification de la présence du cookie "connexion" et de sa valeur -->
    <div v-if="isAlreadyRegistered">
      Vous êtes déjà connecté.
    </div>
    <div v-else>
      <form @submit.prevent="inscrireUtilisateur">
      <div>
        <label for="pseudo">Pseudo:</label>
        <input type="text" id="pseudo" v-model="utilisateur.pseudo" required />
      </div>
      <div>
        <label for="motDePasse">Mot de passe:</label>
        <input type="password" id="motDePasse" v-model="utilisateur.motDePasse" required />
      </div>
      <div>
        <label for="confirmationMotDePasse">Confirmation du mot de passe:</label>
        <input type="password" id="confirmationMotDePasse" v-model="confirmationMotDePasse" required />
      </div>
      <div>
        <label for="email">Adresse e-mail:</label>
        <input type="email" id="email" v-model="utilisateur.email" required />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

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
  computed: {
    // Cette fonction permet de retrouver si un cookie existe et qu'il possède bien la valeur en returnant un boolean
    isAlreadyRegistered() {
      // Vérifiez si le cookie "connexion" existe et a la valeur "Y"
      return Cookies.get('connexion') === 'Y';
    },
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
        .then(response => {
          console.log("Inscription réussie")

          // Réinitialisez le formulaire
          this.utilisateur = {
            pseudo: '',
            motDePasse: '',
            email: '',
          };
          this.confirmationMotDePasse = '';

          if (response) {
            console.log(response);

            Cookies.set("connexion", "Y", { expires: 7 });

            // Redirigez l'utilisateur vers la page d'accueil
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
