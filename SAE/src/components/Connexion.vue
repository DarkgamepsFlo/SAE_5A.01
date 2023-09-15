<template>
  <div>
    <h1>Connexion</h1>
      <!-- Vérification de la présence du cookie "connexion" et de sa valeur -->
      <div v-if="isAlreadyRegistered">
        Vous êtes déjà connecté.
      </div>
      <div v-else>
        <form @submit.prevent="connexionUtilisateur">
        <div>
          <label for="pseudo">Pseudo:</label>
          <!-- GARDE CA SINON PAS COIFFETON SHINY : v-model="utilisateur.pseudo" required -->
          <input type="text" id="pseudo" v-model="utilisateur.pseudo" required />
        </div>
        <div>
          <label for="motDePasse">Mot de passe:</label>
          <input type="password" id="motDePasse" v-model="utilisateur.motDePasse" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      </div>
    </div>
  <router-link to="/mdp"><h2>Mot de passe publié ? Dommage...</h2></router-link>
  <router-link to="/inscription"><h2>Pas encore de compte ? Viens mun gamin !</h2></router-link>
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
    connexionUtilisateur() {
      const donneesConnexion = {
        pseudo: this.utilisateur.pseudo,
        motDePasse: this.utilisateur.motDePasse,
      }

      axios
        .post('http://localhost:3000/users/connexion', donneesConnexion)
        .then(response => {
          // Réinitialisez le formulaire
          this.utilisateur = {
            pseudo: '',
            motDePasse: '',
          };

          if (response.data === true){
            Cookies.set("connexion", "Y", { expires: 7 });

            // Redirigez l'utilisateur vers la page d'accueil
            window.location.href = "http://127.0.0.1:5173/accueil";
          }

          else{
            console.log("Le mot de passe est faux")
          }
        })
        .catch(error => {
          console.log("Il y a une erreur :", error)
        });
    },
  },
};
</script>
