<template>
    <div id="profil">
        <h1>Voici le profil d'un utilisateur</h1>
        <div id="user" v-for="item in user" :key="item.id_uti">
            <p>Pseudo : {{ item.pseudo_uti }}</p>
            <img :src="item.lien_img_pro">
            <p>Public : {{ item.public }}</p>
            <router-link v-if="isUser" to="/profil">C'est ton profil ! Vas directement dessus</router-link>
            <!--L'id de l'utilisateur est aussi disponible-->
        </div>
        <div id="collection" v-if="ifPublic">
            <ProfilBoite v-for="item in collection" :key="item.nom_boi" :boite="item" 
            :search="true" 
            :presentation="false"
            :collection_uti="collection_uti"
            :wishlist_uti="wishlist_uti"
            @deleteBoiteCollection="deleteBoiteCollection" 
            @addBoiteCollection="addBoiteCollection" 
            @addBoiteWishlist="addBoiteWishlist" 
            @deleteBoiteWishlist="deleteBoiteWishlist"/>
        </div>
        <div v-else>
            <h1>La collection de cet utilisateur est privée</h1>
        </div>
    </div>
</template>

<style src="./ProfilPublic.profilpublic.scss"></style>
<script src="./ProfilPublic.profilpublic.js"></script>