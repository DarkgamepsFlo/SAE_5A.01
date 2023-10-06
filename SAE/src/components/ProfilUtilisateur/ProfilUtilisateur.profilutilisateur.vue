<template>
    <div class="utilisateur" @click="redirection">
        <img :src="user.lien_img_pro">
        <div class="pseudo">{{ user.pseudo_uti }}</div>
    </div>
</template>

<script src="./ProfilUtilisateur.profilutilisateur.js"></script>
<style src="./ProfilUtilisateur.profilutilisateur.scss"></style>