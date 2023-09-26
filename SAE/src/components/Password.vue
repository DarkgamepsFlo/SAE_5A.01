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
  

  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import Swal from 'sweetalert2';

  export default {
    data() {
      return {
        utilisateur: {
          email: '',
          code: '',
          codeBase: '',
          motDePasse: '',
        },
        afficherForm: false,
        boutonPressed: false,
        afficherNewPassword: false,
        confirmationMotDePasse: ''
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
      },
      isAlreadyPressed() {
        return this.boutonPressed;
      },
      codeRecive() {
        return this.afficherForm;
      },
      codeCorrect() {
        return this.afficherNewPassword;
      }
    },
    methods: {
      demandeMotDePasse() {

        this.boutonPressed = true;
        
        const donneesMotDePasse = {
          email: this.utilisateur.email
        }
  
        axios
          .post('http://localhost:3000/users/motdepasse', donneesMotDePasse)
          .then(response => {

            if (response.data.success) {

              console.info("Mail envoyé avec succès")
              
              this.utilisateur.code = response.data.message;
              this.afficherForm = true;
              this.boutonPressed = false;
            }

            else{
              console.error('Problème au niveau de l\'envoie du mail');
              // Réinitialisez le formulaire
              this.utilisateur = {
                email: '',
                code: '',
                codeBase: '',
                motDePasse: '',
              };
            }
          })
          .catch(error => {
            console.error("Il y a une erreur :", error)
          });
      },
      acceptCode() {
        if (this.utilisateur.codeBase === this.utilisateur.code){
          console.info('Votre code est validé');

          this.afficherNewPassword = true;
          this.afficherForm = false;
          this.boutonPressed = false;
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Veuillez recopier le code envoyé par mail !'
          });
        }
      },
      changerPassword() {

        if (this.utilisateur.motDePasse !== this.confirmationMotDePasse) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Les mots de passe ne correspondent pas.',
          });
          return;
        }

        const donneeschangerPassword = {
          email: this.utilisateur.email,
          mdp: this.utilisateur.motDePasse,
        }

        axios
          .post('http://localhost:3000/users/changerpassword', donneeschangerPassword)
          .then(response => {

            if (response.data.success) {
              window.location.href = "http://127.0.0.1:5173/connexion";
            }

            else{
              console.error('Problème au niveau du changement du mot de passe');
              // Réinitialisez le formulaire
              this.utilisateur.motDePasse = '';
              this.utilisateur.confirmationMotDePasse = '';
            }
          })
          .catch(error => {
            console.error("Il y a une erreur :", error)
          });
      }
    },
  };
  </script>
  
  <style scoped>
    /* Styles pour l'en-tête */
  </style>