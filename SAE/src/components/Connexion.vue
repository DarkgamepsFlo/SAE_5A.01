<template>
  <div>
      <!-- Vérification de la présence du cookie "connexion" et de sa valeur -->
      <div v-if="isAlreadyRegistered">
        <h1>Connexion</h1>
        Vous êtes déjà connecté.
      </div>
      <div v-else id="blockConnexion">
        <h1>CONNEXION</h1>
        <form @submit.prevent="connexionUtilisateur">
        <div>
          <label for="pseudo" id="labelPseudo">Pseudo:</label>
          <!-- GARDE CA SINON PAS COIFFETON SHINY : v-model="utilisateur.pseudo" required -->
          <input type="text" id="pseudo" v-model="utilisateur.pseudo" required />
        </div>
        <div>
          <label for="motDePasse" id="labelMPD">Mot de passe:</label>
          <input type="password" id="motDePasse" v-model="utilisateur.motDePasse" required />
        </div>
        <div id="divBoutonConnexion"><button type="submit" id="boutonConnexion"><span id="spanConnexion">Se connecter</span> </button></div>
      </form>
      </div>
    </div>
  <router-link to="/mdp"><h2>Mot de passe oublié</h2></router-link>
  <router-link to="/inscription"><h2>Pas encore de compte ?</h2></router-link>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

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
      const cookieValue = Cookies.get('connexion');
      if (cookieValue) {
        return true
      }
      return false
    }
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

          if (response.data.success === true){

            Cookies.set("connexion", JSON.stringify(response.data), { expires: 1 });

            // Redirigez l'utilisateur vers la page d'accueil
            window.location.href = "http://127.0.0.1:5173/accueil";
          }

          else{
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: response.data.message
            });
            console.error(response.data.message);
          }
        })
        .catch(error => {
          console.error("Il y a une erreur :", error);
        });
    },
  },
};
</script>


<style scoped>
  @font-face {
    font-family: 'LegoThick';
    src: url("../assets/font/Legothick.ttf");
    }
  @font-face {
        font-family: 'Acme';
        src: url("../assets/font/Acme-Regular.ttf");
    }

    #blockConnexion{
      margin-left: auto;
      margin-right: auto;
      border: 1px solid;
      width: 700px;
    }

    label{
        font-family: 'Acme';
        font-size: 20px;
        display: block;
        margin-left: 70px;
    }
    h1{
        font-family: 'LegoThick';
        font-size: 64px;
        text-align: center;
    }
    input{
      width: 70%;
      margin-left: 90px;
      background-color: lightgray;
    }

    #boutonConnexion{
        margin-top: 50px;
        width: 40%;
        height: 50px;
        background-image: url("../assets/img/boutonCentral.png");
        background-size: contain;
        margin-bottom: 100px;
        border-color: transparent;
    }

    #divBoutonConnexion{
        text-align: center;
    }

    #spanConnexion{
        font-family: 'Acme';
        font-size: 30px;
        text-shadow:
        -1px 0px 0px white,
        1px 0px 0px white,
        0px -1px 0px white,
        0px 1px 0px white;
    }

</style>