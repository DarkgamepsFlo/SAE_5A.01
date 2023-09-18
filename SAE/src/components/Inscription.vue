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
      return Cookies.get('connexion') === 'Y';
    },
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
            console.log("Inscription réussie");
            this.confirmationMotDePasse = '';
            Cookies.set("connexion", "Y", { expires: 7 });
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
          }
        })
        .catch(error => {
          console.log("Il y a une erreur :", error);
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

</style>
