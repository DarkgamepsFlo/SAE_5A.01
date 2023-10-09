<template>
  <div id="blockInscription">
    <h1>INSCRIPTION</h1>
    <!-- Vérification de la présence du cookie "connexion" et de sa valeur -->
    <div v-if="isAlreadyRegistered">
      Vous êtes déjà connecté.
    </div>
    <div v-else>
      <form @submit.prevent="inscrireUtilisateur">
      <div id="divUtilisateur">
        <label for="utilisateur" id="labelUtilisateur">Pseudo:</label>
        <input type="text" id="utilisateur" v-model="utilisateur.pseudo" required />
      </div>
      <div id="divadresseMail">
        <label for="adresseMail" id="labelAdresseMail">Adresse e-mail:</label>
        <input type="email" id="adresseMail" v-model="utilisateur.email" required />
      </div>
      <div id="divMdp">
        <label for="mdp" id="labelMdp">Mot de passe:</label>
        <input type="password" id="mdp" v-model="utilisateur.motDePasse" required />
      </div>
      <div id="divConfirmationMdp">
        <label for="confirmationMdp" id="labelConfirmationMdp">Confirmation du mot de passe:</label>
        <input type="password" id="confirmationMdp" v-model="confirmationMotDePasse" required />
      </div>

      <div id="divBoutonEnvoie"><button type="submit" id="boutonEnvoie"><span id="spanEnvoie">M'inscrire</span> </button></div>
    </form>
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
 
<!-- Exemple d'inclusion de css dans un SweetAlert2 -->
<style scoped>
/* Ajoutez ces styles personnalisés dans votre CSS */
.custom-sweetalert-container {
  /* var(...) permet d'utiliser du css qui est dans le fichier base.css (Idée incroyable) */
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: 8px;
}

.custom-sweetalert-title {
  color: var(--color-heading);
  font-size: 20px;
}

.custom-sweetalert-text {
  color: var(--color-text);
  font-size: 16px;
}
  @font-face {
      font-family: 'LegoThick';
      src: url("../assets/font/Legothick.ttf");
  }
  @font-face {
      font-family: 'Acme';
      src: url("../assets/font/Acme-Regular.ttf");
  }
  #blockInscription{
    margin-left: auto;
    margin-right: auto;
    border: 1px solid;
    width: 500px;
  }
  label{
    font-family: 'Acme';
    font-size: 20px;
    display: block;
    margin-left: 30px;
  }
  h1{
    margin-top: 50px;
    font-family: 'LegoThick';
    font-size: 64px;
    text-align: center;
  }
  input{
    width: 70%;
    margin-left: 50px;
    background-color: lightgray;
  }
  #boutonEnvoie{
    margin-top: 50px;
    width: 40%;
    height: 50px;
    background-image: url("../assets/img/boutonCentral.png");
    background-size: contain;
    margin-bottom: 50px;
    border-color: transparent;
}

#divBoutonEnvoie{
    text-align: center;
}

</style>
