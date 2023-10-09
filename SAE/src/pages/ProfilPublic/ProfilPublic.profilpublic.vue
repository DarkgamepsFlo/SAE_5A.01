<template>
    <div id="profil">
        <h1>Voici le profil d'un utilisateur</h1>
        <div id="user" v-for="item in user" :key="item.id_uti">
            <p>Pseudo : {{ item.pseudo_uti }}</p>
            <img :src="item.lien_img_pro">
            <p>Public : {{ item.public }}</p>
            <!--L'id de l'utilisateur est aussi disponible-->
        </div>
        <div id="collection" v-if="ifPublic">
            <div class="boite" v-for="item in collection" :key="item.nom_boi">
                <img :src="item.lien_img_boi">
                <p>Nom de la boite : {{ item.nom_boite }}</p>
            </div>
        </div>
        <div v-else>
            <h1>La collection de cet utilisateur est privée</h1>
        </div>
    </div>
</template>

<style src="./ProfilPublic.profilpublic.scss"></style>
<script src="./ProfilPublic.profilpublic.js"></script>