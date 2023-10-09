<template>
    <div v-if="!isAlreadyRegistered">
      Vous devez être connecté !
    </div>
    <div v-else>
      <div>
        <h1>Mon Compte</h1>
      </div>
      <p>Bonjour {{pseudo_uti}}, Welcome to votre compte !</p>
      <img :src="lien_img_pro_pp">
      <!-- Placer une div prévu pour l'image -->
      <div>
        <h1>GERER MON COMPTE</h1>
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
            <input type="radio" id="confCollectionOui" value="true" v-model="public_c" />
            <label for="confCollectionOui">Oui</label>
          </div>
          <div>
            <input type="radio" id="confCollectionNon" value="false" v-model="public_c" />
            <label for="confCollectionNon">Non</label>
          </div>
        </div>

        <div id="divConfWishlist">
          <label for="confWishlist" class="labelForm">Confidentialité de la wishlist :</label>
          <div>
            <input type="radio" id="confWishlistOui" value="true" v-model="public_w" />
            <label for="confWishlistOui">Oui</label>
          </div>
          <div>
            <input type="radio" id="confWishlistNon" value="false" v-model="public_w" />
            <label for="confWishlistNon">Non</label>
          </div>
        </div>
  
        <div id="divBoutonEnvoie" class="divBoutonPrincipal"><button type="submit" id="boutonEnvoie" class="boutonPrincipal"><span id="spanEnvoie" class="spanBoutonPrincipal">Valider les changements</span></button></div>
      </form>
      <div v-if="admin_uti">
        <h1>VOUS ETES ADMIN</h1>
      </div>
    </div>
</template>
    
<style src="./Profil.profi.scss"></style>
<script src="./Profil.profil.js"></script>