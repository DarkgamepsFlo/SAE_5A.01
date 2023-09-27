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
    
<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      contact: {
        sujet: '',
        message: '',
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
    inscrireUtilisateur() {
      // Validez les données du formulaire ici
      if (this.utilisateur.motDePasse !== this.confirmationMotDePasse) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Les mots de passe ne correspondent pas.',
        });
        return;
      }

      const donneesInscription = {
        pseudo: this.utilisateur.pseudo,
        motDePasse: this.utilisateur.motDePasse,
        email: this.utilisateur.email,
      };

      axios
        .post('http://localhost:3000/users/inscription', donneesInscription)
        .then(response => {
          // Réinitialisez le formulaire
          this.utilisateur = {
            pseudo: '',
            motDePasse: '',
            email: '',
          };
          this.confirmationMotDePasse = '';

          if (response.data.success === true) {
            this.confirmationMotDePasse = '';
            Cookies.set("connexion", JSON.stringify(response.data), { expires: 1 });
            // Redirigez l'utilisateur vers la page d'accueil
            window.location.href = "http://127.0.0.1:5173/accueil";
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: response.data.message,
              customClass: {
                container: 'custom-sweetalert-container',
                title: 'custom-sweetalert-title',
                content: 'custom-sweetalert-text',
              },
              background: 'var(--color-background)',
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

  #blockContact{
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

  #boutonContact{
      margin-top: 50px;
      width: 40%;
      height: 50px;
      background-image: url("../assets/img/boutonCentral.png");
      background-size: contain;
      margin-bottom: 100px;
      border-color: transparent;
  }

  #divBoutonContact{
      text-align: center;
  }

  #spanContact{
      font-family: 'Acme';
      font-size: 30px;
      text-shadow:
      -1px 0px 0px white,
      1px 0px 0px white,
      0px -1px 0px white,
      0px 1px 0px white;
  }

</style>