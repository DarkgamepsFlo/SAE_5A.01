<template>
    <router-link :to="{ name: 'user', params: { id_uti: user.id_uti } }">
        <div class="utilisateur">
            <img :src="user.lien_img_pro">
            <div class="pseudo">{{ user.pseudo_uti }}</div>
        </div>
    </router-link>
</template>

<script src="./ProfilUtilisateur.profilutilisateur.js"></script>
<style src="./ProfilUtilisateur.profilutilisateur.scss"></style>