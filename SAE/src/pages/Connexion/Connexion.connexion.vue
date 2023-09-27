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

<style src="./Connexion.connexion.scss"></style>
<script src="./Connexion.connexion.js"></script>