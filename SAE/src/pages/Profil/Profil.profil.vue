<template>
    <div v-if="!isAlreadyRegistered">
      Vous devez être connecté !
    </div>
    <div id="blockMonProfil" v-else>
      <div>
        <h1 id="titreMonProfil">MON COMPTE</h1>
      </div>
      <p id="textProfil">Bonjour {{pseudo_uti}}, Bienvenue sur votre compte !</p>
      <img id="imageCompte" :src="lien_img_pro_pp">
      <!-- Placer une div prévu pour l'image -->
      <div>
        <h1 id="titreGererCompte">GERER MON COMPTE</h1>
      </div>
      <form @submit.prevent="modifierInformationUser">
        <div id="divUtilisateur">
          <label for="utilisateur" id="labelUtilisateur" class="labelForm">Nom d'utilisateur:</label>
          <input type="text" id="utilisateur" class="inputForm" v-model="pseudo_uti" required />
        </div>
        <div id="divadresseMail">
          <label for="adresseMail" id="labelAdresseMail" class="labelForm">Adresse mail:</label>
          <input type="email" id="adresseMail" class="inputForm" v-model="adresse_mail_uti" required />
        </div>
        <div id="divMdp">
          <label for="mdp" id="labelMdp" class="labelForm">Changer le mot de passe:</label>
          <input type="password" id="mdp" class="inputForm" v-model="new_mdp" />
        </div>
        <div id="divConfirmationMdp">
          <label for="confirmationMdp" id="labelConfirmationMdp" class="labelForm">Confirmation du nouveau mot de passe:</label>
          <input type="password" id="confirmationMdp" class="inputForm" v-model="conf_mdp" />
        </div>

        <div id="divConfCollection">
          <label for="confCollection" class="labelForm">Confidentialité de la collection :</label>
          <div>
            <input type="radio" id="confCollectionOui" class="radioProfil" value="true" v-model="public_c" />
            <label for="confCollectionOui">Oui</label>
          </div>
          <div>
            <input type="radio" id="confCollectionNon" class="radioProfil" value="false" v-model="public_c" />
            <label for="confCollectionNon">Non</label>
          </div>
        </div>

        <div id="divConfWishlist">
          <label for="confWishlist" class="labelForm">Confidentialité de la wishlist :</label>
          <div>
            <input type="radio" id="confWishlistOui" class="radioProfil" value="true" v-model="public_w" />
            <label for="confWishlistOui">Oui</label>
          </div>
          <div>
            <input type="radio" id="confWishlistNon" class="radioProfil" value="false" v-model="public_w" />
            <label for="confWishlistNon">Non</label>
          </div>
        </div>
  
        <div id="divBoutonEnvoie" class="divBoutonPrincipal"><button type="submit" id="boutonEnvoie" class="boutonPrincipal"><span id="spanEnvoie" class="spanBoutonPrincipal">Valider les changements</span></button></div>
      </form>
      <div v-if="admin_uti">
        <h1 id="estAdmin">VOUS ETES ADMIN !</h1>
      </div>
    </div>
    <div v-if="admin_uti" id="tab-container">
          <SuggestionBoite v-for="suggestion in suggestions" :key="suggestion.nom_boite_sugg" :suggestion="suggestion" />
      </div>
</template>
    
<style src="./Profil.profi.scss"></style>
<script src="./Profil.profil.js"></script>